import { FormInput } from "../form_input";
import { JSX } from "preact";
import { useState } from "preact/hooks";
import { Err, LoginStatus, UserInfo } from "../..";
import styled from "styled-components";

interface LoginFormProps {
  status: LoginStatus;
  setStatus: (status: LoginStatus) => void;
  setUserInfo: (info: UserInfo) => void;
  setErr: (err: Err) => void;
}

export const StyledButton = styled.button`
  width: 14rem;
  height: 2rem;
  margin-top: 2rem;
  background-color: lightskyblue;
  border: 0;
  border-radius: 2px;
  &:hover {
    background-color: skyblue;
    cursor: pointer;
  }
`;

export function LoginForm({ setStatus, setUserInfo, setErr }: LoginFormProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRequestLogin = async (e: JSX.TargetedEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", username);
    formData.append("password", password);
    setStatus(LoginStatus.Fetching);
    const res = await fetch("http://localhost:8080/user/action/login", {
      method: "POST",
      body: formData,
    });
    if (res.status == 200) {
      const result = await res.json();
      setStatus(LoginStatus.Success);
      setUserInfo(result);
    } else {
      const err = await res.json();
      setStatus(LoginStatus.Fail);
      setErr(err);
    }
  };
  return (
    <form className="root" onSubmit={(e) => handleRequestLogin(e)}>
      <h2>Spring Boot Test</h2>
      <FormInput
        value={username}
        onChange={(e) => setUsername(e.currentTarget.value)}
        type="text"
        placeholder="Username"
      />
      <FormInput
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
        type="password"
        placeholder="Password"
      />
      <StyledButton onClick={handleRequestLogin}>Login</StyledButton>
    </form>
  );
}
