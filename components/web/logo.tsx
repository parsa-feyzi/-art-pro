import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="font-bold text-3xl">
      Art<span className="text-emerald-500 text-2xl ms-0.5">PRO</span>
    </Link>
  );
}

export default Logo;
