import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import {
  useGetWishlistProductQuery,
  usePostDeleteWishlistMutation,
} from "../store/api/wishlistapi";
import { useDispatch, useSelector } from "react-redux";
import { addwishlist } from "../store/state/wishlist";
import Header from "../components/Header/Header";

const Wishlist = () => {
  const nvg = useNavigate();
  const dispatch = useDispatch();
  const globalvariable = useSelector((state) => state);

  // Local state for wishlist data
  const [wishlist, setWishlist] = useState([]);
  const {
    data: wishlistdata,
    isLoading,
    refetch: wishlistRefetch, // Renamed refetch to wishlistRefetch
  } = useGetWishlistProductQuery();

  const [removetowishlistapi] = usePostDeleteWishlistMutation();

  // Re-fetch data when the page is visited
  useEffect(() => {
    wishlistRefetch(); // Use wishlistRefetch here
  }, []); // Empty dependency array ensures it runs only on mount

  // Sync wishlist data with API response
  useEffect(() => {
    if (wishlistdata?.data) {
      setWishlist(wishlistdata.data); // Update local state with API data
    }
  }, [wishlistdata]);

  // Redirect to Product Details Page
  const transfer = (productid) => {
    nvg(`/productdetails/${productid}`);
  };

  // Remove item from Wishlist
  const removewishlist = async (data) => {
    const wishlist_value = {
      product_id: data.product_id?._id || null,
      item_or_variant: data.product_id ? "item" : "variant",
      product_variant_id: data.product_variant_id?._id || null,
    };

    try {
      const response = await removetowishlistapi(wishlist_value);
      if (response.data.status === "successfully") {
        // Update the global wishlist count
        dispatch(addwishlist(globalvariable.wishlist - 1));

        // Update local wishlist state
        const updatedWishlist = wishlist.filter(
          (item) =>
            item.product_id?._id !== data.product_id?._id &&
            item.product_variant_id?._id !== data.product_variant_id?._id
        );
        setWishlist(updatedWishlist);

        // If the updated local state is empty, refetch server data for confirmation
        if (updatedWishlist.length === 0) {
          await wishlistRefetch(); // Ensure server sync
        }
      } else {
        console.error("Failed to remove item from wishlist", response);
      }
    } catch (error) {
      console.error("Error while removing item from wishlist:", error);
    }
  };

  return isLoading ? (
    <></>
  ) : (
    <>
      <Header />

      {/* Breadcrumb */}
      <div
        className="breadcrumb-main marginfromtop"
        style={{ backgroundColor: "#f9f9f9" }}
      >
        <div className="container m-0">
          <div className="row">
            <div className="col">
              <div className="breadcrumb-contain">
                <div>
                  <ul>
                    <li>
                      <a href="/">home</a>
                    </li>
                    <li style={{ fontSize: "12px" }}>&gt;</li>
                    <li>
                      <a href="javascript:void(0)">Wishlist</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wishlist Section */}
      <section
        className="section-big-pt-space ratio_asos"
        style={{ background: "#f9f9f9", minHeight: "100vh" }}
      >
        <div className="collection-wrapper">
          <div className="custom-container">
            <div className="row">
              <div className="collection-content col">
                <div className="page-main-content">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="collection-product-wrapper">
                        <div className="product-wrapper-grid product">
                          <div
                            className="row removepadding"
                            style={{ gap: "7px" }}
                          >
                            {wishlist.length > 0 ? (
                              wishlist.map((item, index) => (
                                <div
                                  className="col-xl-3 col-md-4 col-sm-6 col-12"
                                  key={index}
                                >
                                  <div
                                    className="bg-white"
                                    style={{ margin: "3px 4px" }}
                                  >
                                    <div className="product-imgbox">
                                      <div className="product-front">
                                        <button
                                          type="button"
                                          className="btn fixedhight"
                                          style={{
                                            width: "100%",
                                            position: "relative",
                                          }}
                                        >
                                          <img
                                            src={
                                              item.product_id?.product_image1 ||
                                              item.product_variant_id
                                                ?.product_image1 ||
                                              "default-image-url"
                                            }
                                            onClick={() => {
                                              const productId =
                                                item.product_id?._id ||
                                                item.product_variant_id
                                                  ?.product_id;
                                              if (productId) {
                                                transfer(productId);
                                              } else {
                                                console.error(
                                                  "Product ID not found for transfer"
                                                );
                                              }
                                            }}
                                            className="img-fluid"
                                            alt="product"
                                          />
                                          <span
                                            style={{
                                              position: "absolute",
                                              right: "12px",
                                              top: "8px",
                                              display: "inline-block",
                                              zIndex: 56,
                                            }}
                                            onClick={() => {
                                              removewishlist(item);
                                            }}
                                          >
                                            <MdOutlineDeleteOutline
                                              size={25}
                                              color="#333"
                                            />
                                          </span>
                                        </button>
                                      </div>
                                    </div>
                                    <div className="product-detail detail-center detail-inverse">
                                      <div className="detail-title">
                                        <div className="detail-left">
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                            }}
                                          >
                                            <button
                                              type="button"
                                              className="btn"
                                              onClick={() => {
                                                const productId =
                                                  item.product_id?._id ||
                                                  item.product_variant_id
                                                    ?.product_id;
                                                if (productId) {
                                                  transfer(productId);
                                                } else {
                                                  console.error(
                                                    "Product ID not found for transfer"
                                                  );
                                                }
                                              }}
                                            >
                                              <h6
                                                className="price-title"
                                                style={{
                                                  fontSize: "12px",
                                                  fontWeight: "600",
                                                }}
                                              >
                                                {item?.product_name ||
                                                  "Unnamed Product"}
                                              </h6>
                                            </button>
                                          </div>
                                        </div>
                                        <div
                                          className="detail-right"
                                          style={{ width: "100%" }}
                                        >
                                          <div
                                            className="price"
                                            style={{ width: "100%" }}
                                          >
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                color: "#000",
                                                fontSize: "12px",
                                                fontWeight: "500",
                                              }}
                                            >
                                              ₹
                                              {item.product_id?.selling_price ||
                                                item.product_variant_id
                                                  ?.selling_price ||
                                                "N/A"}
                                              {item.product_id?.discount >
                                                0 && (
                                                <span
                                                  style={{
                                                    fontSize: "10px",
                                                    color: "#c1c1c1",
                                                    textDecoration:
                                                      "line-through",
                                                    paddingLeft: "3px",
                                                  }}
                                                >
                                                  ₹{item.product_id?.mrp_price}
                                                </span>
                                              )}
                                              {item.product_id &&
                                                item.product_id.mrp_price &&
                                                item.product_id
                                                  .selling_price && (
                                                  <span
                                                    style={{
                                                      fontSize: "10px",
                                                      color: "#230bb3",
                                                      paddingLeft: "3px",
                                                    }}
                                                  >
                                                    {`(${parseInt(
                                                      ((item.product_id
                                                        .mrp_price -
                                                        item.product_id
                                                          .selling_price) /
                                                        item.product_id
                                                          .mrp_price) *
                                                        100
                                                    )}% off)`}
                                                  </span>
                                                )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <h2
                                style={{
                                  textAlign: "center",
                                  paddingTop: "17px",
                                  fontWeight: "600",
                                  fontSize: "20px",
                                }}
                              >
                                Your Wishlist is empty!!
                              </h2>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Wishlist;
