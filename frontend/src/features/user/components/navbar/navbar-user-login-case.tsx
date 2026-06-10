import { logoutAction } from '@/src/app/(site)/(main)/logout.actions';
import IconButtonDropdown from '@/src/components/ui/icon-button-dropdown'
import { useAuthContext } from '@/src/features/auth/context/auth-context';

import { Bookmark, FilePen, Home, LogOut, User, UserStarIcon } from 'lucide-react';

function NavbarUserLoginCase() {
    const { setIsLogin } = useAuthContext()

    const logoutHandler = async () => {
        const resolve = logoutAction();
        console.log(resolve);
        setIsLogin(false)
    }

    return (
        <IconButtonDropdown
            buttonIcon={<User />}
            description="Dashboard pages link"
            dropdownMenuItems={[
                { text: "Counter", icon: <Home />, href: "/dashboard" },
                { text: "Followers", icon: <UserStarIcon />, href: "/dashboard/followers" },
                { text: "My articles", icon: <FilePen />, href: "/dashboard/articles" },
                { text: "Saved articles", icon: <Bookmark />, href: "/dashboard/save" },
                { text: "Logout", icon: <LogOut />, hasSeparator: true, variant: "destructive", action: logoutHandler },
            ]}
        />
    )
}

export default NavbarUserLoginCase