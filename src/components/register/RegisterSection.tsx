// RegisterSection.tsx
import { Form, useActionData } from "react-router-dom";
import BorderBox from "../shared/BorderBox";
import PrimaryBtn from "../shared/PrimaryBtn";
import Section from "../shared/Section";
import { api, getCsrfToken } from "../../api";
import { redirect } from "react-router-dom";

// --------- ACTION-FUNKTION ---------
export async function registerAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const firstName = formData.get("first_name") as string;
  const lastName = formData.get("last_name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passwordConf = formData.get("password_confirmation") as string;
  const username = formData.get("username") as string;

  // --- Simple Validation ---
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    password !== passwordConf
  ) {
    return { error: "Please fill in all fields correctly!" };
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
      {
        headers: {
          "X-XSRF-TOKEN": csrfToken || "",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (response.status !== 201) {
      return { error: "Registration failed!" };
    }

    return redirect("/login");
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Registration failed!" };
  }
}

// --------- KOMPONENTE ---------
const RegisterSection = () => {
  const actionData = useActionData() as { error?: string };

  return (
    <Section>
      <div className="flex justify-center items-center h-full">
        <BorderBox>
          <Form method="post" className="w-100 p-4">
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
                  required
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
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                className="custom-border py-1 px-2 mt-1 rounded-md w-full"
                name="email"
                id="email"
                required
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
                required
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
                required
              />
            </div>

            <div className="mt-4">
              <label className="label" htmlFor="password_confirmation">
                Confirm Password
              </label>
              <input
                type="password"
                className="custom-border py-1 px-2 mt-1 rounded-md w-full"
                name="password_confirmation"
                id="password_confirmation"
                required
              />
            </div>

            <div className="mt-4 flex justify-center items-center">
              <PrimaryBtn type="submit">Register</PrimaryBtn>
            </div>
          </Form>

          {actionData?.error && (
            <div className="bg-white rounded-lg p-2 shadow-md text-center mt-2 text-red-400">
              {actionData.error}
            </div>
          )}
        </BorderBox>
      </div>
    </Section>
  );
};

export default RegisterSection;
