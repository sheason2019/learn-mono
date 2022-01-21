package main

import (
	"fmt"
	"time"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var (
	db           *gorm.DB
	sqlConnetion = "root:123@(121.4.97.15:3307)/blog?charset=utf8&parseTime=True"
)

func init() {
	var err error
	db, err = gorm.Open("mysql", sqlConnetion)
	if err != nil {
		panic("failed to connect database")
	}
	db.SingularTable(true)

}

func registUser(user TableUser) {
	db.Create(&user)
}

func checkUsername(username string) string {
	var result TableUser
	db.Where("userid = ?", username).First(&result)
	return result.Userid
}

type Articleid struct {
	Articleid int32
}

func insertNewArticle(user *UserLoginClaims, title, content string, articlegroupid int) error {
	if err := db.Transaction(func(tx *gorm.DB) error {
		article := &TableArticle{Author: user.Userid, Groupid: articlegroupid}
		fmt.Println("article")
		fmt.Println(article)
		if err := tx.Create(article).Error; err != nil {
			tx.Rollback()
			return err
		}
		temp := &TableArticle{}
		tx.Order("articleid desc").First(&temp)
		articleContent := &TableArticlecontent{
			Articleid: temp.Articleid,
			Title:     title,
			Time:      time.Now(),
			Content:   content,
		}
		fmt.Println("articlecontent")
		fmt.Println(articleContent)
		if err := tx.Create(articleContent).Error; err != nil {
			tx.Rollback()
			return err
		}
		tx.Commit()
		return nil
	}); err != nil {
		return err
	}
	return nil
}

func insertNewArticlegroup(articlegroup *TableArticlegroup) error {
	tx := db.Begin()
	if err := tx.Create(&articlegroup).Error; err != nil {
		tx.Rollback()
		return err
	}
	temp := &TableArticlegroup{}
	tx.Order("groupid desc").First(&temp)
	articlegroup.Groupid = temp.Groupid
	tx.Commit()
	return nil
}

func getarticles(groupid, keyword string) []ArticleJSON {
	var articles []ArticleJSON
	if groupid != "all" {
		db.Raw("select * from view_toc where groupid = ? and title like '%"+keyword+"%'", groupid).Scan(&articles)
	} else {
		db.Raw("select * from view_toc where title like '%" + keyword + "%'").Scan(&articles)
	}
	return articles
}
func getArticleJSONByContentid(contentid string) (ArticleJSON, error) {
	var article ArticleJSON
	err := db.Raw("select * from view_content where contentid = ?", contentid).Scan(&article).Error
	if err != nil {
		return ArticleJSON{}, err
	} else {
		return article, nil
	}
}
func getArticleByContentid(contentid string) TableArticle {
	content := TableArticlecontent{}
	db.Where("contentid = " + contentid).Find(&content)
	article := &TableArticle{Articleid: content.Articleid}
	db.Where(article).Find(&article)
	return *article
}

func getArticleGroup() []TableArticlegroup {
	var result []TableArticlegroup
	db.Table("table_articlegroup").Where("isdelete = 0").Scan(&result)
	return result
}
func getArticleGroupByGroupid(groupid string) TableArticlegroup {
	result := TableArticlegroup{}
	db.Where("groupid = ?", groupid).Find(&result)
	return result
}

func updateUserinfo(targetUser *TableUser) error {
	user := &TableUser{}
	if err := db.Where("Userid = ?", targetUser.Userid).Find(&user).Error; err != nil {
		return err
	} else {
		db.Model(&user).Update(&targetUser)
		return nil
	}
}

func setavatar(avatarsrc, userid string) error {
	avatar := &TableAvatar{Avatarsrc: avatarsrc, Userid: userid, Time: time.Now()}
	if err := db.Create(avatar).Error; err != nil {
		return err
	} else {
		return nil
	}
}

func getavatar(userid string) (*TableAvatar, error) {
	avatar := &TableAvatar{}
	if err := db.Where("userid = ?", userid).Order("time").First(avatar).Error; err != nil {
		return nil, err
	} else {
		return avatar, nil
	}
}

func deletearticle(contentid int32) error {
	content := &TableArticlecontent{Contentid: contentid}
	if err := db.Where(content).First(content).Error; err != nil {
		return err
	} else {
		article := &TableArticle{Articleid: content.Articleid}
		if err := db.Model(article).Where("articleid = ?", article.Articleid).Update("isdelete", 1).Error; err != nil {
			return err
		} else {
			return nil
		}
	}
}

func updatearticle(articleTitle, articleContent, contentid string) error {
	newContent := &TableArticlecontent{
		Title:   articleTitle,
		Content: articleContent,
	}
	oldContent, _ := getArticleJSONByContentid(contentid)
	newContent.Articleid = int32(oldContent.Articleid)
	newContent.Time = time.Now()
	err := db.Create(&newContent).Error
	if err != nil {
		return err
	} else {
		return nil
	}
}

func getAricleHistory(articleid int32) ([]TableArticlecontent, error) {
	var contentHistory []TableArticlecontent
	err := db.Table("table_articlecontent").Where("articleid = ?", articleid).Scan(&contentHistory).Error
	if err != nil {
		return nil, err
	} else {
		return contentHistory, nil
	}
}

func toggleArticleLove(articleid int32, userid string) error {
	love := TableLove{Articleid: int(articleid), Userid: userid, Time: time.Now()}
	err := db.Where("articleid = ? and userid = ?", love.Articleid, love.Userid).Find(&love).Error
	tx := db.Begin()
	if err != nil {
		err := tx.Create(&love).Error
		if err != nil {
			tx.Rollback()
			return err
		} else {
			tx.Commit()
			return nil
		}
	} else {
		err := tx.Model(&love).Where("articleid = ? and userid = ?", articleid, userid).Update("love", 1-love.Love).Error
		if err != nil {
			tx.Rollback()
			return err
		} else {
			tx.Commit()
			return nil
		}
	}
}
func getArticleLove(articleid int32, userid string) int {
	love := TableLove{Articleid: int(articleid), Userid: userid}
	err := db.Where("articleid = ? and userid = ?", love.Articleid, love.Userid).Find(&love).Error
	if err != nil {
		return 0
	} else {
		return love.Love
	}
}

func getArticleLoves(articleids []int) []Count {
	love := []Count{}
	db.Raw("select articleid as 'key',count from view_love where articleid in (?)", articleids).Scan(&love)
	return love
}

func addComment(comment *TableComments) error {
	fmt.Println(comment)
	db.Create(comment)
	return nil
}
func getComments(contentsid []int, force bool) ([]TableComments, error) {
	var result []TableComments
	var err error
	if force {
		err = db.Table("table_comments").Where("contentid in (?)", contentsid).Scan(&result).Error
	} else {
		err = db.Table("table_comments").Where("contentid in (?) and isdelete = 0", contentsid).Scan(&result).Error
	}
	if err != nil {
		return nil, err
	} else {
		return result, nil
	}
}
func getCommentsNum(contentsid []int, force bool) []Count {
	commentsnum := []Count{}
	if force {
		db.Raw("select articleid as 'key',count from view_commentsnum where articleid in (?)", contentsid).Scan(&commentsnum)
	} else {
		db.Raw("select articleid as 'key',count from view_commentsnum_visitable where articleid in (?)", contentsid).Scan(&commentsnum)
	}
	return commentsnum
}
func getComment(id int, force bool) (TableComments, error) {
	comment := TableComments{}
	var err error
	if force {
		err = db.Where("id = ?", id).Find(&comment).Error
	} else {
		err = db.Where("id = ? and isdelete = 0", id).Find(&comment).Error
	}
	return comment, err
}
func deleteComment(id int) {
	db.Table("table_comments").Where("id = ?", id).Update("isdelete", 1)
}
