import { Archivo } from "next/font/google";

export const archivo = Archivo({
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});
