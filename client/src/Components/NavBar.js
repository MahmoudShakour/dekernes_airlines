import style from "../Styles/NavBar.module.css";

export default function NavBar(){

    return (
        <div className={style.container} >
            <div className={style.title} >
                dekernes airlines
            </div>
            <div className={style.section} >
                <a  className={style.a} href="http://localhost:3000/sign-up" >sign-up</a>
                <a className={style.a} href="http://localhost:3000/login" >sign-in</a>
            </div>
        </div>
    )
}