 
import Blogs from './blog'

export default function AllBlogs({heading}){
    return(
        <div className="allBlogs-container" id='all-blogs'>
           <div className='titleInfo' >
             <h1>{heading}</h1>
            <p>
            Discover insightful articles, tips, and stories crafted to inspire, inform,
            and keep you updated with the latest trends.
            Dive in and explore what’s new!
                  </p>
           </div>
          <div className='blogs'>
             <Blogs />
          </div>

        </div>
    )
}