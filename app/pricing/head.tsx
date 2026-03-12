import { getSiteUrl } from "@/lib/site-metadata";

const title = "Pricing and waitlist for NEXO";
const description =
  "Explore NEXO pricing direction, join the waitlist, and see how the platform is evolving from Markdown-to-PDF automation into richer engineering workflows.";
const siteUrl = getSiteUrl();

export default function Head() {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${siteUrl}/pricing`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${siteUrl}/pricing`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  );
}
