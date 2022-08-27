import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { atom, useAtom } from "jotai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export type User = { _id: string; username: string; email: string; isAdmin: boolean };
export const userAtom = atom({ _id: "", username: "", email: "", isAdmin: false });

const Login = () => {
  const [user, setUser] = useAtom(userAtom);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { mutate, isLoading, error } = useMutation(handleLogin, {
    onSuccess: (data) => {
      setUser(data.data.details);
      navigate("/");
    }
  });

  function handleLogin(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    return axios.post<{ details: User }>("/auth/login", { username, password });
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
        />
        <button
          disabled={isLoading}
          className="rounded-md bg-lightblue px-5 py-2 text-white disabled:bg-[#0071c28c]"
          onClick={(e) => mutate(e)}
        >
          Login
        </button>
        <>{error && error instanceof AxiosError && <span>{error.response?.data?.message}</span>}</>
      </div>
    </div>
  );
};

export default Login;
