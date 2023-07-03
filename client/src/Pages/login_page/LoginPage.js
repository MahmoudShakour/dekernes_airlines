import Login from "../../Components/Login";
import NavBar from "../../Components/NavBar";
import style from "./loginPage.module.css";
import plane from "../../Assets/plane.svg";

export default function LoginPage({ user, changeUser }) {
  return (
    <div className={style.page}>
      <NavBar user={user} />
      <div className={style.formContainer}>
        <Login changeUser={changeUser} />
        <div className={style.glassEffect} ></div>
        <img src={plane} className={style.plane} />
      </div>
    </div>
  );
}
