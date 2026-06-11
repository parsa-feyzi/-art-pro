import Box from "@/src/components/ui/box";

interface Props {
  title: "Mission" | "Vision";
  content: string;
}

export function MissionOrVisionBox({ title, content }: Props) {
  return (
    <Box className="bg-muted/40">
      <h3 className="font-semibold text-primary">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{content}</p>
    </Box>
  );
}
