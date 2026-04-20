import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/sign-in/$")({
  component: SignInPage,
});

function SignInPage() {
  return (
    <section className="hero">
      <div className="copy">
        <Link to="/" className="btn-secondary">
          <ArrowLeft size={16} />
          <span>Back Home</span>
        </Link>
        <h1>
          Sign in to <span className="text-gradient">Flux</span>
        </h1>
        <p>
          This placeholder route gives the navbar a valid typed destination
          until the full auth screen is wired in.
        </p>
      </div>
    </section>
  );
}
