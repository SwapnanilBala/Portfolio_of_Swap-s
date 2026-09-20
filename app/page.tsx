import { content } from "@/lib/content";
import type { Project } from "@/lib/types";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectEntry } from "@/components/ProjectEntry";
import { ExperienceEntry } from "@/components/ExperienceEntry";

/**
 * Flagship first, then content order. Not chronology — the strongest work
 * should be the thing a reader with ninety seconds actually reaches.
 */
function byFlagshipFirst(a: Project, b: Project): number {
  return Number(b.flagship ?? false) - Number(a.flagship ?? false);
}

export default function Page() {
  // Content is readonly throughout, so sorting copies rather than mutates.
  const projects = [...content.projects].sort(byFlagshipFirst);

  return (
    <main className="shell">
      <div className="reveal" data-reveal="1">
        <Hero
          profile={content.profile}
          hero={content.hero}
          routes={content.contactRoutes}
        />
      </div>

      <section className="section reveal" data-reveal="2">
        <SectionHeading heading={content.sections.projects} />
        {projects.map((project, index) => (
          <ProjectEntry
            key={project.slug}
            project={project}
            mediaLabels={content.mediaLabels}
            ordinal={index + 1}
          />
        ))}
      </section>

      <section className="section reveal" data-reveal="3">
        <SectionHeading heading={content.sections.experience} />
        {content.experience.map((experience, index) => (
          <ExperienceEntry
            key={experience.slug}
            experience={experience}
            ordinal={index + 1}
            affiliation={content.experienceAffiliation}
          />
        ))}
      </section>

      <section className="section">
        <SectionHeading heading={content.sections.contact} />
        <div className="entry">
          <div className="entry-gutter-col" />
          <div className="prose">
            {content.contact.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ul className="contact-list">
              {content.contactRoutes.map((route) => (
                <li key={route.key}>
                  <span className="contact-key">{route.key}</span>
                  <a href={route.href}>{route.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="colophon">{content.colophon}</footer>
    </main>
  );
}
