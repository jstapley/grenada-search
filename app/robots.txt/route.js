// app/robots.txt/route.js
export async function GET() {
  const robotsTxt = `# GrenadaSearch.com Robots.txt

User-agent: *
Allow: /

# Disallow admin and private areas
Disallow: /dashboard/
Disallow: /admin/
Disallow: /login
Disallow: /signup
Disallow: /api/
Disallow: /edit-listing/

# Sitemap location
Sitemap: https://www.grenadasearch.com/sitemap.xml
`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400'
    }
  })
}