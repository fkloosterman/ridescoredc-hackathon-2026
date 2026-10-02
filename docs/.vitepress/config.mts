import { defineConfig } from 'vitepress'
import { placeholders } from './placeholders'
import { taskLists } from './taskLists'

// Served as a GitHub project page: https://mattzamora.github.io/ridescoredc-hackathon-2026/
export default defineConfig({
  base: '/ridescoredc-hackathon-2026/',
  title: 'RideScore DC Hackathon',
  description: 'Civic Tech DC hackathon · Sat Oct 3, 2026 · GW Science & Engineering Hall',
  cleanUrls: true,
  lastUpdated: true,
  markdown: {
    codeTransformers: [placeholders],
    config: (md) => { md.use(taskLists) }
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
              link: '/tracks/website-ui/setting-up',
              items: [
                { text: 'Windows (WSL)', link: '/tracks/website-ui/windows-wsl' },
                { text: 'Front-End guide', link: '/tracks/website-ui/frontend-guide' },
                { text: 'Full Stack guide', link: '/tracks/website-ui/full-stack-guide' }
              ]
            },
            {
              text: 'Understanding the site',
              link: '/tracks/website-ui/understanding-the-site',
              items: [
                { text: 'How the site works', link: '/tracks/website-ui/how-the-site-works' },
                { text: 'Repository layout', link: '/tracks/website-ui/repository-layout' },
                { text: 'The data', link: '/tracks/website-ui/the-data' }
              ]
            },
            {
              text: 'Topics',
              link: '/tracks/website-ui/topics',
              collapsed: false,
              items: [
                { text: '1. Welcome first-time visitors', link: '/tracks/website-ui/topics/01-welcome-first-time-visitors' },
                { text: '2. Explain the safety score', link: '/tracks/website-ui/topics/02-explain-the-safety-score' },
                { text: '3. Make the map make sense', link: '/tracks/website-ui/topics/03-make-the-map-make-sense' },
                { text: '4. A survey that works on a phone', link: '/tracks/website-ui/topics/04-survey-on-a-phone' },
                { text: '5. Rethink route drawing', link: '/tracks/website-ui/topics/05-rethink-route-drawing' },
                { text: '6. Fix the route-selector bugs', link: '/tracks/website-ui/topics/06-fix-the-route-selector-bugs' },
                { text: '7. Riders report hazards', link: '/tracks/website-ui/topics/07-riders-report-hazards' },
                { text: '8. DC by the numbers', link: '/tracks/website-ui/topics/08-dc-by-the-numbers' },
                { text: '9. Split the page code', link: '/tracks/website-ui/topics/09-split-the-page-code' },
                { text: '10. PMTiles proof of concept', link: '/tracks/website-ui/topics/10-pmtiles-proof-of-concept' },
                { text: '11. Write a spec', link: '/tracks/website-ui/topics/11-write-a-spec' },
                { text: '12. Read-only admin page', link: '/tracks/website-ui/topics/12-read-only-admin-page' },
                { text: '13. Your own bug', link: '/tracks/website-ui/topics/13-your-own-bug' },
                { text: '14. Your own feature', link: '/tracks/website-ui/topics/14-your-own-feature' },
                { text: '15. Design a concept', link: '/tracks/website-ui/topics/15-design-a-concept' }
              ]
            },
            {
              text: 'Doing the work',
              link: '/tracks/website-ui/doing-the-work',
              items: [
                { text: 'Making website changes', link: '/tracks/website-ui/making-changes' },
                { text: 'Submitting your work', link: '/tracks/website-ui/submitting-your-work' }
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
      { icon: 'github', link: 'https://github.com/mattzamora/ridescoredc-hackathon-2026' }
    ],
    footer: {
      message: 'A Civic Tech DC project',
      copyright: 'RideScore DC Hackathon 2026'
    }
  }
})
