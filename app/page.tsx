import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Check,
  Factory,
  Layers3,
  MoveUpRight,
  ShieldCheck,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";
import { Header, Brand } from "@/components/header";
import { Button } from "@/components/ui/button";
import { ProcessExplorer } from "@/components/process-explorer";
import {
  TransformationVisuals,
  VisionHero,
} from "@/components/transformation-visuals";
import { ProcessBrief } from "@/components/process-brief";
import { pains, useCases } from "@/lib/content";
export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <section className="hero">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="orange-line" /> AI & MACHINE LEARNING FOR YOUR
                BUSINESS
              </p>
              <h1>
                Less manual work.
                <span className="orange">
                  More business
                  <br />
                  possibility.
                </span>
              </h1>
              <p className="hero-lead">
                Transform the way work gets done.
                <br />
                With practical AI and machine learning.
              </p>
              <p className="hero-description">
                From counting products on a conveyor to reading paper forms, we
                turn repetitive work into connected, intelligent processes. More
                capacity. Fewer manual checks. More time for your people.
              </p>
              <div className="hero-actions">
                <Button asChild className="button-primary">
                  <a href="#contact">
                    Show us your process <ArrowUpRight size={18} />
                  </a>
                </Button>
                <a className="text-link" href="#capabilities">
                  See what could change <ArrowDown size={16} />
                </a>
              </div>
              <div className="hero-points">
                <span>
                  <Check /> Built around your business
                </span>
                <span>
                  <Check /> Connected to your systems
                </span>
              </div>
            </div>
            <VisionHero />
          </div>
          <div className="shell hero-foot">
            <span>LESS CHECKING. LESS COPYING. MORE GETTING THINGS DONE.</span>
            <span>
              01 — THE OPPORTUNITY <ArrowDown size={14} />
            </span>
          </div>
        </section>
        <section
          className="industry-strip"
          aria-label="Industries we work with"
        >
          <div className="shell industry-inner">
            <p>
              FOR BUSINESSES THAT <br />
              <strong>make. move. maintain.</strong>
            </p>
            <span>
              <Factory /> Manufacturing
            </span>
            <span>
              <Layers3 /> Engineering
            </span>
            <span>
              <Truck /> Logistics
            </span>
            <span>
              <Boxes /> Warehousing
            </span>
            <span>
              <Wrench /> Industrial services
            </span>
          </div>
        </section>
        <TransformationVisuals />
        <section className="section shell" id="problems">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE WORK BEHIND THE WORK</p>
              <h2>Sound familiar?</h2>
            </div>
            <p>
              Your people know their jobs. <br />
              It’s the repetitive work around them
              <br className="desktop-break" /> that’s holding things up.
            </p>
          </div>
          <div className="pain-grid">
            {pains.map((pain, i) => (
              <article className="pain-card" key={pain.role}>
                <div className="card-top">
                  <span className="eyebrow">{pain.role}</span>
                  <span className="card-index">0{i + 1}</span>
                </div>
                <blockquote>{pain.quote}</blockquote>
                <p>{pain.answer}</p>
                <a href="#capabilities">
                  {pain.tag}
                  <ArrowUpRight size={19} />
                </a>
              </article>
            ))}
          </div>
          <div className="under-note">
            <span>Not sure where AI fits?</span> Start with the work you wish
            your people didn’t have to do.
            <a href="#contact">
              Let’s find it together <ArrowRight size={15} />
            </a>
          </div>
        </section>
        <section className="capabilities-section" id="capabilities">
          <div className="shell section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">SAME BUSINESS. BETTER PROCESS.</p>
                <h2>
                  What is your team <br />
                  still doing manually?
                </h2>
              </div>
              <p>
                Seven kinds of everyday work. <br />
                Explore what could happen when <br />
                the routine parts take care of themselves.
              </p>
            </div>
            <ProcessExplorer />
          </div>
        </section>
        <section className="section shell" id="use-cases">
          <div className="section-heading">
            <div>
              <p className="eyebrow">PRACTICAL POSSIBILITIES</p>
              <h2>Real work. Real applications.</h2>
            </div>
            <a className="text-link" href="#contact">
              Find your starting point <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="use-case-grid">
            {useCases.map((item, i) => (
              <a className="use-case" key={item.title} href="#contact">
                <div className="case-top">
                  <span className="case-icon">
                    {i === 0 ? (
                      <Factory />
                    ) : i === 1 ? (
                      <ShieldCheck />
                    ) : i === 2 ? (
                      <Wrench />
                    ) : i === 3 ? (
                      <Truck />
                    ) : i === 4 ? (
                      <Layers3 />
                    ) : (
                      <Activity />
                    )}
                  </span>
                  <ArrowUpRight size={20} />
                </div>
                <p className="eyebrow">{item.sector}</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="case-link">
                  Explore the opportunity <ArrowRight size={15} />
                </span>
              </a>
            ))}
          </div>
          <p className="section-note">
            Examples of what we can build. Each solution is validated against
            your data, processes and requirements.
          </p>
        </section>
        <section className="approach-section" id="approach">
          <div className="shell section">
            <div className="approach-intro">
              <div>
                <p className="eyebrow">
                  FROM MANUAL PROCESS TO WORKING SOLUTION
                </p>
                <h2>
                  You don’t need an AI project. <br />
                  <span>You need a problem worth solving.</span>
                </h2>
              </div>
              <p>
                We start on the operational side of the table. Then we prove the
                value before making the investment bigger.
              </p>
            </div>
            <div className="approach-grid">
              {[
                [
                  "Show us the process",
                  "Walk us through the work that consumes time, creates delays or limits capacity.",
                ],
                [
                  "Find the opportunity",
                  "Map today’s process and identify where a change could make a measurable difference.",
                ],
                [
                  "Prove it works",
                  "Build a focused proof of value with your real documents, images or data.",
                ],
                [
                  "Measure the result",
                  "Assess accuracy, time saved and operational impact together.",
                ],
                [
                  "Put it to work",
                  "When the numbers make sense, integrate the solution into everyday operations.",
                ],
              ].map(([title, text], i) => (
                <article key={title}>
                  <span className="approach-number">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
            <div className="agnostic">
              <span>
                <Zap size={22} />
                <strong>The right tools for your process.</strong>
              </span>
              <p>
                Computer vision, machine learning, AI and conventional software.
                Technology and hyperscaler agnostic. Integrated with the systems
                you already use.
              </p>
              <span className="agnostic-note">
                If AI isn’t the right tool, <br />
                we’ll tell you.
              </span>
            </div>
          </div>
        </section>
        <section id="contact" className="section shell contact-grid">
          <div className="contact-copy">
            <p className="eyebrow">START WITH ONE PROCESS</p>
            <h2>
              What would your team <br />
              do with <span className="orange">that time back?</span>
            </h2>
            <p>
              Show us the repetitive task, the spreadsheet, the pile of
              documents. We’ll help you work out whether it’s a good candidate
              for AI or automation.
            </p>
            <div className="contact-benefits">
              <span>
                <Check size={18} /> A conversation about your operation
              </span>
              <span>
                <Check size={18} /> An honest view of what’s possible
              </span>
              <span>
                <Check size={18} /> A practical next step
              </span>
            </div>
            <div className="contact-signoff">
              <MoveUpRight size={33} />
              <span>
                No AI use case required. <br />
                <strong>Just tell us what happens today.</strong>
              </span>
            </div>
          </div>
          <ProcessBrief />
        </section>
      </main>
      <footer>
        <div className="shell footer-main">
          <Brand />
          <p>
            Less manual work. <br />
            More room for what matters.
          </p>
          <a href="#contact">
            Let’s talk process <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="shell footer-bottom">
          <span>© {new Date().getFullYear()} ProcessSpark</span>
          <span>Practical AI for real-world operations.</span>
          <a href="#main">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
