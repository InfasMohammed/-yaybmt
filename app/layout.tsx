import "./globals.css";
import { whatsapp } from "../lib/site";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
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
          <nav aria-label="Main navigation">
            <a href="/shop/">Products</a>
            <a href="/brand/daelim/">DAELIM</a>
            <a href="/brand/marine-locks/">Marine locks</a>
            <a href="/#contact">Contact</a>
          </nav>
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
            <a href="mailto:sales@yaybmt.com">sales@yaybmt.com</a>
            <a href="mailto:info@yaybmt.com">info@yaybmt.com</a>
            <a href="tel:+97142278616">+971 4 227 8616</a>
            <a href="https://www.google.com/maps?cid=10643360148458649588">
              Deira, Dubai +
            </a>
          </div>
          <div className="social">
            <a aria-label="Instagram" href="https://www.instagram.com/yaybmt/">
              <img src="/images/icons/instagram.svg" alt="" />
            </a>
            <a
              aria-label="Facebook"
              href="https://www.facebook.com/people/Yusuf-Al-Yousfi-Building-Materials-Trading-LLC/61573646427608/"
            >
              <img src="/images/icons/facebook.svg" alt="" />
            </a>
          </div>
          <p className="footer-note">
            YAYBMT · Sample review edition · Not the complete catalogue
          </p>
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
