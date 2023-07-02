import style from "../Styles/Login.module.css";
import signIn from "../Api/Sign-in";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Login({user,changeUser}) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    const loggedUser = await signIn(data);
    console.log(loggedUser);
    if (loggedUser) {
      changeUser(loggedUser);
      navigate("/", { replace: true });
    } else {
      setVisible(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.loginForm} method="POST">
      <div className={style.title}>Login to Airlines</div>
      <input type="text" id="username" placeholder="username" name="username" />
      <input type="text" id="password" placeholder="password" name="password" />
      <button type="submit" className={style.loginButton}>
        Log In
      </button>
      <a href="http://localhost:3000/sign-up">forget password?</a>
      <a href="http://localhost:3000/sign-up">sign-up</a>
      {visible ? (
        <div className={style.errorMessage}>
          username or password is not correct.
        </div>
      ) : null}
    </form>
  );
}
