// BlogForm.jsx
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const Blog = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", content);
    formData.append("image", image);

    try {
      const res = await axios.post("http://localhost:5000/api/posts", formData);
      console.log(res.data);
      alert("Post created!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Blog</h2>

      {/* React Quill Editor */}
      <ReactQuill value={content} onChange={setContent} className="react-quill"/>

      <br />

      {/* Image Upload */}
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <br /><br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default Blog;