import Link from "next/link";

type NyakaLogoProps = {
  href?: string;
  className?: string;
  size?: "sm" | "md";
};

export function NyakaLogo({
  href = "/",
  className = "",
  size = "sm",
}: NyakaLogoProps) {
  const imgClass =
    size === "md"
      ? `h-10 w-auto ${className}`
      : `h-8 w-auto lg:h-9 ${className}`;

  const content = (
    <img
      src="/nyaka-logo.png?v=4"
      alt="NYAKA"
      className={`${imgClass} object-contain object-left`}
    />
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label="NYAKA — accueil" className="inline-flex shrink-0">
      {content}
    </Link>
  );
}
