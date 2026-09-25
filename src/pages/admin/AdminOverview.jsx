import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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
      <h1 className="font-display text-3xl font-bold text-foreground">Welcome back</h1>
      <p className="mt-2 text-muted-foreground">Everything here updates the live site as soon as you save.</p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <Link key={c.to} to={c.to} className="no-underline">
            <Card className="h-full py-5 transition-colors hover:bg-secondary">
              <CardHeader className="gap-1.5 px-5">
                <CardTitle className="text-lg">{c.title}</CardTitle>
                <CardDescription>{c.text}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
