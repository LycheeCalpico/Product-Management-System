import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../UserContext";
import { useDispatch, useSelector } from "react-redux";
import { login_, loginUser, signUpUser } from "../../redux/auth.slice";

const UserInfoForm = ({ status, msg }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [buttonText, setButtonText] = useState("Show");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordValidation, setPasswordValidation] = useState({
    password: ``,
    errorPasswordMessage: ``,
  });

  const [emailValidation, setEmailValidation] = useState({
    email: ``,
    errorEmailMessage: ``,
  });

  useEffect(() => {
    if (redirect) return navigate("/display-product");
  });

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      console.log("hello from log in: ", localStorage.getItem("user"));
    }
  }, []);

  const handleToggle = () => {
    console.log(password);
    if (type == "password") {
      setType("text");
      setButtonText("Hide");
    } else {
      setType("password");
      setButtonText("Show");
    }
  };

  const handleBlur = (e) => {
    console.log(email);
    setEmailValidation({
      ...emailValidation,
      errorEmailMessage: isEmailValid(email) ? "" : "Invalid email format.",
    });
    setPasswordValidation({
      ...passwordValidation,
      errorPasswordMessage: password ? "" : "Password cannot be empty.",
    });
    if (e.target.id == "email" && isEmailValid(email))
      e.target.classList.remove("border-red-500");
    else if (e.target.id == "password" && password)
      e.target.classList.remove("border-red-500");
    else e.target.classList.add("border-red-500");
  };

  const isEmailValid = (value) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status == "login") login(e);
    else if (status == "signup") signUp(e);
    else if (status == "forgot-password") forgotPassword(e);
  };

  async function login(e) {
    e.preventDefault();
    const user = { email: email, password: password };
    try {
      const originalPromiseResult = await dispatch(
        loginUser(user)
      ).unwrap();
      console.log("originalPromiseResult", originalPromiseResult);
      setRedirect(true);
    } catch (rejectedValueOrSerializedError) {
      console.log(
        "rejectedValueOrSerializedError",
        rejectedValueOrSerializedError
      );
      alert("Wrong email or password");
    }
  }

  async function signUp(e) {
    e.preventDefault();
    const user = { email: email, password: password };
    try {
      const originalPromiseResult = await dispatch(
        signUpUser(user)
      ).unwrap();
      console.log("originalPromiseResult", originalPromiseResult);
      setRedirect(true);
    } catch (rejectedValueOrSerializedError) {
      console.log(
        "rejectedValueOrSerializedError",
        rejectedValueOrSerializedError
      );
      alert("User already exists");
    }
  }

  async function forgotPassword(e) {
    e.preventDefault();
    axios.post("/forgot-password", { email });
  }

  return (
    <div className="w-1/3 xs:w-full md:w-1/3">
      <form
        className="bg-white shadow-lg rounded px-10 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <label className="flex text-3xl font-bold justify-center mt-8">
          {msg.title}
        </label>

        <div className="mt-6 mb-4">
          <label className="block text-gray-500 text-sm mb-2">Email</label>
          <div className="relative w-full">
            <input
              className="border rounded w-full py-4 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleBlur}
              placeholder="you@example.com"
              required
            />
            <p className="text-red-500 text-xs italic">
              {emailValidation.errorEmailMessage}
            </p>
          </div>
        </div>
        {status != "forgot-password" && (
          <div className="mb-2">
            <label className="block text-gray-500 text-sm mb-2">Password</label>
            <div className="relative w-full">
              <input
                className="border flex-grow rounded w-full py-4 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                placeholder="•••••••••••••••••••"
                type={type}
                name="password"
                value={password}
                onBlur={handleBlur}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute top-3 right-0 flex items-center pr-4">
                <button
                  type="button"
                  className="underline rounded px-2 py-1 text-sm text-gray-500 caret-transparent"
                  onClick={handleToggle}
                >
                  {buttonText}
                </button>
              </div>
              <p className="text-red-500 text-xs italic">
                {passwordValidation.errorPasswordMessage}
              </p>
            </div>
          </div>
        )}

        <div className="mb-4">
          <button
            className="flex w-full font-bold text-sm bg-chuwa-blue hover:bg-gray-300 text-white justify-center items-center py-3 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {msg.buttonText}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500">
            {msg.message}
            <a
              className="inline-block align-baseline text-sm underline text-chuwa-blue hover:text-blue-800"
              href={msg.link}
            >
              {msg.linkText}
            </a>
          </span>
          {status == "login" && (
            <a
              className="inline-block align-baseline underline text-sm text-chuwa-blue hover:text-blue-800"
              href="/forgot-password"
            >
              Forgot Password?
            </a>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserInfoForm;
