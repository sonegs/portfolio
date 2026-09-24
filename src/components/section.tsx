import { Rule } from "@/components/rule";

// Every band of the sheet is the same three parts: a heading row, a hairline, a body.
// They hang off Section so a caller composes what it needs in place — the bands with
// nothing on the right simply leave Link out.
function Section({ children, className = "pt-20 md:pt-28" }: { children: React.ReactNode; className?: string }) {
  return <section className={className}>{children}</section>;
}

function Header({ children }: { children: React.ReactNode }) {
  return <div className="flex items-baseline justify-between gap-4 pb-3">{children}</div>;
}

function Title({ children }: { children: React.ReactNode }) {
  return <h2 className="label text-xs text-ink-soft">{children}</h2>;
}

function SectionLink({ href, children, ...rest }: Omit<React.ComponentProps<"a">, "className">) {
  return (
    <a
      className="label text-[0.68rem] text-ink-soft underline decoration-rule underline-offset-4 transition-colors duration-200 hover:text-dye hover:decoration-dye"
      href={href}
      {...rest}
    >
      {children}
    </a>
  );
}

Section.Header = Header;
Section.Title = Title;
Section.Link = SectionLink;
Section.Rule = Rule;

export { Section };
