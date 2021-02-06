import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";
import Logo from "../../assets/Icons/silo-logo.png";
import "../../styles/partials.scss";
const Header = () => {
	return (
		<div className="navBar">
			<div className="navBar__logo">
				<img className="navBar__logo-icon" src={Logo} alt="Silo logo" />
				<h4 className="navBar__logo-title">SILO</h4>
			</div>
			<div className="navBar__buttons">
				<NavLink
					exact
					to="/"
					className="navBar__buttons--warehouse"
					activeClassName="selected"
				>
					Warehouses{" "}
				</NavLink>
				<NavLink
					exact
					to="/inventory"
					className="navBar__buttons--inventory"
					activeClassName="selected"
				>
					Inventory
				</NavLink>
			</div>
		</div>
	);
};
export default Header;
