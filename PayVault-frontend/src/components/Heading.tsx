interface LabelValue {
    label: String
}

export function Heading({label}: LabelValue) {
    return <div className="font-bold text-4xl pt-6">
        {label}
    </div>
}
