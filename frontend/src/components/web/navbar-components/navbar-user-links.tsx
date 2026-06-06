'use client'


import NavbarUserLogoutCase from './navbar-user-logout-case';
import NavbarUserLoginCase from './navbar-user-login-case';
import { useAuthContext } from '@/src/features/auth/context/auth-context';

function NavbarUserLinks() {
    const { isLogin } = useAuthContext();

    return (
        isLogin ? <NavbarUserLoginCase /> : <NavbarUserLogoutCase />
    )
}

export default NavbarUserLinks