/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.jenoratech.com.ng',
  generateRobotsTxt: true,
  // Excludes the admin dashboard and all its sub-pages from the sitemap
  exclude: ['/admin', '/admin/*'], 
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin', // Explicitly tells bots not to crawl the admin area
      },
    ],
  },
}