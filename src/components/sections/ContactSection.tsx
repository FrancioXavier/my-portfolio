import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { CyberpunkButton } from '@/components/ui/CyberpunkButton';
import { ContactForm } from '@/features/contact';

export function ContactSection() {
  return (
    <section id="contact" className="py-[calc(80px+4rem)] pb-[5rem] border-t border-border mt-10 overflow-x-hidden">
      <div className="max-w-[1320px] mx-auto px-[clamp(1.25rem,5vw,4rem)] w-full">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="font-mono text-[0.68rem] tracking-[0.22em] uppercase text-accent mb-4">
              END_OF_FILE
            </div>
            <h2 className="font-mono text-[3rem] leading-[1] tracking-[0.05em] text-fg drop-shadow-[0_0_20px_var(--color-glow-c)] mb-6">
              CONNECT
            </h2>
            <p className="text-muted font-body text-[1rem] max-w-[500px] mx-auto">
              Currently open for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">

            <div className="order-2 lg:order-1 flex flex-col gap-8 text-left">
              <div>
                <h3 className="font-mono text-[1.2rem] text-accent mb-6 uppercase tracking-[0.2em] italic font-bold">
                  {"// EXTERNAL_LINKS"}
                </h3>
                <div className="flex flex-col gap-4">
                  <CyberpunkButton href="mailto:contato.francio@gmail.com" variant="ghost" className="w-full sm:w-max">
                    EXECUTE: EMAIL
                  </CyberpunkButton>
                  <CyberpunkButton href="https://linkedin.com/in/francio-xavier" variant="ghost" className="w-full sm:w-max">
                    LINKEDIN_STATION
                  </CyberpunkButton>
                  <CyberpunkButton href="https://github.com/francioxavier" variant="ghost" className="w-full sm:w-max">
                    SOURCE_CODE_REPO
                  </CyberpunkButton>
                </div>
              </div>

              <div className="p-6 bg-surface-2/20 border-l-2 border-accent/30 font-mono text-[0.8rem] text-muted leading-loose backdrop-blur-sm">
                <p className="mb-2">&gt; ESTABLISHING_LINK...</p>
                <p>&gt; RESPONSE_TIME: &lt; 24H</p>
                <p>&gt; LOCATION: REMOTE // BRAZIL</p>
                <p className="mt-4 animate-pulse opacity-50 font-bold">READY_FOR_HANDSHAKE_</p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <ContactForm />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
