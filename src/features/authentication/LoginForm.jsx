import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../services/apiAuth";
import { useLogin } from "./useLogin";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, isLogging } = useLogin();

  //
  function handleLogin() {
    if (!email || !password) return;
    console.log(email, password);
  }

  async function guestLogin() {
    const body = { email: "lucy@example.com", password: "Lucy@123" };
    await loginUser(body);
  }

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h3 className="text-center text-base-content text-xl">
          Login to your account
        </h3>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLogging}
          />
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            setPassword={(e) => setPassword(e.target.value)}
            disabled={isLogging}
          />
          <div>
            <Link className="link link-hover">Forgot password?</Link>
          </div>
          <div className="flex flex-col gap-4">
            <button
              className="btn btn-neutral mt-4"
              onClick={handleLogin}
              disabled={isLogging}
            >
              Login
            </button>
            <button
              className="btn btn-neutral mt-4"
              onClick={guestLogin}
              disabled={isLogging}
            >
              Login as guest
            </button>
          </div>
        </fieldset>
      </div>
    </div>
  );
}
