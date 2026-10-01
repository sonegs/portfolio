function Section({ children, className = "pt-20 md:pt-28" }: { children: React.ReactNode; className?: string }) {
  return <section className={className}>{children}</section>;
}

export default Section;
