import ReactQuill from "react-quill";
import './content.css';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import { storeContext } from "../../context/storeContext";

const BlogForm = () => {

    const { token } = useContext(storeContext);

    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const [content, setContent] = useState({
        title:'',
        author:'',
        category:'',
        contents:''
    });


    const modules = {
        toolbar:[
            [{'header':[3,4,5]}],
            ['bold','italic','underline'],
            [{list:'ordered'}, {list:'bullet'}],
            ['link'],
            ['clean']
        ]
    };


    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'list',
        'bullet',
        'link'
    ];


    const trigerFileInput = () => {
        document.getElementById('input-file').click();
    };


    const handlechange = (event) => {

        const file = event.target.files[0];

        if(!file) return;

        const previewImage = URL.createObjectURL(file);

        setImage(file);
        setPreviewUrl(previewImage);
    };


    const handleInput = (event) => {

        const {name,value} = event.target;

        setContent({
            ...content,
            [name]:value
        });

    };


    const handleQuill = (value)=>{

        setContent({
            ...content,
            contents:value
        });

    };


    const handleSubmit = async(event)=>{

        event.preventDefault();


        setMessage('');
        setError('');
        setLoading(true);


        try {


            const formData = new FormData();


            formData.append('title',content.title);
            formData.append('author',content.author);
            formData.append('category',content.category);
            formData.append('contents',content.contents);


            if(image){
                formData.append('image',image);
            }


            const response = await axios.post(
                'http://localhost:5137/api/user/savecontent',
                formData,
                {
                    headers:{
                        token:token
                    }
                }
            );


            // success message

            setMessage(
                response.data.message || "Content created successfully"
            );
            window.location.reload()


            // clear form after success

            setContent({
                title:'',
                author:'',
                category:'',
                contents:''
            });


            setImage(null);
            setPreviewUrl(null);


        } catch(error){

            console.log(error);


            setError(
                error.response?.data?.message ||
                "Failed to create content"
            );


        } finally{

            setLoading(false);

        }

    };


    useEffect(()=>{
        console.log(content);
    },[content]);



    return(

        <div className="container">

            <h1>Create Content</h1>


            {
                image ?
                <img 
                    src={previewUrl} 
                    alt="previewphoto"
                    onClick={trigerFileInput}
                />
                :
                <img 
                    src="/assets/upload_area.png"
                    alt="upload"
                    onClick={trigerFileInput}
                />
            }


            <form onSubmit={handleSubmit}>


                <input 
                    type="file"
                    id="input-file"
                    onChange={handlechange}
                />


                <h3>Enter Your title Below</h3>

                <input
                    className="inputs"
                    type="text"
                    placeholder="please enter title"
                    value={content.title}
                    name="title"
                    onChange={handleInput}
                    required
                />



                <h3>Enter The Author Below</h3>

                <input
                    className="inputs"
                    type="text"
                    placeholder="please enter author"
                    value={content.author}
                    name="author"
                    onChange={handleInput}
                    required
                />



                <h3>Enter The Category Below</h3>

                <input
                    className="category"
                    type="text"
                    placeholder="please enter category"
                    value={content.category}
                    name="category"
                    onChange={handleInput}
                    required
                />



                <h2>Enter Your Description Below</h2>


                <ReactQuill
                    formats={formats}
                    modules={modules}
                    placeholder="please write your descriptions here"
                    value={content.contents}
                    onChange={handleQuill}
                />



                {
                    message &&
                    <p className="success-message">
                        {message}
                    </p>
                }


                {
                    error &&
                    <p className="error-message">
                        {error}
                    </p>
                }



                <button type="submit" disabled={loading}>

                    {
                        loading ? "Saving..." : "Submit"
                    }

                </button>


            </form>


        </div>

    )

}


export default BlogForm;