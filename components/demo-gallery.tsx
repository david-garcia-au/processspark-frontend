"use client";

import { useState } from "react";
import { AccentHeading } from "@/components/accent-heading";
import { DocsDemo } from "@/components/docs-demo";
import { QuotesDemo } from "@/components/quotes-demo";
import type { ProductId } from "@/lib/catalogue";
import type { CrmDemoUi, DocsDemo as DocsDemoData } from "@/lib/crm-demo";
import type { DemoEntry, DemoGalleryCopy, DemoKind, DemoTeamId } from "@/lib/demo-gallery";
import type { QuotesDemo as QuotesDemoData } from "@/lib/quotes-demo";

type Scripts = {
  "docs-manuals": DocsDemoData;
  "docs-contracts": DocsDemoData;
  quotes: QuotesDemoData;
};

type DemoGalleryProps = {
  copy: DemoGalleryCopy;
  ui: CrmDemoUi;
  entries: readonly DemoEntry[];
  scripts: Scripts;
  /** Names of the products that have a demo, in catalogue order. */
  products: { id: ProductId; name: string }[];
  teams: DemoTeamId[];
};

function headingOf(kind: DemoKind, scripts: Scripts) {
  return (
    <AccentHeading
      text={scripts[kind].heading}
      accent={scripts[kind].headingAccent}
    />
  );
}

/**
 * Filter chips (one product, one team, or all) and the matching demos below.
 * Each demo keeps its own player; filtering only shows or hides them.
 */
export function DemoGallery({ copy, ui, entries, scripts, products, teams }: DemoGalleryProps) {
  const [product, setProduct] = useState<ProductId | null>(null);
  const [team, setTeam] = useState<DemoTeamId | null>(null);
  const productName = new Map(products.map((p) => [p.id, p.name]));

  const shown = entries.filter(
    (e) => (!product || e.products.includes(product)) && (!team || e.teams.includes(team)),
  );

  return (
    <>
      <div className="demos-filters" role="group" aria-label={copy.filters.label}>
        <div className="demos-filter">
          <span className="demos-filter-name" id="demos-filter-product">
            {copy.filters.product}
          </span>
          <div className="demos-chips" role="group" aria-labelledby="demos-filter-product">
            <button
              type="button"
              className="demos-chip"
              aria-pressed={product === null}
              onClick={() => setProduct(null)}
            >
              {copy.filters.all}
            </button>
            {products.map((p) => (
              <button
                key={p.id}
                type="button"
                className="demos-chip"
                aria-pressed={product === p.id}
                onClick={() => setProduct(product === p.id ? null : p.id)}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
        <div className="demos-filter">
          <span className="demos-filter-name" id="demos-filter-team">
            {copy.filters.team}
          </span>
          <div className="demos-chips" role="group" aria-labelledby="demos-filter-team">
            <button
              type="button"
              className="demos-chip"
              aria-pressed={team === null}
              onClick={() => setTeam(null)}
            >
              {copy.filters.all}
            </button>
            {teams.map((t) => (
              <button
                key={t}
                type="button"
                className="demos-chip"
                aria-pressed={team === t}
                onClick={() => setTeam(team === t ? null : t)}
              >
                {copy.teams[t]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="demos-count" aria-live="polite">
        {shown.length === 0 ? copy.empty : null}
      </p>
      {shown.length === 0 ? (
        <button
          type="button"
          className="demos-reset"
          onClick={() => {
            setProduct(null);
            setTeam(null);
          }}
        >
          {copy.showAll}
        </button>
      ) : null}

      <div className="demos-list">
        {shown.map((e) => (
          <section className="demos-item" id={e.id} key={e.id} aria-labelledby={`${e.id}-title`}>
            <div className="demos-item-head">
              <h2 id={`${e.id}-title`}>{headingOf(e.kind, scripts)}</h2>
              <ul className="demos-tags">
                {e.products.map((p) => (
                  <li key={p} data-kind="product">
                    {productName.get(p)}
                  </li>
                ))}
                {e.teams.map((t) => (
                  <li key={t}>{copy.teams[t]}</li>
                ))}
              </ul>
            </div>
            {e.kind === "quotes" ? (
              <QuotesDemo demo={scripts.quotes} ui={ui} />
            ) : (
              <DocsDemo demo={scripts[e.kind]} ui={ui} />
            )}
          </section>
        ))}
      </div>
    </>
  );
}
