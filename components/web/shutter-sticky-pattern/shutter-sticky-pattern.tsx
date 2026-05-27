import { ClassNameValue } from "tailwind-merge"
import ShutterStickyPatternItem from "./shutter-sticky-pattern-item"

interface Props {
    className: ClassNameValue
}

function ShutterStickyPattern({ className }: Props) {
    return (
        <div className={`absolute flex ${className}`}>
            <ShutterStickyPatternItem opacity={1} />
            <ShutterStickyPatternItem opacity={4} />
            <ShutterStickyPatternItem opacity={7} />
            <ShutterStickyPatternItem opacity={10} />
            <ShutterStickyPatternItem opacity={13} />
            <ShutterStickyPatternItem opacity={16} />
            <ShutterStickyPatternItem opacity={19} />
            <ShutterStickyPatternItem opacity={22} />
            <ShutterStickyPatternItem opacity={25} />
        </div>
    )
}

export default ShutterStickyPattern