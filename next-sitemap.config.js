/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.jenoratech.com.ng',
  generateRobotsTxt: true,
  // Ensures the sitemap is placed in the public folder so the URL works
  outDir: 'public', 
  // Keeps sitemaps organized by splitting them if they get too large
  sitemapSize: 7000,
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
    additionalSitemaps: [
      'https://www.jenoratech.com.ng/sitemap.xml',
      'https://www.jenoratech.com.ng/sitemap-0.xml',
    ],
  },
}