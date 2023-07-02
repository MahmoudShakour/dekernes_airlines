import { useNavigate } from "react-router-dom";
import signUp from "../Api/Sign-up";
import style from "../Styles/SignUp.module.css";
import { useState } from "react";

export default function SignUp() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      email: e.target.email.value,
      username: e.target.username.value,
      password: e.target.password.value,
    };
    console.log(data);
    const isSignedUp = await signUp(data);
    if (isSignedUp) {
      navigate("/login", { replace: true });
    } else {
      setVisible(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.signupForm} method="POST">
      <div className={style.title}>Registiration Form</div>
      <input
        type="text"
        id="firstname"
        placeholder="firstname"
        name="firstname"
      />
      <input type="text" id="lastname" placeholder="lastname" name="lastname" />
      <input type="text" id="email" placeholder="email" name="email" />
      <input type="text" id="username" placeholder="username" name="username" />
      <input type="text" id="password" placeholder="password" name="password" />
      <button type="submit">Sign Up</button>
      <a href="http://localhost:3000/sign-in">already have an account? Login</a>
      {visible ? (
        <div className={style.errorMessage}>
          entered username or email is already taken.
        </div>
      ) : null}
    </form>
  );
}
