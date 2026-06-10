import Link from "next/link";
import { buttonVariants } from "@/src/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Suspense } from "react";

interface Props {
  title: string;
  description: string;
  headerLink: { title: string; path: string };
  formFallback: React.ReactNode;
  children: React.ReactNode;
}

function AuthCard({ title, description, headerLink, formFallback, children }: Props) {
  return (
    <Card className="w-[90vw] my-24 md:w-md max-w-md">
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
        <Suspense fallback={formFallback}>{children}</Suspense>
      </CardContent>
    </Card>
  );
}

export default AuthCard;
