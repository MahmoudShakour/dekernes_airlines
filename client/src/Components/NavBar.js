import style from "../Styles/NavBar.module.css";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.svg";

export default function NavBar({ user }) {
  return (
    <div className={style.container}>
      <img src={logo} alt="" width="100px" />
      {user ? (
        <div className={style.section}>
          <div> {user.username}</div>
          <Link className={style.link} to="/flight">
            reserve a flight
          </Link>
          <Link className={style.link} to="/purchase">
            my purchases
          </Link>
        </div>
      ) : (
        <div className={style.section}>
          <Link className={style.link} to="/sign-up">
            sign up
          </Link>
          <Link className={style.link} to="/login">
            Log in
          </Link>
        </div>
      )}
    </div>
  );
}

{
}
