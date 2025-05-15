import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/User";


export function Dashboard() {

    return <>
        <Appbar />
        <Balance value={500} />
        <Users />

    </>
}