import { store } from '../redux/store'
import { setUserinfo } from '../redux/useSlice';
import axios from 'axios';
import initAuthToken from '../login/initAuthToken';

export const handleGetUserinfo = () => {
    axios.get('/api/user/getuserinfo')
        .then(res => {
            if (res.status === 200) {
                localStorage.setItem("token", res.data.userToken)
                initAuthToken();
                store.dispatch(setUserinfo({
                    login : true,
                    userid: res.data.userinfo.Userid,
                    username: res.data.userinfo.Username || "匿名用户",
                    usertype: res.data.userinfo.Usertype,
                    sex: res.data.userinfo.Sex,
                    birthday: res.data.userinfo.Birthday
                }));
            } else if (res.status === 202) {
                store.dispatch(setUserinfo({
                    login : false
                }));
            }
        })
        .catch((err) => {
            store.dispatch(setUserinfo({
                login : false
            }));
        })
        ;
}