import Footer from "../../Components/Footer";
import NavBar from "../../Components/NavBar";
import style from "./homePage.module.css";

export default function HomePage({user}) {
  return (
    <div className={style.page} >
      <NavBar user={user} />
      <div className={style.formContainer} >
        home page not implemented yet.
      </div>
      <Footer />
    </div>
  );
}
