import style from "../Styles/NavBar.module.css";
import { Link } from 'react-router-dom';

export default function NavBar({ user }) {
  return (
    <div className={style.container}>
      <div className={style.title}>dekernes airlines</div>
      {user ? (
        <div className={style.section}>
          <div> {user.username}</div>
          <Link className={style.link} to="/flight">reserve a flight</Link>
          <Link className={style.link} to="/purchase">my purchases</Link>
        </div>
      ) : (
        <div className={style.section}>
          <a className={style.a} href="http://localhost:3001/sign-up">
            sign-up
          </a>
          <a className={style.a} href="http://localhost:3001/login">
            sign-in
          </a>
        </div>
      )}
    </div>
  );
}
