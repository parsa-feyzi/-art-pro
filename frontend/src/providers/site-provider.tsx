import Footer from "@/src/components/web/footer-components/footer";
import ScrollToTopButton from "@/src/components/web/scroll-to-top-button";

interface Props {
  children: Readonly<React.ReactNode>;
}

async function SiteProvider({ children }: Props) {
  return (
    <main>
      <section className="container max-w-7xl mx-auto lg:px-8 md:px-6 px-4">
        {children}
        <ScrollToTopButton />
      </section>
      <Footer />
    </main>
  );
}

export default SiteProvider;
