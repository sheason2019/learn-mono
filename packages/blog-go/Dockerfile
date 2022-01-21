FROM golang:latest

WORKDIR /go/src/blog
ADD . /go/src/blog

RUN go env -w GO111MODULE=on
RUN go env -w GOPROXY=https://goproxy.io,direct
RUN go build .

EXPOSE 8080

ENTRYPOINT ["./hello"]