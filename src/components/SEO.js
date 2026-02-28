import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Open Credits';
const SITE_URL = 'https://www.opencredits.com';
const DEFAULT_DESCRIPTION =
  'Earn affordable, transferable college credits 100% online. Flexible, accredited courses designed to save time and money on your degree.';
const DEFAULT_IMAGE = '/images/og-image.svg';

const SEO = ({ title, description, keywords, canonicalPath }) => {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - Transferable College Credits Online`;
  const pageDescription = description || DEFAULT_DESCRIPTION;
  const canonicalUrl = canonicalPath ? `${SITE_URL}${canonicalPath}` : undefined;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={`${SITE_URL}${DEFAULT_IMAGE}`} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={`${SITE_URL}${DEFAULT_IMAGE}`} />
    </Helmet>
  );
};

export default SEO;
