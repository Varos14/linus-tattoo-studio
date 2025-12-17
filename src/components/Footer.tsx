import Link from "next/link";
import { STUDIO } from "@/lib/config";
import { Instagram, Mail, Phone, MapPin, Facebook, Twitter, Ghost } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16 bg-black/20">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-8 md:grid-cols-4 text-sm text-white/70">
        <div className="md:col-span-1">
          <div className="font-serif text-xl text-white">{STUDIO.name}</div>
          <p className="mt-2 text-white/80">{STUDIO.tagline}</p>
          <div className="mt-6 flex items-center gap-4">
            <a href={STUDIO.instagram} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
            {STUDIO.facebook && (
              <a href={STUDIO.facebook} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
            )}
            {STUDIO.twitter && (
              <a href={STUDIO.twitter} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            )}
            {STUDIO.snapchat && (
              <a href={STUDIO.snapchat} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                <Ghost size={20} />
              </a>
            )}
            {STUDIO.email && (
              <a href={`mailto:${STUDIO.email}`} className="text-white/60 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            )}
          </div>
        </div>
        <div className="md:col-span-1">
          <div className="text-white/90 mb-4 font-medium">Contact</div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-white/60 mt-0.5 flex-shrink-0" />
              <span>{STUDIO.address || "Add address"}, {STUDIO.city || "Add city"}</span>
            </li>
            {STUDIO.phone && (
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-white/60 flex-shrink-0" />
                <a href={`tel:${STUDIO.phone}`} className="hover:text-white transition-colors">{STUDIO.phone}</a>
              </li>
            )}
          </ul>
        </div>
        <div className="md:col-span-1">
          <div className="text-white/90 mb-4 font-medium">Services</div>
          <ul className="space-y-2">
            <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
            <li><Link href="/artists" className="hover:text-white transition-colors">Artists</Link></li>
            <li><Link href="/booking" className="hover:text-white transition-colors">Booking</Link></li>
            <li><Link href="/aftercare" className="hover:text-white transition-colors">Aftercare</Link></li>
          </ul>
        </div>
        <div className="md:col-span-1">
          <div className="text-white/90 mb-4 font-medium">Support</div>
          <ul className="space-y-2">
            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <span>© {new Date().getFullYear()} {STUDIO.name}. All rights reserved.</span>
          <div className="flex gap-6 text-white/40">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

