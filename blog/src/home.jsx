
import './App.css'
export default function Home(){
    return(
        <div className="home-container">
            <h1>Elevate your voice.</h1>
            <h1>Share stories that matter.</h1>
            <p>welcom to <span>Blog</span> - amodern platform to write,read,and connect throught a powerfull content.</p>
            <div className='twinButtons'><button className='one'>Browse Blogs</button><button className='two'>Get Started</button></div>
            <div className='search'><input type='text' placeholder='search ....'/></div>
        </div>
    )
}