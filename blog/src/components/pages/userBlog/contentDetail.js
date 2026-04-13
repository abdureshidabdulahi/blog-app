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
  const [showCommentInput, setShowCommentInput] = useState(false); // State to toggle comment input visibility
  const [commentText, setCommentText] = useState(""); // State for the comment text input
  const [comments, setComments] = useState([]); // State to store the list of comments

  const item =
    myBlogs.find((content) => content._id === id) ||
    allContents.find((content) => content._id === id);

  useEffect(() => {
    if (!item) return;

    // Set comments from the post data
    setComments(item.comments || []);

    // Fetch likes data for the post
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

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return; // Don't submit empty comments
    try {
      // Send comment to backend
      const result = await axios.post(
        "http://localhost:5137/api/user/addcomment",
        { _id: item._id, text: commentText },
        { headers: { token } }
      );
      // Update comments list and reset input
      setComments(result.data.comments);
      setCommentText("");
      setShowCommentInput(false);
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

// in the comment it show how many seconds hour months years ago was writen the comment

  const timeAgo = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);

  const diff = Math.floor((now - past) / 1000); // seconds

  if (diff < 60) return "Just now";

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day ago`;

  return past.toLocaleDateString();
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
          <div className='blog-profile-1'>
            <img src='/assets/photo_2025-02-08_17-34-55.jpg' alt='profile-imag' width={50} height={50} />
            <p >{item.userName || "Unknown author"}</p>
           
          </div> 
           <p>
              {item.createdAt ? formatDate(item.createdAt) : "Unknown date"}
            </p>
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
                <ChatBubbleOutlineIcon 
                  style={{ cursor: "pointer" }}
                />
              </p>
            </div>
            {
              <>
              <h1>Comments</h1>
              <div className="comment-input">
                {/* Input field for writing comments */}
                
                <input
                  type="text"
                  className="write-comment"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
                />
                {/* Button to submit the comment */}
                <button className="post-button" onClick={handleCommentSubmit}>Post</button>
              </div></>
            }
            {/* Section to display all comments */}
            <div className="comments-section">
              {comments.map((comment, index) => (
              <>
                <div key={index} className="comment">
                <img src='/assets/photo_2025-02-08_17-34-55.jpg' alt='me' width={40} height={40}/>
                <p className='comments-info'><span className='username'>{comment.userName}</span><span>{comment.text}</span><span>{timeAgo(comment.createdAt)}</span> </p>
                </div>
                <hr />
                </>
              ))}
              
            </div>
      </div>
    </div>
  );
};

export default ContentDetail;
