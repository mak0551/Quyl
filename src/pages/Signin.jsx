import React, { useState } from "react";
import { firebaseHook } from "../context/Firebase";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const firebase = firebaseHook();
  console.log(firebase);

  const loginUser = () => {
    return firebase.signinUserWithEmailAndPassword(email, password);
  };
  const signupwithgoogle = () => {
    return firebase.signinwithgoogle();
  };
  const writeData = () => {
    return firebase.writeData();
  };
  const writesubdata = () => {
    return firebase.writeSubData();
  };
  const readData = () => {
    return firebase.readDoc();
  };
  const readDataWithQuery = () => {
    return firebase.readDocWithQuery();
  };

  return (
    <div className="signinpage">
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
      <button onClick={loginUser} className="submit">
        submit
      </button>
      <br />
      <button
        onClick={() => firebase.putdata("user/" + "mak", { email, password })}
      >
        add user data
      </button>
      <br />
      <br />
      <button onClick={signupwithgoogle}>sign in with google</button>
      <br />
      <br />
      <button onClick={writeData}>create collection</button>
      <br />
      <br />
      <button onClick={writesubdata}>create sub collection</button>
      <br />
      <br />
      <button onClick={readData}>read collection data</button>
      <br />
      <br />
      <button onClick={readDataWithQuery}>read collection by query</button>
      <br />
    </div>
  );
};
