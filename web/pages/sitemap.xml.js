import axios from 'axios';

const SitemapPage = () => {
  return null;
};

const defaultLastmode = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Seoul',
});

const DOMAIN = 'https://www.ancean.net';

const STATIC_PATH = {
  type: 'static',
  data: [
    {
      path: '/',
      priority: 1,
    },
    {
      path: '/category',
      priority: 0.9,
    },
    {
      path: '/posts',
      priority: 0.9,
    },
  ],
};

const DYNAMIC_PATH = {
  type: 'dynamic',
  data: [
    {
      path: '/category',
      key: 'name',
    },
    {
      path: '/posts?is_finish=true',
      key: 'id',
      lastmod: 'updated_at',
    },
  ],
};

const insideXMLString = (xmlContent) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${xmlContent}
    </urlset>
  `;
};

const createXmlHtml = ({ path, dynamicKey, lastmod, priority }) => {
  return `
    <url>
      <loc>https://www.ancean.net${path}${
        dynamicKey !== undefined ? `/${dynamicKey}` : ''
      }</loc>
      <lastmod>${lastmod === undefined ? defaultLastmode : lastmod}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${priority === undefined ? 0.8 : priority}</priority>
    </url>
  `;
};

const sitemapDataFactory = async ({ type, data }) => {
  let xmlUrls = [];

  if (type === 'dynamic') {
    for (const { path, key, priority, lastmod } of data) {
      const response = await axios.get(`${DOMAIN}/api${path}`);
      const data = response.data;
      xmlUrls = [
        ...xmlUrls,
        ...data.map((item) =>
          createXmlHtml({
            // Remove if query(?) exists in path
            path: path.substring(0, path.indexOf('?')),
            dynamicKey: item[key],
            lastmod: item[lastmod],
            priority: priority,
          }),
        ),
      ];
    }
  } else {
    for (const { path, priority, lastmod } of data) {
      xmlUrls = [
        ...xmlUrls,
        createXmlHtml({
          path: path,
          priority: priority,
          lastmod: lastmod,
        }),
      ];
    }
  }
  return xmlUrls;
};

SitemapPage.getInitialProps = async (ctx) => {
  const { res } = ctx;

  let pagesXML = '';

  const data = [
    ...(await sitemapDataFactory(STATIC_PATH)),
    ...(await sitemapDataFactory(DYNAMIC_PATH)),
  ];

  for (const xml of data) {
    pagesXML += xml;
  }

  const xmlContents = insideXMLString(pagesXML);

  if (res !== undefined) {
    res.setHeader('Content-Type', 'text/xml');

    res.write(xmlContents);

    res.end();
  }
  return {};
};

export default SitemapPage;
