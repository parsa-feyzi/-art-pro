interface Props {
    label: "Email" | "Phone"
    info: string
}

function FooterInfoPad({ label, info }: Props) {
    return (
        <div>
            <span className="text-primary">{label}: </span>
            <span className="font-medium">{info}</span>
        </div>
    )
}

export default FooterInfoPad