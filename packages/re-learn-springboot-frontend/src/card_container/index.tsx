import "./index.css";
import { LoginForm } from "./component/login_form";
import { useState } from "preact/hooks";
import { FetchingSnipper } from "./component/fetching_snipper";
import { LoginResult } from "./component/login_result";

export enum LoginStatus {
  "Input" = 0,
  "Fetching",
  "Success",
  "Fail",
}

export interface UserInfo {
  id: number;
  name: string;
  password: string;
}
export interface Err {
  code: number;
  message: string;
}

const initUserInfo: UserInfo = { id: -1, name: "", password: "" };
const initErr: Err = { code: -1, message: "" };

export function CardContainer() {
  const [status, setStatus] = useState<LoginStatus>(LoginStatus.Input);
  const [userInfo, setUserInfo] = useState<UserInfo>(initUserInfo);
  const [err, setErr] = useState<Err>(initErr);

  const RouterComponent: (status: LoginStatus) => JSX.Element | null = (
    s: LoginStatus
  ) => {
    switch (s) {
      case LoginStatus.Input:
        return (
          <LoginForm
            setStatus={setStatus}
            status={status}
            setUserInfo={setUserInfo}
            setErr={setErr}
          />
        );
      case LoginStatus.Fetching:
        return <FetchingSnipper />;
      case LoginStatus.Success:
      case LoginStatus.Fail:
        return (
          <LoginResult
            userInfo={userInfo}
            status={status}
            setStatus={setStatus}
            err={err}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <h1>Login</h1>
      <div className="root">{RouterComponent(status)}</div>
    </>
  );
}
