import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { storeContext } from "../../context/storeContext";
import "./userBlog.css";
import axios from "axios";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DOMPurify from "dompurify";

const Blog = () => {
  const { myBlogs,token } = useContext(storeContext);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const onClickHandle =async (postId)=>{
    console.log('i am being clicked',postId)
    await axios.post('http://localhost:5137/api/user/like',{_id:postId},{headers:{token}}) 
    console.log(token)
    
  }
 useEffect(()=>{
  console.log('this is the blogs',myBlogs)
 },[])
  return ( 
    <div className="container-blogs">  
      {Array.isArray(myBlogs) && myBlogs.length > 0 ? (
        myBlogs.map((item, index) => (
          <div className="each-content-container" key={index}>
            <div className="content-image">
              <Link to={`/post/${item._id}`} className="clickable-link">
                <img
                  src={`http://localhost:5137/images/${item.image}`}
                  alt={item.title || "Blog image"} height={300}
                />
                <p>{item.category || "General"}</p>
              </Link>
            </div>

            

            <Link to={`/post/${item._id}`} className="clickable-link">
            <h1>{item.title}</h1>
              <div
                className="quill preview"
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
                <FavoriteBorderIcon onClick={()=>onClickHandle(item._id)}/>
                  <span>455</span>
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

export default Blog;