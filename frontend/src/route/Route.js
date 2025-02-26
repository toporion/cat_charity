
import Dashboard from "../layOut/Dashboard";
import Main from "../layOut/Main";
import CatManagement from "../pages/dashboard/CatManagement";
import Home from "../pages/home/Home";
import RegisterForm from "../pages/register/Register";

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
        }
      ]
    }
  ]);

  export default router;