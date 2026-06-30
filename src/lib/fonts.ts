import localFont from "next/font/local";

export const sohne = localFont({
  src: [
    {
      path: "../../public/fonts/sohne/sohne-buch.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/sohne/sohne-halbfett.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/sohne/sohne-dreiviertelfett.woff",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-sohne",
  display: "swap",
});
