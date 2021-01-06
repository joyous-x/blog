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
      { 
        text: 'ReadNote', link: '/blog/rnote/',
        items: [
          { text: 'Read', link: '/blog/rnote/#Read' },
          { text: 'Interview', link: '/blog/rnote/#Interview' },
          { text: 'Architecture', link: '/blog/rnote/#Architecture' },
        ],
      },
    ]
  },
  { 
    text: '更多', link: '/more/',
    items: [
      { text: '关于', link: '/more/about/' },
      { text: '友情链接', link: '/more/friends/' },
      { 
        text: '收藏', link: '/more/favorites/',
        items: [
          { text: '网站', link: '/more/favorites/网站/' },
          { text: '资源', link: '/more/favorites/资源/' },
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
