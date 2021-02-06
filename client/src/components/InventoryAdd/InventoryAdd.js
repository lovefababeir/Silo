import React, { Component } from "react";
import axios from "axios";
import InventoryForm from "../InventoryForm/InventoryForm";

class InventoryAdd extends Component {
	state = {
		itemList: [],
		warehouseList: [],

		errors: {
			errorItemName: true,
			errorDescription: true,
			errorCategory: true,
			errorStatus: true,
			errorQuantity: true,
			errorWarehouse: true,
		},
	};

	submitHandler = (e, warehouseList) => {
		e.preventDefault();

		const itemName = e.target.itemName.value;
		const description = e.target.description.value;
		const category = e.target.category.value;
		const status = e.target.status.value;
		const quantity = e.target.quantity.value;
		const warehouseName = e.target.warehouse.value;

		this.setState({
			errors: {
				errorItemName: itemName,
				errorDescription: description,
				errorCategory: category,
				errorStatus: status,
				errorQuantity: quantity,
				errorWarehouse: warehouseName,
			},
		});

		if (
			itemName &&
			description &&
			category &&
			status &&
			quantity &&
			warehouseName
		) {
			const warehouseID = warehouseList.find(w => {
				return w.name === warehouseName;
			}).id;

			const newInventory = {
				itemName: itemName,
				description: description,
				category: category,
				status: status,
				quantity: quantity,
				warehouseID: warehouseID,
				warehouseName: warehouseName,
			};

			console.log(newInventory);
			axios
				.post("http://localhost:8080/inventory/", newInventory)
				.then(result => {
					console.log(result.data);
					window.location.replace("/inventory");
				})
				.catch(err => console.log(`Could not add to inventory: ${err}`));
		}
	};

	goBackHandler = e => {
		this.props.history.goBack();
	};

	render() {
		return (
			<>
				<InventoryForm
					title="Add New Inventory Item"
					goBackHandler={this.goBackHandler}
					submitHandler={this.submitHandler}
					updateButton="+ Add Item"
					errors={this.state.errors}
				/>
			</>
		);
	}
}

export default InventoryAdd;
