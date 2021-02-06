import React, { Component } from "react";
import List from "../List/List.js";
import axios from "axios";

class Warehouse extends Component {
	warehouseTitles = {
		heading1: "Warehouse",
		heading2: "Address",
		heading3: "Contact Name",
		heading4: "Contact Information",
	};
	state = {
		page: "Warehouses",
		list: [],
		toggle: true,
	};

	newWarehouse = res => {
		this.setState({
			list: res.data,
		});
	};

	componentDidMount() {
		axios
			.get("http://localhost:8080/warehouse")
			.then(result => {
				this.setState({
					list: result.data.sort((a, b) => {
						return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
					}),
				});
			})
			.catch(err => console.error(err));
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
					return a.name.toLowerCase() < b.name.toLowerCase() ? truthy : falsy;
				});
				break;
			case 2:
				newList = this.state.list.sort((a, b) => {
					return a.address.toLowerCase() < b.address.toLowerCase()
						? truthy
						: falsy;
				});
				break;
			case 3:
				newList = this.state.list.sort((a, b) => {
					return a.contact.contact.toLowerCase() <
						b.contact.contact.toLowerCase()
						? truthy
						: falsy;
				});
				break;
			default:
				newList = this.state.list.sort((a, b) => {
					return a.contact.email.toLowerCase() < b.contact.email.toLowerCase()
						? truthy
						: falsy;
				});
				break;
		}

		this.setState({ list: newList, toggle: !toggle });
	};

	linkFunction = (title, warehouseID) => {
		window.location.replace(`/${title}/${warehouseID}`);
	};

	render() {
		return (
			<>
				{this.state.list.length !== 0 && (
					<List
						title={this.state.page}
						list={this.state.list}
						tableHeadings={this.warehouseTitles}
						newWarehouse={this.newWarehouse}
						linkFunction={this.linkFunction}
						sortHandler={this.sortHandler}
					/>
				)}
			</>
		);
	}
}
export default Warehouse;
