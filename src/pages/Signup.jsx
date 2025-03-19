import React, { useState } from "react";
import { firebaseHook } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const firebase = firebaseHook();

  const createUser = async () => {
    try {
      const userCredential = await firebase.signUpUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      localStorage.setItem("user", JSON.stringify(user));
      await firebase
        .writeData(user.uid, email, name)
        .then(() => navigate("/"))
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };

  const signupwithgoogle = () => {
    // here we are passing a callback, after the completion of this signinwithgoogle function this callback executes
    firebase.signinwithgoogle(() => {
      navigate("/"); // This is the function being passed as `onSuccess`
    });
  };

  return (
    <div className="min-h-screen flex w-full items-center justify-center bg-sky-500">
      <div className="relative w-full max-w-[20rem] h-[25rem] items-center justify-center flex flex-col bg-white px-[2rem] shadow-xl rounded-2xl">
        <h1 className="absolute top-10 mb-4 text-center w-full text-lg font-semibold underline underline-offset-4">
          Signup to dive in
        </h1>
        <div className="flex flex-col gap-3 px-4 w-full">
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            placeholder="full name"
            className="border border-black px-2 py-1 rounded-sm text-sm"
          />
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            placeholder="email"
            className="border border-black px-2 py-1 rounded-sm text-sm"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            placeholder="password"
            className="border border-black px-2 py-1 rounded-sm text-sm"
          />
        </div>
        <div className="flex gap-2 flex-col p-2 mt-4 px-4 w-full">
          <button
            onClick={createUser}
            className="bg-sky-500 text-white text-sm py-[2px] border-sky-500 border px-4 rounded-xl w-full "
          >
            Signup
          </button>
          <button
            onClick={signupwithgoogle}
            className="bg-white border border-black rounded-xl px-4 flex items-center justify-center gap-1"
          >
            <FcGoogle />
            <span className="text-sm pb-1">sign up with google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
