/** Heading text with its closing phrase in the logo orange. */
export function AccentHeading({
  text,
  accent,
}: {
  text: string;
  accent?: string;
}) {
  const at = accent ? text.lastIndexOf(accent) : -1;
  if (!accent || at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <span className="spark-text">{accent}</span>
      {text.slice(at + accent.length)}
    </>
  );
}
