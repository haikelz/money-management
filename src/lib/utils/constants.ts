import { format } from "date-fns";
import { id } from "date-fns/locale";

export const SITE_URL = "https://money-management-123.vercel.app";
export const DEFAULT_OG_URL = "/images/og.png";
export const CONDITION = process.env.NODE_ENV;
export const CREATED_AT = format(new Date(), "cccc, dd MMMM yyyy, k:m:s", {
  locale: id,
});
