import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { storeContext } from "../../context/storeContext";
import DOMPurify from "dompurify";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import axios from "axios";
import "./userBlog.css";

const ContentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { myBlogs, allContents, token, userId } = useContext(storeContext);
  const [likesMap, setLikesMap] = useState({});
  const [likedMap, setLikedMap] = useState({});

  const item =
    myBlogs.find((content) => content._id === id) ||
    allContents.find((content) => content._id === id);

  useEffect(() => {
    if (!item) return;

    const fetchLikes = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5137/api/user/all_likes",
          { _id: item._id },
          { headers: { token } }
        );

        const likesArray = res.data.likes.likes;
        const hasLiked = likesArray.some(like => like.userId === userId);
        const isOwnPost = item.userId === userId;
        setLikedMap({ [item._id]: hasLiked });
        if (hasLiked || isOwnPost) {
          setLikesMap({ [item._id]: likesArray.length });
        }
      } catch (err) {
        console.log(err);
        setLikedMap({ [item._id]: false });
      }
    };

    fetchLikes();
  }, [item, token, userId]);

  const onClickHandle = async () => {
    if (!item) return;
    try {
      const result = await axios.post(
        "http://localhost:5137/api/user/like",
        { _id: item._id },
        { headers: { token } }
      );

      const newLiked = !likedMap[item._id];
      setLikedMap({ [item._id]: newLiked });

      const isOwn = item.userId === userId;
      if (newLiked || isOwn) {
        setLikesMap({ [item._id]: result.data.likes.length });
      } else {
        setLikesMap({});
      }
    } catch (err) {
      console.log(err);
    }
  };

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
                {likedMap[item._id] ? (
                  <FavoriteIcon
                    onClick={onClickHandle}
                    style={{ color: "red", cursor: "pointer" }}
                  />
                ) : (
                  <FavoriteBorderIcon
                    onClick={onClickHandle}
                    style={{ cursor: "pointer" }}
                  />
                )}
                {likesMap[item._id] !== undefined && <span>{likesMap[item._id]}</span>}
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
