import { Link } from "react-router-dom";

const cards = [
  { to: "/admin/site", title: "Site settings", text: "Email, socials, availability line and the Tally form ID." },
  { to: "/admin/services", title: "Services", text: "What's on the Home carousel and the Services page." },
  { to: "/admin/process", title: "Process", text: "The 3-step \"how we work together\" section." },
  { to: "/admin/portfolio", title: "Portfolio", text: "Case studies, max 4 clients." },
  { to: "/admin/testimonials", title: "Testimonials", text: "Client quotes shown on Home and Services." },
  { to: "/admin/enquiries", title: "Enquiries", text: "Messages sent through the Contact form." },
];

export default function AdminOverview() {
  return (
    <div>
      <h1>Welcome back</h1>
      <p className="lede">Everything here updates the live site as soon as you save.</p>
      <div className="admin-cards">
        {cards.map((c) => (
          <Link key={c.to} to={c.to} className="admin-cards__item">
            <h2>{c.title}</h2>
            <p>{c.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
