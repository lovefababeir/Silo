import React, { Component } from "react";
import axios from "axios";
import "./WarehouseEdit.scss";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";
import { useHistory, Redirect } from "react-router-dom";
const url = "http://localhost:8080/warehouse/";
class WarehouseEdit extends Component {
	state = {
		curr: null,
		redirect: false,
	};
	componentDidMount() {
		let id = this.props.match.params.warehouseID;
		console.log(url + id);
		console.log(this.props);
		axios
			.get(url + id)
			.then(res => {
				// console.log(res);
				this.setState({
					curr: res.data,
				});
			})
			.catch(err => console.log(err));
	}
	goBack = () => {
		this.props.history.goBack();
	};
	cancelHandler = e => {
		e.preventDefault();
		this.goBack();
	};
	submitHandler = e => {
		// const form = e.target;
		let id = this.props.match.params.warehouseID;
		e.preventDefault();
		let warName = e.target.warehouseName.value;
		let address = e.target.address.value;
		let city = e.target.city.value;
		let country = e.target.country.value;
		let contact = {
			name: e.target.name.value,
			position: e.target.position.value,
			phone: e.target.phone.value,
			email: e.target.email.value,
		};
		console.log(url + id);
		console.log(address, city, country, contact);
		console.log(this.props.match);
		console.log(e.target);
		axios
			.put(url + id, {
				id: id,
				name: warName,
				address: address,
				city: city,
				country: country,
				contact: contact,
			})
			.then(res => {
				console.log(res);
				this.setState({
					redirect: true,
				});
			})
			.catch(err => {
				console.log(err);
			});
		// form.reset();
	};
	render() {
		if (!this.state.curr) {
			return null;
		} else if (this.state.redirect === true) {
			return <Redirect to="/" />;
		}
		console.log(this.props.match.params.id);
		console.log(this.state.curr.name);
		const warehouseName = this.state.curr.name;
		const { address, city, country, id } = this.state.curr;
		const { email, contactName, position, phone } = this.state.curr.contact;
		return (
			<div className="edit">
				<div className="edit__header">
					<img
						src={backArrow}
						onClick={this.goBack}
						className="edit__back"
					></img>
					<p className="edit__heading">Edit Warehouse</p>
				</div>
				<form className="edit-form" onSubmit={this.submitHandler}>
					<div className="edit__inner">
						<div className="warehouse">
							<p className="edit__subHeading">Warehouse Details</p>
							<label htmlFor="warehouse__name" className="warehouse__nameLabel">
								Warehouse Name
							</label>
							<textarea
								type="text"
								className="warehouse__name"
								id="warehouseName"
								placeholder={warehouseName}
							></textarea>
							<label
								htmlFor="warehouse__street"
								className="warehouse__streetLabel"
							>
								Street Address
							</label>
							<textarea
								type="text"
								className="warehouse__street"
								id="address"
								placeholder={address}
							></textarea>
							<label htmlFor="warehouse__city" className="warehouse__cityLabel">
								City
							</label>
							<textarea
								type="text"
								className="warehouse__city"
								id="city"
								placeholder={city}
							></textarea>
							<label
								htmlFor="warehouse__country"
								className="warehouse__countryLabel"
							>
								Country
							</label>
							<textarea
								type="text"
								className="warehouse__country"
								id="country"
								placeholder={country}
							></textarea>
						</div>
						<div className="contactW">
							<p className="contactW__heading">Contact Details</p>
							<label htmlFor="contactW__name" className="contactW__nameLabel">
								Contact Name
							</label>
							<textarea
								type="text"
								className="contactW__name"
								id="name"
								placeholder={contactName}
							></textarea>
							<label
								htmlFor="contactW__position"
								className="contactW__positionLabel"
							>
								Position
							</label>
							<textarea
								type="text"
								className="contactW__position"
								id="position"
								placeholder={position}
							></textarea>
							<label
								htmlFor="contactW__number"
								className="contactW__numberLabel"
							>
								Phone Number
							</label>
							<textarea
								type="text"
								className="contactW__number"
								id="phone"
								placeholder={phone}
							></textarea>
							<label htmlFor="contactW__email" className="contactW__emailLabel">
								Email
							</label>
							<textarea
								type="text"
								className="contactW__email"
								id="email"
								placeholder={email}
							></textarea>
						</div>
					</div>
					<div className="edit__btn">
						<button className="edit__cancel" onClick={this.cancelHandler}>
							Cancel
						</button>
						<button className="edit__save">Save</button>
					</div>
				</form>
			</div>
		);
	}
}
export default WarehouseEdit;
