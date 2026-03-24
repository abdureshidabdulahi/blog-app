 
import contentModel from "../models/contentsModel.js"



const contentFunction =async (req,res)=>{ 
    console.log(req.body)
        const newContent = new contentModel({
            userId:req.userId,
            title:req.body.title,
            category:req.body.category,
            author:req.body.author,
            description:req.body.contents,
            image:req.file.filename
        })
        await newContent.save()
} 
const all_contentLists = async (req,res)=>{
    try{
       const listOfContents =  await contentModel.find({})
        res.json({success:true,listOfContents})
    }catch(error){
            console.log(error)
    }

}
const userBlog =async (req,res)=>{
    try {
    const myBlogs = await contentModel.find({userId:req.userId})
    res.json({success:true,myBlogs})
    } catch (error) {
        console.log(error)
        
    }
}

export {contentFunction,all_contentLists,userBlog}
