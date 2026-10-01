// Copy is written with a blank line between paragraphs. A single newline is a wrap
// inside a paragraph, not a break.
export function toParagraphs(text: string) {
  return text.split("\n\n");
}
