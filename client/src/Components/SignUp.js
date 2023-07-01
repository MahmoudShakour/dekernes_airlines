import style from "../Styles/SignUp.module.css";

export default function SignUp() {
  return (
    <form className={style.signupForm} method="POST">
      <div className={style.title} >
        Registiration Form
      </div>
      <input
        type="text"
        id="first-name"
        placeholder="first-name"
        name="first-name"
      />
      <input
        type="text"
        id="last-name"
        placeholder="last-name"
        name="last-name"
      />
      <input type="text" id="email" placeholder="email" name="email" />
      <input type="text" id="username" placeholder="username" name="username" />
      <input type="text" id="password" placeholder="password" name="password" />
      <button type="submit">
        Sign Up
      </button>
      <a href="http://localhost:3000/sign-in">already have an account? Login</a>
    </form>
  );
}
