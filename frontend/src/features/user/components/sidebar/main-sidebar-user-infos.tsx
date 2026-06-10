"use client"

import { useAuthContext } from "@/src/features/auth/context/auth-context";
import MainSidebarUserInfosLoginCase from "./main-sidebar-user-infos-login-case";
import MainSidebarUserInfosLogoutCase from "./main-sidebar-user-infos-logout-case";

function MainSidebarUserInfos() {
    const { isLogin } = useAuthContext();

    return (
        isLogin ? <MainSidebarUserInfosLoginCase /> : <MainSidebarUserInfosLogoutCase />
    )
}

export default MainSidebarUserInfos