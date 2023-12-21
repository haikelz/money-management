import { MetadataRoute } from "next";

export default function Robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: "https://money-management-app.vercel.app/",
    sitemap: "https://money-management-app.vercel.app/sitemap.xml",
  };
}
