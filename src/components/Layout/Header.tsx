import React from "react";
import { Link, useLocation } from "react-router-dom";
import type { RootState } from "../../store";
import { useSelector } from "react-redux";

const Header: React.FC = () => {
  const location = useLocation();

  const {
    total_favourite_ids
  } = useSelector((state: RootState) => state.animeFavourite);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold" to="/">AnimeFinder</Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${location.pathname === "/anime" ? "active" : ""}`}
            >
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/my-favourite"
              className={`nav-link ${location.pathname === "/my-favourite" ? "active" : ""}`}
            >
              My Favourites {`(${total_favourite_ids})`}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;