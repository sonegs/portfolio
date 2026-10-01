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

export default SectionLink;
