// nav
module.exports = [
  { text: '首页', link: '/' },
  {
    text: 'Blog', link: '/blog/',
    items: [
      { text: 'Algorithm', link: '/blog/algorithm/' },
      { text: 'Design', link: '/blog/design/' },
      { text: 'Network', link: '/blog/network/' },
      { text: 'Database', link: '/blog/database/' },
      { text: 'DevOps', link: '/blog/devops/' },
      { text: 'Explore', link: '/blog/explore/' },
      { 
        text: '语言', link: '/blog/lang/',
        items: [
          { text: 'Go', link: '/blog/lang/#Golang' },
          { text: 'Python', link: '/blog/lang/#Python' },
          { text: 'JavaScript', link: '/blog/lang/#js' },
        ],
      },
      { text: 'ReadNote', link: '/blog/rnote/' },
    ]
  },
  { 
    text: '更多', link: '/more/',
    items: [
      { text: '关于', link: '/more/about.md' },
      { text: '友情链接', link: '/more/friends/' },
    ]
  },
  {
    text: '收藏',
    link: '/fav/',
    // 说明：以下所有link的值只是在相应md文件定义的永久链接（不是什么特殊生成的编码）。另外，注意结尾是有斜杠的
    items: [
      { text: '网站', link: '/fav/beb6c0bd8a66cea6/' },
      { text: '资源', link: '/fav/eee83a9211a70f9d/' },
    ],
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
