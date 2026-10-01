// A band of the sheet. The parts are separate components the caller composes, so a
// band with nothing on the right simply leaves SectionLink out.
function Section({ children, className = "pt-20 md:pt-28" }: { children: React.ReactNode; className?: string }) {
  return <section className={className}>{children}</section>;
}

export default Section;
