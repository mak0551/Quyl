import React, { useState } from "react";
import { app } from "../../firebase.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(app);

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => alert("success"))
      .catch((err) => console.log(err));
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
      <button onClick={createUser} className="submit">submit</button>
    </div>
  );
}

export default Signup;
