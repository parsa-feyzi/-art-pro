import { Button } from "@/src/components/ui/button"
import ProfileImage from "@/src/components/ui/profile-image"
import { ChevronsUpDown } from "lucide-react"

function MainSidebarUserInfosLoginCase() {
    return (
        <div className="flex items-center justify-between border border-input rounded-lg p-3">
            <div className="flex gap-2 items-center col-span-5">
                <ProfileImage
                    alt={"Example User"}
                    src={""}
                    size={42}
                />
                <div>
                    <div className="text-sm pb-0.5 font-medium">{"Example User"}</div>
                    <div className="text-xs text-tertiary">{"example@gmail.com"}</div>
                </div>
            </div>
            <Button asChild variant="link" size="icon-sm" className="col-span-1 text-foreground hover:text-foreground">
                <ChevronsUpDown className="text-tertiary w-5! h-5!" />
            </Button>
        </div>
    )
}

export default MainSidebarUserInfosLoginCase