package main

import "time"

type TableUser struct {
	Userid     string `gorm:"primary_key" validate:"min=6,max=32"`
	Username   string
	Password   string `gorm:"not null" validate:"min=6,max=48"`
	Phone      string `gorm:"unique" validate:"len=11"`
	Usertype   int8   `gorm:"not null"`
	Birthday   time.Time
	Sex        int8
	Registtime time.Time
}

type TableArticle struct {
	Articleid int32
	Author    string
	Groupid   int
	Isdelete  int8
}

type ArticleJSON struct {
	Title       string
	Content     string
	Groupid     string
	Grouptitle  string
	Time        time.Time
	Articleid   int64
	Contentid   int64
	LovesNum    int
	CommentsNum int
}
type ArticlesJSON struct {
	ArticlesJSON []ArticleJSON
}

type TableArticlecontent struct {
	Contentid int32
	Articleid int32
	Title     string
	Content   string
	Time      time.Time
	Isdelete  int8
}

type TableArticlegroup struct {
	Groupid       int
	Grouptitle    string
	Time          time.Time
	Groupdescript string
	Isdelete      int8
}

type TableAvatar struct {
	Avatarid  int32
	Avatarsrc string
	Userid    string
	Time      time.Time
	Isdelete  int8
}

type TableLove struct {
	Loveid    int
	Userid    string
	Articleid int
	Love      int
	Time      time.Time
}

type TableComments struct {
	Id        int       `json:"id"`
	Contentid int       `json:"contentid"`
	Content   string    `json:"content"`
	Userid    string    `json:"userid"`
	Time      time.Time `json:"time"`
	Isdelete  int       `json:"isdelete"`
	Replyfor  int       `json:"replyfor"`
}

type Count struct {
	Key   string
	Count int
}
