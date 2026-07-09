type SkipLinkProps = {
  label: string;
};

export default function SkipLink({ label }: SkipLinkProps) {
  return (
    <a href="#conteudo-principal" className="skip-link type-corpo">
      {label}
    </a>
  );
}
