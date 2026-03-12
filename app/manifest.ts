import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NEXO",
    short_name: "NEXO",
    description: "Convert Markdown into branded, corporate-ready PDFs with an API and web UI.",
    start_url: "/",
    display: "standalone",
    background_color: "#08101c",
    theme_color: "#08101c",
    icons: [
      {
        src: "/brand/nexo_logo_primary.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/brand/nexo_logo_primary.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
