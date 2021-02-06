import React, { Component } from "react";
import "./WarehouseDetails.scss";
import List from "../List/List.js";
import Arrow from "../../assets/Icons/arrow_back-24px.svg";
import axios from "axios";
import { Link } from "react-router-dom";
class WarehouseDetail extends Component {
	detailsTitles = {
		heading1: "INVENTORY ITEM",
		heading2: "CATEGORY",
		heading3: "STATUS",
		heading4: "QUANTITY",
	};
	state = {
		warehouseName: "",
		warehouseEmail: "",
		warehousePosition: "",
		warehousePhone: "",
		warehouseAddress: "",
		warehouseCity: "",
		warehouseCountry: "",
		warehouseContact: "",
		inventoryList: [],
	};
	//delete specific items of specific warehouse for delete modal
	newInventoryList = () => {
		let warehouseid = this.props.match.params.warehouseID;
		axios
			.get("http://localhost:8080/warehouse/" + warehouseid)
			.then(result => {
				// we want the list from the inventroy and warehouse details
				this.setState({
					inventoryList: result.data.inventoryList,
				});
			})
			.catch(error => console.error(error));
	};
	componentDidMount() {
		let warehouseid = this.props.match.params.warehouseID;
		axios
			.get("http://localhost:8080/warehouse/" + warehouseid)
			.then(result => {
				console.log(result.data);
				// we want the list from the inventroy and warehouse details
				this.setState({
					warehouseContact: result.data.contact.contactName,
					warehouseEmail: result.data.contact.email,
					warehousePosition: result.data.contact.position,
					warehousePhone: result.data.contact.phone,
					warehouseAddress: result.data.address,
					warehouseCity: result.data.city,
					warehouseCountry: result.data.country,
					warehouseName: result.data.name,
					inventoryList: result.data.inventoryList,
				});
			})
			.catch(error => console.error(error));
	}
	editWarehouse = () => {
		window.location.replace(
			"/Warehouses/edit/" + this.props.match.params.warehouseID
		);
	};
	render() {
		return (
			<>
				<div className="details">
					<div className="details__header">
						<Link to="/">
							<img src={Arrow} className="details__arrow" alt="arrow" />
						</Link>
						<h1 className="details__title">{this.state.warehouseName}</h1>
					</div>
					<button className="details__button" onClick={this.editWarehouse}>
						<svg
							className="warehouse-editsvg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http: www.w3.org/2000/svg"
						>
							<path
								d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04V7.04Z"
								fill="white"
							/>
						</svg>
						Edit
					</button>
				</div>
				<div className="contact">
					<div className="contact__cell--1">
						<h3 className="contact__cell-title">WAREHOUSE ADDRESS:</h3>
						<h4 className="contact__cell-info">
							{this.state.warehouseAddress} {this.state.warehouseCity}{" "}
							{this.state.warehouseCountry}
						</h4>
					</div>
					<div className="contact__cell">
						<h3 className="contact__cell-title">CONTACT NAME:</h3>
						<h4 className="contact__cell-info">
							{this.state.warehouseContact} {this.state.warehousePosition}
						</h4>
					</div>
					<div className="contact__cell">
						<h3 className="contact__cell-title">CONTACT INFORMATION:</h3>
						<h4 className="contact__cell-info">
							{this.state.warehousePhone} {this.state.warehouseEmail}
						</h4>
					</div>
				</div>
				{this.state.inventoryList.length !== 0 && (
					<List
						list={this.state.inventoryList}
						tableHeadings={this.detailsTitles}
						newInventoryList={this.newInventoryList}
					/>
				)}
			</>
		);
	}
}
export default WarehouseDetail;
