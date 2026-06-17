import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Loader } from "@/components/Loader";
import { AetherCursor } from "@/components/AetherCursor";
import { useCounter, useInView, useReveal } from "@/hooks/aether";

import heroImg from "@/assets/hero.jpg";
import tokyoImg from "@/assets/tokyo.jpg";
import baliImg from "@/assets/bali.jpg";
import alpsImg from "@/assets/alps.jpg";
import santoriniImg from "@/assets/santorini.jpg";
import dubaiImg from "@/assets/dubai.jpg";
import founderImg from "@/assets/founder.jpg";
import g1 from "@/assets/gallery1.jpg";
import g2 from "@/assets/gallery2.jpg";
import g3 from "@/assets/gallery3.jpg";
import g4 from "@/assets/gallery4.jpg";
import g5 from "@/assets/gallery5.jpg";
import g6 from "@/assets/gallery6.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aether Journeys — Travel Beyond Destinations" },
      {
        name: "description",
        content:
          "Aether Journeys curates immersive luxury travel experiences across the world's most extraordinary destinations.",
      },
      { property: "og:title", content: "Aether Journeys — Travel Beyond Destinations" },
      {
        property: "og:description",
        content: "Curated luxury journeys designed for unforgettable experiences.",
      },
      { property: "og:image", content: heroImg },
      { property: "twitter:image", content: heroImg },
    ],
  }),
  component: Home,
});

const DESTINATIONS = [
  {
    id: "01",
    name: "Tokyo",
    region: "Japan / Honshu",
    img: tokyoImg,
    title: "Neon, silence and the art of the in-between.",
    body: "Move from a private tea ceremony in Asakusa to the rooftop bars of Shibuya, where the city's electric pulse becomes a kind of meditation. Tokyo is not visited — it is studied.",
    experiences: ["Private Kaiseki Dinner", "Ryokan Retreat in Hakone", "Helicopter at Dusk"],
  },
  {
    id: "02",
    name: "Bali",
    region: "Indonesia / Ubud",
    img: baliImg,
    title: "Where jungle meets stillness.",
    body: "Wake to mist over rice terraces. Walk barefoot through cliffside villas suspended above the canopy. Bali is a slowness you remember in your body long after you leave.",
    experiences: ["Cliffside Villa", "Sunrise Volcano Trek", "Healer's Ceremony"],
  },
  {
    id: "03",
    name: "Swiss Alps",
    region: "Switzerland / Zermatt",
    img: alpsImg,
    title: "Altitude as a state of mind.",
    body: "Heli-ski untouched powder. Sleep in a glass chalet under the gaze of the Matterhorn. Dine on alpine cuisine prepared by a chef who has known these mountains his whole life.",
    experiences: ["Heli-Skiing", "Private Glass Chalet", "Vintage Cellar Tasting"],
  },
  {
    id: "04",
    name: "Santorini",
    region: "Greece / Cyclades",
    img: santoriniImg,
    title: "An island made of light.",
    body: "Whitewashed walls, indigo domes, and a caldera that swallows the sun every evening. Stay in a cliffside cave suite. Sail at sunset on a private gulet. Forget the calendar.",
    experiences: ["Cave Suite in Oia", "Private Sunset Sail", "Volcanic Wine Tasting"],
  },
  {
    id: "05",
    name: "Dubai",
    region: "UAE / Arabian Peninsula",
    img: dubaiImg,
    title: "The future, dressed in gold.",
    body: "Penthouse views from the 122nd floor. A desert majlis under impossible stars. Dubai is a city that refuses to choose between heritage and tomorrow — and so we travel both.",
    experiences: ["Burj Penthouse Suite", "Desert Falconry", "Yacht Across the Marina"],
  },
];

const EXPERIENCES = [
  { name: "Luxury Escapes", count: "12 collections", img: g6, body: "Private islands, glass villas, and stays that exist nowhere else." },
  { name: "Adventure Expeditions", count: "9 collections", img: g3, body: "Polar crossings, desert traverses, summits earned with intention." },
  { name: "Cultural Journeys", count: "14 collections", img: g4, body: "Ateliers, monasteries, and conversations with the keepers of craft." },
  { name: "Island Retreats", count: "11 collections", img: g6, body: "Untouched archipelagos reached only by private boat or seaplane." },
  { name: "City Discoveries", count: "16 collections", img: tokyoImg, body: "After-hours museums, hidden ateliers, the city as a private guest." },
];

