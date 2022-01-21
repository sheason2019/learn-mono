import axios from "axios";
const handleGetCommentsNum = async (contentid, setter) => {
    const res = await axios.get("/api/article/commentsnum",{
        params: {
            contentid: contentid
        }
    });
    const array = res.data.commentsNum;
    if (array.length === 0) {
        setter(0);
    } else {
        setter(array[0].Count);
    }
}

export default handleGetCommentsNum;
