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

export const pangaia = localFont({
  src: [
    {
      path: "../../public/fonts/pangaia/PPPangaia-Ultralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/pangaia/PPPangaia-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/pangaia/PPPangaia-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--font-pangaia",
  display: "swap",
});