const STORIES = [
  {
    by: "Customer 1",
    where: "Kyoto, Japan",
    text: "We arrived expecting a holiday. We left having lived a small, secret life inside another country. The level of care was unlike anything we have experienced — every detail had already been quietly considered before we even thought of it.",
  },
  {
    by: "Customer 2",
    where: "Patagonia, Argentina",
    text: "Aether arranged a private glacier camp that should not technically exist. Standing alone on the ice at sunrise, I understood why people travel — not for sights, but for the version of themselves they become along the way.",
  },
  {
    by: "Customer 3",
    where: "Amalfi Coast, Italy",
    text: "An anniversary I will spend the rest of my life trying to live up to. Every restaurant, every drive, every villa felt chosen specifically for who we are — not who we are on paper, but who we actually are.",
  },
  {
    by: "Customer 4",
    where: "Marrakech, Morocco",
    text: "I do not normally cry on trips. The dinner they organised in the High Atlas — a family who had been cooking together for four generations — was the kind of evening you cannot describe to anyone who was not there.",
  },
  {
    by: "Customer 5",
    where: "The Maldives",
    text: "There was a moment, alone on the deck of our overwater villa at 2am, where the sea and the sky were the same colour and I could not tell where the world ended. That is what Aether sells. The rest is logistics.",
  },
];

const FEATURES = [
  { num: "01", title: "Expert Planning", body: "A dedicated journey designer who knows every supplier, every season, every backroad — personally." },
  { num: "02", title: "Exclusive Experiences", body: "Access to estates, ateliers, and individuals who do not appear in any guidebook." },
  { num: "03", title: "Luxury Accommodations", body: "We stay where the owners stay. Suites, villas, and residences chosen for soul, not stars." },
  { num: "04", title: "Personalised Itineraries", body: "Nothing pre-packaged. Every day is composed around who you are and what you want to feel." },
];

function Home() {
  useReveal();

  // hero parallax
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const y = window.scrollY;
      heroRef.current.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(${1 + y * 0.0002})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="dark min-h-screen bg-background text-foreground antialiased">
      <Loader />
      <AetherCursor />
      <Nav />
      <Hero heroRef={heroRef} />
      <BrandStatement />
      <Journey />
      <Experiences />
      <Gallery />
      <Why />
      <Stories />
      <Impact />
      <Founder />
      <PlanJourney />
      <Footer />
    </div>
  );
}

