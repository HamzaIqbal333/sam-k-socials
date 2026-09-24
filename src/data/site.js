// Single source of truth for copy shared across pages. Demo copy: swap for final copywriter text.
export const site = {
  name: "Sam K. Socials",
  email: "hello@samksocials.com", // TODO: confirm real email
  tallyFormId: "REPLACE_WITH_TALLY_FORM_ID", // TODO: from your Tally share link (tally.so/r/<id>)
  availability: "Booking new partnerships for next month", // TODO: keep current or swap for a waitlist line
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

// Max 4 clients. Names are placeholders until shortlist (CP, BB, EIS, EFFF, MM, IJ).
export const clients = [
  { slug: "cp", name: "Client CP", industry: "Industry TBC", did: ["Social media management", "Content creation"] },
  { slug: "bb", name: "Client BB", industry: "Industry TBC", did: ["Content strategy", "Content sessions"] },
  { slug: "eis", name: "Client EIS", industry: "Industry TBC", did: ["Meta & Google ads"] },
  { slug: "mm", name: "Client MM", industry: "Industry TBC", did: ["Social media management", "Ads"] },
].map((c) => ({
  ...c,
  need: "Placeholder: a very short explanation of what the client needed.",
  approach: "Placeholder: a very short explanation of the approach taken.",
  show: "Placeholder: reels, stories, statics, launches, and the feed before and after.",
  results: ["Placeholder result: growth or engagement figure", "Placeholder result: client feedback"],
}));

// Testimonials: name + business in plain text (logos optional later).
export const testimonials = [
  { quote: "Placeholder testimonial: what it was like working with Sam and what changed for the business.", name: "Client Name", business: "Business Name" },
  { quote: "Placeholder testimonial: a second, shorter line about the results and the experience.", name: "Client Name", business: "Business Name" },
  { quote: "Placeholder testimonial: a third quote, ideally mentioning enquiries or growth.", name: "Client Name", business: "Business Name" },
];

export const process = [
  { title: "Chat", text: "Placeholder: we talk goals, audience and what's not working." },
  { title: "Plan", text: "Placeholder: I map out the strategy, scope and timeline." },
  { title: "Create and grow", text: "Placeholder: I make it happen, then track and refine." },
];
