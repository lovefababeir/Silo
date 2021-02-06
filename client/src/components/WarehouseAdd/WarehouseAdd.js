import React, { Component } from "react";
import axios from "axios";
import "./WarehouseAdd.scss";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";
import { Link } from "react-router-dom";
class WarehouseAdd extends Component {
	publishWarehouse = e => {
		e.preventDefault();
		axios
			.post("http://localhost:8080/warehouse/add", {
				name: e.target.warehouseName.value,
				address: e.target.address.value,
				city: e.target.city.value,
				country: e.target.country.value,
				contact: {
					contact: e.target.contactName.value,
					position: e.target.position.value,
					phone: e.target.phone.value,
					email: e.target.email.value,
				},
			})
			.then(post => {
				console.log(post.data);
			})
			.catch(error => {
				console.log("there is an error with POSt method", error);
			});
	};
	render() {
		return (
			<div className="warehouseAdd">
				<div className="warehouseAdd__header">
					<Link to="/">
						<img
							src={backArrow}
							className="warehouseAdd__back"
							alt="arrow"
						></img>
					</Link>
					<h1 className="warehouseAdd__title">Add New Warehouse</h1>
				</div>
				<form className="warehouseAdd-form" onSubmit={this.publishWarehouse}>
					<div className="warehouseAdd__inner">
						<div className="warehouse-box">
							<p className="warehouseAdd__subtitle">Warehouse Details</p>
							<label htmlFor="warehouse__name" className="warehouseAdd__label">
								Warehouse Name
							</label>
							<textarea
								type="text"
								className="warehouseAdd__name"
								id="warehouseName"
								placeholder="warehouse name"
							></textarea>
							<label
								htmlFor="warehouse__street"
								className="warehouseAdd__label"
							>
								Street Address
							</label>
							<textarea
								type="text"
								className="warehouseAdd__street"
								id="address"
								placeholder="address"
							></textarea>
							<label htmlFor="warehouse__city" className="warehouseAdd__label">
								City
							</label>
							<textarea
								type="text"
								className="warehouseAdd__city"
								id="city"
								placeholder="city"
							></textarea>
							<label
								htmlFor="warehouse__country"
								className="warehouseAdd__label"
							>
								Country
							</label>
							<textarea
								type="text"
								className="warehouseAdd__country"
								id="country"
								placeholder="country"
							></textarea>
						</div>
						<div className="warehouse__box2">
							<p className="warehouseAdd__subtitle">Contact Details</p>
							<label htmlFor="contactName" className="warehouseAdd__label">
								Contact Name
							</label>
							<textarea
								type="text"
								className="warehouseAdd__contactName"
								id="contactName"
								placeholder="contact name"
							></textarea>
							<label htmlFor="contactPosition" className="warehouseAdd__label">
								Position
							</label>
							<textarea
								type="text"
								className="warehouseAdd__contact__position"
								id="position"
								placeholder="contact position"
							></textarea>
							<label htmlFor="contact__number" className="warehouseAdd__label">
								Phone Number
							</label>
							<textarea
								type="text"
								className="warehouseAdd__contactNumber"
								id="phone"
								placeholder="contact phone"
							></textarea>
							<label htmlFor="contact__email" className="warehouseAdd__label">
								Email
							</label>
							<textarea
								type="text"
								className="warehouseAdd__contactEmail"
								id="email"
								placeholder="contanct email"
							></textarea>
						</div>
					</div>
					<div className="warehouseAdd__buttonBox">
						<Link to="/" className="cancel">
							<button className="warehouseAdd__buttonBox--cancel">
								Cancel
							</button>
						</Link>
						<button type="submit" className="warehouseAdd__buttonBox--save">
							+ Add Warehouse
						</button>
					</div>
				</form>
			</div>
		);
	}
}
export default WarehouseAdd;
