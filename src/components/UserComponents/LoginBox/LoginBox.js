import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../../firebase";
import "./LoginBox.css";

const provider = new GoogleAuthProvider();
const signInWithGoogle = () => {
  signInWithRedirect(auth, provider);
};

/**
 * Login Box
 * @returns Login Interface for Unregisted/Signed out Users
 */
const LoginBox = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  /**
   * Register New User Info to Database
   */
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );

      console.log(user);
    } catch (error) {
      alert(error.code);
    }
  };
  /**
   * Sign in an existing user
   */
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      alert(error.code);
    }
  };
  /**
   * Send password Reset Email.
   */
  const sendPasswordReset = () => {
    sendPasswordResetEmail(auth, loginEmail)
      .then(() => {
        alert(
          "Password Reset Email Sent to: " +
            loginEmail +
            ". Please Allow 5 Minutes For Email to Arrive. Check your spam folder too!"
        );
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="loginBackground">
      <div className="loginContainer">
        <div className="loginBody">
          <h3 className="h3c"> Register New User </h3>
          <input
            className="SignInput"
            placeholder="Email"
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
          />
          <input
            className="SignInput"
            placeholder="Password"
            type="password"
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
          />
          <button className="SignButton" onClick={register}>
            Create User
          </button>
        </div>

        <div className="loginBody">
          <h3 className="h3c">Login</h3>
          <input
            className="SignInput"
            placeholder="Email"
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <input
            className="SignInput"
            placeholder="Password"
            type="password"
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />
          <button className="SignButton" onClick={login}>
            {" "}
            Login
          </button>
          <button
            className="SignButton"
            onClick={() => {
              sendPasswordReset();
            }}
          >
            {" "}
            Reset Password{" "}
          </button>
        </div>
        <button className="SignButton" onClick={signInWithGoogle}>
          Sign In With Google
        </button>
      </div>
    </div>
  );
}

export default LoginBox;
