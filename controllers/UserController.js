import User from '../models/UserModel'
export const saveUser = async(req,res)=>{
    const { email, location } = req.body;
    try{
        const user = new User({email,location})
        await user.save()
        res.status(200).json({message:"User Created Success",user})
    }catch(error){
        res.status(400).json({message:"User Not Created",error})
    }
}