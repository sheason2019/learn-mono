package main

import (
	"fmt"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

func initArticleRouter(r *gin.Engine) {
	r.POST("/article/newarticle", func(c *gin.Context) {
		user, err := parseToken(c.Request.Header.Get("Authorization"))
		if err != nil {
			fmt.Println(err)
			c.JSON(202, gin.H{"message": "登录信息已过期，请重新登陆"})
			return
		}
		if user.Usertype != 9 {
			c.JSON(203, gin.H{"message": "用户权限不足"})
			return
		}
		articleinfo := &ArticleJSON{}
		c.ShouldBind(articleinfo)
		fmt.Println("articleinfo")
		fmt.Println(articleinfo)
		if articleinfo.Groupid == "new" {
			articlegroup := &TableArticlegroup{Grouptitle: articleinfo.Grouptitle, Time: time.Now()}
			insertNewArticlegroup(articlegroup)
			insertNewArticle(user, articleinfo.Title, articleinfo.Content, articlegroup.Groupid)
			c.JSON(200, gin.H{"message": "新增文章成功"})
		} else {
			groupid, err := strconv.Atoi(articleinfo.Groupid)
			if err != nil {
				fmt.Println(err)
			}
			insertNewArticle(user, articleinfo.Title, articleinfo.Content, groupid)
			c.JSON(200, gin.H{"message": "新增文章成功"})
		}
	})
	r.GET("/article/getarticles/:groupid", func(c *gin.Context) {
		fmt.Println(c.Query("keyword"))
		articles := getarticles(c.Param("groupid"), c.Query("keyword"))
		c.JSON(200, gin.H{"message": "请求成功", "data": articles})
	})
	r.GET("/article/getarticle/:contentid", func(c *gin.Context) {
		contentid := c.Param("contentid")
		articleJSON, err := getArticleJSONByContentid(contentid)
		if err != nil {
			c.String(500, "获取文章失败")
		} else {
			c.JSON(200, gin.H{"message": "获取文章成功", "data": articleJSON})
		}
	})
	r.GET("/article/getarticlegroup", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "获取文章组成功", "data": getArticleGroup()})
	})
	r.GET("/article/getarticlegroup/:groupid", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "获取指定文章组信息成功", "data": getArticleGroupByGroupid(c.Param("groupid"))})
	})
	r.GET("/article/deletearticle/:contentid", func(c *gin.Context) {
		user, _ := parseToken(c.Request.Header.Get("Authorization"))
		if user.Usertype != 9 {
			c.JSON(202, gin.H{"message": "用户权限不足，请检查您的账号"})
			return
		}
		if contentid, err := strconv.ParseInt(c.Param("contentid"), 10, 32); err != nil {
			c.JSON(202, gin.H{"message": "Articleid有误，请检查您的请求"})
			fmt.Println(err)
			return
		} else {
			contentid32 := int32(contentid)
			if err := deletearticle(contentid32); err != nil {
				c.JSON(204, gin.H{"message": "删除文章时发生了未知错误，请重试"})
				return
			} else {
				c.JSON(200, gin.H{"message": "success"})
			}
		}
	})
	r.POST("/article/updatearticle/:contentid", func(c *gin.Context) {
		user, _ := parseToken(c.Request.Header.Get("Authorization"))
		if user.Usertype != 9 {
			c.String(202, "用户权限不足，请检查您的账号")
			return
		} else {
			articleinfo := &ArticleJSON{}
			c.ShouldBind(articleinfo)
			if err := updatearticle(articleinfo.Title, articleinfo.Content, c.Param("contentid")); err != nil {
				fmt.Println(err)
				c.String(204, "发生了未知错误，请重试")
				return
			} else {
				c.String(200, "修改文章成功，即将跳转到修改后的文章页面")
				return
			}
		}
	})
	r.GET("article/getarticlehistory/:contentid", func(c *gin.Context) {
		article := getArticleByContentid(c.Param("contentid"))
		contentHistory, err := getAricleHistory(article.Articleid)
		if err != nil {
			c.String(204, "未知的错误")
			return
		} else {
			c.JSON(200, gin.H{"message": "成功获取文章历史记录", "data": contentHistory})
			return
		}
	})
	r.POST("article/lovearticle/:contentid", func(c *gin.Context) {
		user, loginerr := parseToken(c.Request.Header.Get("Authorization"))
		if loginerr != nil {
			c.String(202, "登录信息已过期，请重新登陆")
			return
		}
		article := getArticleByContentid(c.Param("contentid"))
		err := toggleArticleLove(article.Articleid, user.Userid)
		if err != nil {
			c.String(204, "发生了未知错误")
			return
		} else {
			c.String(200, "请求成功")
			return
		}
	})
	r.GET("article/lovearticle/:contentid", func(c *gin.Context) {
		user, loginerr := parseToken(c.Request.Header.Get("Authorization"))
		if loginerr != nil {
			c.String(202, "登录信息已过期，请重新登陆")
			return
		} else {
			article := getArticleByContentid(c.Param("contentid"))
			c.JSON(200, gin.H{"message": "获取喜爱信息成功", "love": getArticleLove(article.Articleid, user.Userid)})
			return
		}
	})
	//获取指定contentid所指向的文章的喜爱数量
	r.GET("article/articleloves", func(c *gin.Context) {
		var love []Count
		if c.Query("contentid") != "" {
			articleid := []int{int(getArticleByContentid(c.Query("contentid")).Articleid)}
			love = getArticleLoves(articleid)
		} else {
			temp := c.QueryArray("articleids[]")
			articleids := make([]int, len(temp))
			for i := 0; i < len(temp); i++ {
				articleids[i], _ = strconv.Atoi(temp[i])
			}
			love = getArticleLoves(articleids)
		}
		c.JSON(200, gin.H{"love": love})
	})
	r.POST("article/comments/:contentid", func(c *gin.Context) {
		contentid, _ := strconv.Atoi(c.Param("contentid"))
		comment := &TableComments{
			Contentid: contentid,
			Time:      time.Now(),
		}
		user, loginerr := parseToken(c.Request.Header.Get("Authorization"))
		if loginerr != nil {
			comment.Userid = "未登录用户"
		} else {
			comment.Userid = user.Userid
		}
		c.ShouldBind(comment)
		addComment(comment)
	})
	r.GET("article/comments/:contentid", func(c *gin.Context) {
		contentsid := getContentsidByContentid(c.Param("contentid"))
		user, _ := parseToken(c.Request.Header.Get("Authorization"))
		var usertype int
		if user == nil {
			usertype = 0
		} else {
			usertype = int(user.Usertype)
		}
		result, err := getComments(contentsid, usertype == 9)
		if err != nil {
			c.String(417, "未知错误导致的执行失败。")
		} else {
			c.JSON(200, gin.H{"comments": result})
		}
	})
	r.GET("article/commentsnum", func(c *gin.Context) {
		if c.Query("contentid") != "" {
			articleid := []int{int(getArticleByContentid(c.Query("contentid")).Articleid)}
			c.JSON(200, gin.H{"commentsNum": getCommentsNum(articleid, false)})
		} else {
			temp := c.QueryArray("articleids[]")
			articleids := make([]int, len(temp))
			for i := 0; i < len(temp); i++ {
				articleids[i], _ = strconv.Atoi(temp[i])
			}
			c.JSON(200, gin.H{"commentsNum": getCommentsNum(articleids, false)})
		}
	})
	r.GET("article/comment/:id", func(c *gin.Context) {
		user, _ := parseToken(c.Request.Header.Get("Authorization"))
		var usertype int
		if user == nil {
			usertype = 0
		} else {
			usertype = int(user.Usertype)
		}
		id, _ := strconv.Atoi(c.Param("id"))
		comment, err := getComment(id, usertype == 9)
		if err != nil {
			c.String(404, "获取指定评论信息失败")
		} else {
			c.JSON(200, gin.H{"comment": comment})
		}
	})
	r.DELETE("article/comments/:id", func(c *gin.Context) {
		user, loginerr := parseToken(c.Request.Header.Get("Authorization"))
		if loginerr != nil {
			c.String(202, "登录信息已过期，请重新登陆")
			return
		} else {
			id, _ := strconv.Atoi(c.Param("id"))
			comment, err := getComment(id, false)
			if err != nil {
				c.String(404, "获取指定评论信息失败")
			} else {
				if user.Usertype == 9 || user.Userid == comment.Userid {
					deleteComment(id)
					c.String(200, "删除评论成功")
				} else {
					c.String(204, "权限不足")
				}
			}
		}
	})
}
