
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Header from './components/header/header.js';
import Home from './components/home/home.jsx';
import AllBlogs from './components/blogsAll.js';
import Footer from './components/footer';
import About from './components/about';
 
function App() {
  return (
    <div className="App">
       <Header/>
       <Routes>
        <Route path='/' element={
          <>
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
       <Route path='about' element={
        <>
        <About/>
        
        </>
       }
       />
       </Routes>
        <Footer/> 
       
    </div>
  );
}

export default App;
