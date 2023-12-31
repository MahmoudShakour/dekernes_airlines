import style from "../Styles/Login.module.css";
import signIn from "../Api/Sign-in";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
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
      <Link className={style.link}  to="#" >Forget Password?</Link>
      <div className={style.link} >
      {"Don't have an account? "}
      <Link className={style.signupButton}  to="/sign-up" >Sign up</Link>
      </div>
      {visible ? (
        <div className={style.errorMessage}>
          username or password is not correct.
        </div>
      ) : null}
    </form>
  );
}
