export  function getloginAction(userinfo) {
    let {username,token,isLogin} = userinfo  
    localStorage.setItem("token",token)
    localStorage.setItem("username", username)
    localStorage.setItem("isLogin",isLogin)
    return {type: "loginstate",data: userinfo}
}


export  function deluserinfoaction() {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("isLogin")
    return {type: "loginstate",data: {username:'',token:'',isLogin: false}}
}



