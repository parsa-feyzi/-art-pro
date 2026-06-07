import { cn } from "@/src/lib/utils";
import { UserRound } from "lucide-react";
import Image from "next/image";

interface Props {
  alt: string;
  src?: string;
  size: number;
  className?: string
}

function ProfileImage({ alt, src, size, className }: Props) {
  return (
    <>
      {src ? (
        <Image 
            alt={`${alt}_profile`} 
            src={src} 
            width={size} 
            height={size} 
            loading="lazy"
            className={className} 
        />
      ) : (
        <div style={{ minWidth: `${size}px`, minHeight: `${size}px` }} className={cn("rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-end overflow-hidden", className)}>
          <UserRound style={{ minWidth: `${size-8}px`, minHeight: `${size-8}px` }} className="opacity-20 mx-auto" />
        </div>
      )}
    </>
  );
}

export default ProfileImage;
