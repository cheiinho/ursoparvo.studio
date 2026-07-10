import localFont from "next/font/local";

export const nudica = localFont({
  src: [
    {
      path: "../../public/fonts/nudica/nudica-regular-webfont.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/nudica/nudica-regularitalic-webfont.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/nudica/nudica-medium-webfont.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/nudica/nudica-bold-webfont.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-text",
  display: "swap",
});
