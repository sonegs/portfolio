function DataSheet({ children, className }: { children: React.ReactNode; className?: string }) {
  return <dl className={className}>{children}</dl>;
}

export default DataSheet;
