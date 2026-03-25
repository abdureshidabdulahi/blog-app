import { useContext } from "react";
import { storeContext } from "../../context/storeContext";
import "./userBlog.css";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DOMPurify from "dompurify";

const Blog = () => {
  const { myBlogs } = useContext(storeContext);

  //Function to extract plain text and truncate it
  const getShortText = (html, limit = 120) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;

    const text = temp.textContent || temp.innerText || "";

    return text.length > limit
      ? text.substring(0, limit) + "..."
      : text;
  };
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
          <img
            src={`http://localhost:5137/images/${item.image}`}
            alt="header"
          />

          <h1>{item.title}</h1>

          {/*Show shortened text instead of full HTML */}
          <p className="quill">
            {getShortText(item.description, 120)}
          </p> 
          <div className="blog-profile">
           {<AccountBoxIcon className="profile-AccountBoxIcon"/>} 
           <p>{formatDate(item.createdAt)} .<span>by @{item.userName}</span></p>

          </div>
          <hr /> 

        </div>
      ))}
    </div>
  );
};

export default Blog;