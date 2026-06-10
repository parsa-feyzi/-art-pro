import NavbarLink from "../../../../components/web/navbar-components/navbar-link";

function NavbarUserLogoutCase() {
  return (
    <>
      <div className="lg:flex hidden gap-0.5">
        <NavbarLink path="/sign-up" variant="secondary">
          Sign up
        </NavbarLink>
        <NavbarLink path="/login">Log in</NavbarLink>
      </div>
      <div className="lg:hidden sm:flex hidden gap-0.5">
        <NavbarLink size={"sm"} path="/sign-up" variant="secondary">
          Sign up
        </NavbarLink>
        <NavbarLink size={"sm"} path="/login">
          Log in
        </NavbarLink>
      </div>
      <NavbarLink size={"sm"} path="/login" variant="secondary" className="sm:hidden inline-flex" >
        Log in
      </NavbarLink>
    </>
  );
}

export default NavbarUserLogoutCase;
