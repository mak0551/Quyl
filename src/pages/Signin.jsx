// import React, { useState } from "react";
// import { app } from "../../firebase.js";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// const auth = getAuth(app);

// export const Signin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const loginUser = () => {
//     signInWithEmailAndPassword(auth, email, password)
//       .then((e) => alert('signin successfull'))
//       .catch((err) => console.log(err, 'invalid credentials'));
//   };

//   return (
//     <div className="signinpage">
//       <label>Email</label>
//       <input
//         type="email"
//         onChange={(e) => setEmail(e.target.value)}
//         value={email}
//         required
//         placeholder="enter your email"
//       />
//       <label>Password</label>
//       <input
//         type="password"
//         onChange={(e) => setPassword(e.target.value)}
//         value={password}
//         required
//         placeholder="enter your password"
//       />
//       <button onClick={loginUser} className="submit">
//         submit
//       </button>
//     </div>
//   );
// };
