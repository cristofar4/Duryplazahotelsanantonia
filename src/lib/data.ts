/**
 * Central content model for the Drury Plaza Hotel San Antonio Riverwalk
 * luxury experience. All imagery is sourced from Unsplash and centralised
 * here so it can be swapped for licensed brand photography in production.
 */

export const HOTEL = {
  name: "Drury Plaza Hotel",
  location: "San Antonio Riverwalk",
  fullName: "Drury Plaza Hotel San Antonio Riverwalk",
  tagline: "A 1929 landmark, reimagined on the water's edge.",
  address: "105 S St Mary's St",
  city: "San Antonio",
  state: "TX",
  zip: "78205",
  phone: "(210) 270-7799",
  email: "reservations@druryplaza-riverwalk.com",
  building: "The Historic Alamo National Bank Building",
  established: 1929,
  floors: 24,
  rooms: 366,
  coordinates: { lat: 29.4252, lng: -98.4916 },
} as const;

export const NAV_LINKS = [
  { label: "Stay", href: "/rooms" },
  { label: "Dining", href: "/dining" },
  { label: "Amenities", href: "/amenities" },
  { label: "Meetings & Events", href: "/meetings" },
  { label: "Gallery", href: "/gallery" },
  { label: "Offers", href: "/offers" },
  { label: "The Hotel", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/* ----------------------------------------------------------------------- */
/* Imagery                                                                  */
/* ----------------------------------------------------------------------- */

export const IMAGES = {
  heroPrimary: "photo-1566073771259-6a8506099945",
  heroPool: "photo-1551918120-9739cb430c6d",
  heroNight: "photo-1564501049412-61c2a3083791",
  lobby: "photo-1520250497591-112f2f40a3f4",
  facade: "photo-1542314831-068cd1dbfeeb",
  riverwalk: "photo-1531218150217-54595bc2b934",
  riverwalkNight: "photo-1449034446853-66c86144b0ad",
  skyline: "photo-1568515387631-8b650bbcdb90",
  pool: "photo-1540497077202-7c8a3999166f",
  poolRooftop: "photo-1571896349842-33c89424de2d",
  fitness: "photo-1534438327276-14e5300c3a48",
  spa: "photo-1540555700478-4be289fbecef",
  breakfast: "photo-1533920379810-6bedac9e31f9",
  kickback: "photo-1514362545857-3bc16c4c7d1b",
  dining1: "photo-1517248135467-4c7edcad34c4",
  dining2: "photo-1414235077428-338989a2e8c0",
  dish1: "photo-1540189549336-e6e99c3679fe",
  dish2: "photo-1546069901-ba9599a7e63c",
  dish3: "photo-1559339352-11d035aa65de",
  dish4: "photo-1565299624946-b28f40a0ae38",
  cocktail: "photo-1551024601-bec78aea704b",
  wine: "photo-1510812431401-41d2bd2722f3",
  roomKing: "photo-1611892440504-42a792e24d32",
  roomSuite: "photo-1618773928121-c32242e63f39",
  roomDeluxe: "photo-1631049307264-da0ec9d70304",
  roomDouble: "photo-1582719478250-c89cae4dc85b",
  roomBath: "photo-1584622650111-993a426fbf0a",
  roomDetail: "photo-1505693416388-ac5ce068fe85",
  suiteLiving: "photo-1591088398332-8a7791972843",
  ballroom: "photo-1519167758481-83f550bb49b3",
  wedding: "photo-1519225421980-715cb0215aed",
  meeting: "photo-1517457373958-b7bdd4587205",
  event: "photo-1492684223066-81342ee5ff30",
  concierge: "photo-1566073771259-6a8506099945",
  detailGold: "photo-1513519245088-0e12902e35ca",
  alamo: "photo-1568402102990-bc541580b59f",
  texasFlag: "photo-1530089711124-9ca31fb9e863",
  guestRobe: "photo-1578683010236-d716f9a3f461",
} as const;

/* ----------------------------------------------------------------------- */
/* Rooms & Suites                                                           */
/* ----------------------------------------------------------------------- */

export interface Room {
  slug: string;
  name: string;
  category: "Room" | "Suite" | "Signature";
  tagline: string;
  description: string;
  price: number;
  size: string;
  occupancy: number;
  bed: string;
  view: string;
  image: string;
  gallery: string[];
  features: string[];
}

export const ROOMS: Room[] = [
  {
    slug: "deluxe-king",
    name: "Deluxe King",
    category: "Room",
    tagline: "Quiet luxury, framed by the city",
    description:
      "A serene retreat where 1929 bones meet contemporary calm. Floor-to-ceiling light, a pillow-top king, and considered detailing make this our most beloved sanctuary above the River Walk.",
    price: 219,
    size: "340 sq ft",
    occupancy: 2,
    bed: "1 King",
    view: "City / Landmark",
    image: IMAGES.roomKing,
    gallery: [IMAGES.roomKing, IMAGES.roomBath, IMAGES.roomDetail],
    features: ["Pillow-top king", "Marble bath", "Smart climate", "65\" 4K display", "Nespresso", "Free Wi-Fi"],
  },
  {
    slug: "double-queen",
    name: "Premier Double Queen",
    category: "Room",
    tagline: "Room to gather, refined to rest",
    description:
      "Designed for those who travel together. Two plush queens, a generous lounge nook, and warm brass accents that echo the building's banking-hall heritage.",
    price: 239,
    size: "375 sq ft",
    occupancy: 4,
    bed: "2 Queen",
    view: "City",
    image: IMAGES.roomDouble,
    gallery: [IMAGES.roomDouble, IMAGES.roomBath, IMAGES.roomDeluxe],
    features: ["Two queen beds", "Lounge seating", "Marble bath", "65\" 4K display", "Nespresso", "Free Wi-Fi"],
  },
  {
    slug: "riverwalk-deluxe",
    name: "Riverwalk View Deluxe",
    category: "Room",
    tagline: "Wake to the water",
    description:
      "Perched above the famed Paseo del Río, these rooms open onto the shimmer of the River Walk below — cypress canopies, river barges, and the glow of evening lanterns.",
    price: 289,
    size: "360 sq ft",
    occupancy: 2,
    bed: "1 King",
    view: "River Walk",
    image: IMAGES.roomDeluxe,
    gallery: [IMAGES.roomDeluxe, IMAGES.riverwalk, IMAGES.roomBath],
    features: ["River Walk view", "Pillow-top king", "Marble bath", "Reading bench", "Nespresso", "Free Wi-Fi"],
  },
  {
    slug: "executive-suite",
    name: "Executive Suite",
    category: "Suite",
    tagline: "A residence in the sky",
    description:
      "A gracious separate living room, a king bedroom, and panoramic glass that gathers the whole of San Antonio. The Executive Suite is where business becomes pleasure.",
    price: 419,
    size: "640 sq ft",
    occupancy: 3,
    bed: "1 King + Sofa",
    view: "Skyline",
    image: IMAGES.roomSuite,
    gallery: [IMAGES.roomSuite, IMAGES.suiteLiving, IMAGES.roomBath],
    features: ["Separate living room", "Wet bar", "Soaking tub", "Two 4K displays", "Work atelier", "Free Wi-Fi"],
  },
  {
    slug: "landmark-suite",
    name: "Landmark Corner Suite",
    category: "Suite",
    tagline: "The corner of history",
    description:
      "Wrapped in the original arched windows of the Alamo National Bank, this corner suite frames the Tower of the Americas and the river bend in equal measure.",
    price: 519,
    size: "780 sq ft",
    occupancy: 4,
    bed: "1 King + Sofa",
    view: "Skyline / River",
    image: IMAGES.suiteLiving,
    gallery: [IMAGES.suiteLiving, IMAGES.roomSuite, IMAGES.skyline],
    features: ["Corner windows", "Living & dining", "Soaking tub", "Dual baths", "Curated bar", "Free Wi-Fi"],
  },
  {
    slug: "presidential",
    name: "The 1929 Presidential",
    category: "Signature",
    tagline: "The summit of the landmark",
    description:
      "Our signature residence crowning the 24th floor — a private foyer, a grand salon beneath restored plasterwork, and a wrap of glass that holds the Texas sky from sunrise to the last river lantern.",
    price: 1290,
    size: "1,640 sq ft",
    occupancy: 4,
    bed: "1 King + Salon",
    view: "Panoramic",
    image: IMAGES.suiteLiving,
    gallery: [IMAGES.suiteLiving, IMAGES.roomSuite, IMAGES.skyline, IMAGES.roomBath],
    features: ["Private foyer", "Grand salon", "Dining for 8", "Spa bath", "Butler service", "Skyline terrace"],
  },
];

/* ----------------------------------------------------------------------- */
/* Amenities                                                                */
/* ----------------------------------------------------------------------- */

export interface Amenity {
  slug: string;
  title: string;
  kicker: string;
  description: string;
  image: string;
  highlights: string[];
}

export const AMENITIES: Amenity[] = [
  {
    slug: "rooftop-pool",
    title: "Rooftop Pool & Whirlpool",
    kicker: "Above the city",
    description:
      "A glass-edged rooftop pool and warm whirlpool suspended over downtown — by day a sun-washed sanctuary, by dusk a glittering perch above the Riverwalk lights.",
    image: IMAGES.pool,
    highlights: ["Heated rooftop pool", "Whirlpool spa", "Skyline cabanas", "Towel & water service"],
  },
  {
    slug: "fitness",
    title: "24-Hour Fitness Atelier",
    kicker: "Move well",
    description:
      "A light-filled fitness atelier with Technogym equipment, free weights, and floor-to-ceiling windows so every session opens onto the city.",
    image: IMAGES.fitness,
    highlights: ["Technogym cardio", "Free weights", "Open 24 hours", "Towel service"],
  },
  {
    slug: "kickback",
    title: "The 5:30 Kickback™",
    kicker: "Every evening",
    description:
      "An evening ritual unlike any other — complimentary hot hors d'oeuvres and beverages each night, served as the river light turns to gold. A Drury signature, elevated.",
    image: IMAGES.kickback,
    highlights: ["Nightly 5:30–7:00", "Hot appetizers", "Beer, wine & cocktails", "Complimentary"],
  },
  {
    slug: "breakfast",
    title: "Hot Breakfast, On the House",
    kicker: "Each morning",
    description:
      "Start with a generous, complimentary hot breakfast — Belgian waffles, fresh fruit, and barista coffee — laid out in our restored banking-hall dining room.",
    image: IMAGES.breakfast,
    highlights: ["Made-to-order waffles", "Seasonal fruit", "Barista coffee", "Complimentary"],
  },
  {
    slug: "concierge",
    title: "Concierge & Guest Services",
    kicker: "At your service",
    description:
      "From River Walk barge reservations to Alamo tours and late check-out, our concierge anticipates the details so your stay unfolds effortlessly.",
    image: IMAGES.concierge,
    highlights: ["24-hour concierge", "Valet parking", "Pet friendly", "Free Wi-Fi throughout"],
  },
  {
    slug: "business",
    title: "Business Sanctuary",
    kicker: "Work, refined",
    description:
      "A handsome business library and private work suites with high-speed connectivity, printing, and quiet corners overlooking the river.",
    image: IMAGES.meeting,
    highlights: ["Business library", "Private work suites", "High-speed Wi-Fi", "Printing & courier"],
  },
];

/* ----------------------------------------------------------------------- */
/* Dining                                                                   */
/* ----------------------------------------------------------------------- */

export interface Venue {
  slug: string;
  name: string;
  cuisine: string;
  hours: string;
  description: string;
  image: string;
}

export const VENUES: Venue[] = [
  {
    slug: "the-vault",
    name: "The Vault",
    cuisine: "Modern Texan · Dinner",
    hours: "5:30 – 10:30 PM",
    description:
      "Set within the bank's original steel vault, our signature restaurant plates live-fire Texan cooking — dry-aged beef, Gulf seafood, and heritage produce — beneath the glow of brass and candlelight.",
    image: IMAGES.dining1,
  },
  {
    slug: "paseo-terrace",
    name: "Paseo Terrace",
    cuisine: "All-Day · River Level",
    hours: "7:00 AM – 11:00 PM",
    description:
      "An open-air terrace at the water's edge for long lunches and golden-hour aperitifs, with a menu that travels from morning pastries to wood-fired evening small plates.",
    image: IMAGES.dining2,
  },
  {
    slug: "teller-bar",
    name: "Teller Bar",
    cuisine: "Cocktails · Lobby",
    hours: "4:00 PM – 1:00 AM",
    description:
      "A jewel-box cocktail bar behind the former teller line, mixing agave-forward classics and a deep Texas spirits library to a low hum of vinyl.",
    image: IMAGES.cocktail,
  },
];

export const MENU_HIGHLIGHTS = [
  { name: "Wood-Fired Gulf Snapper", note: "charred citrus · sea beans", price: 46, image: IMAGES.dish1 },
  { name: "44-Day Dry-Aged Ribeye", note: "bone marrow · smoked maldon", price: 72, image: IMAGES.dish2 },
  { name: "Heritage Heirloom Salad", note: "burrata · pecan · saba", price: 24, image: IMAGES.dish3 },
  { name: "Mesquite Honey Tart", note: "brown butter · crème fraîche", price: 18, image: IMAGES.dish4 },
];

/* ----------------------------------------------------------------------- */
/* Meetings & Events                                                        */
/* ----------------------------------------------------------------------- */

export const VENUES_EVENTS = [
  {
    name: "The Grand Banking Hall",
    capacity: "Up to 400 guests",
    sqft: "6,200 sq ft",
    description:
      "Soaring restored ceilings, original marble, and bronze chandeliers make our ballroom the most storied address in San Antonio for galas and weddings.",
    image: IMAGES.ballroom,
  },
  {
    name: "The Vault Boardroom",
    capacity: "Up to 16 guests",
    sqft: "640 sq ft",
    description:
      "An intimate, fully-equipped boardroom inside the original vault for executive sessions that demand both gravity and discretion.",
    image: IMAGES.meeting,
  },
  {
    name: "Riverside Pavilion",
    capacity: "Up to 180 guests",
    sqft: "3,400 sq ft",
    description:
      "Floor-to-ceiling glass opening onto the River Walk — a luminous setting for receptions, launches, and celebrations under the Texas sky.",
    image: IMAGES.event,
  },
];

/* ----------------------------------------------------------------------- */
/* Special Offers                                                           */
/* ----------------------------------------------------------------------- */

export interface Offer {
  slug: string;
  name: string;
  tag: string;
  description: string;
  inclusions: string[];
  priceFrom: number;
  nights: string;
  image: string;
}

export const OFFERS: Offer[] = [
  {
    slug: "riverwalk-escape",
    name: "The Riverwalk Escape",
    tag: "Most Loved",
    description:
      "Three unforgettable nights on the water with daily breakfast, the nightly Kickback, and a private river barge dinner for two.",
    inclusions: ["3rd night complimentary", "Private barge dinner", "Daily hot breakfast", "Late checkout to 2 PM"],
    priceFrom: 219,
    nights: "3 nights",
    image: IMAGES.riverwalkNight,
  },
  {
    slug: "suite-romance",
    name: "Suite Romance",
    tag: "Couples",
    description:
      "An Executive Suite, sparkling wine on arrival, rose turndown, and a candlelit dinner for two at The Vault.",
    inclusions: ["Suite upgrade", "Champagne on arrival", "Dinner for two at The Vault", "Couples spa credit"],
    priceFrom: 489,
    nights: "2 nights",
    image: IMAGES.roomSuite,
  },
  {
    slug: "heritage-stay",
    name: "The 1929 Heritage Stay",
    tag: "Discover",
    description:
      "Step into the landmark's story with a curated architectural tour, a Teller Bar tasting flight, and a keepsake from our archive.",
    inclusions: ["Guided heritage tour", "Cocktail tasting flight", "Archive keepsake", "Daily breakfast"],
    priceFrom: 269,
    nights: "2 nights",
    image: IMAGES.lobby,
  },
  {
    slug: "extended-residence",
    name: "Extended Residence",
    tag: "Long Stay",
    description:
      "Settle in for a week or more with deep nightly savings, weekly housekeeping curation, and full access to every Drury signature.",
    inclusions: ["Up to 30% off", "5th & 7th nights free", "Weekly curation", "Pressing service"],
    priceFrom: 189,
    nights: "5+ nights",
    image: IMAGES.roomDeluxe,
  },
];

/* ----------------------------------------------------------------------- */
/* History timeline                                                         */
/* ----------------------------------------------------------------------- */

export const TIMELINE = [
  {
    year: "1929",
    title: "A Landmark Rises",
    text: "The Alamo National Bank Building opens its bronze doors — at 24 stories, the tallest building in San Antonio and a Beaux-Arts beacon on the river.",
  },
  {
    year: "1950s",
    title: "The Heart of Commerce",
    text: "For decades the banking hall hums as the financial heart of South Texas, its marble floors crossed by generations of San Antonians.",
  },
  {
    year: "2007",
    title: "A New Chapter",
    text: "Drury Hotels begins a meticulous restoration, preserving the original plasterwork, vault, and arched windows while reimagining the landmark for guests.",
  },
  {
    year: "Today",
    title: "A Living Landmark",
    text: "The Drury Plaza Hotel Riverwalk stands as one of San Antonio's most beloved addresses — history you can stay inside of.",
  },
];

/* ----------------------------------------------------------------------- */
/* Stats / proof                                                            */
/* ----------------------------------------------------------------------- */

export const STATS = [
  { value: 1929, label: "Landmark Est.", suffix: "" },
  { value: 24, label: "Storeys", suffix: "" },
  { value: 366, label: "Rooms & Suites", suffix: "" },
  { value: 4.7, label: "Guest Rating", suffix: "/5", decimals: 1 },
];

/* ----------------------------------------------------------------------- */
/* Gallery                                                                  */
/* ----------------------------------------------------------------------- */

export interface GalleryItem {
  src: string;
  category: "Architecture" | "Rooms" | "Dining" | "Riverwalk" | "Amenities";
  caption: string;
  span?: "tall" | "wide" | "normal";
}

export const GALLERY: GalleryItem[] = [
  { src: IMAGES.facade, category: "Architecture", caption: "The 1929 facade at dusk", span: "tall" },
  { src: IMAGES.roomSuite, category: "Rooms", caption: "Executive Suite living room" },
  { src: IMAGES.riverwalk, category: "Riverwalk", caption: "Paseo del Río", span: "wide" },
  { src: IMAGES.dish1, category: "Dining", caption: "Wood-fired Gulf snapper" },
  { src: IMAGES.pool, category: "Amenities", caption: "The rooftop pool", span: "tall" },
  { src: IMAGES.lobby, category: "Architecture", caption: "The restored banking hall" },
  { src: IMAGES.cocktail, category: "Dining", caption: "Teller Bar" },
  { src: IMAGES.roomKing, category: "Rooms", caption: "Deluxe King" },
  { src: IMAGES.riverwalkNight, category: "Riverwalk", caption: "River lanterns", span: "wide" },
  { src: IMAGES.fitness, category: "Amenities", caption: "Fitness atelier" },
  { src: IMAGES.ballroom, category: "Architecture", caption: "The Grand Banking Hall" },
  { src: IMAGES.dish2, category: "Dining", caption: "Dry-aged ribeye" },
  { src: IMAGES.roomBath, category: "Rooms", caption: "Marble bath", span: "tall" },
  { src: IMAGES.skyline, category: "Riverwalk", caption: "Downtown skyline" },
];

/* ----------------------------------------------------------------------- */
/* Testimonials                                                             */
/* ----------------------------------------------------------------------- */

export const TESTIMONIALS = [
  {
    quote:
      "We stayed in a corner suite and watched the river light up at night. It felt less like a hotel and more like living inside San Antonio's history.",
    author: "Eleanor & James W.",
    detail: "Landmark Corner Suite",
  },
  {
    quote:
      "The 5:30 Kickback and rooftop pool alone are worth it — but the restored banking hall took our breath away. Impeccable service throughout.",
    author: "Marcus T.",
    detail: "Executive Suite",
  },
  {
    quote:
      "The most beautiful event space in the city. Our wedding in the Grand Banking Hall was nothing short of cinematic.",
    author: "Sofia R.",
    detail: "The Grand Banking Hall",
  },
];

export const FAQS = [
  {
    q: "What time is check-in and check-out?",
    a: "Check-in begins at 3:00 PM and check-out is at 11:00 AM. Early arrival and late departure can be arranged with our concierge, subject to availability.",
  },
  {
    q: "Is parking available?",
    a: "Yes. We offer secure valet parking on-site. Self-parking options are also available within walking distance of the hotel.",
  },
  {
    q: "Are pets welcome?",
    a: "Absolutely. We are a pet-friendly landmark and welcome your companion with a plush bed and bowls on request.",
  },
  {
    q: "What is included with my stay?",
    a: "Every stay includes a complimentary hot breakfast, the nightly 5:30 Kickback with hot appetizers and beverages, free Wi-Fi, and access to the rooftop pool and 24-hour fitness atelier.",
  },
  {
    q: "How close is the hotel to the Alamo and River Walk?",
    a: "We sit directly on the River Walk, with the Alamo, Shops at Rivercenter, and the Convention Center all just a short stroll away.",
  },
];
