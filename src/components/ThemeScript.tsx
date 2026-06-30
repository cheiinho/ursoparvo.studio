import { THEME_STORAGE_KEY } from "@/lib/theme";

export function ThemeScript() {
  const script = `
(function () {
  var stored = localStorage.getItem("${THEME_STORAGE_KEY}");
  var dark;
  if (stored === "dark") dark = true;
  else if (stored === "light") dark = false;
  else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) dark = true;
  else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) dark = false;
  else {
    var h = new Date().getHours();
    dark = h < 6 || h >= 20;
  }
  if (dark) document.documentElement.classList.add("dark");
})();
`.trim();

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
