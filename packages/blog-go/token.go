package main

import (
	"errors"
	"fmt"
	"time"

	"github.com/dgrijalva/jwt-go"
)

const (
	SECRETKEY = "114514ffslsfsldfl412fdsfsdf"
)

type UserLoginClaims struct {
	Userid   string
	Usertype int8
	Username string
	jwt.StandardClaims
}

func newUserToken(user *TableUser) string {
	maxAge := 24 * 30
	claims := UserLoginClaims{
		Userid:   user.Userid,
		Usertype: user.Usertype,
		Username: user.Username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Duration(maxAge) * time.Hour).Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(SECRETKEY))
	if err != nil {
		fmt.Println(err)
	}
	return tokenString
}

func parseToken(tokenString string) (*UserLoginClaims, error) {
	if tokenString == "removetoken" || tokenString == "" {
		return nil, errors.New("登录信息已过期，请重新登陆。")
	}
	token, err := jwt.ParseWithClaims(tokenString, &UserLoginClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: &v", token.Header["alg"])
		}
		return []byte(SECRETKEY), nil
	})
	if claims, ok := token.Claims.(*UserLoginClaims); ok && token.Valid {
		return claims, nil
	} else {
		return nil, err
	}
}
