function SectionHeader({ children }: { children: React.ReactNode }) {
  return <div className="flex items-baseline justify-between gap-4 pb-3">{children}</div>;
}

export default SectionHeader;
