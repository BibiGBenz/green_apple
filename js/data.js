/* ============================================================
   Green Apple Holidays — content data + SVG illustrations
   Swap SVG slots for real Instagram photos by setting `.photo`
   on any item to an image path, e.g. photo: "assets/zed-one.jpg"
   ============================================================ */

/* ---- SVG bus / vehicle illustration generator ---- */
function busSVG(body, glass, accent) {
  return `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tourist vehicle">
    <defs>
      <linearGradient id="sky${accent.replace('#','')}" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stop-color="#dff3e6"/><stop offset="1" stop-color="#eef8f1"/>
      </linearGradient>
    </defs>
    <rect width="400" height="250" fill="url(#sky${accent.replace('#','')})"/>
    <circle cx="330" cy="55" r="26" fill="#ffe08a"/>
    <path d="M0 200 Q100 170 200 195 T400 190 V250 H0 Z" fill="#cfe9d6"/>
    <path d="M0 210 Q120 188 260 208 T400 205 V250 H0 Z" fill="#b7dcc1"/>
    <!-- bus body -->
    <g transform="translate(48 70)">
      <rect x="0" y="20" width="300" height="96" rx="18" fill="${body}"/>
      <rect x="0" y="20" width="300" height="30" rx="18" fill="${accent}" opacity=".9"/>
      <rect x="18" y="44" width="250" height="34" rx="8" fill="${glass}"/>
      <line x1="80" y1="44" x2="80" y2="78" stroke="${body}" stroke-width="4"/>
      <line x1="142" y1="44" x2="142" y2="78" stroke="${body}" stroke-width="4"/>
      <line x1="204" y1="44" x2="204" y2="78" stroke="${body}" stroke-width="4"/>
      <rect x="278" y="46" width="16" height="30" rx="4" fill="${glass}"/>
      <rect x="6" y="92" width="288" height="10" rx="5" fill="rgba(0,0,0,.15)"/>
      <circle cx="70" cy="120" r="20" fill="#20261f"/><circle cx="70" cy="120" r="9" fill="#93a29a"/>
      <circle cx="235" cy="120" r="20" fill="#20261f"/><circle cx="235" cy="120" r="9" fill="#93a29a"/>
      <rect x="150" y="58" width="120" height="14" rx="4" fill="#fff" opacity=".85"/>
      <text x="210" y="69" text-anchor="middle" font-family="Poppins,sans-serif" font-weight="800" font-size="12" fill="${body}">GREEN APPLE</text>
    </g>
  </svg>`;
}

const FLEET = [
  {
    id: "zed-one", name: "Zed One", type: "coach", seats: "40+2 Seater",
    sub: "Luxury multi-axle A/C sleeper-seater coach — the flagship.",
    specs: ["A/C Push-back", "LED TV", "Music System", "Luggage Space", "GPS Tracked"],
    price: "₹28", unit: "/ km",
    body: "#0e5c34", glass: "#bfe6cf", accent: "#8fd14f",
    photo: "assets/post-02.jpg" // GREEN APPLE 'Predator' coach
  },
  {
    id: "boss", name: "Boss", type: "coach", seats: "35 Seater",
    sub: "Premium A/C tourist bus built for long Kerala tours.",
    specs: ["A/C", "Reclining Seats", "LED TV", "Charging Points"],
    price: "₹25", unit: "/ km",
    body: "#0b3d6e", glass: "#cfe3f5", accent: "#4da3ff", photo: "assets/post-08.jpg"
  },
  {
    id: "tt-17", name: "Tempo Traveller 17", type: "traveller", seats: "17 Seater",
    sub: "Spacious A/C traveller — perfect for family groups.",
    specs: ["A/C", "Push-back Seats", "USB Charging", "Curtains"],
    price: "₹22", unit: "/ km",
    body: "#146838", glass: "#c8ecd6", accent: "#8fd14f", photo: "assets/post-03.jpg"
  },
  {
    id: "tt-14", name: "Tempo Traveller 14", type: "traveller", seats: "14 Seater",
    sub: "Comfortable mid-size traveller for weekend getaways.",
    specs: ["A/C", "Reclining Seats", "Music", "Roof Carrier"],
    price: "₹20", unit: "/ km",
    body: "#0ea5a5", glass: "#d0f2f0", accent: "#ffb703", photo: "assets/post-06.jpg"
  },
  {
    id: "seater-7", name: "7 Seater", type: "car", seats: "7 Seater",
    sub: "Comfortable MPV for small families & airport runs.",
    specs: ["A/C", "Comfy Seats", "Music", "Boot Space"],
    price: "₹18", unit: "/ km",
    body: "#1a8a4a", glass: "#c8ecd6", accent: "#ffb703", photo: "assets/post-07.jpg"
  },
  {
    id: "mini", name: "Luxury Coach", type: "coach", seats: "Multi-Axle",
    sub: "Premium coach for big groups and long-distance tours.",
    specs: ["A/C", "Push-back", "LED TV", "Ample Legroom"],
    price: "₹23", unit: "/ km",
    body: "#7a3ea8", glass: "#e6d6f2", accent: "#ffb703", photo: "assets/post-11.jpg"
  }
];

