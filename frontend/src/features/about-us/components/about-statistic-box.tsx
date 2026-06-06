import Box from "@/src/components/ui/box";

interface Props {
  label: string;
  value: number;
}

export function AboutStatisticBox({ label, value }: Props) {
  return (
    <Box className="bg-muted/40 p-10! text-center">
      <div className="text-5xl font-bold tracking-tight text-primary">
        {value >= 1000 ? <div>{Math.round(value / 1000)}K+</div> : value}
      </div>
      <div className="mt-2 font-medium text-muted-foreground">{label}</div>
    </Box>
  );
}
