import { categories } from "../data/categories";
import { brands } from "../data/brands";
import { cataloguePDF } from "../lib/catalogue-file";
import HeaderMenu from "../components/HeaderMenu";
import "./globals.css";
import { origin } from "../lib/site";
import { whatsapp } from "../lib/site";
import { contacts } from "../data/contacts";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": origin + "/#organization",
              name: contacts.company,
              url: origin,
              logo: origin + "/images/logo-header-original.jpg",
              telephone: contacts.telephone,
              email: contacts.sales,
              sameAs: [contacts.instagram, contacts.facebook],
              location: contacts.location,
            }).replace(/</g, "\\u003c"),
          }}
        />
        <a className="skip" href="#main">
          Skip to content
        </a>
        <header>
          <a href="/" aria-label="YAYBMT home">
            <img
              className="logo"
              src="/images/logo-footer-original.png"
              alt="Yusuf Al Yousfi Building Materials Trading LLC"
            />
          </a>
          <HeaderMenu
            categories={categories
              .filter(
                (c) => !c.slug.includes("/") && c.slug !== "uncategorized",
              )
              .map(({ slug, name }) => ({ slug, name }))}
            brands={brands.map(({ slug, name }) => ({ slug, name }))}
          />
        </header>
        {children}
        <footer id="contact">
          <div>
            <img
              className="logo"
              src="/images/logo-footer-original.png"
              alt="Yusuf Al Yousfi Building Materials Trading LLC"
            />
            <p>
              Building connections.
              <br />
              Supplying possibilities.
            </p>
          </div>
          <div>
            <h2>Let’s talk about your project.</h2>
            <a href={"mailto:" + contacts.sales}>{contacts.sales}</a>
            <a href={"mailto:" + contacts.info}>{contacts.info}</a>
            <a href={contacts.telephoneHref}>{contacts.telephone}</a>
            <a href={contacts.maps}>{contacts.location}</a>
          </div>
          <div className="social">
            <a aria-label="Instagram" href={contacts.instagram}>
              <img src="/images/icons/instagram.svg" alt="" />
            </a>
            <a aria-label="Facebook" href={contacts.facebook}>
              <img src="/images/icons/facebook.svg" alt="" />
            </a>
          </div>
          <nav className="footer-navigation" aria-label="Footer navigation">
            <a href="/shop/">Catalogue</a>
            <a href={cataloguePDF.href} download={cataloguePDF.filename}>
              Original catalogue (PDF)
            </a>
            <a href="/brands/">Brands</a>
            <a href="/categories/">Categories</a>
            <a href="/brand/marine-locks/">Marine locks</a>
            <a href="/about-us/">Company</a>
            <a href="/blog/">Articles</a>
            <a href="/contact-us/">Contact</a>
          </nav>
          <p className="footer-note">YAYBMT · Review edition</p>
        </footer>
        <a
          className="floating"
          href={whatsapp()}
          aria-label="Enquire on WhatsApp"
        >
          <img src="/images/icons/whatsapp.svg" alt="" />
        </a>
      </body>
    </html>
  );
}
