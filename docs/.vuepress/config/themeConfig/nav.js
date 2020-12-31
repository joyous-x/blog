// nav
module.exports = [
  { text: '首页', link: '/' },
  {
    text: 'Blog', link: '/blog/',
    items: [
      { text: '算法', link: '/algorithm/' },
      { text: 'AI', link: '/ai/' },
      { 
        text: '后台',
        items: [
          { text: 'backend',  link: '/backend/' },
          { text: 'devops', link: '/devops/' },
        ]
      },
      { 
        text: '语言', link: '/lang/',
        items: [
          { text: 'Go', link: '/lang/go/' },
          { text: 'Python', link: '/lang/python/' },
          { text: 'JavaScript', link: '/lang/js/' },
        ],
      },
    ]
  },
  { 
    text: '更多', link: '/more/',
    items: [
      { text: '友情链接', link: '/friends/' },
    ]
  },
  { text: '关于', link: '/about/' },
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
      { text: '分类', link: '/categories/' },
      { text: '标签', link: '/tags/' },
      { text: '归档', link: '/archives/' },
    ],
  },
]
