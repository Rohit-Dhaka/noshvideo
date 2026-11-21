const SITE_URL = "https://noshvideo.vercel.app";

const SEO = ({
  title = "Nosh Infotech | UGC Video Studio for Brands",
  description = "Nosh Infotech creates UGC videos, brand reels and product ads with professional on-camera models. Packages start from ₹5,000. Book a call today.",
  path = "/",
}) => {
  const url = `${SITE_URL}${path}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Nosh Infotech",
    url: SITE_URL,
    logo: `${SITE_URL}/Favicon.png`,
    image: `${SITE_URL}/og-image.jpg`,
    description,
    priceRange: "₹5,000+",
    areaServed: "IN",
  };

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </>
  );
};

export default SEO;