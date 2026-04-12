
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/header/header.js';
import Home from './components/home/home.jsx';   
import Blog from './components/pages/userBlog/blog.js';
import ContentDetail from './components/pages/userBlog/contentDetail.js';
import BlogForm from './components/pages/contentPage/content.js';
import About from './components/about/about.js';
import ProfilePage from './components/pages/profile/profilePage.js';
import LoginPage from './components/pages/login/loginPage.js'; 
import SettingsPage from './components/pages/settings/settings.js';   
import AllContent from './components/pages/userBlog/allContents.js';
import Footer from './components/footer/footer';
import { useContext, useEffect } from 'react';
import {storeContext} from './components/context/storeContext.js'
 
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const {showlogin} =useContext(storeContext)
  return (
    <div className='App'>
       <ScrollToTop />
       <Header/>
        {showlogin?<LoginPage/>:<></>}
       <Routes>
        <Route path='/' element={ 
         <>
          <Home/>    
          <Blog/></>
          }/>
          <Route path='blogs' element={<AllContent/>} />
       
       <Route path='about' element={<About/>}/>
       <Route path='profile'  element={<ProfilePage/>} />
       <Route path='settings' element={<SettingsPage/>} />
       <Route path='/createcontent' element={< BlogForm/>}/>        <Route path='/post/:id' element={<ContentDetail/>} />       </Routes>
        <Footer/> 
       
    </div>
  );
}

export default App;
