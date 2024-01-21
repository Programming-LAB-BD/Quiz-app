import { NavLink } from "react-router-dom";
import Image from "../assets/images/logo-bg.png";
import Classes from "../styles/Nav.module.css";
import Account from "./Account";

export default function Nav() {
  return (
    <nav className={Classes.nav}>
      <ul>
        <li>
          <NavLink to="/" className={Classes.brand}>
            <img src={Image} alt="Learn with Sumit Logo" />
            <h3>Learn with Sumit</h3>
          </NavLink>
        </li>
      </ul>
      <Account />
    </nav>
  );
}
