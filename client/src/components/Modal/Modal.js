import React from "react";
import "./Modal.scss";
import close from "../../assets/Icons/close-24px.svg";
import axios from "axios";
class Modal extends React.Component {
	deleteHandler = e => {
		const id = this.props.id;
		// console.log(id);
		const url = "http://localhost:8080/warehouse/";
		const inventoryURL = "http://localhost:8080/inventory/";
		const urlInventory = "http://localhost:8080/";
		if (this.props.title === "Warehouses") {
			//newWarehouse fxn is passed from warehouse js. it changes the state => render a new page with updated list
			axios
				.delete(url + id)
				.then(res => {
					// handle success
					console.log(res);
					this.props.newWarehouse(res);
				})
				.catch(function (error) {
					// handle error
					console.log(error);
				});
			this.props.hideModal();
		} else if (this.props.title === "Inventory") {
			// console.log(url+inventory/+ merchandise);
			console.log(`${urlInventory}inventory/${id}`);
			// console.log(merchandise)
			axios
				.delete(`${urlInventory}inventory/${id}`)
				.then(res => {
					console.log(res);
					this.props.newInventory(res);
				})
				.catch(err => {
					console.log(err);
				});
			this.props.hideModal();
		} else if (
			this.props.title !== "Warehouses" &&
			this.props.title !== "Inventory"
		) {
			// const warehouseID=this.props.params.warehouseID;
			axios
				.delete(`${inventoryURL}${id}`)
				.then(res => {
					// console.log(res);
					// console.log(this.props.newInventoryList(res))
					this.props.newInventoryList();
				})
				.catch(err => {
					console.log(err);
				});
			this.props.hideModal();
		}
	};
	render() {
		const { show, hideModal, title, detail, heading } = this.props;
		if (!show) {
			return null;
		}
		return (
			<>
				<div className="modal__overlay"></div>
				<div className="modal">
					<img
						src={close}
						className="modal__close"
						onClick={hideModal}
						alt="close-img"
					></img>
					<p className="modal__heading">
						{title === "Warehouses" && `Delete ${detail} warehouse?`}
						{title === "Inventory" && `Delete ${detail} item?`}
						{title !== "Warehouses" &&
							title !== "Inventory" &&
							`Delete ${detail} item?`}
					</p>
					<p className="modal__p">
						Please confirm that you’d like to delete
						{title === "Warehouses" && ` the ${detail}`}{" "}
						{title === "Inventory" && `${detail}`}{" "}
						{title !== "Warehouses" && title !== "Inventory" && `${detail}`}{" "}
						from the
						{title === "Inventory" && `${title} list`}{" "}
						{title === "Warehouses" && `list of ${title}`}{" "}
						{title !== "Warehouses" &&
							title !== "Inventory" &&
							`list of ${title}`}
						. You won’t be able to undo this action
					</p>
					<div className="modal__btn">
						<button onClick={hideModal} className="modal__cancel">
							Cancel
						</button>
						<button
							onClick={this.deleteHandler}
							key={detail}
							className="modal__delete"
						>
							Delete
						</button>
					</div>
				</div>
			</>
		);
	}
}
export default Modal;
