import { defineConfig } from 'vitepress'
import { placeholders } from './placeholders'

// Served as a GitHub project page: https://fkloosterman.github.io/ridescoredc-hackathon-2026/
export default defineConfig({
  base: '/ridescoredc-hackathon-2026/',
  title: 'RideScore DC Hackathon',
  description: 'Civic Tech DC hackathon · Sat Oct 3, 2026 · GW Science & Engineering Hall',
  cleanUrls: true,
  lastUpdated: true,
  markdown: {
    codeTransformers: [placeholders]
  },
  // Guides link to local dev servers that only exist on the reader's machine
  ignoreDeadLinks: [/^https?:\/\/localhost/],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Problem statements', link: '/problem-statements' },
      {
        text: 'Tracks',
        items: [
          { text: 'Models', link: '/tracks/models' },
          { text: 'Website / UI', link: '/tracks/website-ui' },
          { text: 'Community Research', link: '/tracks/community-research' }
        ]
      },
      { text: 'Presenting', link: '/presenting' },
      { text: 'Acknowledgements', link: '/acknowledgements' },
      { text: 'RideScore DC', link: 'https://ridescoredc.com' }
    ],
    sidebar: {
      '/': [
        { text: 'Problem statements', link: '/problem-statements' },
        {
          text: 'Models',
          link: '/tracks/models',
          collapsed: true, // expands automatically on its own pages
          items: [
            {
              text: 'Challenges',
              items: [
                { text: 'Challenge 1: Safety scores', link: '/tracks/models/challenge-1' },
                { text: 'Challenge 2: Base map', link: '/tracks/models/challenge-2' },
                { text: 'Challenge 3: Data pipeline', link: '/tracks/models/challenge-3' }
              ]
            },
            {
              text: 'Reference',
              items: [
                { text: 'Setting up your computer', link: '/tracks/models/setting-up-your-computer' },
                { text: 'Snapshot data', link: '/tracks/models/snapshot-data' },
                { text: 'Submitting your work', link: '/tracks/models/submitting-your-work' },
                { text: 'bikescore-bna', link: '/tracks/models/bikescore-bna' }
              ]
            }
          ]
        },
        {
          text: 'Website / UI',
          link: '/tracks/website-ui',
          collapsed: true,
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
                { text: 'Mini-project ideas', link: '/tracks/website-ui/project-ideas' },
                { text: 'Making website changes', link: '/tracks/website-ui/making-changes' }
              ]
            }
          ]
        },
        {
          text: 'Community Research',
          link: '/tracks/community-research',
          collapsed: true,
          items: [
            { text: 'Schedule', link: '/tracks/community-research/schedule' },
            { text: 'Activities', link: '/tracks/community-research/activities' },
            { text: 'Submitting your findings', link: '/tracks/community-research/submitting-findings' }
          ]
        },
        { text: 'Presenting', link: '/presenting' },
        { text: 'Acknowledgements', link: '/acknowledgements' }
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
