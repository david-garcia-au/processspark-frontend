import { palette } from "@/lib/theme";

/** Brand mark for generated images (ImageResponse): the app/icon.svg bolt. */
export function BrandMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill={palette.orange} />
      <path d="M35 9 15 35h15l-2 20 21-29H34z" fill={palette.forestDeep} />
    </svg>
  );
}
