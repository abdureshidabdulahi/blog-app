import { useContext } from "react";
import { storeContext } from "../../context/storeContext";
import "./userBlog.css";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DOMPurify from "dompurify";

const Blog = () => {
  const { myBlogs } = useContext(storeContext);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container">
      {myBlogs.map((item, index) => (
        <div className="each-content-container" key={index}>
          
         <div className="content-image">
         <img
            src={`http://localhost:5137/images/${item.image}`}
            alt="header"
          />
          <p>{item.category}</p>
         </div>

          <h1>{item.title}</h1>

          {/* ✅ Render Quill HTML with preview truncation */}
          <div
            className="quill preview"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(item.description),
            }}
          />

          {/* Profile + Date */}
          <div className="blog-profile">
            <AccountBoxIcon className="profile-AccountBoxIcon" />
            <p>
              {formatDate(item.createdAt)} .{" "}
              <span>by {item.userName}</span>
            </p>
          </div>

          <hr />

          {/* Like & Comment Icons */}
          <div className="love-comment">
            <p>
              <FavoriteBorderIcon />
            </p>
            <p>
              <ChatBubbleOutlineIcon />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;