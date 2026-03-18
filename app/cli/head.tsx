import { getSiteUrl } from "@/lib/site-metadata";

const title = "NEXO CLI";
const description =
  "Install the official NEXO CLI to convert Markdown files through the hosted NEXO API with centralized limits, rendering, and usage tracking.";
const siteUrl = getSiteUrl();

export default function Head() {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${siteUrl}/cli`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${siteUrl}/cli`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  );
}
