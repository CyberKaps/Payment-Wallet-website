
import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export function Signup() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"} />
                <SubHeading label={"Enter your information to create an account"} />
                <InputBox onChange={(e:any) => {
                    setFirstName(e.target.value)
                }} label={"First Name"} placeholder={"Kalpesh"} />
                <InputBox onChange={(e:any) => {
                    setLastName(e.target.value)
                }} label={"Last Name"} placeholder={"Borde"} />
                <InputBox onChange={(e:any) => {
                    setUsername(e.target.value)
                }} label={"Email"} placeholder={"bordekalpesh@gmail.com"} />
                <InputBox onChange={(e:any) => {
                    setPassword(e.target.value)
                }} label={"Password"} placeholder={"12345678"} />
                <Button onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
              username,
              firstName,
              lastName,
              password
            });
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")
          }} label={"Sign up"} />
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to="/signin" />
            </div>
        </div>

    </div>
}