# Electron-vite-solidjs

集成了Vite、Solid和Electron的一个项目原型。

Electron本身没有开箱即用的热重载功能，因此在这个项目里使用了Vite实现页面的热重载。

原理是根据`npm run`命令中附带的参数路由Electron加载的页面：

- 如果命令带有`--development`参数，就表示Electron以开发模式启动，此时Electron会向Vite开启的Serve `http://localhost:3000/`请求页面。

- 如果命令没有`--development`参数，表示Electron以生产模式启动，此时Electron会在本地的dist目录下加载`index.html`文件。

# 启动调试模式

使用下列命令启动调试模式：

```
$ yarn dev:vite
$ yarn dev:electron
```

然后就可以像调试普通的Vite应用一样对Electron应用进行调试了。

# 打包

打包的原理是使用Nodejs命令将electron-packager所需的依赖先打包到`dist/`目录下，然后再运行electron-packager命令将产物打包到`build/`目录下。

使用命令`yarn build`即可实现构建。

相关的Node脚本是`utils/builder`。
