"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

function navLinkActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href;
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`siteHeader${scrolled ? " siteHeader--scrolled" : ""}`}>
      <div className="container siteHeaderInner">
        <Link href="/" className="siteHeaderBrand" aria-label="YBRLogistics home">
          <Image
            src="/logo.png"
            alt=""
            width={180}
            height={107}
            priority
            sizes="(max-width: 640px) 160px, 200px"
            className="siteHeaderLogo"
          />
          <span className="siteHeaderWordmark">
            <span className="siteHeaderWordmarkYbr">YBR</span>
            <span className="siteHeaderWordmarkRest">Logistics</span>
          </span>
        </Link>

        <button
          type="button"
          className="siteHeaderMenuBtn"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="srOnly">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span aria-hidden className="siteHeaderMenuIcon">
            {menuOpen ? "✕" : "☰"}
          </span>
        </button>

        <nav id="site-nav" className={`siteNav ${menuOpen ? "siteNavOpen" : ""}`} aria-label="Primary">
          <ul className="siteNavList">
            {navItems.map((item) => {
              const active = navLinkActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    prefetch={false}
                    className={`siteNavLink${active ? " siteNavLink--active" : ""}`}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="siteNavCtaItem">
              <Link
                href="/quote"
                prefetch={false}
                className="btn btn-primary siteNavQuoteBtn"
                onClick={() => setMenuOpen(false)}
              >
                Get a Quote
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="siteServiceAreaBar" role="note" aria-label="Service area">
        Serving Bay Area / California
      </div>
    </header>
  );
}
