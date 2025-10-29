
import './App.css';
import Header from './header';
import Home from './home';
import AllBlogs from './blogsAll';
import Footer from './footer';
function App() {
  return (
    <div className="App">
       <Header/>
       <Home />
       <AllBlogs/>
       <Footer />
    </div>
  );
}

export default App;
