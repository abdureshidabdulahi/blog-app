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
      {Array.isArray(myBlogs) && myBlogs.length > 0 ? (
        myBlogs.map((item, index) => (
          <div className="each-content-container" key={index}>
            <div className="content-image">
              <img
                src={`http://localhost:5137/images/${item.image}`}
                alt={item.title || "Blog image"}
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

            <div className="love-comment">
              <p>
                <FavoriteBorderIcon />
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