const PACKAGES = [
  { name: "Munnar & Tea Hills", days: "2N / 3D", from: "₹6,500", tag: "Bestseller",
    grad: "linear-gradient(135deg,#0e5c34,#1a8a4a)", photo: "" },
  { name: "Wayanad Wildlife", days: "1N / 2D", from: "₹4,200", tag: "Nature",
    grad: "linear-gradient(135deg,#146838,#0ea5a5)", photo: "" },
  { name: "Ooty & Coonoor", days: "2N / 3D", from: "₹7,800", tag: "Hills",
    grad: "linear-gradient(135deg,#0b3d6e,#0ea5a5)", photo: "" },
  { name: "Bekal & Kasaragod", days: "1 Day", from: "₹3,500", tag: "Coastal",
    grad: "linear-gradient(135deg,#0ea5a5,#8fd14f)", photo: "" },
  { name: "Coorg Coffee Trail", days: "2N / 3D", from: "₹8,200", tag: "Karnataka",
    grad: "linear-gradient(135deg,#5a2d82,#0ea5a5)", photo: "" },
  { name: "Kannur Heritage", days: "1 Day", from: "₹2,800", tag: "Local",
    grad: "linear-gradient(135deg,#0e5c34,#8fd14f)", photo: "" }
];

const GALLERY = [
  { cap: "Our GREEN APPLE ‘Predator’ coach", ar: .56, photo: "assets/post-02.jpg" },
  { cap: "On the road through the Western Ghats", ar: .56, photo: "assets/post-07.jpg" },
  { cap: "Green Apple coaches ready for a tour", ar: 1, photo: "assets/post-08.jpg" },
  { cap: "17-seater tempo travellers", ar: 1, photo: "assets/post-03.jpg" },
  { cap: "Night charter — all lit up", ar: .56, photo: "assets/post-12.jpg" },
  { cap: "Happy customers, keys handed over", ar: .56, photo: "assets/post-10.jpg" },
  { cap: "Fleet parked at the depot", ar: 1, photo: "assets/post-06.jpg" },
  { cap: "Our experienced drivers", ar: .56, photo: "assets/post-04.jpg" },
  { cap: "Temple & heritage routes in Kannur", ar: .56, photo: "assets/post-05.jpg" }
];

const TESTIMONIALS = [
  { txt: "Booked the Zed One for our family trip to Munnar. Spotless bus, superb driver, on time throughout. Highly recommended!", nm: "Arun Kumar", loc: "Kannur", av: "A" },
  { txt: "We hired the 17-seater for a college tour. Great music system, comfortable seats and very fair pricing. Will book again.", nm: "Fathima P", loc: "Taliparamba", av: "F" },
  { txt: "Professional service from start to finish. The Boss coach made our Wayanad trip so smooth. Green Apple is the best in Kannur.", nm: "Rejith Menon", loc: "Payyanur", av: "R" },
  { txt: "Clean vehicles, polite drivers and they answer the phone instantly. Used them 3 times now for family functions.", nm: "Sneha Nair", loc: "Kannur", av: "S" }
];
