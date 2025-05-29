const registerUser = (req, res)=>{
    res.send('REgister route')
}

const loginUser = (req, res)=>{
    res.send('Login route')
}

module.exports ={
    registerUser,
    loginUser
}