import AuthNavbar from "@/src/features/auth/components/auth-navbar";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <AuthNavbar />
      <div className="grid min-h-[calc(90vh-73px)] place-content-center w-full">
        {children}
      </div>
    </section>
  );
}

export default AuthLayout;
