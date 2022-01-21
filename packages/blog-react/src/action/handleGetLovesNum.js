import axios from "axios";
const handleGetLovesNum = async (contentid, setter) => {
    const res = await axios.get("/api/article/articleloves",{
        params: {
            contentid: contentid,
        }
    });
    const array = res.data.love;
    if(array.length === 0) {
        setter(0);
    } else {
        setter(array[0].Count);
    }
}

export default handleGetLovesNum;
