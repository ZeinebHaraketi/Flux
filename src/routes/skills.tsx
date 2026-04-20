import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Plus } from "lucide-react";

import SkillCard from "#/components/SkillCard";
import { dummySkills } from "#/lib/dummy-skills";

export const Route = createFileRoute("/skills")({
  component: SkillsPage,
});

function SkillsPage() {
  return (
    <div id="skills-page">
      <section className="latest">
        <div className="space-y-2">
          <Link to="/" className="btn-secondary">
            <ArrowLeft size={16} />
            <span>Back Home</span>
          </Link>
          <h1>
            Browse <span className="text-gradient">Registry</span>
          </h1>
          <p>
            Explore reusable skills and jump into the latest additions from the
            registry.
          </p>
        </div>

        <div className="actions">
          <Link to="/skills/new" className="btn-primary">
            <Plus size={18} />
            <span>Publish Skill</span>
          </Link>
        </div>

        <div>
          {dummySkills.length > 0 ? (
            <div className="skills-grid">
              {dummySkills.map((skill) => (
                <SkillCard key={skill.id} {...skill} />
              ))}
            </div>
          ) : (
            <p>No skills have been created yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
