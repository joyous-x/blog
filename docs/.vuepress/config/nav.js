// nav
module.exports = [
    { text: '首页', link: '/' },
    {
        text: 'Blog',
        link: '/blog/',
        items: [{
                text: '语言',
                link: '/blog/lang/',
                items: [
                    { text: 'Language', link: '/blog/lang/' },
                ],
            },
            {
                text: '设计',
                link: '/blog/design/',
                items: [
                    { text: 'Design', link: '/blog/design/' },
                ],
            },
            {
                text: '网络',
                link: '/blog/network/',
                items: [
                    { text: 'Network', link: '/blog/network/' },
                ],
            },
            {
                text: '数据库',
                link: '/blog/database/',
                items: [
                    { text: 'Database', link: '/blog/database/' },
                ],
            },
            {
                text: '平台',
                link: '/blog/platform/',
                items: [
                    { text: 'Platform', link: '/blog/platform/' },
                ],
            },
            {
                text: '技能',
                link: '/blog/skills/',
                items: [
                    { text: 'Devops', link: '/blog/skills/##Devops' },
                    { text: 'AI', link: '/blog/skills/##Ai' },
                ],
            },
            {
                text: '应用',
                link: '/blog/utilization/',
                items: [
                    { text: 'Utilization', link: '/blog/utilization/' },
                ],
            },
            {
                text: '杂项',
                link: '/blog/utility/',
                items: [
                    { text: 'ReadNote', link: '/blog/utility/##Rnote' },
                    { text: 'Tools', link: '/blog/utility/##Tools' },
                ],
            },
        ]
    },
    {
        text: '更多',
        link: '/more/',
        items: [
            { text: '关于', link: '/more/about/' },
            { text: '友情链接', link: '/more/friends/' },
            {
                text: '收藏',
                link: '/more/favorites/',
                items: [
                    { text: 'favorites', link: '/more/favorites/' },
                ],
            },
        ]
    },
    {
        text: '索引',
        link: '/index/',
        items: [
            { text: '分类', link: '/index/categories/' },
            { text: '标签', link: '/index/tags/' },
            { text: '归档', link: '/index/archives/' },
        ],
    },
]