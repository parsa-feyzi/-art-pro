import Box from "@/components/ui/box";
import IconBox from "@/components/ui/icon-box";
import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  desc: string;
  icon: LucideIcon;
}

function FeatureBox(props: Props) {
  return (
    <Box key={props.title}>
      <IconBox className="mb-4">
        <props.icon className="h-6 w-6 text-primary" />
      </IconBox>
      <h3 className="text-lg font-semibold">{props.title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {props.desc}
      </p>
    </Box>
  );
}

export default FeatureBox;
