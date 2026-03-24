 
import contentModel from "../models/contentsModel.js"



const contentFunction =async (req,res)=>{ 
    console.log(req.body)
        const newContent = new contentModel({
            title:req.body.title,
            category:req.body.category,
            author:req.body.author,
            description:req.body.contents,
            image:req.file.filename
        })
        await newContent.save()
} 
const contentLists = async (req,res)=>{
    try{
       const listOfContents =  await contentModel.find({})
        res.json({success:true,listOfContents})
    }catch(error){
            console.log(error)
    }

}

export {contentFunction,contentLists}
