import { defineConfig } from 'vitepress'

// Served as a GitHub project page: https://fkloosterman.github.io/ridescoredc-hackathon-2026/
export default defineConfig({
  base: '/ridescoredc-hackathon-2026/',
  title: 'RideScore DC Hackathon',
  description: 'Civic Tech DC hackathon · Sat Oct 3, 2026 · GW Science & Engineering Hall',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'RideScore DC', link: 'https://ridescoredc.com' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/fkloosterman/ridescoredc-hackathon-2026' }
    ],
    footer: {
      message: 'A Civic Tech DC project',
      copyright: 'RideScore DC Hackathon 2026'
    }
  }
})
