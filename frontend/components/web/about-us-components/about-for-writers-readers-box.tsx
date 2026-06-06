import Box from "@/components/ui/box";
import { cn } from "@/lib/utils";

interface Props {
  title: "For Writers" | "For Readers";
  content: string;
}

function AboutForWritersReadersBox({ title, content }: Props) {
  return (
    <Box className={cn(title === "For Writers" ? "bg-primary text-primary-foreground" : "bg-muted/40", "p-8!")}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className={cn(title === "For Writers" ? "text-primary-foreground/90" : "text-muted-foreground", "mt-4 max-w-xl leading-8")}>{content}</p>
    </Box>
  );
}

export default AboutForWritersReadersBox;
