 import { data } from 'react-router-dom'
import './profile.css'
import { useContext,useEffect,useState } from 'react'
import { storeContext } from '../../context/storeContext'
import axios from "axios";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DOMPurify from "dompurify";

import { Link, useNavigate } from "react-router-dom";


const ProfilePage =()=>{
    
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

    return(
        <div className="profile-page">
            <div className="profile-blogs">
                
                <div className="profile-blogs-list">
                    <h2>My Blogs</h2>
                   {Array.isArray(myBlogs) && myBlogs.length > 0 ? (
        myBlogs.map((item, index) => (
          <div className="each-content-profile-container" key={index}>
            <div className="content-profile-image">
              <Link to={`/post/${item._id}`} className="clickable-link">
                <img
                  className="blog-card-image"
                  src={`http://localhost:5137/images/${item.image}`}
                  alt={item.title || "Blog image"}
                />
              </Link>
            </div>

            <Link to={`/post/${item._id}`} className="clickable-link">
              <h1 className="profile-blog-title">{item.title}</h1>
            </Link>

            <div className="blog-profile">
              <AccountBoxIcon className="profile-AccountBoxIcon" />
              <p>
                {item.createdAt ? formatDate(item.createdAt) : "Unknown date"}
                {" • "}
                <span>by {item.userName || "Unknown author"}</span>
              </p>
            </div>

            <div className="love-comment-profile">
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
            
            </div>
            <div className="profile-profile"> 
                <h2>My Profile</h2>
                <img src='/assets/erick-chevez-WSD3UnbB6ZI-unsplash.jpg' alt="profile-phot" width={150} height={150}/>
                <p>@user</p>
                <p>0 blogs - 0 reads</p>
                <button>Edit Profile</button>
                <p className='bio'>no bio here</p>
                <p>joined at december 9</p>


            </div>
        </div>
    )
}

export default ProfilePage