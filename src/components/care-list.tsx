function CareList({ children }: { children: React.ReactNode }) {
  return <ul>{children}</ul>;
}

function Instruction({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 border-b border-rule/60 py-3 text-ink-soft">
      <span aria-hidden className="mt-[0.55em] h-[6px] w-[6px] shrink-0 bg-dye" />
      {children}
    </li>
  );
}

CareList.Instruction = Instruction;

export { CareList };
