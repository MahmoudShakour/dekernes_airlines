import style from "../Styles/NavBar.module.css";

export default function NavBar({ user }) {
  return (
    <div className={style.container}>
      <div className={style.title}>dekernes airlines</div>
      {user ? (
        <div className={style.section}>
        <div> user.username</div>
        <a className={style.a} href="http://localhost:3000/flight">
            reserve a flight
          </a>
          <a className={style.a} href="http://localhost:3000/purchases">
            my purchases
          </a>
      </div>
      ) : (
        <div className={style.section}>
          <a className={style.a} href="http://localhost:3000/sign-up">
            sign-up
          </a>
          <a className={style.a} href="http://localhost:3000/login">
            sign-in
          </a>
        </div>
      )}
    </div>
  );
}
