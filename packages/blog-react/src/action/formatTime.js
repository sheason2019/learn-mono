const formatTime = (time, showDetailTime = false) => {
    let year = time.getFullYear();
    let month = (time.getMonth() + 1);
    month = format(month);
    let day = time.getDate();
    day = format(day);
    if(showDetailTime)
        return year+"-"+month+"-"+day+" "+format(time.getHours())+":"+format(time.getMinutes())+":"+format(time.getSeconds());
    else 
        return year+"-"+month+"-"+day;
};
function format(item){
    if (item < 10) {
        item = "0" + item;
    }
    return item;
}

export default formatTime;