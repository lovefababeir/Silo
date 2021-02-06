import React, { Component } from "react";
import backButton from "../../assets/Icons/arrow_back-24px.svg";
import "../InventoryForm/InventoryForm.scss";
import errorImage from "../../assets/Icons/error-24px.svg";
import axios from "axios";

class InventoryForm extends Component {
	state = {
		categoryList: [],
		warehouseList: [],
	};

	componentDidMount() {
		this.dataRequest(
			"http://localhost:8080/warehouse",
			"Warehouse list",
			this.warehouseListFcn
		);

		this.dataRequest(
			"http://localhost:8080/inventory",
			"Inventory list",
			this.categoryListFcn
		);
	}

	// FUNCTION: API GET REQUESTS
	dataRequest = (url, dataDescription, dataFunction) => {
		axios
			.get(url)
			.then(result => {
				dataFunction(result.data);
			})
			.catch(err => console.log(`Could not get ${dataDescription}: ${err}`));
	};

	// FUNCTION: Generates Warehouse list from result of API request
	warehouseListFcn = data => {
		var warehouseList = data.map(warehouse => {
			return { name: warehouse.name, id: warehouse.id };
		});

		warehouseList.sort((a, b) => {
			return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
		});
		this.setState({
			warehouseList: warehouseList,
		});
	};

	// FUNCTION: Generates items list (with no duplicates) from result of API request
	categoryListFcn = data => {
		const inventory = data.map(item => {
			return item.category;
		});
		var categoryList = [];

		inventory.forEach(item => {
			if (
				!categoryList.find(i => {
					return item === i;
				})
			) {
				categoryList.push(item);
			}
		});

		categoryList.sort();
		this.setState({
			categoryList: categoryList,
		});
	};

	render() {
		const {
			title,
			submitHandler,
			updateButton,
			errors,
			goBackHandler,
		} = this.props;
		const {
			errorItemName,
			errorDescription,
			errorStatus,
			errorCategory,
			errorQuantity,
			errorWarehouse,
		} = errors;

		return (
			<>
				{/* ----------------------HEADING---------------------- */}
				<div className="i-update__header">
					<img
						className="i-update__backBtn"
						src={backButton}
						onClick={() => goBackHandler()}
						alt="Click here to go back to the Inventory page"
					/>
					<h1 className="i-update__title">{title}</h1>
				</div>
				{/* ----------------------HEADING---------------------- */}

				{/* ----------- FORM ------------- */}
				<form
					className="inv-form"
					onSubmit={event => submitHandler(event, this.state.warehouseList)}
				>
					{/* -----------SECTION1------------- */}
					<div className="inv-form__section">
						<h2 className="inv-form__title">Item Details</h2>
						<label htmlFor="itemName" className="inv-form__label">
							Item Name
						</label>
						<input
							type="text"
							className={`inv-form__textbox ${
								!errorItemName ? "errBorder" : ""
							}`}
							name="itemName"
							placeholder="Please enter the item name"
						></input>
						<div hidden={errorItemName}>
							<img
								src={errorImage}
								className="errorIcon"
								alt="Error: This field is required"
							/>{" "}
							<label className="errorMessage">"This field is required"</label>
						</div>
						<label htmlFor="description" className="inv-form__label">
							Description
						</label>
						<input
							type="textarea"
							className={`inv-form__textarea ${
								!errorDescription ? "errBorder" : ""
							}`}
							name="description"
							placeholder="Please enter a brief description"
						></input>
						<div hidden={errorDescription}>
							<img
								src={errorImage}
								className="errorIcon"
								alt="Error: This field is required"
							/>{" "}
							<p className="errorMessage">This field is required</p>
						</div>
						<label htmlFor="category" className="inv-form__label">
							Category
						</label>
						{this.state.categoryList.length !== 0 && (
							<select
								className={`inv-form__dropDown ${
									!errorCategory ? "errBorder" : ""
								}`}
								name="category"
							>
								<option defaultValue key="Please Select a Category" value="">
									Please Select a Category
								</option>
								{this.state.categoryList.map(item => {
									return (
										<option key={item} value={item}>
											{item}
										</option>
									);
								})}
							</select>
						)}
						<div hidden={errorCategory}>
							<img
								src={errorImage}
								className="errorIcon"
								alt="Error: This field is required"
							/>{" "}
							<p className="errorMessage" hidden={false}>
								This field is required
							</p>
						</div>
					</div>
					{/* -----------SECTION1 ENDS------------- */}

					{/* -----------SECTION2------------- */}
					<div className="inv-form__section">
						<h2 className="inv-form__title">Item Availability</h2>
						<label className="inv-form__label">Status</label>
						<div className="status">
							<input
								type="radio"
								className="status__radioBtn"
								name="status"
								value="In Stock"
							></input>
							<label htmlFor="instock" className="status__label">
								In stock
							</label>
							<input
								type="radio"
								className="status__radioBtn"
								name="status"
								value="Out of Stock"
							></input>
							<label htmlFor="outofstock" className="status__label">
								Out of stock
							</label>
							<div hidden={errorStatus}>
								<img
									src={errorImage}
									className="errorIcon"
									alt="Error: This field is required"
								/>{" "}
								<p className="errorMessage">This field is required</p>
							</div>
						</div>
						<label htmlFor="quantity" className="inv-form__label">
							Quantity
						</label>
						<input
							type="number"
							className={`inv-form__textbox ${
								!errorQuantity ? "errBorder" : ""
							}`}
							name="quantity"
							placeholder="Please enter a quantity"
						></input>
						<div hidden={errorQuantity}>
							<img
								src={errorImage}
								className="errorIcon"
								alt="Error: This field is required"
							/>{" "}
							<p className="errorMessage">This field is required</p>
						</div>
						<label htmlFor="warehouse" className="inv-form__label">
							Warehouse
						</label>
						<select
							className={`inv-form__dropDown ${
								!errorWarehouse ? "errBorder" : ""
							}`}
							name="warehouse"
						>
							{" "}
							<option defaultValue key="Please Select a Warehouse" value="">
								Please Select a Warehouse
							</option>
							{this.state.warehouseList.length !== 0 &&
								this.state.warehouseList.map(warehouse => {
									return (
										<option key={warehouse.id} value={warehouse.name}>
											{warehouse.name}
										</option>
									);
								})}
						</select>
						<div hidden={errorWarehouse}>
							<img
								src={errorImage}
								className="errorIcon"
								alt="Error: This field is required"
							/>{" "}
							<p className="errorMessage">This field is required</p>
						</div>
					</div>
					{/* -----------SECTION2 ENDS------------- */}

					{/* -----------CTA Buttons------------- */}
					<div className="inv-form__cta-box">
						<button
							className="inv-form__cancelBtn"
							type="reset"
							onClick={goBackHandler}
						>
							Cancel
						</button>
						<button className="inv-form__updateBtn" type="submit">
							{updateButton}
						</button>
					</div>
					{/* -----------CTA Buttons ENDS------------- */}
				</form>
			</>
		);
	}
}

export default InventoryForm;
