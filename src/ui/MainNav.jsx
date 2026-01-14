import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  HiHome,
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

export default function MainNav() {
  return (
    <div className="flex flex-col gap-3 mt-6">
      <NavLink
        to="/dashboard"
        end
        className={({ isActive }) =>
          `btn flex items-center  ${isActive ? "btn-primary" : "btn-outline"}`
        }
      >
        <HiOutlineHome /> Home
      </NavLink>

      <NavLink
        to="/bookings"
        end
        className={({ isActive }) =>
          `btn flex items-center ${isActive ? "btn-primary" : "btn-outline "}`
        }
      >
        <HiOutlineCalendarDays />
        Bookings
      </NavLink>

      <NavLink
        to="/rooms"
        end
        className={({ isActive }) =>
          `btn ${isActive ? "btn-primary" : "btn-outline "}`
        }
      >
        <HiOutlineHomeModern />
        Rooms
      </NavLink>

      <NavLink
        to="/users"
        end
        className={({ isActive }) =>
          `btn ${isActive ? "btn-primary" : "btn-outline "}`
        }
      >
        <HiOutlineUsers />
        <span>Users</span>
      </NavLink>

      <NavLink
        to="/settings"
        end
        className={({ isActive }) =>
          `btn ${isActive ? "btn-primary" : "btn-outline "}`
        }
      >
        <HiOutlineCog6Tooth />
        <span>Settings</span>
      </NavLink>
    </div>
  );
}
