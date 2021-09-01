import globby from "globby";
import {
  getProducts,
  getCategories,
  getLookbooks,
  getBlogs,
  getArticles,
  getAllowedActions,
} from "@sirclo/nexus";
import { GRAPHQL_URI } from "lib/Constants";

const Sitemap = () => <></>;
export default Sitemap;

export async function getServerSideProps({ req, res }) {
  let pages = await globby([
    "pages/**/*.tsx",
    "!pages/**/[*.tsx",
    "!pages/*.*",
  ]);

  const languages = ["id", "en"];
  const allowedActions = await getAllowedActions(GRAPHQL_URI(req));
  const products = await getProducts(GRAPHQL_URI(req));
  const categories = await getCategories(GRAPHQL_URI(req));
  const allArticles = await getArticles(GRAPHQL_URI(req));
  const articles = allArticles?.filter(item => item.isActive === true);

  const blogs = allowedActions['BLOG_VIEW'] ? await getBlogs(GRAPHQL_URI(req)) : [];
  const lookbooks = allowedActions['LOOKBOOK_VIEW'] ? await getLookbooks(GRAPHQL_URI(req)) : [];

  if (!allowedActions['BLOG_VIEW']) {
    pages = pages.filter(page => page.includes('/blog'));
  }

  if (!allowedActions['LOOKBOOK_VIEW']) {
    pages = pages.filter(page => page.includes('/lookbook'));
  }

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
      .map((page) => {
        const path = page
          .replace("pages", "")
          .replace(".tsx", "")
          .replace(".mdx", "")
          .replace("[lng]/", "")
          .replace("/index", "");
        const route = path === "/index" ? "" : path;

        return `
        ${languages.map((lng) =>
          `
            <url>
              <loc>${`https://${req.headers.host}/${lng}${route}`}</loc>
            </url>
          `
        )}
        `.replace(",", "");
      })
      .join("")}

      ${products.map((product: any) => {
        return `
        ${languages.map((lng) =>
          `
            <url>
              <loc>${`https://${req.headers.host}/${lng}/product/${product.slug}`}</loc>
            </url>
          `
        )} 
        `.replace(",", "");
      })
      .join("")}

      ${categories.map((category: any) => {
        return `
          ${languages.map((lng) =>
          `
              <url>
                <loc>${`https://${req.headers.host}/${lng}/products/category/${category.slug}`}</loc>
              </url>
            `
        )} 
        `.replace(",", "");
      })
      .join("")}

      ${articles.map((article: any) => {
        return `
          ${languages.map((lng) =>
          `
              <url>
                <loc>${`https://${req.headers.host}/${lng}/article/${article.slug}`}</loc>
              </url>
            `
        )} 
        `.replace(",", "");
      })
      .join("")}

      ${lookbooks?.map((lookbook: any) => {
        return `
          ${languages.map((lng) =>
          `
              <url>
                <loc>${`https://${req.headers.host}/${lng}/lookbook/categories/${lookbook.slug}`}</loc>
              </url>
            `
        )} 
        `.replace(",", "");
      })
      .join("")}

      ${blogs?.map((blog: any) => {
        return `
          ${languages.map((lng) =>
          `
              <url>
                <loc>${`https://${req.headers.host}/${lng}/blog/${blog.slug}`}</loc>
              </url>
            `
        )} 
        `.replace(",", "");
      })
      .join("")}

    </urlset>
  `.trim();

  res.writeHead(200, {
    "Content-Length": Buffer.byteLength(sitemap),
    "Content-Type": "application/xml",
  });
  res.write(sitemap);
  res.end();

  return { props: {} };
}