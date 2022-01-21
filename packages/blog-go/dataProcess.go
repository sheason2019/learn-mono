package main

func getContentsidByContentid(contentid string) []int {
	article := getArticleByContentid(contentid)
	contentHistory, _ := getAricleHistory(article.Articleid)
	contentsid := make([]int, len(contentHistory))
	for i := 0; i < len(contentHistory); i++ {
		contentsid[i] = int(contentHistory[i].Contentid)
	}
	return contentsid
}
