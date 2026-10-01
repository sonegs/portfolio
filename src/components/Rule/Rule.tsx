import { Separator } from "@/components/ui/separator";

function Rule({ delay = 0 }: { delay?: number }) {
  return <Separator className="rule-in bg-rule" style={{ animationDelay: `${delay}ms` }} />;
}

export default Rule;
