import Image from "next/image";
import { Check, Sparkles } from "lucide-react";
import { CatalogueIcon } from "@/components/catalogue-icon";
import type { ProductView } from "@/lib/catalogue";

/** One photo of the real job per solution, from public/images. */
const photoOf: Record<string, string> = {
  "digitise-paperwork": "copy-by-hand.webp",
  "talk-to-your-data": "dashboard.webp",
  "talk-to-your-documents": "error-code-machine.webp",
  "employee-service-desk": "manufacturing-traveller.webp",
  "invoice-bookkeeping": "hero.webp",
  "quotes-rfqs": "email-manager.webp",
  "estimating-bids": "contract-summary.webp",
  "customer-portal": "email-manager-wide.webp",
  "supplier-portal": "warehouse-manager.webp",
  "contractor-portal": "boiler-room.webp",
  "sensors-iot": "bottle-inspection.webp",
};

/**
 * Photo of the work with two app cards floating over it, after Mitti's
 * "One platform that fits in your pocket": top right, the pain as it is
 * typed into the app; bottom right, the solution that picks it up. Server
 * component; the client explorer receives it as a prop.
 */
export function ProblemVisual({
  product,
  question,
  priority = false,
}: {
  product: ProductView;
  /** The problem in the customer's words. */
  question: string;
  priority?: boolean;
}) {
  const photo = photoOf[product.id] ?? "hero.webp";
  return (
    <div className="pv">
      <Image
        className="pv-photo"
        src={`/images/${photo}`}
        alt=""
        fill
        sizes="(max-width: 900px) 100vw, 640px"
        priority={priority}
      />
      <div className="pv-card pv-card-top">
        <div className="pv-card-inner">
          <p className="pv-card-head">
            <Sparkles size={18} />
            {product.shortName}
          </p>
          <p className="pv-card-text">{question}</p>
        </div>
      </div>
      <div className="pv-card pv-card-bottom">
        <div className="pv-card-inner">
          <span className="pv-card-icon">
            <CatalogueIcon name={product.icon} size={18} />
          </span>
          <p className="pv-card-text">{product.menuHint}</p>
          <span className="pv-card-check">
            <Check size={14} />
          </span>
        </div>
      </div>
    </div>
  );
}
