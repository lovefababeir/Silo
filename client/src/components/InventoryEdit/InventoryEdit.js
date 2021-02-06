import React, { Component } from "react";
import axios from "axios";
import "./InventoryEdit.scss";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";
import { Link } from "react-router-dom";
import errorImage from "../../assets/Icons/error-24px.svg";
import { Redirect } from "react-router-dom";
class inventoryEdit extends Component {
	state = {
		redirect: false,
		current: null,
	};
	componentDidMount() {
		axios
			.get("http://localhost:8080/inventory/" + this.props.match.params.id)
			.then(response => {
				console.log(response.data);
				const selected = response.data;
				this.setState({
					current: selected,
				});
			});
	}
	editInventory = e => {
		e.preventDefault();
		let itemName = e.target.editItemName.value;
		let description = e.target.editDescription.value;
		let category = e.target.category.value;
		let status = e.target.status.value;
		let warehouseName = e.target.warehouseName.value;
		console.log(
			"itemName: ",
			itemName,
			"description: ",
			description,
			"category: ",
			category,
			"status: ",
			status,
			"warehouseName: ",
			warehouseName
		);
		axios
			.put("http://localhost:8080/inventory/" + this.props.match.params.id, {
				itemName: itemName,
				description: description,
				category: category,
				status: status,
				warehouseName: warehouseName,
			})
			.then(result => {
				console.log(result);
				this.setState({
					redirect: true,
				});
			})
			.catch(error => {
				console.log("there is an erro in PUT request", error);
			});
	};
	render() {
		if (!this.state.current) {
			return null;
		} else if (this.state.redirect === true) {
			return <Redirect to="/Inventory" />;
		}
		return (
			<>
				<div className="invedit-update__header">
					<Link to="/Inventory">
						<img
							className="invedit-update__backBtn"
							src={backArrow}
							alt="arrow back"
						/>
					</Link>
					<h1 className="invedit-update__title">Edit inventory Item</h1>
				</div>
				<form onSubmit={this.editInventory}>
					<div className="inputSection">
						<div className="invedit-form__section">
							<h2 className="invedit-form__title">Item Details</h2>
							<label htmlFor="itemName" className="invedit-form__label">
								Item Name
							</label>
							<input
								type="text"
								className="invedit-form__textbox"
								name="editItemName"
								id="name"
								placeholder={this.state.current.itemName}
							></input>
							<img
								src={errorImage}
								className="errorIcon"
								alt="Error: This field is required"
							/>
							<span className="errorMessage"> This field is required</span>
							<label htmlFor="description" className="invedit-form__label">
								Description
							</label>
							<input
								type="textarea"
								className="invedit-form__textarea"
								name="editDescription"
								id="description"
								placeholder={this.state.current.description}
							></input>
							<img
								src={errorImage}
								className="errorIcon"
								alt="Error: This field is required"
							/>
							<span className="invedit_errorMessage">
								{" "}
								This field is required
							</span>
							<label htmlFor="category" className="invedit-form__label">
								Category
							</label>
							<select className="invedit__dropDown" name="category">
								<option value="N/A">Please Select</option>
								<option value="Electronics">Electronics</option>
								<option value="Apparel">Apparel</option>
								<option value="Gear">Gear</option>
								<option value="Accessories">Accessories</option>
								<option value="Health">Health</option>
							</select>
							<img
								src={errorImage}
								className="invedit_errorIcon"
								alt="Error: This field is required"
							/>
							<span className="invedit_errorMessage">
								This field is required
							</span>
						</div>
						<div className="invedit-form__section">
							<h2 className="invedit-form__title">Item Availability</h2>
							<label className="invedit-form__label">Status</label>
							<div className="invedit_status">
								<input
									type="radio"
									className="invedit_status__radioBtn"
									name="status"
									value="In Stock"
								></input>
								<span className="invedit_status__label">In stock</span>
								<input
									type="radio"
									className="invedit_status__radioBtn"
									name="status"
									value="Out of Stock"
								></input>
								<span className="invedit_status__label">Out of stock</span>
								<img
									src={errorImage}
									className="invedit_errorIcon"
									alt="Error: This field is required"
								/>
								<span className="invedit_errorMessage">
									This field is required
								</span>
							</div>
							<label htmlFor="invedit" className="invedit-form__label">
								Warehouse
							</label>
							<select className="invedit-form__dropDown" name="warehouseName">
								<option value="N/A">Please Select</option>
								<option value="Manhattan">Manhattan</option>
								<option value="King West">King West</option>
								<option value="Granville">Granville</option>
								<option value="San Fran">Santa Fran</option>
								<option value="San Fran">Santa Monica</option>
								<option value="San Fran">Seattle</option>
								<option value="San Fran">Montreal</option>
								<option value="San Fran">Boston</option>
							</select>
							<img
								src={errorImage}
								className="invedit_errorIcon"
								alt="Error: This field is required"
							/>
							<span className="invedit_errorMessage">
								This field is required
							</span>
						</div>
					</div>
					<div className="invedit-form__cta-box">
						<Link to="/Inventory">
							<button className="invedit-form__cancelBtn">Cancel</button>
						</Link>
						<button className="invedit-form__updateBtn" type="submit">
							Save
						</button>
					</div>
				</form>
			</>
		);
	}
}
export default inventoryEdit;
