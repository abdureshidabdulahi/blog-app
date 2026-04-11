import contentModel from "../models/contentsModel.js";


export const handleLikes = async (req, res) => {
    try {
        const post = await contentModel.findById(req.body._id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if(pas)

        // Push the new like to the array
        post.likes.push({ userId: req.userId });

        // Save the updated post to the database
        await post.save();
        console.log(post)
        // Respond with success and optionally the updated likes
        res.status(200).json({
            message: "Like added successfully",
            likes: post.likes  // This is the actual array now
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
 


