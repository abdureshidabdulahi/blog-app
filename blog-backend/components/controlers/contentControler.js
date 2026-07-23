 
import contentModel from "../models/contentsModel.js"



const contentFunction = async (req,res)=>{

    try {

        console.log(req.body);


        const newContent = new contentModel({

            userId:req.userId,

            userName:req.username,

            title:req.body.title,

            category:req.body.category.toUpperCase(),

            author:req.body.author,

            description:req.body.contents,

            image:req.file ? req.file.filename : ""

        });


        await newContent.save();


        res.status(201).json({

            success:true,

            message:"Content created successfully",

            content:newContent

        });


    } catch(error){

        console.log(error);


        res.status(500).json({

            success:false,

            message:"Content creation failed"

        });

    }

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

const addComment = async (req, res) => {
    try {
        const { _id, text } = req.body;
        // Find the post by ID
        const post = await contentModel.findById(_id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        // Add the new comment to the post's comments array
        post.comments.push({
            userId: req.userId,
            userName: req.username,
            text,
            createdAt: new Date()
        });
        // Save the updated post
        await post.save();
        // Return success with updated comments
        res.status(200).json({ message: "Comment added successfully", comments: post.comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export {contentFunction,all_contentLists,userBlog,addComment}
