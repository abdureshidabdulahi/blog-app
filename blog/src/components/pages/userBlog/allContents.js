   import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { storeContext } from "../../context/storeContext";
import "./userBlog.css";
import axios from "axios";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DOMPurify from "dompurify";
import { useState } from "react";

export default function  AllContent(){ 
      const {allContents,token } = useContext(storeContext); 
  const [likesMap,setLikesMap] = useState({})

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }; 
  const onClickHandle = async (postId) => {
  try {
    const result = await axios.post(
      "http://localhost:5137/api/user/like",
      { _id: postId },
      { headers: { token } }
    );

    setLikesMap((prev) => ({
      ...prev,
      [postId]: result.data.likes.length,
    }));
    console.log('this is the likes',likesMap)
  } catch (err) {
    console.log(err);
  }
};
 
 

useEffect(() => {
  const fetchLikes = async () => {
    if (!Array.isArray(allContents)) return;

    const newLikes = {};

    for (let content of allContents) {
      try {
        const res = await axios.post(
          "http://localhost:5137/api/user/all_likes",
          { _id: content._id },
          { headers: { token } }
        );

        newLikes[content._id] = res.data.likes.likes.length;
      } catch (err) {
        console.log(err);
        newLikes[content._id] = 0;
      }
    }

    setLikesMap(newLikes);
  };

  fetchLikes();
}, [allContents]);
    return(
        <div className="allcontent-container">   
      {Array.isArray(allContents) && allContents.length > 0 ? (
        allContents.map((item, index) => (
          <div className="each-content-container" key={index}>
            <Link to={`/post/${item._id}`} className="clickable-link">
              <div className="content-image">
                <img
                  src={`http://localhost:5137/images/${item.image}`}
                  alt={item.title || "Blog image"} height={300}
                />
                <p>{item.category || "General"}</p>
              </div>

              <h1>{item.title}</h1>
              <div
                className="quill preview"
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
                <FavoriteBorderIcon onClick={()=>onClickHandle(item._id)}/>
                  <span><span>{likesMap[item._id] || 0}</span></span>
              </p>
              <p>
                <ChatBubbleOutlineIcon />
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