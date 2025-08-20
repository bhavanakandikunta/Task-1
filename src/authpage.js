import React, { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  // handle Register
  const handleRegister = (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // save to localStorage
    const user = { firstName, lastName, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Registered Successfully ✅");
    setIsLogin(true); // redirect to login form
  };

  // handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (
      savedUser &&
      savedUser.email === email &&
      savedUser.password === password
    ) {
      setSubmitted(true); // show THANK YOU
    } else {
      alert("Invalid Credentials ❌");
    }
  };

  return (
    <div className="auth-container">
      <style>{`
        .auth-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #e8e6f9;
        }
        .auth-box {
          background: #fff;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          width: 380px; 
          text-align: center;
        }
        .auth-box h2 {
          margin-bottom: 15px;
          font-size: 26px;
          font-weight: bold;
        }
        .auth-box p {
          margin-bottom: 15px;
          font-size: 14px;
          color: #333;
        }
        .auth-box input,
        .auth-box button {
          width: 100%;
          height: 45px;   /* same height for input + button */
          margin: 10px 0;
          border-radius: 5px;
          font-size: 16px;
          box-sizing: border-box;
        }
        .auth-box input {
          padding: 0 12px;
          border: 1px solid #ccc;
        }
        .auth-box button {
          background: #e4e4fa;
          border: none;
          font-weight: bold;
          cursor: pointer;
        }
        .auth-box button:hover {
          background: #d0d0f5;
        }
        .auth-box a {
          color: blue;
          text-decoration: none;
        }
        .auth-box a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="auth-box">
        {submitted ? (
          <h2>THANK YOU</h2>
        ) : (
          <>
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>
            {!isLogin && <p>It’s free and only takes a minute</p>}
            <form onSubmit={isLogin ? handleLogin : handleRegister}>
              {!isLogin && (
                <>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    required
                  />
                </>
              )}
              <input
                type="email"
                name="email"
                placeholder="@gmail.com"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
              />
              {!isLogin && (
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required
                />
              )}
              <button type="submit">Submit</button>
            </form>

            {isLogin ? (
              <p>
                Not have an account?{" "}
                <a href="#" onClick={() => setIsLogin(false)}>
                  SignUp here
                </a>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <a href="#" onClick={() => setIsLogin(true)}>
                  Login here
                </a>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
