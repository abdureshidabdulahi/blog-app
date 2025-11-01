
import './App.css';
import Header from './header';
import Home from './home';
import AllBlogs from './blogsAll';
import Footer from './footer'
import About from './about';
function App() {
  return (
    <div className="App">
       <Header/>
       <Home />
       <AllBlogs/>
      <About/>
      <Footer />
    </div>
  );
}

export default App;
