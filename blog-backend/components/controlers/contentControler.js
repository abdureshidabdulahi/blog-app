 
import contentModel from "../models/contentsModel.js"



const contentFunction =async (req,res)=>{ 
        const newContent = new contentModel({
            title:req.body.title,
            category:req.body.category,
            description:req.body.description
        })
        await newContent.save()
}  

export {contentFunction}
