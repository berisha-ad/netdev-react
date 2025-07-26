import BorderBox from "../shared/BorderBox";
import PrimaryBtn from "../shared/PrimaryBtn";
import Section from "../shared/Section";
import { useState } from "react";
import { validateRegister } from "./utils";
import { api, getCsrfToken } from "../../api";

const RegisterSection = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    validateRegister(firstName, lastName, email, password);
    if (!validateRegister(firstName, lastName, email, password)) {
      setError("Please fill in all fields correctly!");
      return;
    }

    try {
      const csrfToken = await getCsrfToken();
      const response = await api.post(
        "/api/register",
        {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          password_confirmation: passwordConf,
          username,
        },
        { headers: { "X-XSRF-TOKEN": csrfToken || "" } }
      );
      setError("");
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed!");
    }
  };

  return (
    <Section>
      <div className="flex justify-center items-center h-full">
        <BorderBox>
          <div className="w-100 p-4">
            <h1 className="text-2xl source-code">Create Account</h1>
            <div className="flex gap-4 mt-4">
              <div>
                <label className="label" htmlFor="first_name">
                  First Name
                </label>
                <input
                  type="text"
                  className="custom-border py-1 px-2 mt-1 rounded-md w-full"
                  name="first_name"
                  id="first_name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label className="label" htmlFor="last_name">
                  Last Name
                </label>
                <input
                  type="text"
                  className="custom-border py-1 px-2 mt-1 rounded-md w-full"
                  name="last_name"
                  id="last_name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

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
              <label className="label" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                className="custom-border py-1 px-2 mt-1 rounded-md w-full"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            <div className="mt-4">
              <label className="label" htmlFor="password_confirmation">
                Confirm Password
              </label>
              <input
                type="text"
                className="custom-border py-1 px-2 mt-1 rounded-md w-full"
                name="password_confirmation"
                id="password_confirmation"
                value={passwordConf}
                onChange={(e) => setPasswordConf(e.target.value)}
              />
            </div>
            <div className="mt-4 flex justify-center items-center">
              <PrimaryBtn onClick={handleRegister}>Register</PrimaryBtn>
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

export default RegisterSection;
