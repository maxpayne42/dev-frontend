 
const  initState  = {
    "token":  localStorage.getItem("token") || '',
    "id": localStorage.getItem("username") || '',
    "isLogin": localStorage.getItem("isLogin") || ''
}


export default  function getloginreducer(prestate=initState,action) {
    const {type,data} = action 
    switch (type) {
        case "loginstate":
            return data
        default:
            return prestate 
    }
}


