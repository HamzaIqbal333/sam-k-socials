// Single source of truth for copy shared across pages, and the fallback the site renders
// whenever Firestore has no saved content yet (see src/hooks/useContent.js).
//
// IMPORTANT: the client names, businesses, photos, testimonials and results below are demo
// content written to show what a finished page looks like — not real clients. Photos are
// free-to-use Unsplash stock (not Sam, not real client premises). Swap all of it for Sam's
// real story, real client work and real photos before this site goes live.
export const site = {
  name: "Sam K. Socials",
  email: "hello@samksocials.com", // TODO: confirm real email
  tallyFormId: "REPLACE_WITH_TALLY_FORM_ID", // TODO: from your Tally share link (tally.so/r/<id>), optional now
  availability: "Booking new partnerships for next month",
  heroImage: "https://images.unsplash.com/photo-1683170139203-d8a41d680358?w=1000&q=80&auto=format&fit=crop", // TODO: replace with Sam's own content
  // Same photo on About and Contact on purpose — it's meant to be the same person, Sam, in both places.
  // TODO: replace with two real photos of Sam once you have them (a portrait + a candid work shot read well as a pair).
  aboutImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80&auto=format&fit=crop",
  contactImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80&auto=format&fit=crop",
  socials: [
    { label: "Instagram", href: "https://instagram.com/" }, // TODO: real handles
    { label: "TikTok", href: "https://tiktok.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
  ],
};

export const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
];

export const services = [
  {
    id: "social-media-management",
    title: "Social Media Management",
    kind: "Ongoing, done-for-you",
    short: "Done-for-you social, week in, week out.",
    body: "Ongoing, done-for-you social media support including strategy, planning, content creation, copywriting, scheduling, optimisation and reporting depending on scope.",
    points: ["Strategy and monthly planning", "Content creation and copywriting", "Scheduling and community care", "Optimisation and reporting"],
  },
  {
    id: "content-strategy",
    title: "Content Strategy",
    kind: "One-off roadmap",
    short: "A clear roadmap, so your socials don't sink.",
    body: "A one-off strategic roadmap to get clarity around your audience, direction, content pillars, platforms and what you should be creating to stand out, not sink your socials boat.",
    points: ["Audience and platform clarity", "Content pillars and ideas", "Direction you can run with yourself", "One-off, no ongoing commitment"],
  },
  {
    id: "content-sessions",
    title: "Content Sessions",
    kind: "One-off, on location",
    short: "On-location photo and video, shot on iPhone.",
    body: "On-location social-first photo and video content captured on iPhone. Includes planning, shot lists, content capture and raw/edited assets depending on the package.",
    points: ["Planning and shot lists", "On-location capture", "Raw or edited assets", "Built for Reels, Stories and feed"],
  },
  {
    id: "meta-google-ads",
    title: "Meta & Google Ads",
    kind: "Ongoing, paid media",
    short: "Paid campaigns that bring in enquiries.",
    body: "Strategy, setup, management and optimisation of Meta & Google advertising campaigns.",
    points: ["Campaign strategy and setup", "Creative and audience testing", "Ongoing optimisation", "Clear performance reporting"],
  },
  {
    id: "custom-support",
    title: "Custom Support",
    kind: "Flexible, mix and match",
    short: "A bit of this and a bit of that? Totally okay.",
    body: "Think you need a bit of this and a bit of that? Totally okay! Services can be combined into custom packages based on the business, goals and scope.",
    points: ["Mix any services together", "Shaped around your goals", "Scoped to your budget"],
  },
];

