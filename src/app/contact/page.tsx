import Container from "@/components/Container";
import Link from "next/link";
import { STUDIO } from "@/lib/config";

/* -------------------- OFFICIAL BRAND SVG ICONS -------------------- */

const InstagramIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5z"/>
    <path d="M12 7a5 5 0 1 1 0 10a5 5 0 0 1 0-10zm0 1.5A3.5 3.5 0 1 0 12 16a3.5 3.5 0 0 0 0-7zm4.75-2.88a1.12 1.12 0 1 1-2.25 0a1.12 1.12 0 0 1 2.25 0z"/>
  </svg>
);

const SnapchatIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2c2.42 0 4.33 2.02 4.33 4.51v.57c0 .27.2.51.46.55c2.49.4 3.62 2.43 3.62 3.82c0 .48-.31.88-.8.98c-.36.08-.74.12-1.13.17c-.38.05-.79.1-1.17.18c-.24.05-.39.19-.39.37c0 .16.11.31.22.46c.13.17.27.35.37.54c.18.34.05.76-.29.93c-.69.34-1.45.58-2.24.72c-.19.04-.38.07-.58.1c-.19.03-.31.1-.4.25c-.51.83-1.7 1.46-2.94 1.46h-.01c-1.25 0-2.44-.63-2.95-1.46c-.09-.15-.21-.22-.39-.25c-.2-.03-.39-.06-.58-.1c-.79-.14-1.55-.38-2.24-.72a.77.77 0 0 1-.29-.93c.1-.19.24-.37.37-.54c.12-.15.22-.3.22-.46c0-.18-.15-.32-.39-.37c-.38-.08-.79-.13-1.17-.18c-.39-.05-.77-.09-1.13-.17c-.49-.1-.8-.5-.8-.98c0-1.39 1.13-3.42 3.62-3.82c.26-.04.46-.28.46-.55v-.57C7.67 4.02 9.58 2 12 2h.04z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg width="26" height="26" viewBox="0 0 48 48" fill="currentColor">
    <path d="M34.52 10.1c-1.35-1.42-2.18-3.3-2.18-5.38h-5.01v25.32c0 3.1-2.52 5.62-5.62 5.62s-5.62-2.52-5.62-5.62c0-3.1 2.52-5.62 5.62-5.62c.62 0 1.22.1 1.78.29v-5.2a10.65 10.65 0 0 0-1.78-.14a10.8 10.8 0 1 0 10.8 10.8V18.5c2 1.41 4.44 2.24 7.05 2.24v-5.01c-2.62 0-5.05-1.08-6.84-2.85z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12a10 10 0 1 0-11.5 9.87v-6.99H8v-2.88h2.5V9.41c0-2.47 1.47-3.84 3.73-3.84c1.08 0 2.22.2 2.22.2v2.44h-1.25c-1.23 0-1.61.77-1.61 1.56v1.87H16.9l-.46 2.88h-2.57v6.99A10 10 0 0 0 22 12"/>
  </svg>
);

/* -------------------- PAGE -------------------- */

export default function ContactPage() {
  return (
    <div className="py-20 animate-fade-in">
      <Container>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Contact Us</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            The best way to start is to send a booking request. For general questions, reach us via email, phone, or Instagram.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">

          {/* Contact Card */}
          <div className="rounded-xl border border-white/10 p-8 bg-white/5 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-white mb-6">Get in Touch</h2>

            <div className="space-y-5">
              {STUDIO.phone && (
                <a href={`tel:${STUDIO.phone}`} className="flex items-center space-x-3 text-white/90 hover:text-white">
                  <span className="w-6 h-6">📞</span>
                  <span>{STUDIO.phone}</span>
                </a>
              )}

              {STUDIO.email && (
                <a href={`mailto:${STUDIO.email}`} className="flex items-center space-x-3 text-white/90 hover:text-white">
                  <span className="w-6 h-6">✉️</span>
                  <span>{STUDIO.email}</span>
                </a>
              )}

              <div className="flex items-center space-x-3 text-white/90">
                <span className="w-6 h-6">📍</span>
                <div>
                  <p>{STUDIO.address}</p>
                  <p>{STUDIO.city}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Card */}
          <div className="rounded-xl border border-white/10 p-8 bg-white/5 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-white mb-6">Follow Us</h2>

            <div className="space-y-5">

              <a href={STUDIO.instagram} target="_blank" rel="noopener noreferrer"
                 className="flex items-center space-x-4 text-white/90 hover:text-white">
                <InstagramIcon />
                <span>Instagram</span>
              </a>

              {STUDIO.snapchat && (
                <a href={STUDIO.snapchat} target="_blank" rel="noopener noreferrer"
                   className="flex items-center space-x-4 text-white/90 hover:text-white">
                  <SnapchatIcon />
                  <span>Snapchat</span>
                </a>
              )}


              {STUDIO.facebook && (
                <a href={STUDIO.facebook} target="_blank" rel="noopener noreferrer"
                   className="flex items-center space-x-4 text-white/90 hover:text-white">
                  <FacebookIcon />
                  <span>Facebook</span>
                </a>
              )}

            </div>

            <div className="mt-8">
              <Link
                href="/booking"
                className="inline-block rounded-lg bg-white text-black px-6 py-3 text-sm font-medium hover:bg-gray-100 transition"
              >
                Book Your Tattoo
              </Link>
            </div>
          </div>
        </div>

      </Container>
    </div>
  );
}
