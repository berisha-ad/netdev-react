import { useState } from "react";
import { api, getCsrfToken } from "../../api";
import { validateLogin } from "./utils";

import BorderBox from "../shared/BorderBox";
import PrimaryBtn from "../shared/PrimaryBtn";
import Section from "../shared/Section";

const LoginSection = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const validLogin = validateLogin(email, password);
    if (!validLogin) {
      setError("Invalid email or password!");
      return;
    }

    try {
      const csrfToken = await getCsrfToken();
      const response = await api.post(
        "/api/login",
        {
          email,
          password,
        },
        { headers: { "X-XSRF-TOKEN": csrfToken || "" } }
      );
      setError("");
    } catch (error) {
      setError("Invalid credentials!");
    }
  };

  return (
    <Section>
      <div className="flex justify-center items-center h-full">
        <BorderBox>
          <div className="w-100 p-4">
            <h1 className="text-2xl source-code">Welcome back!</h1>
            <div className="mt-4">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                className="custom-border py-1 px-2 mt-1 rounded-md w-full"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                className="custom-border py-1 px-2 mt-1 rounded-md w-full"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-4 flex justify-center items-center">
              <PrimaryBtn onClick={handleLogin}>Login</PrimaryBtn>
            </div>
          </div>
          {error && (
            <div className="bg-white rounded-lg p-2 shadow-md text-center mt-2 text-red-400">
              {error}
            </div>
          )}
        </BorderBox>
      </div>
    </Section>
  );
};

export default LoginSection;
