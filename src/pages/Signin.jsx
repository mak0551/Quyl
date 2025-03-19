import React, { useEffect, useState } from "react";
import { firebaseHook } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = firebaseHook();
  const firebase = firebaseHook();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) return;
  }, [user]);

  const loginUser = async () => {
    await firebase
      .signinUserWithEmailAndPassword(email, password)
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };
  const signupwithgoogle = () => {
    return firebase.signinwithgoogle(() => navigate("/")); // here we are calling signinwithgoogle function and also give it a callback so after the execution of the signinwithgoogle function this callback will execute
  };

  return (
    <div className="min-h-screen flex w-full items-center justify-center bg-sky-500">
      <div className="relative w-full max-w-[20rem] h-[20rem] items-center justify-center flex flex-col bg-white px-[2rem] shadow-xl rounded-2xl">
        <h1 className="absolute top-6 mb-4 text-center w-full text-lg font-semibold underline underline-offset-4">
          Signin to dive in
        </h1>
        <div className="flex flex-col gap-3 px-4 w-full">
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
            onClick={loginUser}
            className="bg-sky-500 text-white text-sm py-[2px] border-sky-500 border px-4 rounded-xl w-full "
          >
            Signin
          </button>
          <button
            onClick={signupwithgoogle}
            className="bg-white border border-black rounded-xl px-4 flex items-center justify-center gap-1"
          >
            <FcGoogle />
            <span className="text-sm pb-1">sign in with google</span>
          </button>
        </div>
      </div>
    </div>
  );
};
