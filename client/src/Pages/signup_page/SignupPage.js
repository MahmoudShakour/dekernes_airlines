import Footer from "../../Components/Footer";
import NavBar from "../../Components/NavBar";
import style from "./signupPage.module.css";
import SignUp from "../../Components/SignUp";
export default function SignupPage() {
  return (
    <div className={style.page} >
      <NavBar />
      <div className={style.formContainer} >
        <SignUp/>
      </div>
      <Footer />
    </div>
  );
}
