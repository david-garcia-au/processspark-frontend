"use client";

import { useState } from "react";
import { AccentHeading } from "@/components/accent-heading";
import { DataDemo } from "@/components/data-demo";
import { DeskDemo } from "@/components/desk-demo";
import { DocsDemo } from "@/components/docs-demo";
import { FormsDemo } from "@/components/forms-demo";
import { InvoiceDemo } from "@/components/invoice-demo";
import { NcrDemo } from "@/components/ncr-demo";
import { QuotesDemo } from "@/components/quotes-demo";
import type { ProductId } from "@/lib/catalogue";
import type { CrmDemoUi, DocsDemo as DocsDemoData } from "@/lib/crm-demo";
import type { DemoEntry, DemoGalleryCopy, DemoKind, DemoTeamId } from "@/lib/demo-gallery";
import type { DataDemo as DataDemoData } from "@/lib/data-demo";
import type { DeskDemo as DeskDemoData } from "@/lib/desk-demo";
import type { FormsDemo as FormsDemoData } from "@/lib/forms-demo";
import type { InvoiceDemo as InvoiceDemoData } from "@/lib/invoice-demo";
import type { NcrDemo as NcrDemoData } from "@/lib/ncr-demo";
import type { QuotesDemo as QuotesDemoData } from "@/lib/quotes-demo";

type Scripts = {
  "docs-manuals": DocsDemoData;
  "docs-contracts": DocsDemoData;
  quotes: QuotesDemoData;
  desk: DeskDemoData;
  invoices: InvoiceDemoData;
  forms: FormsDemoData;
  ncr: NcrDemoData;
  data: DataDemoData;
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
 * One filter at a time: a small switch picks "by product" or "by team", and a
 * single row of chips (each with its demo count) narrows the list below.
 * Each demo keeps its own player; filtering only shows or hides them.
 */
export function DemoGallery({ copy, ui, entries, scripts, products, teams }: DemoGalleryProps) {
  const [mode, setMode] = useState<"product" | "team">("product");
  const [pick, setPick] = useState<string | null>(null);
  const productName = new Map(products.map((p) => [p.id, p.name]));

  const shown = entries.filter((e) =>
    !pick
      ? true
      : mode === "product"
        ? e.products.includes(pick as ProductId)
        : e.teams.includes(pick as DemoTeamId),
  );
  const options =
    mode === "product"
      ? products.map((p) => ({
          id: p.id as string,
          label: p.name,
          count: entries.filter((e) => e.products.includes(p.id)).length,
        }))
      : teams.map((t) => ({
          id: t as string,
          label: copy.teams[t],
          count: entries.filter((e) => e.teams.includes(t)).length,
        }));

  return (
    <>
      <div className="demos-filters" role="group" aria-label={copy.filters.label}>
        <div className="demos-mode" role="tablist" aria-label={copy.filters.label}>
          {(["product", "team"] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              className="demos-mode-btn"
              aria-selected={mode === m}
              onClick={() => {
                setMode(m);
                setPick(null);
              }}
            >
              {m === "product" ? copy.filters.byProduct : copy.filters.byTeam}
            </button>
          ))}
        </div>
        <div className="demos-chips" role="group" aria-label={mode === "product" ? copy.filters.byProduct : copy.filters.byTeam}>
          <button type="button" className="demos-chip" aria-pressed={pick === null} onClick={() => setPick(null)}>
            {copy.filters.all}
          </button>
          {options.map((o) => (
            <button
              key={o.id}
              type="button"
              className="demos-chip"
              aria-pressed={pick === o.id}
              onClick={() => setPick(pick === o.id ? null : o.id)}
            >
              {o.label}
              <span className="demos-chip-n">{o.count}</span>
            </button>
          ))}
        </div>
      </div>

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
            ) : e.kind === "desk" ? (
              <DeskDemo demo={scripts.desk} ui={ui} />
            ) : e.kind === "invoices" ? (
              <InvoiceDemo demo={scripts.invoices} ui={ui} />
            ) : e.kind === "forms" ? (
              <FormsDemo demo={scripts.forms} ui={ui} />
            ) : e.kind === "ncr" ? (
              <NcrDemo demo={scripts.ncr} ui={ui} />
            ) : e.kind === "data" ? (
              <DataDemo demo={scripts.data} ui={ui} />
            ) : (
              <DocsDemo demo={scripts[e.kind]} ui={ui} />
            )}
          </section>
        ))}
      </div>
    </>
  );
}
