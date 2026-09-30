import { defineConfig } from 'vitepress'

// Served as a GitHub project page: https://fkloosterman.github.io/ridescoredc-hackathon-2026/
export default defineConfig({
  base: '/ridescoredc-hackathon-2026/',
  title: 'RideScore DC Hackathon',
  description: 'Civic Tech DC hackathon · Sat Oct 3, 2026 · GW Science & Engineering Hall',
  cleanUrls: true,
  lastUpdated: true,
  // Guides link to local dev servers that only exist on the reader's machine
  ignoreDeadLinks: [/^https?:\/\/localhost/],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Tracks',
        items: [
          { text: 'Website / UI', link: '/tracks/website-ui' },
          { text: 'Bike Safety Models', link: '/tracks/models' },
          { text: 'Community Research', link: '/tracks/community-research' }
        ]
      },
      { text: 'RideScore DC', link: 'https://ridescoredc.com' }
    ],
    sidebar: {
      '/tracks/website-ui': [
        {
          text: 'Website / UI',
          link: '/tracks/website-ui',
          items: [
            {
              text: 'Setting up',
              items: [
                { text: 'Windows (WSL)', link: '/tracks/website-ui/windows-wsl' },
                { text: 'Front-End guide', link: '/tracks/website-ui/frontend-guide' },
                { text: 'Full Stack guide', link: '/tracks/website-ui/full-stack-guide' }
              ]
            },
            {
              text: 'Understanding the site',
              items: [
                { text: 'How the site works', link: '/tracks/website-ui/how-the-site-works' },
                { text: 'Repository layout', link: '/tracks/website-ui/repository-layout' },
                { text: 'The data', link: '/tracks/website-ui/the-data' }
              ]
            },
            {
              text: 'Doing the work',
              items: [
                { text: 'Project ideas', link: '/tracks/website-ui/project-ideas' },
                { text: 'Making website changes', link: '/tracks/website-ui/making-changes' }
              ]
            }
          ]
        }
      ],
      '/tracks/': [
        {
          text: 'Choose your track',
          items: [
            { text: 'Website / UI', link: '/tracks/website-ui' },
            { text: 'Bike Safety Models', link: '/tracks/models' },
            { text: 'Community Research', link: '/tracks/community-research' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/fkloosterman/ridescoredc-hackathon-2026' }
    ],
    footer: {
      message: 'A Civic Tech DC project',
      copyright: 'RideScore DC Hackathon 2026'
    }
  }
})
