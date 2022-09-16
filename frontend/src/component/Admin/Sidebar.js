import AddIcon from "@material-ui/icons/Add";
import PostAddIcon from "@material-ui/icons/PostAdd";
import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
// eslint-disable-next-line no-unused-vars
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar = () => {
  
  const button = () =>{
    // eslint-disable-next-line no-unused-vars
    let items = document.querySelectorAll(".Dashboard__item");
   
}

  return (
    <div className="sidebar">
      <Link to="/">
        <img src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/logo.svg" alt="Ecommerce" 
        />
      </Link>
      <Link to="/dashboard">
        <p className="Dashboard__item" onClick={button}>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
          <Link to="/admin/products">
              <p className="Dashboard__item"><PostAddIcon /> All Products</p>
          </Link>

          <Link to="/admin/product">
             <p><AddIcon />Create Product</p>
          </Link>

         
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;