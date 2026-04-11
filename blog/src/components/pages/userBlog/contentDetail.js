import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { storeContext } from "../../context/storeContext";
import DOMPurify from "dompurify";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import "./userBlog.css";

const ContentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { myBlogs } = useContext(storeContext);

  const item = myBlogs.find((content) => content._id === id);

  if (!item) {
    return (
      <div >
        <div className="empty-state">Loading content... or content not found.</div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="content-detail">
     
      <div className="each-content-container-detail">
         <button
        className="back-button"
        onClick={() => navigate(-1)} 
      >
        ← Back
      </button>
        <div className="content-image" style={{ height: "300px"}}>
          <img src={`http://localhost:5137/images/${item.image}`} alt={item.title} />
          <p>{item.category || "General"}</p>
        </div>

        <h1>{item.title}</h1>

        <div className="blog-profile" style={{ padding: "10px 18px" }}>
          <div>
            <p >{item.userName || "Unknown author"}</p>
            <p  >
              {item.createdAt ? formatDate(item.createdAt) : "Unknown date"}
            </p>
          </div> 
        </div>

        <div
          className="quill"
          
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.description) }}
        />
        <hr/>
          <div className="love-comment">
              <p>
                <FavoriteBorderIcon />
              </p>
              <p>
                <ChatBubbleOutlineIcon />
              </p>
            </div>
      </div>
    </div>
  );
};

export default ContentDetail;
