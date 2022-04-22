import { getServerSideSitemap } from 'next-sitemap';
import { ISitemapField } from 'next-sitemap/dist/@types/interface';

import { GetServerSideProps } from 'next';

import { getAllPosts } from '../../lib/api';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  const topPageFields = [
    {
      loc: `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1,
    } as ISitemapField,
  ];

  const posts = getAllPosts(['slug', 'date']);
  const postFields = posts.map((post) => {
    return {
      loc: `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/posts/${post.slug}`,
      lastmod: post.date || new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.7,
    } as ISitemapField;
  });

  const fields = topPageFields.concat(postFields);

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
