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
  "Paddy Fields": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Rice_field_2.jpg",
  "River Island": "https://pbs.twimg.com/media/EkXUtuqU0AEd2nh.jpg",
  "Beach": "https://commons.wikimedia.org/wiki/Special:FilePath/Antarvedi_Beach_view_01.jpg",
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


const destinationGalleries: Record<string, { src: string; title: string }[]> = {
  "River Bay": [
    { src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=85", title: "Open water" },
    { src: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1000&q=85", title: "River landscape" },
    { src: "https://images.unsplash.com/photo-1439405326854-014607f694d7?auto=format&fit=crop&w=1000&q=85", title: "Water reflections" },
    { src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=85", title: "Nature escape" },
    { src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=85", title: "Golden hour" },
  ],
  "Kobbari Thota": kobbariPhotos.map((p) => ({ src: p.src, title: p.title })),
  "Paddy Fields": [
    { src: "https://images.unsplash.com/photo-1536054868623-5e3e5b5a0f18?auto=format&fit=crop&w=1000&q=85", title: "Green fields" },
    { src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=85", title: "Fields under open skies" },
    { src: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=1000&q=85", title: "Rural landscape" },
    { src: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1000&q=85", title: "Sunrise over land" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Rice_field_2.jpg", title: "Rice fields" },
  ],
  "River Island": [
    { src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85", title: "Island escape" },
    { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85", title: "Wide horizons" },
    { src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=85", title: "Green retreat" },
    { src: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1000&q=85", title: "Waterway" },
    { src: "https://images.unsplash.com/photo-1439405326854-014607f694d7?auto=format&fit=crop&w=1000&q=85", title: "River reflections" },
  ],
  "Beach": [
    { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85", title: "Sandy shoreline" },
    { src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1000&q=85", title: "Coastal escape" },
    { src: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1000&q=85", title: "Water and sky" },
    { src: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1000&q=85", title: "Tropical greens" },
    { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Antarvedi_Beach_view_01.jpg", title: "Antarvedi coast" },
  ],
  "Backwaters": [
    { src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=85", title: "Quiet water" },
    { src: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1000&q=85", title: "Waterway journey" },
    { src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=85", title: "Lush surroundings" },
    { src: "https://images.unsplash.com/photo-1439405326854-014607f694d7?auto=format&fit=crop&w=1000&q=85", title: "Reflections" },
    { src: "https://www.clubmahindra.com/blog/images/Top-Things-to-Do-in-Dindi_processed_by_imagy.jpg", title: "Dindi waterways" },
  ],
  "Resort": [
    { src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=85", title: "Poolside retreat" },
    { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=85", title: "Resort stay" },
    { src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=85", title: "Guest suites" },
    { src: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&w=1000&q=85", title: "Outdoor relaxation" },
    { src: "https://2.bp.blogspot.com/-0QaS0eL0Cb8/TpFN33ih0kI/AAAAAAAAAG4/LQYW6-bnDxI/s1600/Anand%2BResorts%2B1.jpg", title: "Godavari resort" },
  ],
  "Temple": [
    { src: "https://images.unsplash.com/photo-1606293926075-69a00dbpl?auto=format&fit=crop&w=1000&q=85", title: "Sacred architecture" },
    { src: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1000&q=85", title: "Temple details" },
    { src: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=85", title: "Heritage setting" },
    { src: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=85", title: "Traditional sanctuary" },
    { src: "https://vizagtourism.org.in/images/v2/gateways/sri-sita-ramachandra-swamy-temple-header.jpg", title: "Temple destination" },
  ],
};

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
  const [showScrollCue, setShowScrollCue] = useState(true);
  const [galleryOpen, setGalleryOpen] = useState<string | null>(null);
  const [activePhoto, setActivePhoto] = useState<{ src: string; title: string; destination: string } | null>(null);
  const [eventDate, setEventDate] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroVisible(false), 4200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateScrollCue = () => setShowScrollCue(window.scrollY < 100);
    window.addEventListener("scroll", updateScrollCue, { passive: true });
    updateScrollCue();
    return () => window.removeEventListener("scroll", updateScrollCue);
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
      <div className="banyan-frame" aria-hidden="true">
        <div className="banyan-edge banyan-edge-left"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
        <div className="banyan-edge banyan-edge-right"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
        <div className="banyan-top-vines"><i/><i/><i/><i/><i/><i/><i/><i/></div>
      </div>
      {introVisible && (
        <div className="site-intro" aria-label="Opening Sandadi">
          <div className="site-intro-glow" />
          <div className="intro-cinematic-scene" aria-hidden="true">
            <div className="intro-sky" />
            <div className="intro-water" />
            <div className="intro-garden intro-garden-back" />
            <div className="intro-palm intro-palm-left"><i /><b /><em /></div>
            <div className="intro-palm intro-palm-right"><i /><b /><em /></div>
            <div className="intro-coconut-row" />
            <div className="intro-event-lawn" />
            <div className="intro-event-canopy"><span /><span /><span /></div>
            <div className="intro-festoon-lights"><i /><i /><i /><i /><i /><i /><i /><i /></div>
            <div className="intro-stage"><span className="intro-stage-glow" /><span className="intro-stage-floral" /></div>
            <div className="intro-guest guest-one" /><div className="intro-guest guest-two" /><div className="intro-guest guest-three" /><div className="intro-guest guest-four" /><div className="intro-guest guest-five" />
            <div className="intro-cultural-life" aria-hidden="true">
              <div className="intro-band"><span className="life-person band-lead" /><span className="life-person band-drummer" /><span className="life-drum" /><span className="life-nadaswaram" /></div>
              <div className="intro-men-chat"><span className="life-person chat-one" /><span className="life-person chat-two" /></div>
              <div className="intro-women-work"><span className="life-person woman-one" /><span className="life-person woman-two" /><span className="life-flower-tray" /></div>
              <div className="intro-kids-play"><span className="life-child child-one" /><span className="life-child child-two" /><span className="life-ball" /></div>
            </div>
            <div className="intro-floating-petals"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
            <div className="intro-scene-haze" />
          </div>
          <div className="site-intro-mark">✦</div>
          <div className="telugu-logo site-intro-title" aria-label="సందడి">సందడి</div>
          <div className="site-intro-sub">DESTINATION IN GODAVARI</div>
          <div className="site-intro-line"><span /></div>
          <div className="site-intro-wordmark">GODAVARI • DESTINATIONS • CELEBRATIONS</div>
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
            <button onClick={() => scrollToId("previous-work")} className="nav-link">Our Work</button>
            <button onClick={() => scrollToId("packages")} className="nav-link">Packages</button>
            <button onClick={() => scrollToId("services")} className="nav-link">Services</button>
          </nav>
          <button onClick={startPlanning} className="gold-button hidden sm:block">Plan Your Sandadi</button>
        </div>
      </header>

      <section id="home" className="hero relative flex min-h-screen items-center justify-center px-5 pt-24">
        <div className="hero-cultural-backdrop" aria-hidden="true">
          <svg className="hero-wedding-art" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" role="presentation">
            <defs>
              <linearGradient id="heroSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#234b3d"/><stop offset=".52" stopColor="#678c68"/><stop offset="1" stopColor="#e1bd75"/></linearGradient>
              <linearGradient id="heroGround" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#426b43"/><stop offset="1" stopColor="#183d2b"/></linearGradient>
              <linearGradient id="heroCanopy" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff0b0"/><stop offset=".5" stopColor="#d9a640"/><stop offset="1" stopColor="#fff0b0"/></linearGradient>
              <linearGradient id="heroSaree" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#e6a33f"/><stop offset="1" stopColor="#b53b57"/></linearGradient>
              <linearGradient id="heroDhoti" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#fff2ce"/><stop offset="1" stopColor="#c7b783"/></linearGradient>
              <radialGradient id="heroGlow"><stop stopColor="#ffe6a1" stopOpacity=".45"/><stop offset="1" stopColor="#ffe6a1" stopOpacity="0"/></radialGradient>
            </defs>
            <rect width="1440" height="900" fill="url(#heroSky)"/>
            <ellipse cx="720" cy="390" rx="620" ry="390" fill="url(#heroGlow)"/>
            <path d="M0 455 Q170 410 330 455 T650 450 T980 445 T1440 430 V900 H0Z" fill="#416f55" opacity=".8"/>
            <path d="M0 525 Q210 485 420 525 T850 520 T1220 505 T1440 510 V900 H0Z" fill="#6d9564" opacity=".8"/>
            <path d="M0 640 Q210 602 430 640 T850 632 T1200 625 T1440 640 V900 H0Z" fill="url(#heroGround)"/>
            <g className="hero-art-palm" transform="translate(85 125)">
              <path d="M70 570 Q85 345 125 120" fill="none" stroke="#4c5935" strokeWidth="24" strokeLinecap="round"/>
              <path d="M125 130 Q20 42 -25 100 Q45 75 111 145 Q10 120 5 185 Q70 155 120 150 Q60 190 74 235 Q117 190 128 157 Q143 228 188 240 Q176 176 140 143 Q220 178 255 139 Q196 123 137 130 Q200 80 190 35 Q144 65 125 130Z" fill="#173f2e"/>
              <path d="M125 130 Q25 80 5 120 M125 130 Q210 80 235 115 M125 130 Q85 60 100 20" stroke="#78965b" strokeWidth="8" fill="none" strokeLinecap="round"/>
            </g>
            <g className="hero-art-palm hero-art-palm-right" transform="translate(1195 110) scale(.92 1.05)">
              <path d="M70 570 Q85 345 125 120" fill="none" stroke="#4c5935" strokeWidth="24" strokeLinecap="round"/>
              <path d="M125 130 Q20 42 -25 100 Q45 75 111 145 Q10 120 5 185 Q70 155 120 150 Q60 190 74 235 Q117 190 128 157 Q143 228 188 240 Q176 176 140 143 Q220 178 255 139 Q196 123 137 130 Q200 80 190 35 Q144 65 125 130Z" fill="#173f2e"/>
              <path d="M125 130 Q25 80 5 120 M125 130 Q210 80 235 115 M125 130 Q85 60 100 20" stroke="#78965b" strokeWidth="8" fill="none" strokeLinecap="round"/>
            </g>
            <g className="hero-art-lights" fill="none" stroke="#f5d579" strokeWidth="3">
              <path d="M110 150 Q720 380 1330 150"/>
              <path d="M250 190 Q720 365 1190 190" stroke="#ffe9a8" strokeWidth="2"/>
            </g>
            <g fill="#ffd66b">
              <circle cx="185" cy="194" r="7"/><circle cx="305" cy="230" r="6"/><circle cx="430" cy="270" r="7"/><circle cx="555" cy="302" r="6"/><circle cx="690" cy="316" r="7"/><circle cx="820" cy="305" r="6"/><circle cx="950" cy="276" r="7"/><circle cx="1080" cy="235" r="6"/><circle cx="1210" cy="190" r="7"/>
            </g>
            <g transform="translate(390 285)">
              <path d="M0 125 L330 0 L660 125 L620 340 L40 340Z" fill="url(#heroCanopy)" stroke="#fff0b2" strokeWidth="5"/>
              <path d="M28 132 L330 24 L632 132" fill="none" stroke="#fff9d9" strokeWidth="13"/>
              <path d="M50 145 V340 M145 110 V340 M240 74 V340 M330 38 V340 M420 74 V340 M515 110 V340 M610 145 V340" stroke="#fff8df" strokeWidth="13" opacity=".72"/>
              <path d="M0 125 Q330 190 660 125" fill="none" stroke="#b87a29" strokeWidth="8"/>
              <g fill="#c34e53"><circle cx="65" cy="150" r="11"/><circle cx="130" cy="163" r="11"/><circle cx="195" cy="173" r="11"/><circle cx="260" cy="180" r="11"/><circle cx="330" cy="184" r="11"/><circle cx="400" cy="180" r="11"/><circle cx="465" cy="173" r="11"/><circle cx="530" cy="163" r="11"/><circle cx="595" cy="150" r="11"/></g>
            </g>
            <g className="hero-art-band" transform="translate(250 595)">
              <g className="hero-art-dancer hero-art-man-one">
                <circle cx="0" cy="-92" r="20" fill="#a96d46"/><path d="M-18 -112 Q0 -132 18 -111" stroke="#282f25" strokeWidth="12" fill="none" strokeLinecap="round"/>
                <path d="M-22 -67 Q0 -82 22 -67 L30 -4 L-27 -4Z" fill="#b54d37"/>
                <path className="hero-art-arm arm-left" d="M-18 -62 L-50 -91 L-70 -118" fill="none" stroke="#a96d46" strokeWidth="13" strokeLinecap="round"/>
                <path className="hero-art-arm arm-right" d="M18 -62 L42 -84 L60 -110" fill="none" stroke="#a96d46" strokeWidth="13" strokeLinecap="round"/>
                <path d="M-25 -4 L-30 42 L-43 70 M24 -4 L30 40 L48 67" fill="none" stroke="#e9d9ac" strokeWidth="17" strokeLinecap="round"/>
                <path d="M-46 70 L-57 72 M48 67 L60 70" stroke="#302e22" strokeWidth="11" strokeLinecap="round"/>
              </g>
              <g className="hero-art-dancer hero-art-drummer" transform="translate(105 12)">
                <circle cx="0" cy="-92" r="19" fill="#bd8056"/><path d="M-18 -112 Q0 -129 18 -110" stroke="#302c22" strokeWidth="12" fill="none" strokeLinecap="round"/>
                <path d="M-21 -68 L20 -68 L28 -2 L-26 -2Z" fill="#28634c"/>
                <path d="M-18 -62 L-38 -30 L-58 -48 M18 -62 L35 -37 L52 -50" fill="none" stroke="#bd8056" strokeWidth="12" strokeLinecap="round"/>
                <g className="hero-art-drum" transform="translate(7 -25) rotate(-14)"><ellipse cx="0" cy="0" rx="33" ry="24" fill="#b87b35" stroke="#f4d49a" strokeWidth="5"/><ellipse cx="0" cy="0" rx="22" ry="15" fill="#eacb86"/><path d="M-20 -12 L20 12 M-20 12 L20 -12" stroke="#9a5a2a" strokeWidth="3"/></g>
                <path d="M-20 -2 L-28 42 L-43 68 M20 -2 L27 40 L42 68" fill="none" stroke="#f2e4c2" strokeWidth="16" strokeLinecap="round"/>
              </g>
              <g className="hero-art-nadaswaram" transform="translate(190 -10)">
                <circle cx="0" cy="-92" r="19" fill="#9c623f"/><path d="M-18 -112 Q0 -130 18 -110" stroke="#302c22" strokeWidth="12" fill="none" strokeLinecap="round"/>
                <path d="M-21 -68 L20 -68 L26 -2 L-25 -2Z" fill="#d5a72f"/>
                <path d="M-16 -59 L-33 -36 L-12 -20 M16 -59 L36 -43 L54 -55" fill="none" stroke="#9c623f" strokeWidth="12" strokeLinecap="round"/>
                <path d="M-12 -35 L68 -66" stroke="#7b4828" strokeWidth="8" strokeLinecap="round"/><path d="M50 -59 L78 -70" stroke="#edc46a" strokeWidth="13" strokeLinecap="round"/>
                <path d="M-18 -2 L-22 42 L-34 67 M18 -2 L23 42 L37 67" fill="none" stroke="#f1dfb2" strokeWidth="16" strokeLinecap="round"/>
              </g>
            </g>
            <g className="hero-art-guests">
              <g className="hero-art-dancer hero-art-woman" transform="translate(860 690)">
                <circle cx="0" cy="-104" r="19" fill="#a76b49"/><path d="M-17 -123 Q0 -142 17 -121" stroke="#272a20" strokeWidth="11" fill="none" strokeLinecap="round"/>
                <path d="M-16 -81 Q0 -92 16 -81 L48 -7 Q0 12 -48 -7Z" fill="url(#heroSaree)"/><path d="M-13 -78 L-37 -48 L-62 -66 M13 -78 L34 -49 L58 -74" fill="none" stroke="#a76b49" strokeWidth="12" strokeLinecap="round"/>
                <path d="M-37 -9 L37 -9" stroke="#e8c16a" strokeWidth="6"/>
                <path d="M-18 -115 Q0 -132 18 -115" fill="none" stroke="#25271d" strokeWidth="5"/>
                <circle cx="-22" cy="-100" r="4" fill="#eacb77"/><circle cx="22" cy="-100" r="4" fill="#eacb77"/>
              </g>
              <g className="hero-art-dancer hero-art-woman-two" transform="translate(970 704) scale(.86)">
                <circle cx="0" cy="-104" r="19" fill="#bd8056"/><path d="M-18 -123 Q0 -141 18 -121" stroke="#292a20" strokeWidth="11" fill="none" strokeLinecap="round"/>
                <path d="M-16 -81 Q0 -92 16 -81 L48 -7 Q0 12 -48 -7Z" fill="#e1b744"/><path d="M-13 -78 L-36 -49 L-58 -69 M13 -78 L35 -49 L60 -70" fill="none" stroke="#bd8056" strokeWidth="12" strokeLinecap="round"/>
                <path d="M-36 -9 L36 -9" stroke="#b64353" strokeWidth="6"/>
              </g>
              <g className="hero-art-dancer hero-art-man-chat" transform="translate(1090 710) scale(.9)">
                <circle cx="0" cy="-95" r="18" fill="#a96d46"/><path d="M-17 -114 Q0 -132 17 -113" stroke="#302c22" strokeWidth="11" fill="none" strokeLinecap="round"/>
                <path d="M-21 -72 L20 -72 L26 -4 L-25 -4Z" fill="#35664a"/>
                <path d="M-17 -62 L-40 -42 L-58 -54 M17 -62 L37 -45 L54 -54" fill="none" stroke="#a96d46" strokeWidth="12" strokeLinecap="round"/>
                <path d="M-18 -4 L-22 40 L-36 67 M18 -4 L23 40 L38 67" fill="none" stroke="url(#heroDhoti)" strokeWidth="16" strokeLinecap="round"/>
              </g>
              <g className="hero-art-dancer hero-art-man-chat-two" transform="translate(1180 720) scale(.78)">
                <circle cx="0" cy="-95" r="18" fill="#c18a5c"/><path d="M-17 -114 Q0 -132 17 -113" stroke="#302c22" strokeWidth="11" fill="none" strokeLinecap="round"/>
                <path d="M-21 -72 L20 -72 L26 -4 L-25 -4Z" fill="#b64a39"/>
                <path d="M-17 -62 L-40 -42 L-58 -54 M17 -62 L37 -45 L54 -54" fill="none" stroke="#c18a5c" strokeWidth="12" strokeLinecap="round"/>
                <path d="M-18 -4 L-22 40 L-36 67 M18 -4 L23 40 L38 67" fill="none" stroke="#f0dfb4" strokeWidth="16" strokeLinecap="round"/>
              </g>
            </g>
            <g className="hero-art-kids">
              <g className="hero-art-child hero-art-child-one" transform="translate(700 765)">
                <circle cx="0" cy="-48" r="13" fill="#b77b51"/><path d="M-12 -60 Q0 -73 12 -60" stroke="#292b22" strokeWidth="8" fill="none" strokeLinecap="round"/>
                <path d="M-13 -30 L13 -30 L19 2 L-18 2Z" fill="#48a7a0"/>
                <path d="M-8 0 L-15 22 M9 0 L20 19" stroke="#d7bd83" strokeWidth="9" strokeLinecap="round"/>
                <path className="hero-art-arm arm-left" d="M-11 -27 L-27 -45" stroke="#b77b51" strokeWidth="8" strokeLinecap="round"/><path className="hero-art-arm arm-right" d="M11 -27 L27 -43" stroke="#b77b51" strokeWidth="8" strokeLinecap="round"/>
              </g>
              <g className="hero-art-child hero-art-child-two" transform="translate(770 778) scale(.9)">
                <circle cx="0" cy="-48" r="13" fill="#98603f"/><path d="M-12 -60 Q0 -73 12 -60" stroke="#292b22" strokeWidth="8" fill="none" strokeLinecap="round"/>
                <path d="M-13 -30 L13 -30 L19 2 L-18 2Z" fill="#e0a43e"/>
                <path d="M-8 0 L-15 22 M9 0 L20 19" stroke="#d7bd83" strokeWidth="9" strokeLinecap="round"/>
                <path className="hero-art-arm arm-left" d="M-11 -27 L-27 -45" stroke="#98603f" strokeWidth="8" strokeLinecap="round"/><path className="hero-art-arm arm-right" d="M11 -27 L27 -43" stroke="#98603f" strokeWidth="8" strokeLinecap="round"/>
              </g>
              <circle className="hero-art-ball" cx="820" cy="777" r="13" fill="#f4d35e" stroke="#fff0b0" strokeWidth="3"/>
            </g>
            <path d="M0 820 Q220 790 420 824 T850 818 T1220 820 T1440 805 V900 H0Z" fill="#153b29" opacity=".88"/>
            <g fill="#e7bd55" opacity=".9"><circle cx="80" cy="755" r="4"/><circle cx="150" cy="825" r="3"/><circle cx="330" cy="790" r="4"/><circle cx="520" cy="840" r="3"/><circle cx="930" cy="835" r="4"/><circle cx="1050" cy="790" r="3"/><circle cx="1300" cy="830" r="4"/></g>
          </svg>
          <div className="hero-scene-vignette" />
        </div>
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="absolute inset-5 rounded-[28px] border border-[#D4A72C]/20 md:inset-8" />
        <div className="absolute inset-8 rounded-[22px] border border-[#FFF0A0]/10 md:inset-12" />
        <div className="relative z-10 mx-auto max-w-5xl text-center hero-content-reveal">
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
              <div className="cinematic-river" />
              <div className="cinematic-palms" />
              <div className="cinematic-glow" />
              <div className="cinematic-festival" aria-hidden="true">
                <span className="cinematic-band-person band-a" /><span className="cinematic-band-person band-b" />
                <span className="cinematic-drum" /><span className="cinematic-nadaswaram" />
                <span className="cinematic-family family-a" /><span className="cinematic-family family-b" /><span className="cinematic-family family-c" />
                <span className="cinematic-kid kid-a" /><span className="cinematic-kid kid-b" />
                <span className="cinematic-marigold-string" />
              </div>
              <div className="cinematic-caption">
                <div className="pulse-ring">▶</div>
                <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[#F2D47A]">A glimpse of Sandadi</p>
                <p className="mt-2 text-sm text-[#C9BD9B]">Godavari • Celebration • Destination</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showScrollCue && !introVisible && (
        <button type="button" className="scroll-explore-cue" onClick={() => scrollToId("idea")} aria-label="Scroll down to explore Sandadi">
          <span className="scroll-explore-label">SCROLL TO EXPLORE</span>
          <span className="scroll-explore-arrow" aria-hidden="true">↓</span>
        </button>
      )}

      <section id="idea" className="section-shell">
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
          <div className="mb-10"><div className="eyebrow">02 / DESTINATION</div><h2 className="section-heading">Choose your kind of Godavari.</h2><p className="mt-3 max-w-2xl text-[#BBAE8B]">From coconut groves to river islands, the setting becomes part of the celebration. Open a destination to explore its photo gallery.</p></div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((item, index) => (
              <div key={item.name} className={`destination-feature ${destination === item.name ? "choice-active" : ""}`}>
                <button onClick={() => setDestination(destination === item.name ? "" : item.name)} className={`destination-card destination-${index + 1}`} style={{ backgroundImage: `linear-gradient(to top, rgba(8,2,3,.9), rgba(8,2,3,.08) 65%), url(${destinationPhotos[item.name]})` }} aria-expanded={destination === item.name}>
                  <div className="relative z-10 mt-auto text-left"><span className="choice-name">{item.name}</span><span className="choice-sub">{item.sub}</span><span className="destination-open">{destination === item.name ? "Close gallery −" : "View 5 photos +"}</span></div>
                </button>
                {destination === item.name && <div className="destination-mini-gallery">{(destinationGalleries[item.name] || []).slice(0,5).map((photo) => <button key={photo.src} onClick={() => { setActivePhoto({ ...photo, destination: item.name }); setGalleryOpen(item.name); }} className="destination-mini-photo"><img src={photo.src} alt={photo.title} loading="lazy" /><span>{photo.title}</span></button>)}<button className="gold-button mt-2 w-full" onClick={() => { setDestination(item.name); setPlannerOpen(true); }}>Plan here →</button></div>}
              </div>
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
        </div>
      </section>

      <section id="previous-work" className="section-shell previous-work-section">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><div className="eyebrow">REAL MOMENTS / REAL STORIES</div><h2 className="section-heading">Our Previous Work.</h2><p className="mt-3 max-w-2xl text-[#BBAE8B]">Short films from weddings, family celebrations and destination events — each story designed to be watched in 20–60 seconds.</p></div><span className="portfolio-note">CLIENT VIDEO PORTFOLIO</span></div>
          <div className="grid gap-5 md:grid-cols-3">
            {[{ title: "Wedding Stories", sub: "Dolu, sannayi, rituals and the big moment", icon: "💍" }, { title: "Destination Celebrations", sub: "Godavari landscapes, decor and guest moments", icon: "🌿" }, { title: "Family Sandadi", sub: "Engagements, birthdays and meaningful gatherings", icon: "✨" }].map((film) => <article key={film.title} className="film-card"><div className="film-placeholder"><span className="film-icon">{film.icon}</span><span className="film-play">▶</span><span className="film-duration">20–60 SEC</span></div><h3>{film.title}</h3><p>{film.sub}</p><span className="film-status">Your client clip will be added here</span></article>)}
          </div>
          <p className="mt-5 text-sm text-[#887B5F]">Portfolio layout is ready. Upload your real client clips or share their video links to activate playback here; these cards are clearly marked as placeholders, not claimed client footage.</p>
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
        <div className="moment-banner mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-[#D4A72C]/30 p-8 text-center shadow-[0_30px_100px_rgba(0,0,0,.16)] md:p-16">
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

      {activePhoto && galleryOpen && (
        <div className="photo-lightbox" onClick={() => { setActivePhoto(null); setGalleryOpen(null); }}>
          <button className="lightbox-close" aria-label="Close photo" onClick={() => { setActivePhoto(null); setGalleryOpen(null); }}>×</button>
          <button className="lightbox-arrow" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); const list = destinationGalleries[galleryOpen] || []; const idx = list.findIndex((p) => p.src === activePhoto.src); const next = list[(idx - 1 + list.length) % list.length]; setActivePhoto({ ...next, destination: galleryOpen }); }}>‹</button>
          <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}><img src={activePhoto.src} alt={activePhoto.title} /><figcaption><span>{activePhoto.destination}</span><strong>{activePhoto.title}</strong></figcaption></figure>
          <button className="lightbox-arrow" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); const list = destinationGalleries[galleryOpen] || []; const idx = list.findIndex((p) => p.src === activePhoto.src); const next = list[(idx + 1) % list.length]; setActivePhoto({ ...next, destination: galleryOpen }); }}>›</button>
        </div>
      )}
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
                  <label className="date-field">Event date<input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} onClick={(e) => { const el = e.currentTarget as HTMLInputElement & { showPicker?: () => void }; try { el.showPicker?.(); } catch {} }} /></label>
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
