import localFont from "next/font/local";

export const inter = localFont({
  src: [
    {
      path: "../../public/fonts/inter/Inter-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});
