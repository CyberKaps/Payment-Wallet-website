
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";


export function Signup() {
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"} />
                <InputBox label={"First Name"} placeholder={"Kalpesh"} />
                <InputBox label={"Last Name"} placeholder={"Borde"} />
                <InputBox label={"Email"} placeholder={"bordekalpesh@gmail.com"} />
                <InputBox label={"Password"} placeholder={"12345678"} />
                <Button onClick={() => {}} label={"Sign up"} />
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to="/signin" />
            </div>
        </div>

    </div>
}