"use client";

import { useEffect, useMemo, useState } from "react";

type Item = { name: string; sub: string; icon: string };
type Plan = { budget: string; title: string; people: string; included: string[] };

const events: Item[] = [
  { name: "Destination Wedding", sub: "A celebration with a place of its own", icon: "💍" },
  { name: "Engagement", sub: "Begin the beautiful chapter", icon: "💫" },
  { name: "Birthday", sub: "Make the day feel unforgettable", icon: "🎂" },
  { name: "Baby Shower", sub: "A joyful welcome to a new beginning", icon: "🪷" },
  { name: "Family Function", sub: "Bring everyone together", icon: "👨‍👩‍👧‍👦" },
  { name: "Corporate", sub: "Meet, celebrate and connect", icon: "🏛️" },
  { name: "Cultural Event", sub: "Tradition, art and celebration", icon: "🥁" },
  { name: "Private Party", sub: "Your people. Your kind of Sandadi.", icon: "✨" },
];

const destinations: Item[] = [
  { name: "River Bay", sub: "Water, breeze and open horizons", icon: "🌊" },
  { name: "Kobbari Thota", sub: "Coconut groves with Godavari soul", icon: "🌴" },
  { name: "Paddy Fields", sub: "Golden fields and endless skies", icon: "🌾" },
  { name: "River Island", sub: "A celebration surrounded by water", icon: "🏝️" },
  { name: "Beach", sub: "Sunset celebrations by the shore", icon: "🌅" },
  { name: "Backwaters", sub: "Quiet waters and intimate moments", icon: "🛶" },
  { name: "Resort", sub: "Comfort, celebration and stay", icon: "🏨" },
  { name: "Temple", sub: "A sacred setting for meaningful moments", icon: "🪔" },
];

const destinationPhotos: Record<string, string> = {
  "River Bay": "https://www.sterlingholidays.com/content/dam/sterlingholidays/destinations/galleryslider/dindi/dindi-antarvedi-godavari-meets-bay-of-bengal.jpg.imgw.1280.1280.jpeg",
  "Kobbari Thota": "https://www.onefivenine.com/images/Travel/530.jpg",
  "Paddy Fields": "https://www.onefivenine.com/images/Travel/530.jpg",
  "River Island": "https://pbs.twimg.com/media/EkXUtuqU0AEd2nh.jpg",
  "Beach": "https://www.sterlingholidays.com/content/dam/sterlingholidays/destinations/galleryslider/dindi/dindi-antarvedi-godavari-meets-bay-of-bengal.jpg.imgw.1280.1280.jpeg",
  "Backwaters": "https://img.etimg.com/photo/msid-123493499%2Cimgsize-48146/Dindi.jpg",
  "Resort": "https://2.bp.blogspot.com/-0QaS0eL0Cb8/TpFN33ih0kI/AAAAAAAAAG4/LQYW6-bnDxI/s1600/Anand%2BResorts%2B1.jpg",
  "Temple": "https://vizagtourism.org.in/images/v2/gateways/sri-sita-ramachandra-swamy-temple-header.jpg",
};

const services: Item[] = [
  { name: "Decor", sub: "From traditional to grand", icon: "🌸" },
  { name: "Catering", sub: "Menus made for your celebration", icon: "🍽️" },
  { name: "Photography", sub: "Every moment, beautifully remembered", icon: "📸" },
  { name: "Sound & Music", sub: "Bring the celebration alive", icon: "🎶" },
  { name: "Travel", sub: "Guest movement made easy", icon: "🚐" },
  { name: "Stay", sub: "Comfort for your people", icon: "🛏️" },
  { name: "Makeup", sub: "Look your best for the moment", icon: "💄" },
  { name: "Tent House", sub: "Structure, shade and celebration", icon: "⛺" },
];

