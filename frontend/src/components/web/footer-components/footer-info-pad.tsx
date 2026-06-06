interface Props {
    label: React.ReactNode
    info: string
}

function FooterInfoPad({ label, info }: Props) {
    return (
        <div className="flex items-center gap-1.5">
            <span className="text-primary">{label}</span>
            <span className="text-muted-foreground">{info}</span>
        </div>
    )
}

export default FooterInfoPad