const registerUser = (req, res)=>{
    const {name, email, password} = req.body
    if(!name || !email || !password){
        throw new Error('Please include all the data')
    }
    res.send('OK')
}

const loginUser = (req, res)=>{
    res.send('Login route')
}

module.exports ={
    registerUser,
    loginUser
}