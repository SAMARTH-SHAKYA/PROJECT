<<<<<<< HEAD

import {Link} from "react-router-dom";
import {useContext, useState, useEffect} from "react";
import axios from "axios";
import {UserContext} from "../UserContext.jsx";

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);

    async function handleLoginSubmit(ev) {
      ev.preventDefault();
      try {
        const {data} = await axios.post('/login', { email, password });
        setUser(data);
        alert('Login successful');
        setRedirect(true);
      } catch (e) {
        alert('Login failed. Please try again later');
      }
    }

    useEffect(() => {
      if (redirect) {
        window.location.href = '/index'; // This will force a full page reload to the index route
      }
    }, [redirect]);

    return (
        <div className="mt-4 grow flex items-center justify-around">
          <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
              <input type="email"
                     placeholder="your@email.com"
                     value={email}
                     onChange={ev => setEmail(ev.target.value)} />
              <input type="password"
                     placeholder="password"
                     value={password}
                     onChange={ev => setPassword(ev.target.value)} />
              <button className="primary">Login</button>
              <div className="text-center py-2 text-gray-500">
                Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register now</Link>
              </div>
            </form>
          </div>
        </div>
    );
  }

// import { Link, Navigate } from "react-router-dom";
// import { useContext, useState } from "react";
// import axios from "axios";
// import { UserContext } from "../UserContext.jsx";
// import './LoginPage.css'; // Ensure this file is correctly imported
=======
import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";
import './LoginPage.css';
>>>>>>> 54505691232b1fb5d449ba8be4e45ec941971117

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [redirect, setRedirect] = useState(false);
//   const { setUser } = useContext(UserContext);

//   async function handleLoginSubmit(ev) {
//     ev.preventDefault();
//     try {
//       const { data } = await axios.post('/login', { email, password });
//       setUser(data);
//       alert('Login successful');
//       setRedirect(true);
//     } catch (e) {
//       alert('Login failed. Please try again later');
//     }
//   }

//   if (redirect) {
//     return <Navigate to="/index" />;
//   }

<<<<<<< HEAD
//   return (
//     <div className="login-page">
//       <div className="blur-background"></div> {/* Added blur background */}
//       <div className="login-box">
//         <h1 className="login-title">Login</h1>
//         <form className="login-form" onSubmit={handleLoginSubmit}>
//           <input 
//             type="email"
//             placeholder="your@email.com"
//             value={email}
//             onChange={(ev) => setEmail(ev.target.value)}
//           />
//           <input 
//             type="password"
//             placeholder="password"
//             value={password}
//             onChange={(ev) => setPassword(ev.target.value)}
//           />
//           <button className="login-button" type="submit">Login</button>
//           <div className="login-footer">
//             Don't have an account yet? 
//             <Link className="register-link" to="/register"> Register now</Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
 
// }
=======
  return (
    <div className="login-page">
      <div className="blur-background"></div> {/* Added full-screen blur background */}
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <input 
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input 
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="login-button" type="submit">Login</button>
          <div className="login-footer">
            Don't have an account yet? 
            <Link className="register-link" to="/register"> Register now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
>>>>>>> 54505691232b1fb5d449ba8be4e45ec941971117
