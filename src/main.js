import "./css/style.css";
import { themeChangeAction, setInitialTheme } from "./theme";
import { searchUserAction } from "./user";

setInitialTheme();
themeChangeAction();
searchUserAction();
