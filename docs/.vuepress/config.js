const head = require('./config/head.js');
const plugins = require('./config/plugins.js');
const themeConfig = require('./config/themeConfig.js');

module.exports = {
    theme: 'vdoing', // 使用依赖包主题
    // theme: require.resolve('../../theme-vdoing'), // 使用本地主题

    title: "Jiao's Blog",
    description: '知行合一 --- 技术博客，代码中的点点滴滴',
    base: '/', // 格式：'/<仓库名>/'， 默认'/'
    markdown: {
        lineNumbers: true, // 代码行号
        extendMarkdown: md => {
            md.use(require('markdown-it-katex')); // 引入 katex，需要在 head 中注入 katex.min.css、github-markdown.css
        }
    },

    head,
    plugins,
    themeConfig,
}