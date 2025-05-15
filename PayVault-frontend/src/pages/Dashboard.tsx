import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { SendMoney } from "../components/SendMoney";
import { Users } from "../components/User";


export function Dashboard() {

    return <>
        <Appbar />
        <Balance value={500} />
        <Users />
        <SendMoney />

    </>
}