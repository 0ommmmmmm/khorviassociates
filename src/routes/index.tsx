import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Phone, PhoneCall, Mail, MapPin, MessageCircle, ArrowRight, Menu, X,
  FileCheck2, Receipt, BookOpen, Calculator, FileSpreadsheet, Handshake,
  ClipboardList, ShieldCheck, Star, Clock, BadgeCheck, Users, TrendingUp,
  Sparkles, CircleDollarSign, Building2, HeartHandshake,
  Zap, Lock, Target, CheckCircle2, CalendarClock, Timer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import heroImg from "@/assets/hero-finance.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  { icon: FileCheck2, title: "GST Registration", desc: "Quick, seamless GST registration for businesses, professionals and startups." },
  { icon: Receipt, title: "GST Return Filing", desc: "Accurate monthly, quarterly and annual GST returns filed on time, every time." },
  { icon: BookOpen, title: "Accounting & Bookkeeping", desc: "End-to-end bookkeeping with clean, audit-ready books of accounts." },
  { icon: Calculator, title: "Accounts Finalization", desc: "Year-end finalization, P&L and balance sheet preparation with precision." },
  { icon: FileSpreadsheet, title: "Income Tax Return Filing", desc: "Optimized ITR filing for individuals, professionals and businesses." },
  { icon: Handshake, title: "Partnership Deed", desc: "Professionally drafted partnership deeds and firm registrations." },
  { icon: ClipboardList, title: "Project Reports", desc: "Bank-ready project reports and CMA data for loans and funding." },
  { icon: ShieldCheck, title: "Business Compliance", desc: "Ongoing advisory to keep your business fully compliant and stress-free." },
];

const WHY_US = [
  { icon: Users, title: "Experienced Professionals", desc: "A seasoned team with deep expertise across tax and compliance." },
  { icon: Zap, title: "Quick Turnaround", desc: "Fast responses and timely delivery on every engagement." },
  { icon: CircleDollarSign, title: "Affordable Pricing", desc: "Transparent, fair pricing with no hidden charges." },
  { icon: Lock, title: "Transparent Process", desc: "Clear communication at every step of the journey." },
  { icon: BadgeCheck, title: "Accurate Documentation", desc: "Meticulous, error-free filings and paperwork." },
  { icon: HeartHandshake, title: "Dedicated Support", desc: "A single point of contact you can rely on." },
  { icon: TrendingUp, title: "Modern Financial Expertise", desc: "Up-to-date with the latest tax laws and technology." },
  { icon: Target, title: "Client First Approach", desc: "Your goals shape our advice — always." },
];

const STEPS = [
  { n: "01", title: "Contact Us", desc: "Reach out via call, WhatsApp or the contact form for a free consultation." },
  { n: "02", title: "Share Documents", desc: "Securely share the required documents through our simple checklist." },
  { n: "03", title: "Documentation & Verification", desc: "We prepare, review and verify every detail with meticulous care." },
  { n: "04", title: "Submission & Ongoing Support", desc: "We submit filings on time and stay with you for continued support." },
];

const TESTIMONIALS = [
  { name: "Rajesh Patil", role: "Business Owner, Belagavi", text: "Khorvi Associates handles our GST and accounting flawlessly. Extremely responsive and professional — genuinely feels like an extension of our team." },
  { name: "Anita Deshpande", role: "Freelance Consultant", text: "Filed my ITR effortlessly for the third year in a row. Clear guidance, fair pricing and always available when I have questions." },
  { name: "Suresh Kulkarni", role: "MD, Manufacturing Firm", text: "From partnership deed to yearly finalization, they've supported us end-to-end. Their attention to detail is unmatched in Belagavi." },
  { name: "Priya Shetty", role: "Startup Founder", text: "Helped us with GST registration and monthly compliance from day one. Made an intimidating process feel simple." },
];

const FAQS = [
  { q: "How long does GST Registration take?", a: "For most businesses, GST registration is completed within 3–7 working days once all documents are provided. We handle the entire process, verification and follow-up on your behalf." },
  { q: "Who should file GST Returns?", a: "Every entity registered under GST must file returns — monthly, quarterly or annually depending on turnover and scheme. We help you identify the right filing frequency and stay compliant." },
  { q: "Can you help with Income Tax Returns?", a: "Yes. We file ITRs for salaried individuals, professionals, businesses, firms and companies, ensuring maximum eligible deductions and full compliance." },
  { q: "Do you prepare Partnership Deeds?", a: "Absolutely. We draft comprehensive partnership deeds tailored to your business, including registration and PAN/TAN formalities where needed." },
  { q: "How can I contact you?", a: "Call us at 9844135377 or 9591345320, email khorviassociates@gmail.com, or visit our office in Udyambag, Belagavi. You can also reach us instantly on WhatsApp." },
];

