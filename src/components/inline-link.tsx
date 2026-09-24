// A link inside running text: underlined in the rule colour, dyed on hover.
export function InlineLink({ href, children, ...rest }: React.ComponentProps<"a">) {
  return (
    <a
      className="underline decoration-rule underline-offset-4 transition-colors duration-200 hover:text-dye hover:decoration-dye"
      href={href}
      {...rest}
    >
      {children}
    </a>
  );
}
