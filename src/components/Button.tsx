import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "tertiary";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  loading?: boolean;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof ButtonBaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function variantClass(variant: ButtonVariant): string {
  if (variant === "primary") return "btn-primary";
  if (variant === "secondary") return "btn-secondary";
  return "btn-tertiary";
}

function isExternalHref(href: string): boolean {
  return href.startsWith("mailto:") || href.startsWith("http");
}

export default function Button({
  variant = "primary",
  loading = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `btn type-corpo ${variantClass(variant)} ${className}`.trim();
  const label = loading ? "A enviar…" : children;

  if ("href" in props && props.href !== undefined) {
    const { href, ...linkProps } = props;

    if (isExternalHref(href)) {
      return (
        <a href={href} className={classes} {...linkProps}>
          {label}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...linkProps}>
        {label}
      </Link>
    );
  }

  const { disabled, type = "button", ...buttonProps } = props;
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...buttonProps}
    >
      {label}
    </button>
  );
}
