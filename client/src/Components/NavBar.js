import style from "../Styles/NavBar.module.css";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.svg";

export default function NavBar({ user }) {
  return (
    <div className={style.container}>
      <img src={logo} alt="" width="120px" />
      <div className={style.list}>
        <Link className={style.link} to="/">
          Home
        </Link>
        <Link className={style.link} to="/flight">
          Book a flight
        </Link>
        <Link className={style.link} to="/purchase">
          my purchases
        </Link>
        <Link className={style.link} to="/contact">
          Contact
        </Link>
      </div>
      {user ? (
        <div className={style.section}>
          <div> {user.username}</div>
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

