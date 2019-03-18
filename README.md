# hybrid example
增加了

[px2viewport 插件](https://github.com/yuanzhaohao/postcss-px2viewport#readme)
移动端等比例缩放能解决大部分适配的问题

[babel-plugin-component](https://github.com/ElementUI/babel-plugin-component#readme)
mint-ui 推荐的

## 使用方法
1. git clone git@github.com:ruguoapp/jkfe-hybrid-template.git [project name]
2. git remote set-url origin [url]
3. 修改 package.json 中的name 字段为 project name
4. 修改 main.js 中 setCurrentPage 的传参
5. 修改 main.js 中 sentry 中的 __DSN__

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
