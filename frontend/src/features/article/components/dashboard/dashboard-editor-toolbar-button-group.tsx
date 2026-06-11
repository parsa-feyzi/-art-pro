import { ReactNode } from "react"

interface Props { children: ReactNode }

function DashboardEditorToolbarButtonGroup({ children }: Props) {
    return (
        <div className='flex gap-0.5 items-center'>
            {children}
        </div>
    )
}

export default DashboardEditorToolbarButtonGroup