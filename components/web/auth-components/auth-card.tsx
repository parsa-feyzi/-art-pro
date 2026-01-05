import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  title: string;
  description: string;
  headerLink: { title: string; path: string };
  children: React.ReactNode;
}

function AuthCard({ title, description, headerLink, children }: Props) {
  return (
    <Card className="w-[90vw] sm:w-sm max-w-sm ">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          <Link
            href={headerLink.path}
            className={`${buttonVariants({
              variant: "secondary",
              size: "sm",
            })} text-xs!`}
          >
            {headerLink.title}
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}

export default AuthCard;
