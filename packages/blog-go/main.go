package main

import (
	"time"

	"github.com/gin-gonic/gin"
)

var LOC, _ = time.LoadLocation("Asia/Shanghai")

func main() {
	r := gin.Default()

	initUserRouter(r)
	initArticleRouter(r)

	r.Run()
}
