import NavBar from "../../Components/NavBar";
import style from "./signupPage.module.css";
import SignUp from "../../Components/SignUp";
import plane from "../../Assets/plane.svg";
export default function SignupPage() {
  return (
    <div className={style.page}>
      <NavBar />
      <div className={style.formContainer}>
        <SignUp />
        <div className={style.glassEffect} ></div>
        <img src={plane} className={style.plane} />
      </div>
    </div>
  );
}
