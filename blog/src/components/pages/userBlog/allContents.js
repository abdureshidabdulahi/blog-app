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

export default function  AllContent(){ 
      const {allContents, token, userId,setShowCommentInput } = useContext(storeContext); 
  const navigate = useNavigate();
  const [likesMap,setLikesMap] = useState({})
  const [likedMap,setLikedMap] = useState({})

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }; 
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
    if (!Array.isArray(allContents)) return;

    const newLikes = {};
    const newLiked = {};

    for (let content of allContents) {
      try {
        const res = await axios.post(
          "http://localhost:5137/api/user/all_likes",
          { _id: content._id },
          { headers: { token } }
        );

        const likesArray = res.data.likes.likes;
        const hasLiked = likesArray.some(like => like.userId === userId);
        const isOwnPost = content.userId === userId;
        newLiked[content._id] = hasLiked;
        if (hasLiked || isOwnPost) {
          newLikes[content._id] = likesArray.length;
        }
      } catch (err) {
        console.log(err);
        newLiked[content._id] = false;
      }
    }

    setLikesMap(newLikes);
    setLikedMap(newLiked);
  };

  fetchLikes();
}, [allContents, token, userId]);
    return(
        <div className="allcontent-container">   
      {Array.isArray(allContents) && allContents.length > 0 ? (
        allContents.map((item, index) => (
          <div className="each-content-container-allcontent" key={index}>
            <Link to={`/post/${item._id}`} className="clickable-link-allcontent">
              <div className="content-image-allcontent">
                <img
                  src={`http://localhost:5137/images/${item.image}`}
                  alt={item.title || "Blog image"} height={300}
                />
                <p>{item.category || "General"}</p>
              </div>

              <h1>{item.title}</h1>
              <div
                className="quill-allcontent preview"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(item.description),
                }}
              />

              <div className="blog-profile">
                <AccountBoxIcon className="profile-AccountBoxIcon" />
                <p>
                  {item.createdAt ? formatDate(item.createdAt) : "Unknown date"}
                  {" • "}
                  <span>by {item.userName || "Unknown author"}</span>
                </p>
              </div>
            </Link>

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