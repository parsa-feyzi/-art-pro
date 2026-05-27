import Box from "@/components/ui/box";

interface Props extends Record<"icon" | "children", React.ReactNode> {
  title: string;
}

function AboutBox({ title, icon, children }: Props) {
  return (
    <Box className="p-8!">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
        {icon}
      </div>
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      {children}
    </Box>
  );
}

export default AboutBox;
