import Login from "../../Components/Login";
import NavBar from "../../Components/NavBar";
import style from "./loginPage.module.css";

export default function LoginPage({ user, changeUser }) {
  return (
    <div className={style.page}>
      <NavBar user={user} />
      <div className={style.formContainer}>
        <Login changeUser={changeUser} />
      </div>
    </div>
  );
}
