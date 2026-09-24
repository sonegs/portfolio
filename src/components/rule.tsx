import { Separator } from "@/components/ui/separator";

// The hairline that draws itself from the left on load. The delay is what staggers
// one band against the next in the single opening moment.
export function Rule({ delay = 0 }: { delay?: number }) {
  return <Separator className="rule-in bg-rule" style={{ animationDelay: `${delay}ms` }} />;
}
