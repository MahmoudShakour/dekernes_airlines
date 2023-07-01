import Footer from "../../Components/Footer";
import Login from "../../Components/Login";
import NavBar from "../../Components/NavBar";
import style from "./loginPage.module.css";

export default function LoginPage() {
  return (
    <div className={style.page} >
      <NavBar />
      <div className={style.formContainer} >
        <Login />
      </div>
      <Footer />
    </div>
  );
}
