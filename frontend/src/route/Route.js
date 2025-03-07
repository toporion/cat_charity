
import Dashboard from "../layOut/Dashboard";
import Main from "../layOut/Main";
import AdoptCat from "../pages/dashboard/AdoptCat";
import CatDetails from "../pages/dashboard/AllCats";
import AllRequests from "../pages/dashboard/AllRequests";
import AllUsers from "../pages/dashboard/AllUsers";
import CatList from "../pages/dashboard/CatList";
import CatManagement from "../pages/dashboard/CatManagement";
import CreateCatPro from "../pages/dashboard/CreateCatPro";
import ShowDetails from "../pages/dashboard/ShowDetails";
import Update from "../pages/dashboard/Update";
import User from "../pages/dashboard/User";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import RegisterForm from "../pages/register/Register";
import AdminRoute from "./AdminRoute";

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children:[
        {
            path:'/',
            element:<Home/>
        },
        {
          path:"/register",
          element:<RegisterForm/>
        },
        {
          path:'/login',
          element:<Login/>
        }
      ]
    },
    {
      path:'dashboard',
      element:<Dashboard/>,
      children:[
        
        {
          path:"catManage",
          element:<CatManagement/>
        },
        {
          path:'createCat',
          element:<CreateCatPro/>
        },
        {
          path:'catDetails',
          element:<CatDetails/>
        },
        {
          path:'adopt/:catId',
          element:<AdoptCat/>
        },
        {
          path:'requets',
          element:<AllRequests/>
        },
        {
          path:'user',
          element:<User/>
        },
        {
          path:'allUser',
          element:<AllUsers/>
        },
        {
          path:'caltlist',
          element:<CatList/>
        },
        {
          path:'catdetails/:id',
          element:<ShowDetails/>
        },
        {
          path:'update/:id',
          element:<Update/>
        }
      ]
    }
  ]);

  export default router;