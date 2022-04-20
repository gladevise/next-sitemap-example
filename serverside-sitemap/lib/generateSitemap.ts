import { getAllPosts } from './api';

const generateSitemapXml = async () => {
  const topPageFields = [
    {
      path: '',
      lastmod: new Date().toISOString(),
    },
  ];

  const posts = getAllPosts(['slug', 'date']);
  const postFields = posts.map((post) => {
    return {
      path: `/posts/${post.slug}`,
      lastmod: post.date || new Date().toISOString(),
    };
  });

  const fields = topPageFields.concat(postFields);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  fields.forEach((post) => {
    const url = new URL(
      post.path,
      `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}`
    );

    xml += `
      <url>
        <loc>${url.toString().replace(/\/$/, '')}</loc>
        <lastmod>${post.lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>
    `;
  });

  xml += `</urlset>`;

  return xml;
};

export default generateSitemapXml;