/* ------------------------- helpers ------------------------- */

function useCountUp(target: number, start: boolean, duration = 1600) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return n;
}

function useInView<T extends HTMLElement>(): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setSeen(true)),
      { threshold: 0.25 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [seen]);
  return [ref, seen];
}

/* ------------------------- components ------------------------- */

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setP(Math.max(0, Math.min(1, scrolled)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent">
      <div
        className="h-full bg-gradient-gold transition-[width] duration-150 ease-out"
        style={{ width: `${p * 100}%` }}
      />
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between gap-6">
        <a href="#home" className="flex items-center gap-3 shrink-0">
  <img
    src="/logo.png"
    alt="Khorvi Associates"
    className="h-12 w-auto object-contain"
  />

  <span className="font-sora font-bold text-lg tracking-tight">
    Khorvi <span className="text-gradient-gold">Associates</span>
  </span>
</a>
        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {n.label}
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-gradient-gold transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <a href="tel:+919591345320">
            <Button className="bg-gradient-gold text-primary-foreground font-medium rounded-full px-5 hover:opacity-95 shadow-glow">
              <PhoneCall className="h-4 w-4" /> Call Now
            </Button>
          </a>
        </div>
        <button
          className="lg:hidden text-foreground p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden mx-6 mt-3 glass rounded-2xl p-5 animate-fade-up">
          <nav className="flex flex-col gap-4">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="text-base text-muted-foreground hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
            <a href="tel:+919591345320" onClick={() => setOpen(false)}>
              <Button className="w-full bg-gradient-gold text-primary-foreground rounded-full mt-2">
                <PhoneCall className="h-4 w-4" /> Call Now
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute top-40 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-float" />
      <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Trusted GST & Tax Consultants in Belagavi
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            Your Trusted Partner for{" "}
            <span className="text-gradient-gold">GST, Tax & Business</span>{" "}
            Compliance
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Helping businesses, professionals and entrepreneurs simplify taxation with accurate,
            reliable and timely financial solutions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="tel:+919591345320">
              <Button size="lg" className="bg-gradient-gold text-primary-foreground rounded-full px-7 h-12 shadow-glow hover:opacity-95">
                <PhoneCall className="h-4 w-4" /> Book Free Consultation
              </Button>
            </a>
            <a href="https://wa.me/919591345320" target="_blank" rel="noopener">
              <Button size="lg" variant="outline" className="rounded-full px-7 h-12 border-white/15 bg-white/5 hover:bg-white/10">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </Button>
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["GST Expert", "Income Tax", "Accounting", "Business Reg."].map((t, i) => (
              <div key={t} className="glass rounded-2xl px-4 py-3 flex items-center gap-2 text-sm animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                <BadgeCheck className="h-4 w-4 text-primary shrink-0" />
                <span className="truncate">{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: "150ms" }}>
          <div className="relative aspect-square max-w-xl mx-auto">
            <div className="absolute inset-6 rounded-[2rem] bg-gradient-to-br from-primary/25 via-accent/10 to-transparent blur-2xl" />
            <img
              src={heroImg}
              alt="Financial dashboard illustration"
              width={1200}
              height={1200}
              className="relative w-full h-full object-contain drop-shadow-2xl"
            />
            <div className="absolute top-6 -left-2 glass rounded-2xl p-3 flex items-center gap-2 animate-float shadow-elegant">
              <div className="h-8 w-8 rounded-lg bg-gradient-gold grid place-items-center">
                <TrendingUp className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Returns filed</div>
                <div className="text-sm font-semibold">5000+</div>
              </div>
            </div>
            <div className="absolute bottom-8 -right-2 glass rounded-2xl p-3 flex items-center gap-2 animate-float shadow-elegant" style={{ animationDelay: "1.2s" }}>
              <div className="h-8 w-8 rounded-lg bg-gradient-gold grid place-items-center">
                <ShieldCheck className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Compliance</div>
                <div className="text-sm font-semibold">100% on-time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Trust() {
  const items = [
    { icon: Users, t: "Professional Consultation" },
    { icon: ShieldCheck, t: "Reliable Service" },
    { icon: Lock, t: "Transparent Process" },
    { icon: HeartHandshake, t: "Personalized Support" },
    { icon: Clock, t: "Timely Filing" },
  ];
  return (
    <section className="relative py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          {items.map(({ icon: Icon, t }) => (
            <div key={t} className="card-premium hover-lift p-4 flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-primary/10 grid place-items-center text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const [ref, seen] = useInView<HTMLDivElement>();
  const n = useCountUp(target, seen);
  return (
    <div ref={ref} className="card-premium p-6 text-center">
      <div className="font-display font-bold text-4xl md:text-5xl text-gradient-gold">
        {n}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-primary mb-4">About Us</div>
          <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight">
            About <span className="text-gradient-gold">Khorvi Associates</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Khorvi Associates is a trusted tax and accounting consultancy based in Belagavi,
            helping businesses and individuals with GST Registration, GST return Filing,
            Accounting, Income Tax, Partnership deeds,Project Reports and Financial Advices. Our focus is on
            providing accurate, timely and personalized financial solutions while ensuring
            complete compliance.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#services">
              <Button className="bg-gradient-gold text-primary-foreground rounded-full px-6 shadow-glow">
                Explore Services
              </Button>
            </a>
            <a href="#contact">
              <Button variant="outline" className="rounded-full px-6 border-white/15 bg-white/5 hover:bg-white/10">
                Talk to an Expert
              </Button>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Stat target={50000} suffix="+" label="Returns Filed" />
          <Stat target={600} suffix="+" label="Happy Clients" />
          <Stat target={10} suffix="+" label="Years Experience" />
          <Stat target={100} suffix="%" label="Client Satisfaction" />
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[30rem] bg-hero-glow pointer-events-none opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Our Services</div>
          <h2 className="font-display font-bold text-3xl md:text-5xl">
            Complete <span className="text-gradient-gold">financial & compliance</span> solutions
          </h2>
          <p className="mt-4 text-muted-foreground">
            End-to-end services designed for businesses, professionals and entrepreneurs.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group card-premium hover-lift p-6 flex flex-col">
              <div className="h-12 w-12 rounded-2xl bg-gradient-gold/10 grid place-items-center border border-primary/20 group-hover:scale-110 transition-transform">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-5 font-display font-semibold text-lg">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground flex-1">{desc}</p>
              <a href="#contact" className="mt-5 inline-flex items-center gap-1.5 text-sm text-primary hover:gap-2.5 transition-all">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section id="why-us" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Why Choose Us</div>
          <h2 className="font-display font-bold text-3xl md:text-5xl">
            Built on <span className="text-gradient-gold">expertise, trust</span> & precision
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_US.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="relative card-premium hover-lift p-6">
              <div className="absolute top-4 right-5 text-xs font-mono text-white/10 font-bold">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="h-11 w-11 rounded-xl bg-primary/10 border border-primary/20 grid place-items-center text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Work Process</div>
          <h2 className="font-display font-bold text-3xl md:text-5xl">
            A simple, <span className="text-gradient-gold">stress-free</span> journey
          </h2>
        </div>
        <div className="relative grid md:grid-cols-4 gap-6">
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          {STEPS.map((s) => (
            <div key={s.n} className="relative card-premium hover-lift p-6 text-center">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-gold grid place-items-center font-display font-bold text-primary-foreground text-lg shadow-glow">
                {s.n}
              </div>
              <h3 className="mt-5 font-display font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Testimonials</div>
          <h2 className="font-display font-bold text-3xl md:text-5xl">
            What our <span className="text-gradient-gold">clients say</span>
          </h2>
        </div>
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${i * 100}%)` }}
          >
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="w-full shrink-0 px-2">
                <div className="mx-auto max-w-3xl card-premium p-8 md:p-12 text-center">
                  <div className="flex justify-center gap-1 text-primary">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="mt-6 text-lg md:text-xl leading-relaxed text-foreground/90">
                    "{t.text}"
                  </p>
                  <div className="mt-8">
                    <div className="font-display font-semibold">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-2">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Testimonial ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === idx ? "bg-gradient-gold w-8" : "bg-white/20 w-2 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-primary mb-4">FAQ</div>
          <h2 className="font-display font-bold text-3xl md:text-5xl">
            Frequently asked <span className="text-gradient-gold">questions</span>
          </h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((f, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="card-premium px-6 border-none data-[state=open]:shadow-glow transition-all"
            >
              <AccordionTrigger className="text-left font-display font-medium text-base md:text-lg hover:no-underline py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function Contact() {
  const consultServices = [
    "GST Registration",
    "GST Return Filing",
    "Income Tax Returns",
    "Accounting & Bookkeeping",
    "Partnership Deed",
    "Project Reports",
  ];
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-96 bg-hero-glow pointer-events-none" />
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 animate-fade-up">
          <div className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Free Consultation</div>
          <h2 className="font-display font-bold text-3xl md:text-5xl">
            Let's simplify your <span className="text-gradient-gold">taxation</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Talk directly to our experts — no forms, no wait.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* LEFT: Consultation card */}
          <div className="lg:col-span-3 relative group animate-fade-up">
            <div className="absolute -inset-px rounded-[22px] bg-gradient-to-br from-primary/40 via-accent/20 to-transparent opacity-60 group-hover:opacity-100 blur-md transition-opacity" />
            <div className="relative card-premium hover-lift p-7 md:p-10 h-full">
              <div className="inline-flex items-center gap-2 glass rounded-full px-3.5 py-1.5 text-xs text-muted-foreground mb-6">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Trusted CA & GST Consultants
              </div>
              <h3 className="font-display font-bold text-2xl md:text-3xl leading-tight">
                Need Professional <span className="text-gradient-gold">GST & Tax</span> Assistance?
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Get expert guidance from Khorvi Associates. We help businesses, startups,
                professionals and individuals with reliable GST, Income Tax, Accounting
                and Business Compliance services.
              </p>

              <div className="mt-7 grid sm:grid-cols-2 gap-2.5">
                {consultServices.map((s, i) => (
                  <div
                    key={s}
                    className="flex items-center gap-2.5 glass rounded-xl px-3.5 py-2.5 text-sm animate-fade-up"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 relative overflow-hidden rounded-2xl border border-primary/25 p-5 bg-gradient-to-br from-primary/12 via-accent/6 to-transparent">
                <div className="absolute -top-8 -right-8 h-28 w-28 rounded-full bg-primary/25 blur-2xl" />
                <div className="relative flex items-start gap-3">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-gold grid place-items-center shadow-glow">
                    <Sparkles className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-base md:text-lg">
                      Free Initial Consultation
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      Speak directly with our tax expert to understand the best solution for
                      your business — no obligation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <a href="tel:+919591345320" className="flex-1">
                  <Button size="lg" className="w-full h-14 bg-gradient-gold text-primary-foreground rounded-full font-semibold shadow-glow hover:opacity-95">
                    <PhoneCall className="h-5 w-5" /> Call Now
                  </Button>
                </a>
                <a
                  href="https://wa.me/919591345320"
                  target="_blank"
                  rel="noopener"
                  className="flex-1"
                >
                  <Button
                    size="lg"
                    className="w-full h-14 rounded-full font-semibold text-white hover:opacity-95"
                    style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
                  >
                    <MessageCircle className="h-5 w-5" /> WhatsApp Now
                  </Button>
                </a>
              </div>

              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-3 glass rounded-xl p-3.5">
                  <CalendarClock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div className="text-sm">
                    <div className="text-xs text-muted-foreground">Available</div>
                    <div className="font-medium">Monday – Saturday</div>
                    <div className="text-muted-foreground">10:00 AM – 7:00 PM</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 glass rounded-xl p-3.5">
                  <Timer className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div className="text-sm">
                    <div className="text-xs text-muted-foreground">Response Time</div>
                    <div className="font-medium">Within 30 minutes</div>
                    <div className="text-muted-foreground">during business hours</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Business info + map */}
          <div className="lg:col-span-2 space-y-4 animate-fade-up" style={{ animationDelay: "120ms" }}>
            <div className="card-premium hover-lift p-6 md:p-7">
              <div className="flex items-center gap-2 text-primary mb-5">
                <Building2 className="h-5 w-5" />
                <span className="text-xs uppercase tracking-[0.2em]">Business Info</span>
              </div>

              <div className="font-display font-bold text-xl">Khorvi Associates</div>
              <div className="mt-1 text-xs text-muted-foreground">Chartered Accountant & GST Consultants</div>

              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 shrink-0 rounded-lg bg-primary/10 border border-primary/20 grid place-items-center text-primary">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 space-y-2.5">
                    <div>
                      <div className="text-xs text-muted-foreground">Vishal Khorvi</div>
                      <a href="tel:+919844135377" className="font-medium hover:text-primary transition-colors">+91 95913 45320</a>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Datta Khorvi</div>
                      <a href="tel:+919591345320" className="font-medium hover:text-primary transition-colors">+91 98441 35377</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 shrink-0 rounded-lg bg-primary/10 border border-primary/20 grid place-items-center text-primary">
                    <Mail className="h-4 w-4" />
                  </div>
                  <a href="mailto:khorviassociates@gmail.com" className="text-sm hover:text-primary transition-colors break-all mt-1.5">
                    khorviassociates@gmail.com
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 shrink-0 rounded-lg bg-primary/10 border border-primary/20 grid place-items-center text-primary">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed mt-1">
                    Plot No. B13/2,<br />
                    Behind Hotel Raghvendra,<br />
                    Khanapur Road, Udyambag,<br />
                    Belagavi, Karnataka – 590008
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 shrink-0 rounded-lg bg-primary/10 border border-primary/20 grid place-items-center text-primary">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div className="text-sm mt-1">
                    <div className="font-medium">Monday – Saturday</div>
                    <div className="text-muted-foreground">10:00 AM – 7:00 PM</div>
                    <div className="text-muted-foreground mt-1">Sunday: Closed</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-premium overflow-hidden">
              <iframe
  title="Khorvi Associates location"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3838.7877734531817!2d74.4899794!3d15.8151406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbf65da839648e5%3A0xc1471a53b3f80d5c!2sKhorvi%20Associates!5e0!3m2!1sen!2sin!4v1784385561522!5m2!1sen!2sin"
  className="w-full h-64 rounded-2xl border-0"
  loading="lazy"
  allowFullScreen
  referrerPolicy="strict-origin-when-cross-origin"
/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/5 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-4 gap-10">
        <div>
           <div className="flex items-center gap-3 mb-4">
  <img
    src="/logo.png"
    alt="Khorvi Associates"
    className="h-12 w-auto object-contain"
  />
  <span className="font-display font-bold text-lg">
    Khorvi Associates
  </span>
</div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Trusted GST, tax and accounting consultants in Belagavi delivering accurate, timely and personalized financial solutions.
          </p>
        </div>
        <div>
          <div className="font-display font-semibold mb-4">Quick Links</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-primary transition-colors">{n.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-display font-semibold mb-4">Services</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.title}>
                <a href="#services" className="hover:text-primary transition-colors">{s.title}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-display font-semibold mb-4">Contact</div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><Phone className="h-4 w-4 text-primary shrink-0 mt-0.5" /> +91 98441 35377</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 text-primary shrink-0 mt-0.5" /> +91 95913 45320</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 text-primary shrink-0 mt-0.5" /> khorviassociates@gmail.com</li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Udyambag, Belagavi 590008</li>
          </ul>
          <div className="font-display font-semibold mt-6 mb-2 text-foreground">Business Hours</div>
          <div className="text-sm text-muted-foreground">Mon – Sat: 10 AM – 7 PM</div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} Khorvi Associates. All rights reserved.</div>
        <div>Belagavi, Karnataka · India</div>
      </div>
    </footer>
  );
}

function FloatingActions() {
  return (
    <div className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-40 flex flex-col gap-3">
      <a
        href="tel:+919591345320"
        aria-label="Call Khorvi Associates"
        className="h-14 w-14 rounded-full bg-gradient-gold grid place-items-center shadow-glow hover:scale-105 transition-transform animate-pulse-glow"
      >
        <Phone className="h-5 w-5 text-primary-foreground" />
      </a>
      <a
        href="https://wa.me/919591345320?text=Hi%20Khorvi%20Associates%2C%20I%27d%20like%20a%20free%20consultation."
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
        className="h-14 w-14 rounded-full grid place-items-center shadow-glow hover:scale-105 transition-transform"
        style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
      >
        <MessageCircle className="h-5 w-5 text-white" />
      </a>
    </div>
  );
}

/* ------------------------- page ------------------------- */

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Trust />
        <About />
        <Services />
        <WhyUs />
        <Process />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
      
    </div>
  );
}
