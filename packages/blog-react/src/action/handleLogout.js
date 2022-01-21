import initAuthToken from "../login/initAuthToken";
import { handleGetUserinfo } from "./handleGetUserinfo";

export default function handleLogout() {
    localStorage.setItem('token','removetoken');
    initAuthToken();
    handleGetUserinfo();
}