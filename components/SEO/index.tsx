import Head from "next/head";

type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
};

const SEO = ({
  title,
  description,
  keywords,
  image,
  url
}: SEOProps) => (
  <Head>
    {title && (
      <>
        <title>{title}</title>
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="twitter:title" content={title} key="twittertitle" />
      </>
    )}
    {description && (
      <>
        <meta name="description" content={description}></meta>
        <meta property="og:description" content={description} key="ogdescription" />
        <meta property="twitter:description" content={description} key="twitterdescription" />
      </>
    )}
    {image && (
      <>
        <meta property="og:image" content={image} key="ogimage" />
        <meta property="twitter:image" content={image} key="twitterimage" />
        <meta property="twitter:card" content="summary" />
      </>
    )}
    {url && (
      <>
        <meta property="og:url" content={url} key="ogurl" />
        <meta property="twitter:url" content={url} key="twitterurl" />
      </>
    )}
    {keywords && <meta name="keyword" content={keywords}></meta>}
    <link rel="manifest" href="/manifest.json" />
  </Head>
);

export default SEO;