// Demo portfolio — fictional businesses standing in for the real shortlist (CP, BB, EIS, MM).
// Max 4 clients on the public site. TODO: swap names, copy, results and coverImage for the
// real clients once approved, and swap Unsplash coverImage URLs for Sam's own work.
export const clients = [
  {
    slug: "cp",
    name: "Corner Press Coffee",
    industry: "Independent café, two Sydney locations",
    did: ["Social media management", "Content sessions"],
    coverImage: "https://images.unsplash.com/photo-1646192040647-2f50e73b59db?w=900&q=80&auto=format&fit=crop",
    need: "Corner Press had loyal regulars but their Instagram hadn't posted in six weeks. New locals scrolling past had no reason to walk in — the feed didn't match how good the coffee actually was.",
    approach: "A monthly shoot day covering both locations, a simple content calendar built around opening hours and seasonal menu drops, and captions written in the owners' actual voice instead of generic café copy.",
    show: "Weekly Reels of the morning rush, latte art close-ups, staff picks Stories, and a full feed refresh — plus the seasonal menu launch that kicked it all off.",
    results: ["+64% Instagram reach in the first 3 months", "Weekend foot traffic visibly up per the owners", "“People now ask for the drink they saw on our Reels.”"],
  },
  {
    slug: "bb",
    name: "Bloom & Bay Skin Studio",
    industry: "Boutique beauty and skin studio",
    did: ["Content strategy", "Content sessions", "Meta & Google Ads"],
    coverImage: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=900&q=80&auto=format&fit=crop",
    need: "Bookings relied entirely on word of mouth. The studio wanted a steady stream of new-client enquiries without feeling like they were \"selling\" on social.",
    approach: "A content pillar system built around treatment education, before-and-after results (with client consent) and studio atmosphere, paired with a small always-on Meta ads budget aimed at their local area.",
    show: "Treatment-day Reels, a redesigned highlight system for services and pricing, and the ad creative that ran alongside the organic content.",
    results: ["38 new client enquiries in the first ad cycle", "Cost per enquiry down 45% after the first optimisation pass", "Fully booked two weeks out, consistently"],
  },
  {
    slug: "eis",
    name: "Everline Studio",
    industry: "Independent fashion boutique",
    did: ["Social media management", "Content strategy"],
    coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80&auto=format&fit=crop",
    need: "A beautiful store that didn't translate online — the feed looked like a catalogue, not a place people wanted to shop.",
    approach: "A visual identity built around styling content instead of flat-lay product shots, a restock and drop calendar the team could actually keep up with, and a content pillar for styling advice that built real following.",
    show: "Styling Reels, restock countdown Stories, a redesigned grid, and the first \"get the look\" carousel series.",
    results: ["Instagram-driven website clicks up 3x over two months", "Follower growth outpaced the previous 12 months combined", "First sold-out drop promoted entirely through the new content approach"],
  },
  {
    slug: "mm",
    name: "Moss & Motion Studio",
    industry: "Boutique fitness and movement studio",
    did: ["Social media management", "Meta & Google Ads"],
    coverImage: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=900&q=80&auto=format&fit=crop",
    need: "New class formats were launching faster than the socials could keep up, and trial-class bookings had plateaued.",
    approach: "A weekly content rhythm tied to the class timetable, instructor-led Reels to build trust before someone's first class, and targeted ads promoting the trial offer to people nearby who'd never trained there.",
    show: "Instructor intro Reels, real class-floor energy (not staged photoshoots), and the trial-offer ad set that ran for six weeks.",
    results: ["Trial-class bookings up 51% over the campaign", "Instructor Reels consistently the best-performing content type", "Two new class formats sold out in their first week"],
  },
];

// Demo testimonials, matched to the demo portfolio above so the story is consistent site-wide.
// TODO: replace with real, permissioned client quotes.
export const testimonials = [
  { quote: "Sam gets our brand better than we do sometimes. Handing over the socials meant we could focus on actually running the café — and it's paying off every week.", name: "Priya Nathan", business: "Corner Press Coffee" },
  { quote: "The ads alone paid for themselves in the first month. What I didn't expect was how much calmer running the studio felt once the content stopped being my problem.", name: "Aroha Bennett", business: "Bloom & Bay Skin Studio" },
  { quote: "Working with Sam felt like having a creative partner, not a vendor. Our first drop under the new strategy sold out — that had never happened before.", name: "Elena Marsh", business: "Everline Studio" },
];

export const process = [
  { title: "Chat", text: "We talk through your goals, your audience and what's not working right now — no pitch, just a proper conversation." },
  { title: "Plan", text: "I map out a strategy, scope and timeline that actually fits your business, then confirm it with you before anything starts." },
  { title: "Create and grow", text: "I get to work, keep you posted along the way, and track what's landing so we can do more of it." },
];
