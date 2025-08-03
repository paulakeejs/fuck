import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "./pages/home/layout";
import Home from "./pages/home/Home";
import VendorLayout from "./pages/vendor/frontend/layout";
import VendorHome from "./pages/vendor/frontend";
import VendorRulesPage from "./pages/vendor/frontend/rules";
import CreatePasswordPage from "./pages/vendor/functions/password";
import LuxuryLoginPage from "./pages/vendor/functions/Login";
import VendorAppLayout from "./pages/vendor/application/privateJetSeller/layout";
import Dashboard from "./pages/vendor/application/privateJetSeller/dashboard";
import JetListingForm from "./pages/vendor/application/privateJetSeller/new";
import JetListingPreview from "./pages/vendor/preview/jetListingPreview";
import PreviewLayout from "./pages/vendor/preview/layout";
import JetForSaleListings from "./pages/lisings/JetForSaleListings";
import JetListingInfoPage from "./pages/vendor/application/privateJetSeller/JetListingInfo";
import JetForSaleMessages from "./pages/vendor/application/privateJetSeller/Messages";
import AllListings from "./pages/vendor/application/privateJetSeller/AllListings";
import EditJetListingForm from "./pages/vendor/application/privateJetSeller/EditListings";
import AppSettings from "./pages/vendor/application/privateJetSeller/Settings";
import NotFoundPage from "./components/404";
import JetSeller from "./pages/profilePages/JetSeller";
import CharterLayout from "./pages/vendor/charter/CharterLayout";
import CharterDashboard from "./pages/vendor/charter/CharterDashboard";
import Preview from "./pages/vendor/charter/Preview";
import JetForCharter from "./pages/lisings/JetForCharter";
import CharterInfo from "./pages/vendor/charter/CharterInfo";
import CharterFleet from "./pages/vendor/charter/Fleet";
import Bookings from "./pages/vendor/charter/Bookings";
import BrokerLayout from "./pages/vendor/broker/layout";
import BrokerDashboard from "./pages/vendor/broker/BrokerDashboard";
import NewCharterBrokerListing from "./pages/vendor/broker/NewCharterListing";
import BrokerPreview from "./pages/vendor/broker/brokerPreview";
import JetSellerIndex from "./pages/vendor/application/privateJetSeller/JetSellerIndex";
import HelicopterLayout from "./pages/vendor/Helicopter/HelicopterLayout";
import IndexDb from "./pages/vendor/Helicopter/IndexDb";
import HelicopterForm from "./pages/vendor/Helicopter/HelicopterForm";
import HelicopterPreview from "./pages/vendor/Helicopter/HelicopterPreview";
import HeliCopterForSale from "./pages/lisings/HeliForSale";
import HelicopterForSaleInfo from "./pages/vendor/Helicopter/HelicopterForSaleInfo";
import HelicopterForSaleListings from "./pages/vendor/Helicopter/HelicopterForSaleListings";
import ForSaleEdit from "./pages/vendor/Helicopter/ForSaleEdit";
import Messages from "./pages/vendor/Helicopter/Messages";
import { HelicopterCharterListingForm } from "./pages/vendor/Helicopter/charter/HelicopterForm";
import HelicopterCharterListings from "./pages/vendor/Helicopter/charter/AllListings";
import EditHCharterListing from "./pages/vendor/Helicopter/charter/EditHCharterListing";
import HeliForCharter from "./pages/lisings/HeliForCharter";
import HListingInfo from "./pages/vendor/Helicopter/charter/HListingInfo";
import BookingsCharter from "./pages/vendor/Helicopter/charter/BookingsCharter";
import HelicopterIndex from "./pages/vendor/Helicopter/HelicopterIndex";
import CarLayout from "./pages/vendor/Car_Rentals/layout";
import CarDashboard from "./pages/vendor/Car_Rentals/CarDashboard";
import NewCar from "./pages/vendor/Car_Rentals/NewCar";
import AllCarListings from "./pages/vendor/Car_Rentals/AllCarListings";
import EditCarListing from "./pages/vendor/Car_Rentals/EditCarListing";
import CarForRent from "./pages/lisings/CarForRent";
import CarInformation from "./pages/vendor/Car_Rentals/CarInformation";
import Cars from "./pages/vendor/Car_Rentals/Cars";
import CarBookings from "./pages/vendor/Car_Rentals/CarBookings";
import DestinationsLayout from "./pages/vendor/destinations/layout";
import DDashboard from "./pages/vendor/destinations/DDashboard";
import Registration from "./pages/vendor/destinations/Registration";
import EditCharterListing from "./pages/vendor/broker/EditCharterListing";
import CharterListings from "./pages/lisings/CharterListings";
import Information from "./pages/vendor/destinations/Information";
import Rooms from "./pages/vendor/destinations/Rooms";
import NewRoom from "./pages/vendor/destinations/NewRoom";
import EditRoom from "./pages/vendor/destinations/EditRoom";
import DestinationsIndex from "./pages/vendor/destinations/Index";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="/jets" element={<JetSellerIndex />} />
            <Route path="/jets/listings" element={<JetForSaleListings />} />
            <Route path="/jets/:id" element={<JetListingInfoPage />} />
            <Route path="/jet-vendor/:id" element={<JetSeller />} />
            <Route path="/charter" element={<JetForCharter />} />
            <Route path="/charter/listings" element={<CharterListings />} />
            <Route path="/charter/:id" element={<CharterInfo />} />
            <Route path="/helicopters" element={<HelicopterIndex />} />
            <Route path="/destinations" element={<DestinationsIndex />} />
            <Route path="/cars" element={<Cars />} />
            <Route
              path="/helicopters/listings"
              element={<HeliCopterForSale />}
            />
            <Route
              path="/helicopters/charter/listings"
              element={<HeliForCharter />}
            />
            <Route path="/helicopters/charter/:id" element={<HListingInfo />} />
            <Route path="/helicopter/:id" element={<HelicopterForSaleInfo />} />
            <Route path="/cars/listings" element={<CarForRent />} />
            <Route path="/cars/rent/:id" element={<CarInformation />} />
          </Route>
          <Route path="/vendor" element={<VendorLayout />}>
            <Route index element={<VendorHome />} />
            <Route path="/vendor/rules" element={<VendorRulesPage />} />
            <Route path="/vendor/login/:id" element={<LuxuryLoginPage />} />
            <Route
              path="/vendor/password/set/:id"
              element={<CreatePasswordPage />}
            />
          </Route>
          <Route path="/app/" element={<VendorAppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/app/jets/add" element={<JetListingForm />} />
            <Route path="/app/messages" element={<JetForSaleMessages />} />
            <Route path="/app/listings" element={<AllListings />} />
            <Route path="/app/settings" element={<AppSettings />} />
            <Route
              path="/app/listings/edit/:id"
              element={<EditJetListingForm />}
            />
          </Route>
          <Route path="/preview" element={<PreviewLayout />}>
            <Route
              path="/preview/jet/sale/:id"
              element={<JetListingPreview />}
            />
          </Route>
          <Route path="/program" element={<CharterLayout />}>
            <Route index element={<CharterDashboard />} />
            <Route
              path="/program/charters/new"
              element={<NewCharterBrokerListing />}
            />
            <Route path="/program/preview/:id" element={<Preview />} />
            <Route path="/program/fleet" element={<CharterFleet />} />
            <Route path="/program/bookings" element={<Bookings />} />
            <Route
              path="/program/fleet/edit/:id"
              element={<EditCharterListing />}
            />
          </Route>
          <Route path="/broker" element={<BrokerLayout />}>
            <Route index element={<BrokerDashboard />} />
            <Route path="/broker/jets/add" element={<JetListingForm />} />
            <Route
              path="/broker/charters/add"
              element={<NewCharterBrokerListing />}
            />
            <Route path="/broker/preview/:id" element={<BrokerPreview />} />
            <Route path="/broker/listings" element={<AllListings />} />
            <Route path="/broker/charter/listings" element={<CharterFleet />} />
            <Route
              path="/broker/fleet/edit/:id"
              element={<EditCharterListing />}
            />
            <Route
              path="/broker/jet/edit/:id"
              element={<EditJetListingForm />}
            />
            <Route path="/broker/requests" element={<Bookings />} />
            <Route path="/broker/messages" element={<JetForSaleMessages />} />
          </Route>
          <Route path="/h-broker" element={<HelicopterLayout />}>
            <Route index element={<IndexDb />} />
            <Route
              path="/h-broker/helicopters/add"
              element={<HelicopterForm />}
            />
            <Route
              path="/h-broker/preview/:id"
              element={<HelicopterPreview />}
            />
            <Route
              path="/h-broker/sales/listings"
              element={<HelicopterForSaleListings />}
            />
            <Route path="/h-broker/:id/edit" element={<ForSaleEdit />} />
            <Route path="/h-broker/messages" element={<Messages />} />
            <Route
              path="/h-broker/charters/add"
              element={<HelicopterCharterListingForm />}
            />
            <Route
              path="/h-broker/charter/listings"
              element={<HelicopterCharterListings />}
            />
            <Route
              path="/h-broker/charter/edit/:id"
              element={<EditHCharterListing />}
            />
            <Route path="/h-broker/requests" element={<BookingsCharter />} />
          </Route>
          <Route path="/lux" element={<CarLayout />}>
            <Route index element={<CarDashboard />} />
            <Route path="/lux/add" element={<NewCar />} />
            <Route path="/lux/listings" element={<AllCarListings />} />
            <Route path="/lux/listings/edit/:id" element={<EditCarListing />} />
            <Route path="/lux/messages" element={<CarBookings />} />
          </Route>
          <Route path="/l-h" element={<DestinationsLayout />}>
            <Route index element={<DDashboard />} />
            <Route path="/l-h/registration" element={<Registration />} />
            <Route path="/l-h/info" element={<Information />} />
            <Route path="/l-h/rooms" element={<Rooms />} />
            <Route path="/l-h/rooms/new" element={<NewRoom />} />
            <Route path="/l-h/rooms/edit/:id" element={<EditRoom />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
