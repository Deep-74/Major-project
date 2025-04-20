 import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import "antd/dist/reset.css"; // Add this line
import ProtectedPage from "./Components/ProtectedPage";
import Spinner from "./Components/Spinner";
import { useSelector } from 'react-redux'
import Profile from "./Pages/Profile";
import Admin from "./Pages/Admin";
import ProductInfo from "./Pages/Productinfo";

function App() {


  const {loading}=useSelector(state=> state.loaders);
  return (


    <div >
      {loading && <Spinner/>}
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedPage><Home/></ProtectedPage>}/>
        <Route path="/product/:id" element={<ProtectedPage><ProductInfo/></ProtectedPage>}/>
        <Route path="/admin" element={<ProtectedPage><Admin></Admin></ProtectedPage>}/>
        <Route path="/profile" element={<ProtectedPage> <Profile> </Profile></ProtectedPage>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
       

      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
