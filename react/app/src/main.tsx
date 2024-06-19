import App from "./pages/App";
import { BrowserRouter } from "react-router-dom";
import { MainProvider } from "./stores/MainProvider";
import ReactDOM from "react-dom/client";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<BrowserRouter>
		<MainProvider>
			<App />
		</MainProvider>
	</BrowserRouter>
);
