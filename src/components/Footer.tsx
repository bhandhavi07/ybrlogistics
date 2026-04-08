import Image from "next/image";
import Link from "next/link";

const footerExplore = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/quote", label: "Get a Quote" },
  { href: "/feedback", label: "Leave Feedback" },
];

const footerLegal = [
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="siteFooter">
      <div className="container">
        <div className="siteFooterGrid">
          <div className="siteFooterBrand">
            <Link href="/" className="siteFooterLogoLink" aria-label="YBR Logistics home">
              <Image
                src="/logo.png"
                alt="YBR Logistics"
                width={160}
                height={95}
                sizes="140px"
                className="siteFooterLogo"
              />
            </Link>
            <p className="siteFooterTagline">
              <strong>YBR Logistics</strong>
              <br />
              24240 Nora Cir, Hayward, CA 94545
              <br />
              <a href="tel:+14083669696" className="siteFooterPhone">
                (408) 366-9696
              </a>
              <br />
              <a href="mailto:Sandeep@ybrlogistics.com" className="siteFooterPhone">
                Sandeep@ybrlogistics.com
              </a>
              <br />
              <a href="https://www.ybrlogistics.com" className="siteFooterPhone" rel="noopener noreferrer">
                www.ybrlogistics.com
              </a>
            </p>
            <p className="siteFooterSupport">
              Licensed and insured service provider for moving, freight coordination, and last-mile delivery.
            </p>
            <div className="siteFooterSocial" aria-label="Social">
              <a
                href="https://www.linkedin.com/"
                className="siteFooterSocialLink"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden>
                  <path
                    fill="currentColor"
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/"
                className="siteFooterSocialLink"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden>
                  <path
                    fill="currentColor"
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="siteFooterCol">
            <div className="siteFooterHeading">Explore</div>
            <ul className="siteFooterLinks">
              {footerExplore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} prefetch={false} className="siteFooterLink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="siteFooterCol">
            <div className="siteFooterHeading">Legal</div>
            <ul className="siteFooterLinks">
              {footerLegal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} prefetch={false} className="siteFooterLink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="siteFooterBar">
        <div className="container siteFooterBarInner">
          <span>© {year} YBR Logistics. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
