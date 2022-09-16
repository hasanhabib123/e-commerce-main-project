import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Favourite.css";
// eslint-disable-next-line no-unused-vars
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/FavoriteBorder";
import { Link } from "react-router-dom";
import { deleteFavouriteItemsToCart } from "../../actions/FavouriteAction";
import Loading from "../../more/Loader";
import MetaData from "../../more/Metadata";
import FavouriteItemsCard from "./FavouriteItemsCard.jsx";
// eslint-disable-next-line no-unused-vars
import BottomTab from "../../more/BottomTab";

const Favourite = ({ history }) => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.productDetails);
  const { favouriteItems } = useSelector((state) => state.favourite);

  const deleteFavouriteItems = (id) => {
    dispatch(deleteFavouriteItemsToCart(id));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Favourites Items" />
          {favouriteItems.length === 0 ? (
            <div className="emptyCart">
              <RemoveShoppingCartIcon />
              <Typography>No Items In Favourites</Typography>
              <Link to="/products">View Products</Link>
              <BottomTab />
            </div>
          ) : (
            <>
              <div className="favouritesPage">
                <div className="favouritesHeader">
                  <p>Product</p>
                  <p>Price</p>
                  <p>Stock Status</p>
                  <p>Action</p>
                </div>
                {favouriteItems &&
                  favouriteItems.map((item) => (
                    <div className="favouritesContainer" key={item.product}>
                      <FavouriteItemsCard
                        item={item}
                        deleteFavouriteItems={deleteFavouriteItems}
                      />
                    </div>
                  ))}
                <BottomTab />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Favourite;
