import Image from "next/image";

const SOCIALS = [
  {
    href: "https://github.com/arob3303-unc",
    src: "/Github.png",
    alt: "GitHub profile",
  },
  {
    href: "https://www.linkedin.com/in/austin-robinson-60617b296/",
    src: "/ln-pic.png",
    alt: "LinkedIn profile",
  },
];

export default function Footer() {
  return (
    <footer className="mx-auto flex max-w-[1600px] items-center justify-center gap-6 px-4 py-10">
      {SOCIALS.map(({ href, src, alt }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={alt}
          className="opacity-60 transition-opacity duration-200 hover:opacity-100"
        >
          <Image src={src} alt={alt} width={28} height={28} />
        </a>
      ))}
    </footer>
  );
}
