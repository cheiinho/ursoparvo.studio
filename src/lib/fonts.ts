import { DM_Serif_Display } from "next/font/google";
import localFont from "next/font/local";

export const inter = localFont({
  src: [
    {
      path: "../../public/fonts/inter/InterVariable.ttf",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "../../public/fonts/inter/InterVariable-Italic.ttf",
      style: "italic",
      weight: "100 900",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
});
