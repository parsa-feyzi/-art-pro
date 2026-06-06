interface Props {
    opacity: number
}

function ShutterStickyPatternItem({ opacity }: Props) {
    return (
        <div style={{ opacity: `${opacity}%` }} className="h-full w-16 bg-primary"></div>
    )
}

export default ShutterStickyPatternItem