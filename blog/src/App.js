
import './App.css';
import Header from './header';
import Home from './home';
import AllBlogs from './blogsAll';
import Footer from './footer'
import About from './about';
import Login from './login';
import CreateAcount from './createAcount';
function App() {
  return (
    <div className="App">
       <Header/>
       <Home />
       <AllBlogs/>
      <About/>
      <Footer />
      <Login/>
      <CreateAcount/>
    </div>
  );
}

export default App;
