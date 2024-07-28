import {  Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Models from './pages/Models'
import About from './pages/About'
import NoPage from './pages/NoPage'
import Navbar from "./components/Navbar";



function App() {
  return (
    <>
    <Navbar/>
    <div>
    
        <Routes>
          <Route index element ={<Home/>} />
          <Route path ="/home" element={<Home/> } />
          <Route path ="/about" element={<About/> } />
          <Route path ="/models" element={<Models/> } />
          <Route path ="*" element={<NoPage/>} />
        </Routes>
      
    </div>
    </>
  );
}

export default App;
