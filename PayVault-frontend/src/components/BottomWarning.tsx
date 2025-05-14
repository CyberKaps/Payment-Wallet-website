import { BrowserRouter, Link } from "react-router-dom"

interface BottomWarningValue {
    label: string;
    buttonText: string;
    to: string;
}

export function BottomWarning({ label, buttonText, to }: BottomWarningValue) {
    return <div className="py-2 text-sm flex justify-center">
        <div>
            {label}
        </div>
        {/* <BrowserRouter> */}
            <Link className="pointer underline pl-1 cursor-pointer" to={to}>
                {buttonText}
            </Link>
        {/* </BrowserRouter> */}
    </div>
}