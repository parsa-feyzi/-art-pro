import Footer from "@/src/components/web/footer-components/footer";
import ScrollToTopButton from "@/src/components/web/scroll-to-top-button";

interface Props {
  children: Readonly<React.ReactNode>;
}

async function SiteProvider({ children }: Props) {
  return (
    <main>
      <section>
        {children}
        <ScrollToTopButton />
      </section>
      <Footer />
    </main>
  );
}

export default SiteProvider;
