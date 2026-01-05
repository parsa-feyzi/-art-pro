import AuthNavbar from "@/components/web/auth-components/auth-navbar";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <AuthNavbar />
      <div className="grid place-content-center w-full pb-12">
        {children}
      </div>
    </section>
  );
}

export default AuthLayout;
