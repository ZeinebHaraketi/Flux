import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/skills/new")({
  component: NewSkillPage,
});

function NewSkillPage() {
  return (
    <section className="hero">
      <div className="copy">
        <Link to="/skills" className="btn-secondary">
          <ArrowLeft size={16} />
          <span>Back to Registry</span>
        </Link>
        <h1>
          Publish a <span className="text-gradient">Skill</span>
        </h1>
        <p>
          This route is ready for the creation flow. Hook your form here when
          you are ready to submit new skills.
        </p>
      </div>
    </section>
  );
}
