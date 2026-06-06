'use client'

import { useAuthContext } from '@/contexts/auth-context'
import NavbarUserLogoutCase from './navbar-user-logout-case';
import NavbarUserLoginCase from './navbar-user-login-case';

function NavbarUserLinks() {
    const { isLogin } = useAuthContext();

    return (
        isLogin ? <NavbarUserLoginCase /> : <NavbarUserLogoutCase />
    )
}

export default NavbarUserLinks