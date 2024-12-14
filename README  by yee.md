##

day1
配置react路由注意点：1.使用useRoutes钩子 给app根组件传入多个路由, 2.在项目入口文件引入HashRouter钩子包裹app组件, 3.在配置路由文件中使用RouteObject钩子限制路由类型（配合ts）

组件和props的类型约束：1.定义组件函数时一般加上约束FunctionComponent 并且限制props类型 使用泛型函数2.导出组件时的性能优化使用memo钩子函数

代码片段生成：snippet-generator 生成快捷vscode模版代码
Navigate是组件 useNavigate是hook（编程式路由导航）

路由的懒加载：引入lazy 使用import（）导入组件 便于打包路由时进行分包处理 并在app入口文件导入Suspence组件配置懒加载时可能出现的错误 fallback函数进行错误处理

##

day2 1.二级路由配置 必须添加出口Outlet组件  
2.配置二级路由时如果用懒加载 也要在二级路由出口处添加Suspence 避免屏幕闪烁3.配置路由时 Link组件是切换路由的关键 起到了点击切换路由的作用

4.配置store时 为了更好的结合ts 获得state中数据类型时 使用ReturnType，TypedUseSelectorHook 等方法来限制类型 具体看index.ts/store 记住使用方法 typeof 关键字在此用法中的作用是获取 getUser 函数的类型。因为 ReturnType 期望的参数是一个“类型”而不是一个“值”。

5.区分开发环境和生产环境：webpack中存在 process.env.NODE_ENV 可区分当前环境 也可以创建.env.development文件中添加REACT_APP_BACE_URL=....来区分环境 并在react-app-env.d.ts文件中添加REACT_APP_BACE_URL=。。。来获得提示

6.采用  
styled-components 编写css样式 方法多样内容独特 详解chatgpt

##

day3:

1.通过把具有相似结构的数据放到json文件中统一处理获取来提高开发效率
2.NavLink 组件具有自动给数据添加active类的功能 也可以自己更改类名 详见文档3.使用antd组件库时出现版本不匹配导致资源加载错误 使用第三方组件库时看文档更新状态 不盲目使用4.完成每个页面的开发时 采用一个文件内全是对该页面的开发工作 如网络请求 数据管理 页面展示等等
5.useRef<ElementRef<typeof Carousel>>(null) 使用useRef获取组件时结合ts规范 用到ElementRef钩子

##

day4

1.对数据进行格式化时可以考虑将封装函数放到一个文件中 便于后续继续开发

##

day5

1.在rudux中尽量避免发送多个异步操作 如果发送的网络请求不需要传递参数 可以将其封装以提升代码的优雅度

##

day6

1.在要对一个变量进行promise操作时 ts中pomise需要传入泛型参数 promise.all 可以解决对请求操作返回数据的顺序问题解决2.在组件之间传输数据时 如果要获取网络请求数据时 返回慢 需要根据数据类型在收数据组件对数据进行默认值传递 避免系统渲染不了页面

##

day7

1.&gt;代表的是大于号
