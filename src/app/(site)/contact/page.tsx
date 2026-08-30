import { Mail, MessageCircle, Phone } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { MarketText } from "@/components/market-text";
import { Dock } from "@/components/ui/dock";
import { RfqForm } from "@/components/rfq-form";

function LinkedinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.5h4.5V23h-4.5V8.5zm7.5 0h4.32v1.98h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V23h-4.5v-6.9c0-1.65-.03-3.78-2.3-3.78-2.3 0-2.66 1.8-2.66 3.66V23h-4.5V8.5z" />
    </svg>
  );
}

const dockItems = [
  { label: "Email", href: "mailto:suparsh@shreyansagricon.com", icon: <Mail size={22} /> },
  { label: "WhatsApp", href: "https://wa.me/919810490896", icon: <MessageCircle size={22} /> },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/suparsh-patni-shreyans/", icon: <LinkedinIcon /> },
  { label: "Call", href: "tel:+919810490896", icon: <Phone size={22} /> },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="CONTACT" title="Send us your part.">
        <MarketText
          dom="Domestic enquiries are answered within 2 business days."
          intl="Share your drawing and target volumes and we'll come back with an export sourcing plan."
        />
      </PageHeader>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 flex justify-center">
          <Dock items={dockItems} />
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <div className="mb-3 font-mono text-xs font-bold tracking-[0.16em] text-muted">REQUEST FOR QUOTE</div>
            <h2 className="font-heading mb-4 text-2xl font-bold text-ink">Send us your part details</h2>
            <RfqForm />
          </div>

          <div>
            <div className="mb-3 font-mono text-xs font-bold tracking-[0.16em] text-muted">REACH US</div>
            <dl className="mb-6">
              <dt className="mt-4 font-mono text-[11px] tracking-[0.13em] text-muted">WORKS</dt>
              <dd className="mt-1 text-ink">F 4 &amp; 5, FIT, Sector 57, Faridabad 121004, Haryana, India</dd>
              <dt className="mt-4 font-mono text-[11px] tracking-[0.13em] text-muted">SUPARSH PATNI</dt>
              <dd className="mt-1 text-ink">
                +91 98104 90896 · <span className="text-muted">suparsh@shreyansagricon.com</span>
              </dd>
              <dt className="mt-4 font-mono text-[11px] tracking-[0.13em] text-muted">AMIT SINGLA</dt>
              <dd className="mt-1 text-ink">
                +91 99990 20620 · <span className="text-muted">amit@shreyansagricon.com</span>
              </dd>
            </dl>
            <iframe
              className="mb-6 h-[300px] w-full rounded-xl border border-line"
              title="Map to Shreyans Agricon"
              loading="lazy"
              src="https://maps.google.com/maps?q=Shreyans+Agricon,+F+4,+FIT,+Sector+57,+Faridabad,+Haryana+121004&ll=28.3191858,77.2936695&z=17&output=embed"
            />
          </div>
        </div>
      </section>
    </>
  );
}
