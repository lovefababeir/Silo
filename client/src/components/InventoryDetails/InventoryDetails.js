import React from "react";
import "./InventoryDetails.scss";
import Arrow from "../../assets/Icons/arrow_back-24px.svg";
import axios from "axios";
import { Link } from "react-router-dom";
class InventoryDetails extends React.Component {
	state = {
		inventoryDetails: "",
		inventoryName: "",
		category: "",
		itemName: "",
		description: "",
		status: "",
		warehouse: "",
		quantity: "",
	};
	componentDidMount() {
		const itemId = this.props.match.params.id;
		// const itemName = this.props.match.params.itemName;
		axios
			//this will pull one inventory item and it's details
			.get("http://localhost:8080/inventory/" + itemId)
			.then(result => {
				this.setState({
					category: result.data.category,
					itemName: result.data.itemName,
					description: result.data.description,
					status: result.data.status,
					warehouse: result.data.warehouseName,
					quantity: result.data.quantity,
					inventoryDetails: result.data,
					inventoryName: result.data.itemName,
				});
			})
			.catch(error => console.error(error));
	}
	editInventory = () => {
		window.location.replace("/Inventory/edit/" + this.props.match.params.id);
	};
	render() {
		return (
			<div className="inventory__details">
				<div className="inventory__details__header">
					<div className="inventory__details__title">
						<Link to="/Inventory">
							<img
								src={Arrow}
								className="inventory__details__arrow"
								alt="arrow"
							/>
						</Link>
						<h1 className="inventory__details__name">{this.state.itemName}</h1>
					</div>
					<button
						className="inventory__details__button"
						onClick={this.editInventory}
					>
						<svg
							className="inventory-editsvg"
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
				<div className="inventory__contact">
					<div className="inventory__box1">
						<div className="inventory__contact__cell--1">
							<h3 className="inventory__contact__cell-title">
								ITEM DESCRIPTION:
							</h3>
							<h4 className="inventory__contact__cell-info--1">
								{this.state.description}
							</h4>
						</div>
						<div className="inventory__contact__cell--2">
							<h3 className="inventory__contact__cell-title">CATEGORY:</h3>
							<h4 className="inventory__contact__cell-info">
								{this.state.category}
							</h4>
						</div>
					</div>
					<div className="inventory__box2">
						<div className="inventory__contact__cell">
							<h3 className="inventory__contact__cell-title">STATUS:</h3>
							{/* conditional rendering style */}
							<h4
								className={`inventory__contact__cell-info ${
									(this.state.status === "In Stock" && "inStockStyle") ||
									(this.state.status === "Out of Stock" && "outStockStyle")
								}`}
							>
								{this.state.status}
							</h4>
						</div>
						<div className="inventory__contact__cell">
							<h3 className="inventory__contact__cell-title">QUANTITY:</h3>
							<h4 className="inventory__contact__cell-info">
								{this.state.quantity}
							</h4>
						</div>
						<div className="inventory__contact__cell">
							<h3 className="inventory__contact__cell-title">WAREHOUSE:</h3>
							<h4 className="inventory__contact__cell-info">
								{this.state.warehouse}
							</h4>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default InventoryDetails;
