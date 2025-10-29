
import './App.css'
export default function Footer(){
    return(
        <div className="footer-container">
            <div className="footer">

            <div className="list-one">
                <h1>About</h1>
                <ul>
                    <li>
                        Blog is your trusted source
                        for thought-provoking insights and updates
                        on technology, lifestyle, and more.
                    </li>
                     
                   <li>    <links href='#'>Email:rashka2024boy@hotmail.com</links></li>
                         <li><links href='#'>phone:+251952647567</links></li>
                </ul>
            </div>
           
             <div className="list-two">
                 <h1>Quick links</h1>
                <ul>
                     <li><links>Home</links></li>
                      <li><links>Blogs</links></li>
                       <li><links>About</links></li>
                        <li><links>Contact</links></li>
                </ul>
             </div>
             <div className="list-three">
                 <h1>Categories</h1>
                <ul>
                     <li><links>Technology</links></li>
                      <li><links>Life Style</links></li>
                       <li><links>News</links></li>
                        <li><links>Weather</links></li>
                </ul>
             </div>
             <div className="list-four">
                 <h1>Resources</h1>
                <ul>
                     <li><links>Help center</links></li>
                      <li><links>Documentation</links></li>
                       <li><links>API Reference</links></li>
                        <li><links>Community Forum</links></li>
                </ul>
             </div>
             </div>
             <p>@compywrite</p>
        </div>
    )
}