const kobbariPhotos = [
  { src: "https://pbs.twimg.com/media/Eg0Dt-dVkAY3ANn.jpg", title: "Coconut grove from above", sub: "Endless palms and a canal cutting through the green" },
  { src: "https://i.pinimg.com/originals/8c/14/8e/8c148e417cb816028a70a5e789c55d6f.jpg", title: "Palm-lined canal", sub: "The classic Konaseema landscape" },
  { src: "https://thetravelandtourismtimes.com/wp-content/uploads/2025/03/Gmidms2bIAANzAxbgvghn.jpeg", title: "Backwater life", sub: "Coconut groves meeting the Godavari waterways" },
  { src: "https://img.etimg.com/photo/msid-123493599%2Cimgsize-78016/AnandMahindra%27sfavouriteholidaydestination.jpg", title: "River + coconut canopy", sub: "A destination that feels completely away from the city" },
  { src: "https://www.clubmahindra.com/blog/images/Top-Things-to-Do-in-Dindi_processed_by_imagy.jpg", title: "Houseboat experience", sub: "Slow cruises through the Godavari backwaters" },
  { src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/fd/a6/06/rvr-sarovar-portico-dindi.jpg?h=1200&s=1&w=1200", title: "Paddy, water and palms", sub: "Green fields reflected in quiet backwaters" }
];

const packages: Plan[] = [
  { budget: "₹50K", title: "Beautiful Beginnings", people: "Up to 50 guests", included: ["Venue setup", "Essential decor", "Food arrangement", "Event coordination"] },
  { budget: "₹1L", title: "Grand Gathering", people: "Up to 100 guests", included: ["Venue + decor", "Curated food menu", "Sound setup", "Event management"] },
  { budget: "₹2L", title: "Royal Celebration", people: "Up to 200 guests", included: ["Premium venue", "Signature decor", "Catering", "Photography", "Sound + management"] },
  { budget: "₹5L", title: "Destination Sandadi", people: "Up to 500 guests", included: ["Destination venue", "Luxury decor", "Full catering", "Photo + sound", "Travel/stay coordination", "Dedicated management"] },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  const [event, setEvent] = useState("");
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroVisible(false), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  const selectedPackage = useMemo(() => packages.find((p) => p.budget === budget), [budget]);

  const toggleService = (name: string) => {
    setSelectedServices((current) =>
      current.includes(name) ? current.filter((x) => x !== name) : [...current, name]
    );
  };

  const startPlanning = () => {
    setSubmitted(false);
    setPlannerOpen(true);
  };

  const completePlan = () => {
    setSubmitted(true);
  };

  const sendPlanToWhatsApp = () => {
    const message = [
      "Hello Sandadi! I would like to plan an event.",
      event ? `Event: ${event}` : "",
      destination ? `Destination: ${destination}` : "",
      budget ? `Budget: ${budget}` : "",
      selectedServices.length ? `Services: ${selectedServices.join(", ")}` : "",
      "Please share availability, options and quotation."
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const sendKobbariInfoToWhatsApp = () => {
    const message = "Hello Sandadi! I am interested in Kobbari Thota for an event. Please share photos, availability, pricing, guest capacity and package options.";
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#170406] text-[#FFF7D0]">
      {introVisible && (
        <div className="site-intro" aria-label="Opening Sandadi">
          <div className="site-intro-glow" />
          <div className="site-intro-mark">✦</div>
          <div className="telugu-logo site-intro-title">సందడి</div>
          <div className="site-intro-sub">DESTINATION IN GODAVARI</div>
          <div className="site-intro-line"><span /></div>
        </div>
      )}
      <div className="gold-dust" aria-hidden="true" />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#D4A72C]/20 bg-[#170406]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <button onClick={() => scrollToId("home")} className="text-left">
            <div className="telugu-logo text-3xl leading-tight">సందడి</div>
            <div className="mt-0.5 text-[9px] tracking-[0.35em] text-[#E4C36A]">DESTINATION IN GODAVARI</div>
          </button>
          <nav className="hidden items-center gap-7 text-xs uppercase tracking-[0.18em] text-[#E8D8AD] md:flex">
            <button onClick={() => scrollToId("events")} className="nav-link">Events</button>
            <button onClick={() => scrollToId("destinations")} className="nav-link">Destinations</button>
            <button onClick={() => scrollToId("packages")} className="nav-link">Packages</button>
            <button onClick={() => scrollToId("services")} className="nav-link">Services</button>
          </nav>
          <button onClick={startPlanning} className="gold-button hidden sm:block">Plan Your Sandadi</button>
        </div>
      </header>

      <section id="home" className="hero relative flex min-h-screen items-center justify-center px-5 pt-24">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="absolute inset-5 rounded-[28px] border border-[#D4A72C]/20 md:inset-8" />
        <div className="absolute inset-8 rounded-[22px] border border-[#FFF0A0]/10 md:inset-12" />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="mb-7 hero-reveal text-xs font-medium uppercase tracking-[0.45em] text-[#F2D47A]">A destination for every celebration</div>
          <div className="ornament mx-auto mb-4">✦</div>
          <div className="overflow-visible px-4 py-4">
            <h1 className="telugu-hero leading-[1.35]">సందడి</h1>
          </div>
          <p className="mt-2 text-sm font-semibold tracking-[0.42em] text-[#FFD34E] md:text-base">DESTINED IN GODAVARI</p>
          <div className="mx-auto mt-8 h-px w-28 bg-gradient-to-r from-transparent via-[#FFD34E] to-transparent" />
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[#EADBB8] md:text-xl">
            Where every celebration finds its place, and every moment becomes a memory.
            <br className="hidden md:block" /> Come for the destination. Leave with a story.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <button onClick={startPlanning} className="gold-button large">Plan Your Event</button>
            <button onClick={() => scrollToId("destinations")} className="outline-button large">Explore Destinations <span>↓</span></button>
          </div>
          <div className="mx-auto mt-16 max-w-3xl rounded-3xl border border-[#D4A72C]/25 bg-black/20 p-3 shadow-2xl">
            <div className="cinematic-video" aria-label="Cinematic Godavari destination preview">
              <div className="cinematic-sky" />
              <div className="cinematic-sun" />
              <div className="cinematic-river" />
              <div className="cinematic-palms" />
              <div className="cinematic-glow" />
              <div className="cinematic-caption">
                <div className="pulse-ring">▶</div>
                <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[#F2D47A]">A glimpse of Sandadi</p>
                <p className="mt-2 text-sm text-[#C9BD9B]">Godavari • Celebration • Destination</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mx-auto max-w-4xl text-center">
          <div className="eyebrow">THE IDEA</div>
          <h2 className="section-title">Not just a venue.<br /><span>A place made for your moment.</span></h2>
          <p className="section-copy">
            Sandadi brings together Godavari destinations, event experiences, trusted services and flexible budgets into one beautiful journey — so planning feels as special as the celebration itself.
          </p>
        </div>
      </section>

      <section id="events" className="section-shell pt-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div><div className="eyebrow">01 / CELEBRATE</div><h2 className="section-heading">What are you celebrating?</h2></div>
            <button onClick={startPlanning} className="text-sm text-[#FFD34E] underline underline-offset-8">Build my event →</button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {events.map((item) => (
              <button key={item.name} onClick={() => { setEvent(item.name); setPlannerOpen(true); }} className={`choice-card ${event === item.name ? "choice-active" : ""}`}>
                <span className="choice-icon">{item.icon}</span><span className="choice-name">{item.name}</span><span className="choice-sub">{item.sub}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="destinations" className="section-shell">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10"><div className="eyebrow">02 / DESTINATION</div><h2 className="section-heading">Choose your kind of Godavari.</h2><p className="mt-3 max-w-2xl text-[#BBAE8B]">From coconut groves to river islands, the setting becomes part of the celebration.</p></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((item, index) => (
              <button key={item.name} onClick={() => { setDestination(item.name); setPlannerOpen(true); }} className={`destination-card destination-${index + 1} ${destination === item.name ? "choice-active" : ""}`} style={{ backgroundImage: `linear-gradient(to top, rgba(8,2,3,.94), rgba(8,2,3,.12) 65%), url(${destinationPhotos[item.name]})` }}>
                <div className="destination-shade" /><span className="relative z-10 text-4xl">{item.icon}</span><div className="relative z-10 mt-auto text-left"><span className="choice-name">{item.name}</span><span className="choice-sub">{item.sub}</span></div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="kobbari-thota" className="section-shell kobbari-showcase">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div><div className="eyebrow">FEATURED DESTINATION / KOBBARI THOTA</div><h2 className="section-heading">Under the coconut trees, beside the Godavari.</h2><p className="mt-4 max-w-2xl text-[#BBAE8B]">Kobbari Thota is the kind of setting that makes the destination itself part of the celebration — tall coconut palms, canals, open green space, backwaters and the unmistakable Konaseema feeling.</p></div>
            <button onClick={sendKobbariInfoToWhatsApp} className="whatsapp-button">Send Kobbari Thota info on WhatsApp ↗</button>
          </div>
          <div className="kobbari-hero-grid">
            <div className="kobbari-main-photo"><img src={kobbariPhotos[0].src} alt={kobbariPhotos[0].title} /><div className="photo-overlay"><span className="photo-kicker">THE GODAVARI GREEN</span><strong>Kobbari Thota</strong><span>Nature • Water • Celebration</span></div></div>
            <div className="kobbari-story"><div className="story-number">01</div><h3>A destination people remember.</h3><p>Perfect for destination weddings, pre-wedding shoots, intimate family functions, birthdays and relaxed gatherings where nature is the backdrop.</p><div className="story-tags"><span>🌴 Coconut Grove</span><span>🌊 Canal / Backwater</span><span>📸 Photo Friendly</span><span>✨ Open-Air Events</span></div><button onClick={() => { setDestination("Kobbari Thota"); setPlannerOpen(true); }} className="gold-button large mt-7">Plan an Event Here →</button></div>
          </div>
          <div className="photo-gallery mt-5">{kobbariPhotos.slice(1).map((photo) => (<button key={photo.src} className="gallery-photo" onClick={() => { setDestination("Kobbari Thota"); setPlannerOpen(true); }}><img src={photo.src} alt={photo.title} /><span className="gallery-caption"><strong>{photo.title}</strong><small>{photo.sub}</small></span></button>))}</div>
          <div className="mt-6 rounded-2xl border border-[#D4A72C]/20 bg-[#1D0508]/80 p-5 text-sm text-[#BBAE8B]"><span className="text-[#FFD34E]">Why it fits Sandadi:</span> Konaseema is officially described as a lush Godavari-delta destination with coconut groves, fields and waterways, making this visual language a natural fit for the Sandadi destination concept. <span className="ml-1 text-[#756B58]">Destination visuals are temporary web references for the prototype. Replace them with your own/licensed photographs before launch.</span></div>
        </div>
      </section>

      <section id="packages" className="section-shell">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center"><div className="eyebrow">03 / PACKAGES</div><h2 className="section-heading">Start with a budget. Build from there.</h2><p className="mx-auto mt-3 max-w-2xl text-[#BBAE8B]">Ready packages give you a clear starting point. Every detail can still be customised.</p></div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {packages.map((item) => (
              <button key={item.budget} onClick={() => { setBudget(item.budget); setPlannerOpen(true); }} className={`package-card ${budget === item.budget ? "package-active" : ""}`}>
                <div className="text-xs uppercase tracking-[0.3em] text-[#CFA83A]">From</div><div className="package-price">{item.budget}</div><div className="text-lg font-semibold text-[#FFF1B0]">{item.title}</div><div className="mt-2 text-xs text-[#BBAE8B]">{item.people}</div>
                <div className="my-6 h-px bg-[#D4A72C]/20" />
                <ul className="space-y-2 text-left text-sm text-[#D8CCAA]">{item.included.map((x) => <li key={x}>✦ {x}</li>)}</ul>
              </button>
            ))}
          </div>
          <button onClick={startPlanning} className="mx-auto mt-8 block text-sm font-semibold text-[#FFD34E]">I have my own budget → Create Custom</button>
        </div>
      </section>

      <section id="services" className="section-shell pt-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10"><div className="eyebrow">04 / SERVICES</div><h2 className="section-heading">Bring the details together.</h2></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((item) => <button key={item.name} onClick={() => toggleService(item.name)} className={`service-card ${selectedServices.includes(item.name) ? "service-active" : ""}`}><span className="text-3xl">{item.icon}</span><span className="choice-name mt-4">{item.name}</span><span className="choice-sub">{item.sub}</span><span className="service-check">{selectedServices.includes(item.name) ? "✓ Selected" : "Add +"}</span></button>)}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-[#D4A72C]/30 bg-gradient-to-br from-[#4B0B15] via-[#27070D] to-[#160406] p-8 text-center shadow-[0_30px_100px_rgba(0,0,0,.4)] md:p-16">
          <div className="ornament">✦</div>
          <div className="eyebrow mt-5">YOUR CELEBRATION, YOUR WAY</div>
          <h2 className="section-title mt-3">Tell us the moment.<br /><span>We'll help create the Sandadi.</span></h2>
          <p className="mx-auto mt-5 max-w-2xl text-[#C9BD9B]">Choose an event, destination, budget and services. Sandadi turns your ideas into a clear event plan.</p>
          <button onClick={startPlanning} className="gold-button large mt-9">Create My Event Plan</button>
        </div>
      </section>

      <footer className="border-t border-[#D4A72C]/15 px-5 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div><div className="telugu-logo text-4xl">సందడి</div><p className="mt-1 text-xs tracking-[0.25em] text-[#BBAE8B]">DESTINATION IN GODAVARI</p></div>
          <p className="text-sm text-[#857A63]">© 2026 Sandadi. Every celebration deserves a destination.</p>
        </div>
      </footer>

      {plannerOpen && (
        <div className="modal-backdrop" onClick={() => setPlannerOpen(false)}>
          <div className="planner-panel" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-5">
              <div><div className="eyebrow">CREATE YOUR SANDADI</div><h2 className="mt-2 text-3xl font-semibold text-[#FFF3B8]">Build your event</h2><p className="mt-2 text-sm text-[#AFA283]">Choose what you know now. You can customise the rest later.</p></div>
              <button onClick={() => setPlannerOpen(false)} className="close-button">×</button>
            </div>
            {submitted ? (
              <div className="mt-10 rounded-2xl border border-[#D4A72C]/30 bg-[#3A0911] p-8 text-center">
                <div className="text-5xl">✦</div><h3 className="mt-4 text-2xl text-[#FFD34E]">Your Sandadi plan is ready.</h3><p className="mt-3 text-[#C9BD9B]">We have captured your selections. The next step is connecting this form to your enquiry/WhatsApp/email workflow.</p><div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center"><button onClick={sendPlanToWhatsApp} className="whatsapp-button">Send Plan on WhatsApp ↗</button><button onClick={() => setPlannerOpen(false)} className="gold-button">Done</button></div>
              </div>
            ) : (
              <>
                <div className="planner-grid mt-8">
                  <label>Event<select value={event} onChange={(e) => setEvent(e.target.value)}><option value="">Choose event</option>{events.map(x => <option key={x.name}>{x.name}</option>)}</select></label>
                  <label>Destination<select value={destination} onChange={(e) => setDestination(e.target.value)}><option value="">Choose destination</option>{destinations.map(x => <option key={x.name}>{x.name}</option>)}</select></label>
                  <label>Budget<select value={budget} onChange={(e) => setBudget(e.target.value)}><option value="">Choose budget</option><option>₹50K</option><option>₹1L</option><option>₹2L</option><option>₹5L</option><option>Custom</option></select></label>
                  <label>Date<input type="date" /></label>
                  <label>Guests<input type="number" min="1" placeholder="Approx. guests" /></label>
                  <label>Location<input placeholder="Town / preferred area" /></label>
                </div>
                {selectedPackage && <div className="mt-6 rounded-xl border border-[#D4A72C]/20 bg-black/20 p-4"><div className="text-sm font-semibold text-[#FFD34E]">{selectedPackage.title} · {selectedPackage.people}</div><div className="mt-2 flex flex-wrap gap-2">{selectedPackage.included.map(x => <span key={x} className="tag">{x}</span>)}</div></div>}
                <div className="mt-7"><div className="text-sm font-semibold text-[#EBD99B]">Services</div><div className="mt-3 flex flex-wrap gap-2">{services.map(x => <button key={x.name} onClick={() => toggleService(x.name)} className={`service-pill ${selectedServices.includes(x.name) ? "pill-active" : ""}`}>{x.icon} {x.name}</button>)}</div></div>
                <button onClick={completePlan} className="gold-button large mt-8 w-full">Review My Sandadi Plan →</button>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
