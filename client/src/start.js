import ReactDOM from "react-dom";
import Welcome from "./components/Welcome";
import App from "./components/App";
import axios from "./axios";

axios.get("/api/user/id.json").then((response) => {
    if (response.data.userId) {
        ReactDOM.render(<App />, document.querySelector("main"));
        return;
    }
    ReactDOM.render(<Welcome />, document.querySelector("main"));
});
