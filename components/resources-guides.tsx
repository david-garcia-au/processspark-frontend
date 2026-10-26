"use client";

import { useRef, useState } from "react";
import { ArrowDownToLine, BookOpen, X } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";

type Guide = Dictionary["resourcesPage"]["guides"][number];

export function ResourcesGuides({
  copy,
}: {
  copy: Dictionary["resourcesPage"];
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedGuide, setSelectedGuide] = useState<Guide>();

  function openOverview(guide: Guide) {
    setSelectedGuide(guide);
    dialogRef.current?.showModal();
  }

  function closeOverview() {
    dialogRef.current?.close();
  }

  return (
    <>
      <div className="resources-grid">
        {copy.guides.map((guide) => (
          <article className="resource-card" key={guide.file}>
            <div className="resource-card-copy">
              <h2>{guide.title}</h2>
              <p>{guide.description}</p>
            </div>
            <div className="resource-card-actions">
              <button
                className="resource-overview-link"
                type="button"
                onClick={() => openOverview(guide)}
              >
                <BookOpen size={17} aria-hidden="true" />
                {copy.readOverview}
              </button>
              <a
                className="resource-download-link"
                href={`/guides/${guide.file}`}
                download={guide.file}
              >
                <ArrowDownToLine size={17} aria-hidden="true" />
                {copy.downloadGuide}
              </a>
            </div>
          </article>
        ))}
      </div>
      <dialog
        className="resources-dialog"
        ref={dialogRef}
        aria-labelledby="resources-dialog-title"
        aria-describedby="resources-dialog-description"
        onClose={() => setSelectedGuide(undefined)}
        onCancel={closeOverview}
        onKeyDown={(event) => {
          if (event.key === "Escape") closeOverview();
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeOverview();
        }}
      >
        {selectedGuide && (
          <div className="resources-dialog-content">
            <button
              className="resources-dialog-close"
              type="button"
              onClick={closeOverview}
              aria-label={copy.closeOverview}
              autoFocus
            >
              <X size={20} aria-hidden="true" />
            </button>
            <p className="eyebrow">{copy.overviewLabel}</p>
            <h2 id="resources-dialog-title">{selectedGuide.overviewTitle}</h2>
            <p id="resources-dialog-description">{selectedGuide.overview}</p>
            <a
              className="resource-download-link"
              href={`/guides/${selectedGuide.file}`}
              download={selectedGuide.file}
            >
              <ArrowDownToLine size={17} aria-hidden="true" />
              {copy.downloadGuide}
            </a>
          </div>
        )}
      </dialog>
    </>
  );
}
