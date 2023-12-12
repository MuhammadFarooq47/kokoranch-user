import React, { Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";
// layout
import Layout from "../components/layout";
//  traderSideBar
import TraderSideBar from "../components/traderSideBar";
// Vendor Imports
import VendorSideBar from "../pages/dashboard/vendor/SideBar";
import UserSideMenu from "../components/userSideMenu";
import ServiceOrderIndividual from "../pages/dashboard/vendor/ServiceOrderIndividual";

// Full Screen Loader
import FullScreenLoader from "../components/FullScreenLoader";

// PROTECTIVE ROUTE
import ProtectedRoute from "./authetication";
import { useDispatch, useSelector } from "react-redux";
import { CHECK_TOKEN } from "../redux/actions/authentication";

// SCREENS
const Login = React.lazy(() => import("../pages/auth/login"));
const Register = React.lazy(() => import("../pages/auth/register"));
const VendorRegister = React.lazy(() => import("../pages/auth/vendorRegister"));
const About = React.lazy(() => import("../pages/screens/about"));
const ContactUs = React.lazy(() => import("../pages/screens/contact"));
const Terms = React.lazy(() => import("../pages/screens/termsConditions"));
const FAQS = React.lazy(() => import("../pages/screens/faqs"));
const Policy = React.lazy(() => import("../pages/screens/privacyPolicy"));
const Categories = React.lazy(() => import("../pages/screens/categories"));
const SubCategories = React.lazy(() =>
  import("../pages/screens/subCategories")
);
const SubSubCategories = React.lazy(() =>
  import("../pages/screens/subSubCategories")
);
const AgricultureServices = React.lazy(() =>
  import("../pages/screens/agricultureServices")
);
const MedicalMariguanaAds = React.lazy(() =>
  import("../pages/screens/medicalMariguanaAds")
);
const Products = React.lazy(() => import("../pages/screens/products"));
const Product = React.lazy(() => import("../pages/screens/product"));
const SellerProducts = React.lazy(() =>
  import("../pages/screens/sellerproducts")
);
const SellerServices = React.lazy(() =>
  import("../pages/screens/sellerServices")
);
const SellerTrades = React.lazy(() => import("../pages/screens/sellerTrades"));
const Cart = React.lazy(() => import("../pages/screens/cart"));
const Checkout = React.lazy(() => import("../pages/screens/checkout"));
const Payment = React.lazy(() => import("../pages/screens/payment"));
const Search = React.lazy(() => import("../pages/screens/search"));
const Services = React.lazy(() => import("../pages/screens/services"));
const Service = React.lazy(() => import("../pages/screens/service"));
const SignupSuccess = React.lazy(() =>
  import("../pages/screens/signupsuccess")
);
const VendorSignupSuccess = React.lazy(() =>
  import("../pages/screens/vendorSignupSuccess")
);
const Trades = React.lazy(() => import("../pages/screens/trades"));
const Trade = React.lazy(() => import("../pages/screens/trade"));
const TradeDetails = React.lazy(() =>
  import("../pages/dashboard/trader/trades/tradeDetails")
);
const MyProfile = React.lazy(() => import("../pages/dashboard/user/MyProfile"));
const AddressBook = React.lazy(() =>
  import("../pages/dashboard/user/AddressBook")
);
const Inbox = React.lazy(() => import("../pages/dashboard/user/inbox"));
const OrdersInfo = React.lazy(() =>
  import("../pages/dashboard/user/ordersInfo")
);
const TradeRequest = React.lazy(() =>
  import("../pages/dashboard/user/tradeRequest")
);
const Wishlist = React.lazy(() => import("../pages/dashboard/user/wishlist"));
const OrderPlaced = React.lazy(() => import("../pages/screens/orderPlaced"));
const TraderProfile = React.lazy(() =>
  import("../pages/dashboard/trader/profile")
);
const TraderTrades = React.lazy(() =>
  import("../pages/dashboard/trader/trades")
);
const TraderTradeRequests = React.lazy(() =>
  import("../pages/dashboard/trader/tradeRequests")
);
const TraderIndox = React.lazy(() =>
  import("../pages/dashboard/trader/traderInbox")
);
const TraderSettings = React.lazy(() =>
  import("../pages/dashboard/trader/tradderSettings")
);
const Verify = React.lazy(() => import("../pages/screens/verify"));
const ForgotPassword = React.lazy(() => import("../pages/auth/forgotPassword"));
const ResetPassword = React.lazy(() => import("../pages/auth/resetPassword"));
const CreateNewPassword = React.lazy(() =>
  import("../pages/auth/createNewPassword")
);

// Vendor Imports
const VendorProfile = React.lazy(() =>
  import("../pages/dashboard/vendor/profile")
);
const VendorProducts = React.lazy(() =>
  import("../pages/dashboard/vendor/Products")
);
const VendorProductDetails = React.lazy(() =>
  import("../pages/dashboard/vendor/ProductDetails")
);
const VendorProductDetailsEdit = React.lazy(() =>
  import("../pages/dashboard/vendor/EditProductDetails")
);
const VendorProductDetailsAdd = React.lazy(() =>
  import("../pages/dashboard/vendor/AddProductDetails")
);
const VendorServices = React.lazy(() =>
  import("../pages/dashboard/vendor/Services")
);
const VendorServicesDetailsEdit = React.lazy(() =>
  import("../pages/dashboard/vendor/EditServiceDetails")
);
const VendorServicesDetails = React.lazy(() =>
  import("../pages/dashboard/vendor/ServiceDetails")
);
const VendorServiceOrders = React.lazy(() =>
  import("../pages/dashboard/vendor/ServiceOrders")
);
const VendorServiceOrderDetails = React.lazy(() =>
  import("../pages/dashboard/vendor/ServiceOrderDetails")
);
const VendorProductOrders = React.lazy(() =>
  import("../pages/dashboard/vendor/ProductOrders")
);
const VendorProductOrderDetails = React.lazy(() =>
  import("../pages/dashboard/vendor/ProductOrderDetails")
);
const VendorProductShippingDetail = React.lazy(() =>
  import("../pages/dashboard/vendor/ProductShippingDetail")
);
const VendorProductShippingDetailEdit = React.lazy(() =>
  import("../pages/dashboard/vendor/ProductShippingDetailEdit")
);
const FeaturedProductsAndServices = React.lazy(() =>
  import("../pages/dashboard/vendor/Featured")
);
const FeaturedProducts = React.lazy(() =>
  import("../pages/dashboard/vendor/FeaturedProducts")
);
const ViewFeaturedProductsAndServices = React.lazy(() =>
  import("../pages/dashboard/vendor/ViewFeaturedDetails")
);
const EditFeaturedProductsAndService = React.lazy(() =>
  import("../pages/dashboard/vendor/EditFeatured")
);
const PaymentFeaturedComponent = React.lazy(() =>
  import("../pages/dashboard/vendor/Payment")
);
const VendorInbox = React.lazy(() => import("../pages/dashboard/vendor/inbox"));

const VendorRatingAndReview = React.lazy(() =>
  import("../pages/dashboard/vendor/RatingReview")
);

const VendorSettings = React.lazy(() =>
  import("../pages/dashboard/vendor/Settings")
);
const VendorMedicalMerijuana = React.lazy(() =>
  import("../pages/dashboard/vendor/MedicalMerijouana")
);
const VendorNotifications = React.lazy(() =>
  import("../pages/dashboard/vendor/Notifications")
);
const VendorProductReviews = React.lazy(() =>
  import("../pages/dashboard/vendor/VendorProductReviews")
);

const ChatComponent = React.lazy(() =>
  import("../components/Chat/index")
);
const Home = React.lazy(() => import("../pages/screens/home"));

export default function Navigation() {
  // INITIZING STORAGES
  const { isAuthenticated, userType, token, user } = useSelector(
    (state) => state.authReducer
  );
  console.log("🚀 ~ file: navigation.js:182 ~ Navigation ~ user:", user);

  console.log("user Type", userType);
  console.log("user Token", token);
  const tokenStorage = localStorage.getItem("token");

  const dispatch = useDispatch();
  // CHECKING FOR AUTHENTICATION
  useEffect(() => {
    if (tokenStorage && !isAuthenticated) {
      dispatch(CHECK_TOKEN(tokenStorage));
    }
  }, [tokenStorage, isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <Home />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          !isAuthenticated ? (
            <Suspense fallback={<FullScreenLoader />}>
              {/* <Layout> */}
              <Login />
              {/* </Layout> */}
            </Suspense>
          ) : userType == "user" ? (
            <Navigate to={"/my-profile"} />
          ) : userType === "vendor" ? (
            <Navigate to={"/vendor-profile"} />
          ) : (
            <Navigate to={"/trader-profile"} />
          )
        }
      />
      <Route
        path="/forgot-password"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <ForgotPassword />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/reset-password"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <ResetPassword />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/create-new-password"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <CreateNewPassword />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            {/* <Layout> */}
            <Register /> {/* </Layout> */}
          </Suspense>
        }
      />
      <Route
        path="/signup-success"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <SignupSuccess />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/vendor-signup-success"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <VendorSignupSuccess />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/vendor-register"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <VendorRegister />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/verify"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Verify />
          </Suspense>
        }
      />
      <Route
        path="/about"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              {" "}
              <About />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/contact"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <ContactUs />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/terms"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <Terms />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/faq"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <FAQS />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/policy"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <Policy />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/categories"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <Categories />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/sub_categories/:id"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <SubCategories />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/sub_sub_categories/:id"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <SubSubCategories />
            </Layout>
          </Suspense>
        }
      />

      <Route
        path="/agricultural-services"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <AgricultureServices />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/medical-mariguana"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <MedicalMariguanaAds />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/products/:id"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <Products />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/products"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <Products />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/product/:id"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <Product />
            </Layout>
          </Suspense>
        }
      />
      {/* Important route */}
      <Route
        path="/seller-products"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <SellerProducts />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/seller-services"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <SellerServices />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/seller-trades/:traderId"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <SellerTrades />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/cart"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <Cart />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/checkout"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <Checkout />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/payment"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <Payment />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/search/:searchCategory/:searchText"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <Search />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/search"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <Search />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/service/:serviceId"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <Service />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/services"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <Services />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/trades"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <Trades />
            </Layout>
          </Suspense>
        }
      />
      <Route
        path="/trade/:id"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <Layout>
              <Trade />
            </Layout>
          </Suspense>
        }
      />

      {/* BUYER DASBOARD ROUTES  */}
      <Route
        path="/my-profile"
        element={
          <ProtectedRoute redirectTo={"/login"}>
            <Suspense fallback={<FullScreenLoader />}>
              <Layout>
                <MyProfile />
              </Layout>
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/address-book"
        element={
          <ProtectedRoute redirectTo={"/login"}>
            <Suspense fallback={<FullScreenLoader />}>
              <Layout>
                <AddressBook />
              </Layout>
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/inbox"
        element={
          <ProtectedRoute redirectTo={"/login"}>
            <Suspense fallback={<FullScreenLoader />}>
              <Layout>
                {/* <Inbox /> */}
                <UserSideMenu>

                 <ChatComponent/>
                </UserSideMenu>
                
              </Layout>
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders-info"
        element={
          <ProtectedRoute redirectTo={"/login"}>
            <Suspense fallback={<FullScreenLoader />}>
              <Layout>
                <OrdersInfo />
              </Layout>
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/trade-request"
        element={
          <ProtectedRoute redirectTo={"/login"}>
            <Suspense fallback={<FullScreenLoader />}>
              <Layout>
                <TradeRequest />
              </Layout>
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute redirectTo={"/login"}>
            <Suspense fallback={<FullScreenLoader />}>
              <Layout>
                <Wishlist />
              </Layout>
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-placed"
        element={
          <ProtectedRoute redirectTo={"/login"}>
            <Suspense fallback={<FullScreenLoader />}>
              <Layout>
                <OrderPlaced />
              </Layout>
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/trader-profile"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <TraderSideBar>
              <TraderProfile />
            </TraderSideBar>
          </Suspense>
        }
      />
      <Route
        path="/trader-trades"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <TraderSideBar>
              <TraderTrades />
            </TraderSideBar>
          </Suspense>
        }
      />
      <Route
        path="/trader-trades/details"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <TraderSideBar>
              <TradeDetails />
            </TraderSideBar>
          </Suspense>
        }
      />
      <Route
        path="/trader-trade-request"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <TraderSideBar>
              <TraderTradeRequests />
            </TraderSideBar>
          </Suspense>
        }
      />
      <Route
        path="/trader-inbox"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <TraderSideBar>
              <TraderIndox />
            </TraderSideBar>
          </Suspense>
        }
      />
      <Route
        path="/trader-settings"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <TraderSideBar>
              <TraderSettings />
            </TraderSideBar>
          </Suspense>
        }
      />
      {/* Vendor Routes */}
      <Route
        path="/vendor-profile"
        element={
          <ProtectedRoute redirectTo={"/login"}>
            <Suspense fallback={<FullScreenLoader />}>
              <VendorSideBar>
                <VendorProfile />
              </VendorSideBar>
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor-my-products"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <VendorSideBar>
              <VendorProducts />
            </VendorSideBar>
          </Suspense>
        }
      />
      <Route
        path="/vendor-my-products/details"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <VendorSideBar>
              <VendorProductDetails />
            </VendorSideBar>
          </Suspense>
        }
      />
      <Route
        path="/vendor-my-products/details/edit"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <VendorSideBar>
              <VendorProductDetailsEdit />
            </VendorSideBar>
          </Suspense>
        }
      />
      <Route
        path="/vendor-my-products/add-product"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <VendorSideBar>
              <VendorProductDetailsAdd />
            </VendorSideBar>
          </Suspense>
        }
      />
      <Route
        path="/vendor-agricultural-services"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <VendorSideBar>
              <VendorServices />
            </VendorSideBar>
          </Suspense>
        }
      />
      <Route
        path="/vendor-agricultural-services/details"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <VendorSideBar>
              <VendorServicesDetails />
            </VendorSideBar>
          </Suspense>
        }
      />
      <Route
        path="/vendor-agricultural-services/details/edit"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <VendorSideBar>
              <VendorServicesDetailsEdit />
            </VendorSideBar>
          </Suspense>
        }
      />
      <Route
        path="/vendor-agricultural-services/add-service"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <VendorSideBar>
              <VendorServicesDetailsEdit />
            </VendorSideBar>
          </Suspense>
        }
      />

      <Route
        path="/vendor-productshippingdetails"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <VendorSideBar>
              <VendorProductShippingDetail />
            </VendorSideBar>
          </Suspense>
        }
      />
      <Route
        path="/vendor-productshippingdetails/edit"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <VendorSideBar>
              <VendorProductShippingDetailEdit />
            </VendorSideBar>
          </Suspense>
        }
      />
      <Route
        path="/vendor-featured-products-services"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <VendorSideBar>
              <FeaturedProductsAndServices />
            </VendorSideBar>
          </Suspense>
        }
      />
      <Route
        path="/vendor-featured-products"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <VendorSideBar>
              <FeaturedProducts />
            </VendorSideBar>
          </Suspense>
        }
      />
      <Route
        path="/vendor-make-it-featured"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <VendorSideBar>
              <EditFeaturedProductsAndService />
            </VendorSideBar>
          </Suspense>
        }
      />
      <Route
        path="/vendor-make-it-featured/view-featured-details"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <VendorSideBar>
              <ViewFeaturedProductsAndServices />
            </VendorSideBar>
          </Suspense>
        }
      />
      <Route
        path="/vendor-make-it-featured/payment"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <VendorSideBar>
              <PaymentFeaturedComponent />
            </VendorSideBar>
          </Suspense>
        }
      />

      <Route
        path="/vendor-productorders"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <VendorSideBar>
              <VendorProductOrders />
            </VendorSideBar>
          </Suspense>
        }
      />
      <Route
        path="/vendor-productorders/details"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <VendorSideBar>
              <VendorProductOrderDetails />
            </VendorSideBar>
          </Suspense>
        }
      />
      <Route
        path="/vendor-serviceorders"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <VendorSideBar>
              <VendorServiceOrders />
            </VendorSideBar>
          </Suspense>
        }
      />
      <Route
        path="/vendor-serviceorders/details"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <VendorSideBar>
              <VendorServiceOrderDetails />
            </VendorSideBar>
          </Suspense>
        }
      />
      <Route
        path="/vendor-serviceorder"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <VendorSideBar>
              <ServiceOrderIndividual />
            </VendorSideBar>
          </Suspense>
        }
      />
      {/* <Route
        path="/vendor-inbox"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <VendorSideBar>
              <VendorInbox />
            </VendorSideBar>
          </Suspense>
        }
      /> */}
      <Route
        path="/vendor-rating-and-review"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <VendorSideBar>
              <VendorRatingAndReview />
            </VendorSideBar>
          </Suspense>
        }
      />
      <Route
        path="/vendor-settings"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <VendorSideBar>
              <VendorSettings />
            </VendorSideBar>
          </Suspense>
        }
      />
      <Route
        path="/vendor-medical-merijuana"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <VendorSideBar>
              <VendorMedicalMerijuana />
            </VendorSideBar>
          </Suspense>
        }
      />
      <Route
        path="/vendor-notifications/"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <VendorSideBar>
              <VendorNotifications />
            </VendorSideBar>
          </Suspense>
        }
      />
      <Route
        path="/vendor-my-products/reviews"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <VendorSideBar>
              <VendorProductReviews />
            </VendorSideBar>
          </Suspense>
        }
      />
      <Route
        path="/vendor-inbox"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <VendorSideBar>
              <ChatComponent />
            </VendorSideBar>
          </Suspense>
        }
      />
    </Routes>
  );
}
