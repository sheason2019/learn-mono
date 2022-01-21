package main

import (
	"fmt"
	"path"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func initUserRouter(r *gin.Engine) {
	r.POST("/user/regist", func(c *gin.Context) {
		user := &TableUser{}
		c.ShouldBindJSON(user)
		validate := validator.New()
		err := validate.Struct(user)
		if err != nil {
			for _, err := range err.(validator.ValidationErrors) {
				fmt.Println(err)
				return
			}
			return
		}
		user.Registtime = time.Now().Add(time.Hour * 8)
		if !db.NewRecord(&user) {
			registUser(*user)
			tokenString := newUserToken(user)
			c.JSON(200, gin.H{"message": "注册用户成功！", "userToken": tokenString})
		} else {
			c.String(204, "错误的注册信息")
		}
	})
	r.GET("/user/checkUsername", func(c *gin.Context) {
		username := c.Query("username")
		fmt.Print(username)
		c.String(200, checkUsername(username))
	})
	r.POST("/user/login", func(c *gin.Context) {
		user := &TableUser{}
		targetUser := &TableUser{}
		c.ShouldBindJSON(user)
		db.Where("userid = ? and password = ?", user.Userid, user.Password).Attrs(TableUser{Userid: ""}).Find(targetUser)
		if targetUser.Userid == "" {
			c.JSON(201, gin.H{"message": "登录失败，账户名或密码错误"})
		} else {
			tokenString := newUserToken(targetUser)
			c.JSON(200, gin.H{"message": "登陆成功", "userToken": tokenString})
		}
	})
	r.GET("/user/getuserinfo", func(c *gin.Context) {
		user, err := parseToken(c.Request.Header.Get("Authorization"))
		if err != nil {
			fmt.Println(err)
			c.JSON(202, gin.H{"message": err})
			return
		}
		userinfo := &TableUser{}
		if db.Where("userid = ?", user.Userid).Find(userinfo).RecordNotFound() {
			c.JSON(201, gin.H{"message": "错误的用户信息"})
			return
		}
		if userinfo.Userid != "" {
			tokenString := newUserToken(userinfo)
			c.JSON(200, gin.H{"userinfo": userinfo, "userToken": tokenString})
		}
	})
	r.POST("/user/setuserinfo", func(c *gin.Context) {
		user, err := parseToken(c.Request.Header.Get("Authorization"))
		if err != nil {
			c.JSON(202, gin.H{"message": "登录信息已过期，请重新登陆。"})
			return
		}
		postForm := &TableUser{}
		c.ShouldBindJSON(postForm)
		targetUser := &TableUser{}
		targetUser.Userid = user.Userid
		targetUser.Username = postForm.Username
		targetUser.Birthday = postForm.Birthday.Add(8 * time.Hour)
		targetUser.Sex = postForm.Sex
		if err := updateUserinfo(targetUser); err != nil {
			c.JSON(500, gin.H{"message": "未知的错误信息"})
		} else {
			c.JSON(200, gin.H{"message": "修改用户信息成功！"})
		}
	})
	r.POST("/user/setavatar", func(c *gin.Context) {
		user, err := parseToken(c.Request.Header.Get("Authorization"))
		if err != nil {
			c.JSON(202, gin.H{"message": "登录信息已过期，请重新登陆。"})
			return
		} else {
			file, _ := c.FormFile("img")
			if file.Size > 5*1000*1000 {
				c.JSON(500, gin.H{"message": "图片大小不能超过5M"})
			} else {
				extstring := path.Ext(file.Filename)
				file.Filename = "avatar_" + time.Now().Format("20060102150405") + "_" + user.Userid + extstring
				filepath := "files/avatar/" + file.Filename
				if err := c.SaveUploadedFile(file, filepath); err != nil {
					fmt.Println(err)
				} else {
					fmt.Println(file.Filename)
					setavatar(filepath, user.Userid)
				}
			}
		}
	})
	r.GET("/user/getavatar/:userid", func(c *gin.Context) {
		userid := c.Param("userid")
		avatar, err := getavatar(userid)
		if err != nil {
			c.JSON(500, gin.H{"message": "获取头像过程中发生了未知错误"})
		} else {
			c.File(avatar.Avatarsrc)
		}
	})
}
