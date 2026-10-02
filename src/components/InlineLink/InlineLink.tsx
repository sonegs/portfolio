function InlineLink({ href, children, ...rest }: Omit<React.ComponentProps<"a">, "className">) {
  return (
    <a
      className="underline decoration-rule underline-offset-4 transition-colors duration-300 ease-out hover:text-dye hover:decoration-dye"
      href={href}
      {...rest}
    >
      {children}
    </a>
  );
}

export default InlineLink;
