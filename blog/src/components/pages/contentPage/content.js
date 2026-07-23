import ReactQuill from "react-quill";
import './content.css';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useContext, useState, useCallback } from "react";
import { storeContext } from "../../context/storeContext";
import Cropper from 'react-easy-crop';

const BlogForm = () => {

    const { token } = useContext(storeContext);

    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1.2);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [showCrop, setShowCrop] = useState(false);

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [content, setContent] = useState({
        title: '',
        author: '',
        category: '',
        contents: ''
    });


    const modules = {
        toolbar: [
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


    const triggerFileInput = () => {
        document.getElementById('input-file').click();
    };


    const handleChange = (event) => {

        const file = event.target.files[0];

        if(!file) return;

        const imageUrl = URL.createObjectURL(file);

        setPreviewUrl(imageUrl);
        setCrop({x:0,y:0});
        setZoom(1.2);
        setShowCrop(true);
    };


    const onCropComplete = useCallback((croppedArea, croppedPixels) => {
        setCroppedAreaPixels(croppedPixels);
    }, []);


    const createCroppedImage = async () => {

        const image = new Image();
        image.src = previewUrl;

        await new Promise(resolve => {
            image.onload = resolve;
        });


        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;


        ctx.drawImage(
            image,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            croppedAreaPixels.width,
            croppedAreaPixels.height
        );


        canvas.toBlob((blob) => {

            const croppedFile = new File(
                [blob],
                "profileImage.jpeg",
                {type:"image/jpeg"}
            );


            setImage(croppedFile);

            setPreviewUrl(
                URL.createObjectURL(blob)
            );

            setShowCrop(false);

        }, "image/jpeg");

    };


    const handleInput = (event) => {

        const {name,value} = event.target;

        setContent({
            ...content,
            [name]:value
        });

    };


    const handleQuill = (value) => {

        setContent({
            ...content,
            contents:value
        });

    };


    const handleSubmit = async(event) => {

        event.preventDefault();

        setLoading(true);
        setMessage('');
        setError('');


        try {

            const formData = new FormData();

            formData.append('title',content.title);
            formData.append('author',content.author);
            formData.append('category',content.category);
            formData.append('contents',content.contents);


            if(!image){
                alert("Please crop your image first");
                setLoading(false);
                return;
            }


            formData.append('image',image);


            const response = await axios.post(
                'http://localhost:5137/api/user/savecontent',
                formData,
                {
                    headers:{
                        token:token
                    }
                }
            );


            setMessage(
                response.data.message || "Content created successfully"
            );


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

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="container">

            <h1>Create Content</h1>


            {
                showCrop &&
                <div className="crop-wrapper">

                    <div className="crop-container">

                        <Cropper
                            image={previewUrl}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            cropShape="round"
                            showGrid={false}
                            objectFit="cover"
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />

                    </div>


                    <input
                        className="zoom-slider"
                        type="range"
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        onChange={(e)=>setZoom(Number(e.target.value))}
                    />


                    <button
                        type="button"
                        className="crop-button"
                        onClick={createCroppedImage}
                    >
                        Crop Image
                    </button>

                </div>
            }


            {
                !showCrop && previewUrl ?

                <img
                    className="profile-preview"
                    src={previewUrl}
                    alt="profile"
                />

                :

                !showCrop &&

                <img
                    className="profile-preview"
                    src="/assets/upload_area.png"
                    alt="upload"
                    onClick={triggerFileInput}
                />
            }



            <form onSubmit={handleSubmit}>

                <input
                    id="input-file"
                    type="file"
                    onChange={handleChange}
                />


                <input
                    className="inputs"
                    placeholder="Enter title"
                    name="title"
                    value={content.title}
                    onChange={handleInput}
                />


                <input
                    className="inputs"
                    placeholder="Enter author"
                    name="author"
                    value={content.author}
                    onChange={handleInput}
                />


                <input
                    className="category"
                    placeholder="Enter category"
                    name="category"
                    value={content.category}
                    onChange={handleInput}
                />


                <ReactQuill
                    formats={formats}
                    modules={modules}
                    value={content.contents}
                    onChange={handleQuill}
                />


                {
                    message &&
                    <p className="success-message">{message}</p>
                }


                {
                    error &&
                    <p className="error-message">{error}</p>
                }


                <button disabled={loading}>
                    {loading ? "Saving..." : "Submit"}
                </button>

            </form>

        </div>

    );
};

export default BlogForm;