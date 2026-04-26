import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { storeContext } from "../../context/storeContext";
import "./userBlog.css";
import axios from "axios";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DOMPurify from "dompurify";
import { useState } from "react";

const Blog = () => {
  const { myBlogs, token, userId,setShowCommentInput } = useContext(storeContext); 
  const navigate = useNavigate();
  const [likesMap, setLikesMap] = useState({})
  const [likedMap, setLikedMap] = useState({})

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  // const onClickHandle =async (postId)=>{
  //   console.log('i am being clicked',postId)
  //   const result = await axios.post('http://localhost:5137/api/user/like',{_id:postId},{headers:{token}}) 
  //   console.log(token)
    
  //   console.log('this is my likes',result.data.likes)
    
  // }
  const onClickHandle = async (postId, isOwn) => {
  try {
    const result = await axios.post(
      "http://localhost:5137/api/user/like",
      { _id: postId },
      { headers: { token } }
    );

    const newLiked = !likedMap[postId];
    setLikedMap((prev) => ({
      ...prev,
      [postId]: newLiked,
    }));

    if (newLiked || isOwn) {
      setLikesMap((prev) => ({
        ...prev,
        [postId]: result.data.likes.length,
      }));
    } else {
      setLikesMap((prev) => {
        const newMap = { ...prev };
        delete newMap[postId];
        return newMap;
      });
    }
  } catch (err) {
    console.log(err);
  }
};
 
 

useEffect(() => {
  const fetchLikes = async () => {
    if (!Array.isArray(myBlogs)) return;

    const newLikes = {};
    const newLiked = {};

    for (let blog of myBlogs) {
      try {
        const res = await axios.post(
          "http://localhost:5137/api/user/all_likes",
          { _id: blog._id },
          { headers: { token } }
        );

        const likesArray = res.data.likes.likes;
        const hasLiked = likesArray.some(like => like.userId === userId);
        const isOwnPost = blog.userId === userId;
        newLiked[blog._id] = hasLiked;
        if (hasLiked || isOwnPost) {
          newLikes[blog._id] = likesArray.length;
        }
      } catch (err) {
        console.log(err);
        newLiked[blog._id] = false;
      }
    }

    setLikesMap(newLikes);
    setLikedMap(newLiked);
  };

  fetchLikes();
}, [myBlogs, token, userId]);
  return ( 
    <div className="container-blogs">  
      {Array.isArray(myBlogs) && myBlogs.length > 0 ? (
        myBlogs.map((item, index) => (
          <div className="each-content-container-myblog" key={index}>
            <div className="content-image-myblog">
              <Link to={`/post/${item._id}`} className="clickable-link-myblog-1">
                <img
                  src={`http://localhost:5137/images/${item.image}`}
                  alt={item.title || "Blog image"}
                />
                <p>{item.category || "General"}</p>
              </Link>
            </div>

            

            <Link to={`/post/${item._id}`} className="clickable-link-myblog-2">
            <h2>{item.title}</h2>
              <div
                className="quill-myblog preview"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(item.description),
                }}
              />
            </Link>

            <div className="blog-profile">
              <AccountBoxIcon className="profile-AccountBoxIcon" />
              <p>
                {item.createdAt ? formatDate(item.createdAt) : "Unknown date"}
                {" • "}
                <span>by {item.userName || "Unknown author"}</span>
              </p>
            </div>

            <div className="love-comment">
              <p>
                {likedMap[item._id] ? (
                  <FavoriteIcon
                    onClick={() => onClickHandle(item._id, item.userId === userId)}
                    style={{ color: "red", cursor: "pointer" }}
                  />
                ) : (
                  <FavoriteBorderIcon
                    onClick={() => onClickHandle(item._id, item.userId === userId)}
                    style={{ cursor: "pointer" }}
                  />
                )}
                {likesMap[item._id] !== undefined && <span>{likesMap[item._id]}</span>}
              </p>
              <p>
                {/* Comment icon that navigates to detail page for full commenting */}
                <ChatBubbleOutlineIcon
                  onClick={() =>{
                     navigate(`/post/${item._id}`)
                     setShowCommentInput(true)
                  }}
                  style={{ cursor: "pointer" }}
                />
                {/* Display comment count */}
                <span>{item.comments ? item.comments.length : 0}</span>
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="empty-state">No blogs found yet. Start writing your first article!</div>
      )}
    </div>
  );
};

export default Blog;