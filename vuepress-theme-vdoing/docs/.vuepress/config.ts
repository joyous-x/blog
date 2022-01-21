import { resolve } from 'path'
import { defineConfig4CustomTheme } from 'vuepress/config'
import { VdoingThemeConfig } from 'vuepress-theme-vdoing/types'
import dayjs from 'dayjs'
import htmlModules from './config/htmlModules' // 自定义插入的html块
import nav from './config/nav'

export default defineConfig4CustomTheme<VdoingThemeConfig>({
    theme: 'vdoing', // 使用依赖包主题
    // theme: require.resolve('../../theme-vdoing'), // 使用本地主题

    locales: {
        '/': {
            lang: 'zh-CN',
            title: "Jiao's Blog",
            description: '知行合一 --- 技术博客，代码中的点点滴滴',
        }
    },
    base: '/', // 默认'/'。如果你想将你的网站部署到如 https://foo.github.io/bar/，那么 base 应该被设置成 "/bar/",（否则页面将失去样式等文件）
    
    markdown: {
        lineNumbers: true, // 代码行号
        extendMarkdown: md => {
            md.use(require('markdown-it-katex')); // 引入 katex，需要在 head 中注入 katex.min.css、github-markdown.css
        }
    },

    head: [
        // 注入到页面<head> 中的标签，格式[tagName, { attrName: attrValue }, innerHTML?]
        ['link', { rel: 'icon', href: '/img/favicon.ico' }],
        // katex : start
        ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css' }],
        ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css' }],
        // katex : end
        [
            'meta',
            {
                name: 'keywords',
                content: '博客,全栈,技术文档,学习,面试,Go,C/C++,Python,Markdown',
            },
        ],
        ['meta', { name: 'theme-color', content: '#11a8cd' }], // 移动浏览器主题颜色
        [
            'script',
            {
                'data-ad-client': 'ca-pub-782833372599355',
                async: 'async',
                src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
            },
        ], // 网站关联Google AdSense 与 html格式广告支持
    ],

    themeConfig: {
        nav: nav,
        sidebarDepth: 2, // 侧边栏显示深度，默认1，最大2（显示到h3标题）
        logo: '/img/web_logo.png', // 导航栏logo
        repo: 'joyous-x/blog', // 导航栏右侧生成Github链接
        searchMaxSuggestions: 10, // 搜索结果显示最大数
        lastUpdated: '上次更新', // 开启更新时间，并配置前缀文字   string | boolean (取值为git提交时间)
        docsDir: 'docs', // 编辑的文件夹
        editLinks: false, // 启用编辑
        editLinkText: '编辑',

        //*** Vdoing主题相关配置，文档：https://doc.xugaoyi.com/pages/a20ce8/ ***//

        sidebar: 'structuring', // 侧边栏  'structuring' | { mode: 'structuring', collapsable: Boolean} | 'auto' | 自定义    温馨提示：目录页数据依赖于结构化的侧边栏数据，如果你不设置为'structuring',将无法使用目录页

        author: {
            // 文章默认的作者信息，可在md文件中单独配置此信息 String | {name: String, link: String}
            name: 'Jiao', // 必需
            link: 'https://github.com/joyous-x', // 可选的
        },
        blogger: {
            // 博主信息，显示在首页侧边栏
            avatar: '/img/avatar.png',
            name: 'Jiao',
            slogan: '知行合一',
        },
        social: {
            // 社交图标，显示于博主信息栏和页脚栏
            // iconfontCssFile: '//at.alicdn.com/t/font_1678482_u4nrnp8xp6g.css', // 可选，阿里图标库在线css文件地址，对于主题没有的图标可自由添加
            icons: [
            {
                iconClass: 'icon-youjian',
                title: '发邮件',
                link: 'mailto:929843628@qq.com',
            },
            {
                iconClass: 'icon-github',
                title: 'GitHub',
                link: 'https://github.com/joyous-x',
            },
            {
                iconClass: 'icon-erji',
                title: '听音乐',
                link: 'https://music.163.com',
            },
            ],
        },
        footer: {
            // 页脚信息
            createYear: 2020, // 博客创建年份
            copyrightInfo:
            'Jiao | <a href="https://github.com/joyous-x/blog/blob/master/LICENSE" target="_blank">MIT License</a>', // 博客版权信息，支持a标签
        },
        htmlModules // 插入hmtl(广告)模块
    },
    
    plugins: {
        // 导入本地插件（供学习参考）
        // [resolve(__dirname, './plugins/love-me')]: { // 鼠标点击爱心特效
        //   color: '#11a8cd', // 爱心颜色，默认随机色
        //   excludeClassName: 'theme-vdoing-content' // 要排除元素的class, 默认空''
        // },

        'vuepress-plugin-baidu-autopush': {}, 
        'fulltext-search': {},

        // 可以添加第三方搜索链接的搜索框（原官方搜索框的参数仍可用）
        'thirdparty-search': {
            thirdparty: [ // 可选，默认 []
                {
                    title: '在Google搜索',
                    frontUrl: 'https://www.google.com//search?q=', // 搜索链接的前面部分
                    behindUrl: '', // 搜索链接的后面部分，可选，默认 ''
                },
                {
                    title: '在Bing中搜索',
                    frontUrl: 'https://cn.bing.com/search?q=',
                },
                {
                    title: '通过百度搜索本站的',
                    frontUrl: 'https://www.baidu.com/s?wd=site%3Axugaoyi.com%20',
                },
            ],
        },

        'one-click-copy': {
            copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // String or Array
            copyMessage: '复制成功', // default is 'Copy successfully and then paste it for use.'
            duration: 1000, // prompt message display time.
            showInMobile: false, // whether to display on the mobile side, default: false.
        },
        
        // 放大图片
        'vuepress-plugin-zooming': {
            selector: '.theme-vdoing-content img:not(.no-zoom)', // not排除class是no-zoom的图片
            options: {
            bgColor: 'rgba(0,0,0,0.6)',
            },
        },

        'vuepress-plugin-comment': {
            choosen: 'gitalk',
            options: {
                clientID: '874ae7777f9ba6ae4dc8',
                clientSecret: '8c75a7494bc02652016bd5d0ccef60717a383b5d',
                repo: 'blog_comment', // GitHub 仓库
                owner: 'joyous-x', // GitHub仓库所有者
                admin: ['joyous-x'], // 对仓库有写权限的人
                // distractionFreeMode: true,
                pagerDirection: 'last', // 'first'正序 | 'last'倒序
                id: '<%- (frontmatter.permalink || frontmatter.to.path).slice(-16) %>', //  页面的唯一标识,长度不能超过50
                title: '「评论」<%- frontmatter.title %>', // GitHub issue 的标题
                labels: ['Gitalk', 'Comment'], // GitHub issue 的标签
                body: '页面：<%- window.location.origin + (frontmatter.to.path || window.location.pathname) %>', // GitHub issue 的内容
            },
        },

        '@vuepress/last-updated': {
            transformer: (timestamp, lang) => {
            return dayjs(timestamp).format('YYYY/MM/DD, HH:mm:ss')
            },
        },
        
        "vuepress-plugin-mermaidjs": {}
    },
})
