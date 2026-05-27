type Props = Record<"title" | "children", React.ReactNode>

function HomeSection({ title, children }: Props) {
  return (
    <section className="md:pt-36 sm:pt-32 pt-28">
      <div className="md:text-3xl sm:text-2xl text-xl md:mb-8 mb-6  font-bold">{title}</div>
      {children}
    </section>
  );
}

export default HomeSection;
