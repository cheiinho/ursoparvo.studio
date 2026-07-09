import Image from "next/image";
import PublicFooter from "@/components/PublicFooter";
import SkipLink from "@/components/SkipLink";
import { BEAR_LOGO } from "@/constants/bear";
import { SITE } from "@/content/site";

type PublicShellProps = {
  children: React.ReactNode;
};

export default function PublicShell({ children }: PublicShellProps) {
  return (
    <div className="shell">
      <SkipLink />
      <header className="site-header">
        <div className="site-container">
          <Image
            src={BEAR_LOGO.src}
            alt={SITE.nameShort}
            width={BEAR_LOGO.width}
            height={BEAR_LOGO.height}
            className="site-header__logo"
            priority
          />
        </div>
      </header>
      <main id="conteudo-principal" className="shell-main">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}
