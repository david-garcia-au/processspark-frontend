import { ArrowRight, Phone } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
/**
 * Home page "How it works": four steps on one path. Scrolling draws the line
 * from step to step (app/journey.css). The pictures are illustrative and
 * contain no results, figures or customer names.
 */
export function ApproachJourney({
  copy,
}: {
  copy: Dictionary["homePage"]["how"];
}) {
  const [one, two, three, four] = copy.steps;
  return (
    <section
      className="home-section shell"
      id="approach"
      aria-labelledby="approach-title"
    >
      <h2 id="approach-title" className="home-heading">
        <span className="heading-line">{copy.heading.line1}</span>{" "}
        <span className="heading-line">{copy.heading.line2}</span>
      </h2>
      <ol className="journey">
        <li className="journey-step">
          <span className="journey-node" aria-hidden="true">
            1
          </span>
          <h3>{one.title}</h3>
          <p>{one.text}</p>
          <div className="journey-art" aria-hidden="true">
            <div className="journey-call">
              <span className="journey-call-head">
                <Phone size={14} />
                {copy.call.title}
              </span>
              {copy.call.lines.map((line) => (
                <span key={line} className="journey-call-line">
                  {line}
                </span>
              ))}
            </div>
            <p className="journey-foot">{copy.call.mapped}</p>
          </div>
        </li>
        <li className="journey-step">
          <span className="journey-node" aria-hidden="true">
            2
          </span>
          <h3>{two.title}</h3>
          <p>{two.text}</p>
          <div className="journey-art" aria-hidden="true">
            <ul className="journey-pick">
              {copy.pick.options.map((option, i) => (
                <li
                  key={option}
                  data-chosen={i === copy.pick.chosen ? "true" : undefined}
                >
                  <span className="journey-radio" />
                  {option}
                </li>
              ))}
            </ul>
            <p className="journey-foot">{copy.pick.foot}</p>
          </div>
        </li>
        <li className="journey-step">
          <span className="journey-node" aria-hidden="true">
            3
          </span>
          <h3>{three.title}</h3>
          <p>{three.text}</p>
          <div className="journey-art" aria-hidden="true">
            <div className="journey-pilot">
              <span className="journey-pilot-label">{copy.pilot.label}</span>
              <ul>
                {copy.pilot.chips.map((chip) => (
                  <li key={chip}>{chip}</li>
                ))}
              </ul>
            </div>
            <p className="journey-foot">{copy.pilot.foot}</p>
          </div>
        </li>
        <li className="journey-step">
          <span className="journey-node" aria-hidden="true">
            4
          </span>
          <h3>{four.title}</h3>
          <p>{four.text}</p>
          <div className="journey-art" aria-hidden="true">
            <div className="journey-measure">
              <span>{copy.measure.before}</span>
              <i className="journey-bar journey-bar-before" />
              <span>{copy.measure.after}</span>
              <i className="journey-bar journey-bar-after" />
            </div>
            <p className="journey-foot">{copy.measure.foot}</p>
          </div>
        </li>
      </ol>
      <a className="journey-cta pill" href="#contact">
        {copy.cta} <ArrowRight size={18} aria-hidden="true" />
      </a>
    </section>
  );
}
