import NavBar from "../../Components/NavBar";
import style from "./homePage.module.css";
import hand from "../../Assets/hand.svg";
import { Link } from "react-router-dom";
export default function HomePage({user}) {
  return (
    <div className={style.page} >
      <NavBar user={user} />
      <div className={style.container} >
        <div className={style.section} >
          <div className={style.text} >
            <div className={style.colored} >It's time</div>
            <div>To travel</div>
            <div>The world</div>
          </div>
          <Link className={style.link} to="/flight">
            Book Your Flight
          </Link>
        </div>
        <div className={style.section}>
           <img src={hand} alt="" /> 
        </div>
      </div>
    </div>
  );
}
