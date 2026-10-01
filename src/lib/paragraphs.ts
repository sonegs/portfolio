// Copy that runs to more than one paragraph is written with a blank line between them,
// the way it is typed. A single newline is a wrap inside a paragraph, not a break, so
// only the blank line splits. Shared because two features render such copy.
export function toParagraphs(text: string) {
  return text.split("\n\n");
}
