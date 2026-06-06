import Logo from "../logo";
import ShutterStickyPattern from "../shutter-sticky-pattern/shutter-sticky-pattern";

function HomeLandingLogo() {
  return (
    <span className="relative overflow-hidden px-2.5 lg:pb-0.5 rounded-sm translate-y-3 borde border-zinc-300/90 dark:border-zinc-600/90 inline-block">
      <Logo size="xl" className="mb-2 mt-0.5 lg:flex hidden items-end" />
      <Logo
        size="lg"
        className="mb-3 mt-1.5 lg:hidden sm:flex hidden items-end"
      />
      <Logo size="md" className="mb-1 sm:hidden flex items-end" />
      <ShutterStickyPattern className="h-[700%] -z-10 scale-50 -rotate-135 lg:-top-60 sm:-top-59 sm:-left-48 -top-42 -left-70 opacity-100 dark:opacity-100" />
    </span>
  );
}

export default HomeLandingLogo;
