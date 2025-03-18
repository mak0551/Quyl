import React, { useEffect, useState } from "react";
import { firebaseHook } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = firebaseHook();
  const firebase = firebaseHook();
  const navigate = useNavigate();
  console.log(firebase);

  useEffect(() => {
    if (user === null) return;
    console.log(user, "jhkfdhkjhfjkdshfjkhfjd");
  }, [user]);

  const loginUser = () => {
    return firebase.signinUserWithEmailAndPassword(email, password);
  };
  const signupwithgoogle = () => {
    return firebase.signinwithgoogle(() => navigate("/")); // here we are calling signinwithgoogle function and also give it a callback so after the execution of the signinwithgoogle function this call back will execute
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
  const updatedata = () => {
    return firebase.update();
  };
  const deletedata = () => {
    return firebase.deleteit();
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
      <br />
      <button onClick={updatedata}>update collection</button>
      <br />
      <br />
      <button onClick={deletedata}>delete collection</button>
    </div>
  );
};
