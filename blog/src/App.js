
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Header from './components/header/header.js';
import Home from './components/home/home.jsx';
import AllBlogs from './components/blogsAll.js';
import Footer from './components/footer';
import About from './components/about';
import LoginPage from './components/pages/login/loginPage.js';
import { useState } from 'react';
import { useContext } from 'react';
import {storeContext} from './components/context/storeContext.js'
 
function App() {
  const {showlogin} =useContext(storeContext)
  return (
    <div className="App">
       <Header/>
       <Routes>
        <Route path='/' element={
          <>
          {showlogin?<LoginPage/>:<></>}
          <Home/>
          <AllBlogs heading={'Latest Blogs'}/> 
          </> 
          }/>
       <Route path='blogs' element={ 
        <>
         <Home/>
         <AllBlogs heading={'All Blogs'}/>
          
        </> 
       }
       />
       <Route path='about' element={<About/>}/>
        
     
       </Routes>
        <Footer/> 
       
    </div>
  );
}

export default App;
