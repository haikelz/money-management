import { MetadataRoute } from "next";

export default function Robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: "https://money-management-123.vercel.app/",
    sitemap: "https://money-management-123.vercel.app/sitemap.xml",
  };
}
