import { Err, LoginStatus, UserInfo } from "../..";
import styled from "styled-components";
import { StyledButton } from "../login_form";

interface LoginResultProps {
  status: LoginStatus;
  setStatus: (status: LoginStatus) => void;
  userInfo: UserInfo;
  err: Err;
}

const CenterText = styled.div`
  text-align: center;
`;
const BlackCenterText = styled(CenterText)`
  color: black;
  margin-top: 1rem;
`;
const Root = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Avatar = styled.div`
  width: 6rem;
  height: 6rem;
  background: #832839;
  border-radius: 50%;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFF;
  font-size: 2.5rem;
  font-weight: 500;
`;
const StyledSvg = styled.svg`
  margin-top: 3rem;
`;
const BlackFont = styled.p`
  color: black;
  font-size: 1rem;
  margin-bottom: -1rem;
`;

export function LoginResult(props: LoginResultProps) {
  return props.status === LoginStatus.Success ? (
    <LoginSuccess {...props} />
  ) : (
    <LoginFail {...props} />
  );
}

function LoginSuccess(props: LoginResultProps) {
  return (
    <Root>
      <CenterText>登录成功</CenterText>
      <Avatar>{props.userInfo.name[0]}</Avatar>
      <BlackCenterText>
        <span>你好，</span>
        <span style={{ color: 'skyblue'}}>{props.userInfo.name}</span>
      </BlackCenterText>
      <StyledButton onClick={() => props.setStatus(LoginStatus.Input)}>退出登录</StyledButton>
    </Root>
  );
}

function LoginFail(props: LoginResultProps) {
  return (
    <Root>
      <div>登录失败</div>
      <StyledSvg xmlns="http://www.w3.org/2000/svg" width="6rem" height="6rem" fill="#FF0000" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
      </StyledSvg>
      <BlackFont>{props.err.message}</BlackFont>
      <StyledButton onClick={() => props.setStatus(LoginStatus.Input)}>重新输入登录信息</StyledButton>
    </Root>
  );
}
