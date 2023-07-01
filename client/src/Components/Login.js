import style from "../Styles/Login.module.css";

export default function Login() {
  return (
    <form className={style.loginForm} method="POST">
        <div className={style.title}>Login to Airlines</div>
        <input type="text" id="username" placeholder="username" name="username"/>
        <input type="text" id="password" placeholder="password" name="password" />
      <button type="submit" className={style.loginButton}>
        Log In
      </button>
      <a href="#">forget password?</a>
      <a href="http://localhost:3000/sign-up">sign-up</a>
    </form>
  );
}
