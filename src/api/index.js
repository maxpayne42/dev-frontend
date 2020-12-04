import  instance  from './custom'

export  const reqLogin  = (username,password) => {return instance.post("/userlogin",{username,password})}


export let reqgetrestype  = (page,pagesize) => {return instance.get("/cmdb/restype",{params:{page,pagesize}})}
export  let reqpostrestype = (name) => {return instance.post("/cmdb/restype",{name})}
export  let reqputrestype = (id,name) => {return instance.put("/cmdb/restype",{id,name})}
export  let reqdelresname = (id) => {return instance.delete("/cmdb/restype",{params:{id}})}


// 针对资源名称的相关method  
export  let  reqgetresdata  = (page,pagesize) => {return instance.get("/cmdb/resdata",{params:{page,pagesize}})}
export  let reqpostresdata = (resname,restype,fields) => {return instance.post("/cmdb/resdata",{resname,restype,fields})}
export  let reqputresdata = (id,resname,restype,fields) => {return instance.put("/cmdb/resdata",{id,resname,restype,fields})}
export  let reqdelresdata = id => instance.delete("/cmdb/resdata",{params:{id}})


