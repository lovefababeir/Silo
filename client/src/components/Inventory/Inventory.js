import React, { Component } from "react";
import axios from "axios";
import List from "../List/List.js";

class Inventory extends Component {
	inventoryTitles = {
		//in order as you would see it on tablet and desktop mode
		heading1: "Inventory Item",
		heading2: "Category",
		heading3: "Status",
		heading4: "Qty",
		heading5: "Warehouse",
	};

	state = {
		page: "",
		list: [],
		selectedWarehouse: {},
		toggle: true,
	};

	newInventory = res => {
		this.setState({
			list: res.data,
		});
	};

	componentDidMount() {
		axios
			.get("http://localhost:8080/inventory")
			.then(result => {
				this.setState({
					page: "Inventory",
					list: result.data.sort((a, b) => {
						return a.itemName.toLowerCase() < b.itemName.toLowerCase() ? -1 : 1;
					}),
				});
			})
			.catch(err => console.log(err));
	}

	sortHandler = i => {
		const toggle = this.state.toggle;

		var newList = [];
		let truthy;
		let falsy;

		if (toggle) {
			truthy = -1;
			falsy = 1;
		} else {
			truthy = 1;
			falsy = -1;
		}

		switch (i) {
			case 1:
				newList = this.state.list.sort((a, b) => {
					return a.itemName.toLowerCase() < b.itemName.toLowerCase()
						? truthy
						: falsy;
				});
				break;
			case 2:
				newList = this.state.list.sort((a, b) => {
					return a.category.toLowerCase() < b.category.toLowerCase()
						? truthy
						: falsy;
				});
				break;
			case 3:
				newList = this.state.list.sort((a, b) => {
					return a.status.toLowerCase() < b.status.toLowerCase()
						? truthy
						: falsy;
				});
				break;
			case 4:
				newList = this.state.list.sort((a, b) => {
					return a.quantity < b.quantity ? truthy : falsy;
				});
				break;
			default:
				newList = this.state.list.sort((a, b) => {
					return a.warehouseName.toLowerCase() < b.warehouseName.toLowerCase()
						? truthy
						: falsy;
				});
				break;
		}

		this.setState({ list: newList, toggle: !toggle });
	};

	linkFunction = (title, itemID) => {
		window.location.replace(`/${title}/${itemID}`);
	};

	hideModal = e => {
		this.setState({
			show: !this.state.show,
		});
	};

	render() {
		return (
			<>
				{this.state.list.length !== 0 && (
					<List
						title={this.state.page}
						list={this.state.list}
						tableHeadings={this.inventoryTitles}
						newInventory={this.newInventory}
						linkFunction={this.linkFunction}
						sortHandler={this.sortHandler}
					/>
				)}
			</>
		);
	}
}

export default Inventory;
