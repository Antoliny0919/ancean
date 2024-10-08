import Head from 'next/head';
import React, { useEffect } from 'react';
import { server } from '@/api/client';
import BannerMain from '@/components/home/BannerMain';
import Section from '@/components/home/Section';
import { HOME_SECTION_DATA } from '@/components/home/data';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function Home({
  categories,
  posts: { popularWriting, latestPosts },
}) {
  // data for each section
  const sectionProps = {
    popularWriting: { posts: popularWriting },
    topCategories: { categories: categories },
    latestPosts: { posts: latestPosts },
  };

  useEffect(() => {
    let div = document.querySelectorAll('.fade-in-slide-down-suspend');
    let observer = new IntersectionObserver(
      (e) => {
        e.forEach((item) => {
          if (item.isIntersecting) {
            // if the components assigned the class(.fade-in-slide-down-suspend)
            // are shown on the screen, the style below applies
            item.target.style.opacity = '1';
            item.target.style.transform = 'translateY(0px)';
          }
        });
      },
      { threshold: 0 },
    );
    div.forEach((item) => {
      observer.observe(item);
    });
  });

  return (
    <>
      <Head>
        <title>AnCean</title>
        <meta
          name="description"
          content="Welcome to AnCean(Antoliny Ocean), This website stores Antoliny experiences"
        />
      </Head>
      <BannerMain />
      {Object.keys(HOME_SECTION_DATA).map((section, index) => {
        let sectionData = HOME_SECTION_DATA[section];
        return (
          <Section key={index} sectionHeaderProps={sectionData.headerProps}>
            {sectionData.component({ ...sectionProps[section] })}
          </Section>
        );
      })}
    </>
  );
}

export const getStaticProps = async () => {
  const queries = {
    popularWriting: 'ordering=-wave&limit=10',
    latestPosts: 'ordering=-created_at&limit=3',
  };
  let posts = {};

  for (const [section, query] of Object.entries(queries)) {
    const response = await server.get(`/api/posts/?${query}`);
    const { results } = response.data;
    posts = { ...posts, [section]: results };
  }
  const response = await server.get(
    `/api/category/?ordering=-post_count&limit=7`,
  );
  const data = await response.data;
  const categories = data.results;

  return { props: { categories, posts }, revalidate: 3 };
};
