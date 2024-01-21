import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Classes from "../styles/Account.module.css";

export default function Account() {
  const { currentUser, logout } = useAuth();

  return (
    <div className={Classes.account}>
      {currentUser ? (
        <>
          <span className="material-icons-outlined" title="Account">
            account_circle
          </span>
          <span>{currentUser.displayName}</span>
          <span
            className="material-icons-outlined"
            title="Logout"
            onClick={logout}
          >
            {" "}
            logout{" "}
          </span>
        </>
      ) : (
        <>
          {" "}
          <NavLink to="/signup">Signup</NavLink>
          <NavLink to="/login">Login</NavLink>
        </>
      )}
    </div>
  );
}
