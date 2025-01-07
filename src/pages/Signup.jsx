import React, { useState } from "react";
import { firebaseHook } from "../context/Firebase";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const firebase = firebaseHook();
  console.log(firebase);

  const createUser = () => {
    return firebase.signUpUserWithEmailAndPassword(email, password);
  };
  return (
    <div className="signuppage">
      <label>Email</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
        placeholder="enter your email"
      />
      <label>Password</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
        placeholder="enter your password"
      />
      <button onClick={createUser} className="submit">
        submit
      </button>
    </div>
  );
}

export default Signup;
