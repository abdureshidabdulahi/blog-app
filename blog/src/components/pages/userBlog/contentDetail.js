import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { storeContext } from "../../context/storeContext";
import DOMPurify from "dompurify";
import "./userBlog.css";

const ContentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allContents } = useContext(storeContext);

  const item = allContents.find((content) => content._id === id);

  if (!item) {
    return (
      <div className="container" style={{ padding: "2rem" }}>
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
    <div className="container" style={{ maxWidth: "900px",margin:"20px auto",position:"relative"}}>
      <button
        className="back-button"
        onClick={() => navigate(-1)}
        style={{ margin: "20px 0", padding: "10px 16px",
             borderRadius: "8px", border: "1px solid #d1d5db", background: "var(--primary-light-brown)",
              cursor: "pointer",position:"absolute",zIndex:"200",right:"0" }}
      >
        ← Back
      </button>
      <div className="each-content-container" style={{backgroundColor:"var(--primary-dark-brown)", color:"var(light-white-yellow)"}}>
        <div className="content-image" style={{ height: "300px"}}>
          <img src={`http://localhost:5137/images/${item.image}`} alt={item.title} />
          <p>{item.category || "General"}</p>
        </div>

        <h1>{item.title}</h1>

        <div className="blog-profile" style={{ padding: "10px 18px" }}>
          <div>
            <p style={{ color: "#111827", fontWeight: 700, marginBottom: "6px" }}>{item.userName || "Unknown author"}</p>
            <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
              {item.createdAt ? formatDate(item.createdAt) : "Unknown date"}
            </p>
          </div>
        </div>

        <div
          className="quill"
          style={{ margin: "16px 18px 20px 18px", maxHeight: "none", overflow: "auto" }}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.description) }}
        />
      </div>
    </div>
  );
};

export default ContentDetail;
