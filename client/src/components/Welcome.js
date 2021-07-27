import { HashRouter, Route } from "react-router-dom";

import Registration from "./Registration";
import Login from "./Login";
//import ResetPassword from "./ResetPassword";

export default function Welcome() {
    console.log("TEST");
    return (
        <div className="welcome">
            <HashRouter>
                <Route path="/" exact>
                    <Registration />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                {/* <Route path="/password/reset/start">
                    <ResetPassword />
                </Route> */}
            </HashRouter>
        </div>
    );
}