/* ----------------------------- NAV ----------------------------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12">
        <a href="#top" className="flex items-center gap-3" data-cursor="HOME">
          <span className="block h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
          <span className="font-serif text-lg tracking-[0.3em]">AETHER</span>
        </a>
        <nav className="hidden items-center gap-10 md:flex">
          {[
            ["Destinations", "#journey"],
            ["Experiences", "#experiences"],
            ["Stories", "#stories"],
            ["About", "#founder"],
          ].map(([n, h]) => (
            <a
              key={n}
              href={h}
              className="story-link text-[11px] tracking-[0.3em] text-muted-foreground uppercase hover:text-foreground"
            >
              {n}
            </a>
          ))}
        </nav>
        <a
          href="#plan"
          data-cursor="START JOURNEY"
          className="group inline-flex items-center gap-3 border border-border px-5 py-2.5 text-[11px] tracking-[0.3em] uppercase transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
        >
          Plan Journey
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </header>
  );
}

/* ----------------------------- HERO ----------------------------- */
function Hero({ heroRef }: { heroRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <section id="top" className="relative h-screen overflow-hidden">
      <div ref={heroRef} className="absolute inset-0 will-change-transform">
        <img
          src={heroImg}
          alt="Mountain peaks at golden sunrise"
          width={1920}
          height={1280}
          className="h-full w-full object-cover animate-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex-1" />
        <div className="mx-auto w-full max-w-[1600px] px-6 pb-24 md:px-12 md:pb-32">
          <div className="flex items-center gap-4 animate-rise delay-1000">
            <span className="block h-px w-12 bg-[color:var(--accent)]" />
            <span className="text-[10px] tracking-[0.5em] uppercase text-[color:var(--accent)]">
              Chapter One — Arrival
            </span>
          </div>
          <h1 className="mt-8 max-w-[12ch] font-serif text-[clamp(3.5rem,9vw,9rem)] leading-[0.95] tracking-tight animate-rise delay-1000">
            <span className="block italic font-light">The World</span>
            <span className="block">Is Waiting.</span>
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground animate-rise delay-1000">
            Curated luxury journeys designed for unforgettable experiences. We build the kind of
            travel that becomes a chapter of your life.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-4 animate-rise delay-1000">
            <a
              href="#journey"
              data-cursor="EXPLORE"
              className="group inline-flex items-center gap-4 bg-[color:var(--accent)] px-8 py-4 text-[11px] tracking-[0.3em] uppercase text-[color:var(--accent-foreground)] transition-transform hover:-translate-y-0.5"
            >
              Explore Destinations
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#plan"
              data-cursor="START JOURNEY"
              className="story-link inline-flex items-center gap-3 px-2 py-4 text-[11px] tracking-[0.3em] uppercase text-foreground"
            >
              Plan Your Journey
            </a>
          </div>
        </div>

        <div className="border-t border-border/60 bg-background/30 backdrop-blur-sm">
          <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-6 px-6 py-5 md:px-12">
            <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
              <span className="block h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--accent)]" />
              Scroll to begin the journey
            </div>
            <div className="hidden gap-10 text-[10px] tracking-[0.4em] uppercase text-muted-foreground md:flex">
              <span>32.7° N</span>
              <span>118.4° E</span>
              <span>Est. 2025</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- BRAND STATEMENT ----------------------------- */
function BrandStatement() {
  return (
    <section className="py-32 md:py-56">
      <div className="mx-auto max-w-[1300px] px-6 md:px-12">
        <div className="reveal section-num mb-12">II — Manifesto</div>
        <h2 className="reveal font-serif text-[clamp(2.25rem,6.5vw,6rem)] leading-[1.05] tracking-tight">
          Travel is not about <span className="italic font-light text-muted-foreground">reaching places.</span>
          <br />
          It is about discovering <span className="text-[color:var(--accent)]">experiences.</span>
        </h2>
      </div>
    </section>
  );
}

/* ----------------------------- JOURNEY ----------------------------- */
function Journey() {
  return (
    <section id="journey" className="relative">
      <div className="mx-auto max-w-[1600px] px-6 pt-24 md:px-12">
        <div className="reveal flex items-end justify-between border-b border-border pb-6">
          <div>
            <div className="section-num mb-3">III — The Journey</div>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight">
              Five chapters. <span className="italic font-light text-muted-foreground">One world.</span>
            </h2>
          </div>
          <div className="hidden max-w-xs text-sm text-muted-foreground md:block">
            Scroll through a curated route across five extraordinary destinations.
          </div>
        </div>
      </div>

      {DESTINATIONS.map((d, i) => (
        <DestinationChapter key={d.id} dest={d} index={i} />
      ))}
    </section>
  );
}

function DestinationChapter({
  dest,
  index,
}: {
  dest: (typeof DESTINATIONS)[number];
  index: number;
}) {
  const flip = index % 2 === 1;
  return (
    <article className="relative py-24 md:py-40">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-12">
        <div className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
          <div className="reveal-img overflow-hidden">
            <img
              src={dest.img}
              alt={dest.name}
              loading="lazy"
              width={1600}
              height={1080}
              className="h-[60vh] w-full object-cover md:h-[80vh]"
              data-cursor="EXPLORE"
            />
          </div>
          <div className="mt-4 flex items-center justify-between text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
            <span>{dest.region}</span>
            <span>{dest.id} / 05</span>
          </div>
        </div>

        <div className={`md:col-span-5 ${flip ? "md:order-1" : ""} flex flex-col justify-center`}>
          <div className="reveal">
            <div className="section-num mb-6 text-[color:var(--accent)]">
              Chapter {dest.id}
            </div>
            <h3 className="font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] tracking-tight">
              {dest.name}
            </h3>
            <p className="mt-6 max-w-md font-serif text-2xl italic font-light text-muted-foreground">
              {dest.title}
            </p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              {dest.body}
            </p>

            <div className="mt-10 space-y-3">
              {dest.experiences.map((ex, i) => (
                <div
                  key={ex}
                  className="group flex items-center justify-between border-b border-border py-3 text-sm transition-colors hover:text-[color:var(--accent)]"
                >
                  <span className="flex items-center gap-4">
                    <span className="text-[10px] tracking-[0.3em] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {ex}
                  </span>
                  <span className="opacity-0 transition-opacity group-hover:opacity-100">→</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ----------------------------- EXPERIENCES ----------------------------- */
function Experiences() {
  return (
    <section id="experiences" className="border-t border-border py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="reveal mb-16 flex items-end justify-between">
          <div>
            <div className="section-num mb-3">IV — Curated Experiences</div>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight">
              The shape of <span className="italic font-light text-muted-foreground">a journey.</span>
            </h2>
          </div>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {EXPERIENCES.map((e, i) => (
            <a
              key={e.name}
              href="#plan"
              data-cursor="TRAVEL"
              className="group reveal relative grid grid-cols-12 items-center gap-6 py-8 transition-colors"
            >
              <div className="col-span-1 text-[10px] tracking-[0.3em] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="col-span-11 md:col-span-5">
                <h3 className="font-serif text-3xl md:text-5xl transition-colors group-hover:text-[color:var(--accent)]">
                  {e.name}
                </h3>
              </div>
              <div className="col-span-8 hidden text-sm text-muted-foreground md:col-span-4 md:block">
                {e.body}
              </div>
              <div className="col-span-4 hidden text-right text-[10px] tracking-[0.3em] uppercase text-muted-foreground md:col-span-2 md:block">
                {e.count}
              </div>

              {/* hover preview */}
              <div className="pointer-events-none absolute right-0 top-1/2 hidden h-48 w-72 -translate-y-1/2 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:block">
                <img src={e.img} alt="" className="h-full w-full object-cover" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- GALLERY ----------------------------- */
function Gallery() {
  const items = [
    { src: g1, h: "row-span-2", alt: "Luxury safari tent" },
    { src: g5, h: "", alt: "Iceland aurora" },
    { src: g2, h: "", alt: "Fine dining plate" },
    { src: g4, h: "row-span-2", alt: "Moroccan riad" },
    { src: g6, h: "", alt: "Maldives overwater villa" },
    { src: g3, h: "", alt: "Desert traveller" },
  ];
  return (
    <section className="border-t border-border py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="reveal mb-16">
          <div className="section-num mb-3">V — Experience Gallery</div>
          <h2 className="font-serif text-4xl md:text-6xl leading-tight">
            Light, texture, <span className="italic font-light text-muted-foreground">memory.</span>
          </h2>
        </div>

        <div className="grid auto-rows-[200px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-3 md:gap-6">
          {items.map((it, i) => (
            <div
              key={i}
              data-cursor="DISCOVER"
              className={`reveal-img group relative overflow-hidden ${it.h}`}
            >
              <img
                src={it.src}
                alt={it.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/0 transition-colors duration-500 group-hover:bg-background/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- WHY ----------------------------- */
function Why() {
  return (
    <section className="border-t border-border py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="reveal grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="section-num mb-3">VI — Why Aether</div>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight">
              Designed by hand. <span className="italic font-light text-muted-foreground">Lived by you.</span>
            </h2>
            <p className="mt-6 max-w-sm text-sm text-muted-foreground">
              Four principles that guide every itinerary we compose — quietly, beneath the surface.
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2">
              {FEATURES.map((f) => (
                <div
                  key={f.num}
                  className="reveal bg-background p-10 transition-colors hover:bg-surface"
                >
                  <div className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--accent)]">
                    {f.num}
                  </div>
                  <h3 className="mt-6 font-serif text-3xl">{f.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- STORIES ----------------------------- */
function Stories() {
  return (
    <section id="stories" className="border-t border-border py-24 md:py-40">
      <div className="mx-auto max-w-[1300px] px-6 md:px-12">
        <div className="reveal mb-20">
          <div className="section-num mb-3">VII — Travel Stories</div>
          <h2 className="font-serif text-4xl md:text-6xl leading-tight">
            Voices from <span className="italic font-light text-muted-foreground">the road.</span>
          </h2>
        </div>

        <div className="space-y-24 md:space-y-32">
          {STORIES.map((s, i) => (
            <figure key={i} className="reveal grid grid-cols-1 gap-8 md:grid-cols-12">
              <div className="md:col-span-3">
                <div className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--accent)]">
                  No. {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-3 text-sm text-muted-foreground">{s.where}</div>
              </div>
              <blockquote className="md:col-span-9">
                <p className="font-serif text-2xl leading-snug md:text-4xl">
                  <span className="text-[color:var(--accent)]">“</span>
                  {s.text}
                  <span className="text-[color:var(--accent)]">”</span>
                </p>
                <figcaption className="mt-8 flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
                  <span className="block h-px w-12 bg-[color:var(--accent)]" />
                  {s.by}
                </figcaption>
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- IMPACT ----------------------------- */
function Impact() {
  const stats = [
    { v: 50, suf: "+", l: "Countries Covered" },
    { v: 10000, suf: "+", l: "Travelers Served" },
    { v: 500, suf: "+", l: "Curated Journeys" },
    { v: 98, suf: "%", l: "Traveler Satisfaction" },
  ];
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section className="border-t border-border py-24 md:py-40">
      <div ref={ref} className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="reveal section-num mb-12">VIII — Global Impact</div>
        <div className="grid grid-cols-2 gap-y-16 md:grid-cols-4">
          {stats.map((s, i) => (
            <Stat key={i} {...s} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ v, suf, l, inView }: { v: number; suf: string; l: string; inView: boolean }) {
  const c = useCounter(v, inView, 2200);
  const format = (n: number) => (v >= 1000 ? n.toLocaleString() : String(n));
  return (
    <div className="reveal">
      <div className="font-serif text-[clamp(3rem,7vw,7rem)] leading-none tracking-tight">
        {format(c)}
        <span className="text-[color:var(--accent)]">{suf}</span>
      </div>
      <div className="mt-4 text-[10px] tracking-[0.4em] uppercase text-muted-foreground">{l}</div>
    </div>
  );
}

/* ----------------------------- FOUNDER ----------------------------- */
function Founder() {
  return (
    <section id="founder" className="border-t border-border py-24 md:py-40">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-12">
        <div className="md:col-span-5">
          <div className="reveal-img overflow-hidden">
            <img
              src={founderImg}
              alt="User — Founder of Aether Journeys"
              loading="lazy"
              width={1200}
              height={1500}
              className="h-[70vh] w-full object-cover grayscale"
            />
          </div>
        </div>
        <div className="md:col-span-7 md:pl-10 flex flex-col justify-center">
          <div className="reveal">
            <div className="section-num mb-3">IX — Founder</div>
            <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.02]">
              Designing journeys that
              <span className="italic font-light text-muted-foreground"> create lifelong memories.</span>
            </h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
              Aether was founded on a simple belief: that the best travel is not consumed, it is
              composed. Over two decades of working with the world's quietest hoteliers, private
              pilots and master craftsmen, we have built something rare — a collection of people
              who can make almost anything happen, almost anywhere.
            </p>
            <div className="mt-10 flex items-center gap-6">
              <div>
                <div className="font-serif text-2xl">User</div>
                <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
                  Founder &amp; Head Curator
                </div>
              </div>
              <span className="block h-px flex-1 bg-border" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- PLAN JOURNEY ----------------------------- */
function PlanJourney() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section id="plan" className="border-t border-border py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="reveal grid grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="section-num mb-3">X — Plan Your Journey</div>
            <h2 className="font-serif text-[clamp(2.5rem,6.5vw,6rem)] leading-[1.02]">
              Your next adventure
              <span className="italic font-light text-muted-foreground"> starts here.</span>
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              Let's create a personalised travel experience tailored to your dreams. Tell us a
              little — we'll respond within one working day.
            </p>
            <div className="mt-12 space-y-4 text-sm">
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--accent)]">
                  Email
                </span>
                concierge@aetherjourneys.com
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--accent)]">
                  Call
                </span>
                +1 (212) 555 — 0188
              </div>
            </div>
          </div>

          <form
            className="md:col-span-7"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            {submitted ? (
              <div className="reveal border border-[color:var(--accent)]/40 p-16 text-center">
                <div className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--accent)]">
                  Received
                </div>
                <h3 className="mt-4 font-serif text-4xl">Your journey is being designed.</h3>
                <p className="mt-4 text-muted-foreground">
                  A member of our curation team will be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Field label="Name" name="name" />
                <Field label="Email" name="email" type="email" />
                <Field label="Phone" name="phone" type="tel" />
                <Field label="Preferred Destination" name="destination" />
                <Field label="Travel Dates" name="dates" />
                <Field label="Travellers" name="travellers" />
                <div className="sm:col-span-2">
                  <Field label="Tell us about your dream journey" name="message" textarea />
                </div>
                <div className="sm:col-span-2 flex flex-wrap gap-4 pt-4">
                  <button
                    type="submit"
                    data-cursor="START JOURNEY"
                    className="group inline-flex items-center gap-4 bg-[color:var(--accent)] px-10 py-4 text-[11px] tracking-[0.3em] uppercase text-[color:var(--accent-foreground)] transition-transform hover:-translate-y-0.5"
                  >
                    Start Planning
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </button>
                  <a
                    href="#"
                    data-cursor="START JOURNEY"
                    className="story-link inline-flex items-center px-2 py-4 text-[11px] tracking-[0.3em] uppercase"
                  >
                    Speak With Expert
                  </a>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea = false,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          rows={4}
          className="mt-3 w-full resize-none border-b border-border bg-transparent py-3 text-base text-foreground placeholder-muted-foreground/40 outline-none transition-colors focus:border-[color:var(--accent)]"
        />
      ) : (
        <input
          name={name}
          type={type}
          className="mt-3 w-full border-b border-border bg-transparent py-3 text-base text-foreground placeholder-muted-foreground/40 outline-none transition-colors focus:border-[color:var(--accent)]"
        />
      )}
    </label>
  );
}

/* ----------------------------- FOOTER ----------------------------- */
function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="overflow-hidden border-b border-border py-8">
        <div className="marquee-track flex whitespace-nowrap text-[clamp(3rem,8vw,8rem)] font-serif italic text-muted-foreground/40">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex">
              {["Tokyo", "Bali", "Swiss Alps", "Santorini", "Dubai", "Kyoto", "Patagonia", "Maldives"].map(
                (c) => (
                  <span key={c} className="px-10">
                    {c} <span className="text-[color:var(--accent)]">✦</span>
                  </span>
                ),
              )}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-12">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <div className="flex items-center gap-3">
              <span className="block h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
              <span className="font-serif text-lg tracking-[0.3em]">AETHER JOURNEYS</span>
            </div>
            <p className="mt-6 max-w-xs text-sm text-muted-foreground">
              Travel beyond destinations. A curated atelier of journeys across the world's most
              extraordinary places.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 flex max-w-sm items-center border-b border-border"
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent py-3 text-sm placeholder-muted-foreground/60 outline-none"
              />
              <button className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--accent)]">
                Subscribe →
              </button>
            </form>
          </div>

          <FooterCol
            title="Destinations"
            items={["Tokyo", "Bali", "Swiss Alps", "Santorini", "Dubai"]}
          />
          <FooterCol
            title="Experiences"
            items={["Luxury Escapes", "Adventure", "Cultural", "Island Retreats", "City Discoveries"]}
          />
          <FooterCol
            title="Aether"
            items={["About", "Founder", "Stories", "Press", "Contact"]}
          />
          <FooterCol
            title="Social"
            items={["Instagram", "Journal", "Pinterest", "YouTube", "Spotify"]}
          />
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-border pt-8 text-[10px] tracking-[0.3em] uppercase text-muted-foreground md:flex-row md:items-center">
          <div>© 2025 Aether Journeys. All journeys reserved.</div>
          <div>Designed by SocioFrame &amp; Co</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="md:col-span-2">
      <div className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--accent)]">
        {title}
      </div>
      <ul className="mt-6 space-y-3 text-sm">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="story-link text-muted-foreground hover:text-foreground">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
