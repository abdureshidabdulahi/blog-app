
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Header from './components/header/header.js';
import Home from './components/home/home.jsx';   
import Blog from './components/blog.js';
import Footer from './components/footer';
import BlogForm from './components/pages/contentPage/content.js';
import About from './components/about/about.js';
import ProfilePage from './components/pages/profile/profilePage.js';
import LoginPage from './components/pages/login/loginPage.js'; 
import SettingsPage from './components/pages/settings/settings.js';   
import { useContext } from 'react';
import {storeContext} from './components/context/storeContext.js'
 
function App() {
  const {showlogin} =useContext(storeContext)
  return (
    <div className='App'>
     
       <Header/>
        {showlogin?<LoginPage/>:<></>}
       <Routes>
        <Route path='/' element={
          <> 
          <Home/>  
          <Blog/>
          </> 
          }/>
       <Route path='blogs' element={ 
        <>  
          
        </> 
       }
       />
       <Route path='about' element={<About/>}/>
       <Route path='profile'  element={<ProfilePage/>} />
       <Route path='settings' element={<SettingsPage/>} />
       <Route path='/createcontent' element={< BlogForm/>}/> 
       </Routes>
        <Footer/> 
       
    </div>
  );
}

export default App;
