import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Plane,
  List,
  Mail,
  Settings,
  LogOut,
  Calendar,
  Briefcase,
  Star,
  MessageSquare,
  FilePlus,
  ListTodo,
  Car,
  BookIcon,
  CreditCard,
  Hotel,
  HotelIcon,
} from "lucide-react";

interface SidebarLink {
  name: string;
  icon: React.ReactNode;
  path: string;
}

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const vendor = useSelector((state: any) => state.vendor.vendor);
  const location = useLocation();
  const navigate = useNavigate();

  const iconSize = 18;
  const iconClass = "text-gray-500 group-hover:text-gray-700 transition-colors";

  const serviceTypeLinks: Record<string, SidebarLink[]> = {
    jet_sales: [
      {
        name: "Dashboard",
        icon: <LayoutDashboard size={iconSize} className={iconClass} />,
        path: "/app",
      },
      {
        name: "Add Jet",
        icon: <Plane size={iconSize} className={iconClass} />,
        path: "/app/jets/add",
      },
      {
        name: "My Listings",
        icon: <List size={iconSize} className={iconClass} />,
        path: "/app/listings",
      },
      {
        name: "Messages",
        icon: <MessageSquare size={iconSize} className={iconClass} />,
        path: "/app/messages",
      },
    ],
    jet_charter: [
      {
        name: "Dashboard",
        icon: <LayoutDashboard size={iconSize} className={iconClass} />,
        path: "/program",
      },
      {
        name: "Add Charter",
        icon: <FilePlus size={iconSize} className={iconClass} />,
        path: "/program/charters/new",
      },
      {
        name: "Fleet",
        icon: <Briefcase size={iconSize} className={iconClass} />,
        path: "/program/fleet",
      },
      {
        name: "Bookings",
        icon: <Calendar size={iconSize} className={iconClass} />,
        path: "/program/bookings",
      },
    ],
    broker: [
      {
        name: "Dashboard",
        icon: <LayoutDashboard size={iconSize} className={iconClass} />,
        path: "/broker",
      },
      {
        name: "Add Jet",
        icon: <Plane size={iconSize} className={iconClass} />,
        path: "/broker/jets/add",
      },
      {
        name: "Add Charter",
        icon: <FilePlus size={iconSize} className={iconClass} />,
        path: "/broker/charters/add",
      },
      {
        name: "Jet Listings",
        icon: <List size={iconSize} className={iconClass} />,
        path: "/broker/listings",
      },
      {
        name: "Charter Listings",
        icon: <ListTodo size={iconSize} className={iconClass} />,
        path: "/broker/charter/listings",
      },
      {
        name: "Charter Requests",
        icon: <MessageSquare size={iconSize} className={iconClass} />,
        path: "/broker/requests",
      },
      {
        name: "Messages",
        icon: <Mail size={iconSize} className={iconClass} />,
        path: "/broker/messages",
      },
    ],
    helicopter_broker: [
      {
        name: "Dashboard",
        icon: <LayoutDashboard size={iconSize} className={iconClass} />,
        path: "/h-broker",
      },
      {
        name: "Add Helicopter Charter",
        icon: <FilePlus size={iconSize} className={iconClass} />,
        path: "/h-broker/charters/add",
      },
      {
        name: "Add Helicopter",
        icon: <Plane size={iconSize} className={iconClass} />,
        path: "/h-broker/helicopters/add",
      },

      {
        name: "Helicopter Charter Listings",
        icon: <ListTodo size={iconSize} className={iconClass} />,
        path: "/h-broker/charter/listings",
      },
      {
        name: "Helicopter Sales Listings",
        icon: <List size={iconSize} className={iconClass} />,
        path: "/h-broker/sales/listings",
      },
      {
        name: "Helicopter Charter Requests",
        icon: <MessageSquare size={iconSize} className={iconClass} />,
        path: "/h-broker/requests",
      },
      {
        name: "Messages",
        icon: <Mail size={iconSize} className={iconClass} />,
        path: "/h-broker/messages",
      },
    ],
    luxury_hotels: [
      {
        name: "Dashboard",
        icon: <LayoutDashboard size={iconSize} className={iconClass} />,
        path: "/l-h/",
      },
      {
        name: "Information",
        icon: <HotelIcon size={iconSize} className={iconClass} />,
        path: "/l-h/info",
      },
      {
        name: "Rooms Management",
        icon: <Hotel size={iconSize} className={iconClass} />,
        path: "/l-h/rooms",
      },
      {
        name: "Billing & Payments",
        icon: <CreditCard size={iconSize} className={iconClass} />,
        path: "/l-h/payments",
      },
      {
        name: "Reviews & Ratings",
        icon: <Star size={iconSize} className={iconClass} />,
        path: "/l-h/reviews",
      },
    ],
    car_rental: [
      {
        name: "Dashboard",
        icon: <LayoutDashboard size={iconSize} className={iconClass} />,
        path: "/lux",
      },
      {
        name: "Add Car",
        icon: <Car size={iconSize} className={iconClass} />,
        path: "/lux/add",
      },
      {
        name: "My Listings",
        icon: <List size={iconSize} className={iconClass} />,
        path: "/lux/listings",
      },
      {
        name: "Bookings",
        icon: <BookIcon size={iconSize} className={iconClass} />,
        path: "/lux/messages",
      },
    ],
  };

  if (!vendor?.serviceType) return null;

  const sidebarLinks = serviceTypeLinks[vendor.serviceType] || [];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full transition-all duration-300 ease-in-out border-r border-gray-100 ${
        isCollapsed ? "w-20" : "w-64"
      } bg-white text-black flex flex-col z-50`}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between p-6 pb-5">
        {!isCollapsed && (
          <h1 className="text-xl font-serif font-normal tracking-wider text-gray-800">
            LUXVANA
          </h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-400 hover:text-gray-600 transition p-1 rounded-full hover:bg-gray-100 w-8 h-8 flex items-center justify-center"
        >
          {isCollapsed ? (
            <span className="text-lg">◂</span>
          ) : (
            <span className="text-lg">▸</span>
          )}
        </button>
      </div>

      {/* Vendor Info */}
      {!isCollapsed && (
        <div className="px-6 pb-6 border-b border-gray-100">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
            Vendor
          </p>
          <p className="text-sm font-medium text-gray-700 truncate">
            {vendor.name}
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-1 px-4 mt-6">
          {sidebarLinks.map((link, idx) => (
            <li key={idx}>
              <Link
                to={link.path}
                className={`flex items-center p-4 rounded-lg transition-all group ${
                  location.pathname === link.path
                    ? "bg-gray-50 text-gray-900 font-medium"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                } ${isCollapsed ? "justify-center" : "space-x-3"}`}
              >
                <span className="transition-colors">{link.icon}</span>
                {!isCollapsed && (
                  <span className="text-sm tracking-wide">{link.name}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Settings & Logout */}
      <div className="p-4 border-t border-gray-100">
        <Link
          to="/app/settings"
          className={`flex items-center p-4 rounded-lg transition-all group ${
            location.pathname === "/settings"
              ? "bg-gray-50 text-gray-900 font-medium"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          } ${isCollapsed ? "justify-center" : "space-x-3"}`}
        >
          <Settings size={iconSize} className={iconClass} />
          {!isCollapsed && (
            <span className="text-sm tracking-wide">Settings</span>
          )}
        </Link>
        <button
          onClick={handleLogout}
          className={`flex items-center w-full p-4 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all ${
            isCollapsed ? "justify-center" : "space-x-3"
          }`}
        >
          <LogOut size={iconSize} className={iconClass} />
          {!isCollapsed && (
            <span className="text-sm tracking-wide">Logout</span>
          )}
        </button>
      </div>
    </div>
  );
}
