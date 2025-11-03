
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Header from './header';
import Home from './home';
import AllBlogs from './blogsAll';
import Footer from './footer'
import About from './about';
import InformationAboutPic from './infoComponent';
import Login from './login';
import CreateAcount from './createAcount';
function App() {
  return (
    <div className="App">
       <Header/>
       <Routes>
        <Route path='/' element={
          <>
          <Home/>
          <AllBlogs heading={'Latest Blogs'}/>
          <Footer/>
          </>
          
          }/>
       <Route path='blogs' element={ 
        <>
         <Home/>
         <AllBlogs heading={'All Blogs'}/>
          <Footer/>
        </> 
       }
       />
       <Route path='about' element={
        <>
        <About/>
         <Footer/>
        </>
       }
       />
       </Routes>
       <InformationAboutPic/>
       
    </div>
  );
}

export default App;
