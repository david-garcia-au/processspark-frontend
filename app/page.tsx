import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Check,
  Factory,
  FilePenLine,
  Files,
  Layers3,
  Mail,
  MoveUpRight,
  Search,
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
import { Media } from "@/components/media";
import { pains, useCases } from "@/lib/content";
import { slugify } from "@/lib/media";
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
                <span className="orange-line" /> FOR MANUFACTURING, LOGISTICS &
                INDUSTRIAL SERVICES
              </p>
              <h1>
                Less manual work.
                <span className="orange">Smoother operations.</span>
              </h1>
              <p className="hero-lead">
                <strong>Make everyday work easier, faster and more reliable.</strong>
              </p>
              <p className="hero-description hero-introduction">
                Too much time spent on paperwork, spreadsheets and repetitive
                tasks? We help manufacturing and operational businesses simplify
                everyday work, reduce errors and get more done with the people
                and systems they already have.
              </p>
              <p className="hero-description">
                From the factory floor to the back office, we find the work that
                slows your team down and build practical solutions around your
                existing processes and systems.
              </p>
              <div className="hero-actions">
                <Button asChild className="button-primary">
                  <a href="#contact">
                    Show us what&rsquo;s slowing you down <ArrowUpRight size={18} />
                  </a>
                </Button>
                <a className="text-link" href="#capabilities">
                  Explore the possibilities <ArrowDown size={16} />
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
        </section>
        <section className="business-band" aria-label="Industries we work with">
          <div className="shell">
            <h2 className="business-promise">
              Less repetitive work.
              <span>More time for what matters.</span>
            </h2>
            <div className="business-audience">
              <p className="business-intro">
                <span>FOR BUSINESSES THAT</span>
                <strong>make. move. maintain.</strong>
              </p>
              <ul className="business-sectors" aria-label="Business sectors">
                <li>
                  <Factory aria-hidden="true" />
                  <span className="sector-label">Manufacturing</span>
                </li>
                <li>
                  <Layers3 aria-hidden="true" />
                  <span className="sector-label">Engineering</span>
                </li>
                <li>
                  <Truck aria-hidden="true" />
                  <span className="sector-label">Logistics</span>
                </li>
                <li>
                  <Boxes aria-hidden="true" />
                  <span className="sector-label">Warehousing</span>
                </li>
                <li>
                  <Wrench aria-hidden="true" />
                  <span className="sector-label">Industrial services</span>
                </li>
              </ul>
            </div>
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
              It’s the paperwork, manual checks and repetitive administration
              <br className="desktop-break" /> that slow them down.
            </p>
          </div>
          <div className="pain-grid">
            {pains.map((pain, i) => (
              <article className="pain-card" key={pain.role}>
                <Media
                  slot={`pain-${slugify(pain.role)}`}
                  className="media-flush"
                  sizes="(max-width: 850px) 100vw, 33vw"
                />
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
            <span>Not sure where to start?</span> Show us the repetitive work
            your team would happily stop doing.
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
                From paperwork and reporting to customer requests and quality
                checks. Explore how everyday tasks could become simpler, faster
                and more reliable.
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
                <Media
                  slot={`use-case-${slugify(item.title)}`}
                  className="media-flush"
                  sizes="(max-width: 540px) 100vw, (max-width: 850px) 50vw, 33vw"
                />
                <div className="use-case-body">
                  <div className="case-top">
                    <span className="case-icon">
                      {i === 0 ? (
                        <Files />
                      ) : i === 1 ? (
                        <ShieldCheck />
                      ) : i === 2 ? (
                        <Activity />
                      ) : i === 3 ? (
                        <Mail />
                      ) : i === 4 ? (
                        <Search />
                      ) : (
                        <FilePenLine />
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
                </div>
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
                We start by understanding how your business works today. Then we
                identify a practical improvement, test it with real information
                and measure the results before committing to a larger solution.
              </p>
            </div>
            <div className="approach-grid">
              {[
                [
                  "Show us the process",
                  "Show us the repetitive tasks, paperwork or manual processes that consume your team’s time.",
                ],
                [
                  "Find the opportunity",
                  "Identify where time is being lost, where mistakes happen and which improvements could deliver the greatest value.",
                ],
                [
                  "Prove it works",
                  "Test a focused solution using real examples from your business, so you can see what works before making a bigger commitment.",
                ],
                [
                  "Measure the result",
                  "Measure time saved, accuracy, reliability and the impact on your team’s everyday work.",
                ],
                [
                  "Put it to work",
                  "When the results justify the investment, connect the solution to your existing systems and make it part of your everyday operations.",
                ],
              ].map(([title, text], i) => (
                <article key={title}>
                  <Media
                    slot={`approach-${slugify(title)}`}
                    tone="dark"
                    sizes="(max-width: 850px) 50vw, 20vw"
                  />
                  <span className="approach-number">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
            <div className="agnostic">
              <span>
                <Zap size={22} />
                <strong>Solutions that work with what you already have.</strong>
              </span>
              <p>
                We work with your existing documents, spreadsheets, databases
                and business systems. Whether the answer involves AI, software
                integration or a simpler workflow, we choose the approach that
                makes the most sense for your business.
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
              Tell us about a task that takes too long, a spreadsheet that needs
              constant updating or paperwork your team would rather not deal
              with. We’ll help you identify whether there’s a practical way to
              make the work easier.
            </p>
            <div className="contact-benefits">
              <span>
                <Check size={18} /> A conversation about your challenges
              </span>
              <span>
                <Check size={18} /> An honest assessment of the opportunity
              </span>
              <span>
                <Check size={18} /> A clear and practical next step
              </span>
            </div>
            <Media slot="contact-team" className="contact-media" />
            <div className="contact-signoff">
              <MoveUpRight size={33} />
              <span>
                No technical knowledge required. <br />
                <strong>Just tell us what’s slowing your team down.</strong>
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
          <span>Practical solutions for real-world operations.</span>
          <a href="#main">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
