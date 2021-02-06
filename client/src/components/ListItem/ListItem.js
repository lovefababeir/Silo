import React from "react";
import "../../components/ListItem/ListItem.scss";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";
import openIcon from "../../assets/Icons/chevron_right-24px.svg";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";

class ListItem extends React.Component {
	state = {
		show: false,
		search: "",
	};

	showModal = () => {
		this.setState({
			show: true,
		});
	};

	hideModal = e => {
		this.setState({
			show: !this.state.show,
		});
	};

	render() {
		const {
			detail1,
			detail2,
			detail3,
			detail4,
			detail4b,
			detail5,
			tableHeadings,
			title,
			id,
			linkFunction,
		} = this.props;
		const { heading1, heading2, heading3, heading4, heading5 } = tableHeadings;

		const page = title === "Warehouses" ? "Warehouses" : "Inventory";

		return (
			<>
				<div className="item">
					<div className="item__detail item__detail--1">
						<label className="item__label">{heading1}</label>

						<h4
							className="item__info item__info--link"
							onClick={() => linkFunction(title, id)}
						>
							{detail1}{" "}
							<img
								src={openIcon}
								className="openIcon"
								alt={`Click here for more details of the ${title}`}
							/>
						</h4>
					</div>
					<div className="item__detail item__detail--3">
						<label className="item__label">{heading2}</label>
						<h4
							className={`item__info ${
								(detail2 === "In Stock" && "inStock") ||
								(detail2 === "Out of Stock" && "outStock")
							}`}
						>
							{detail2}
						</h4>
					</div>

					<div className="item__detail">
						<label className="item__label">{heading3}</label>
						<h4 className="item__info">{detail3}</h4>
					</div>

					<div
						className={`item__detail item__detail--4 ${
							title === "Inventory" ? "qtyColumn" : ""
						}`}
					>
						<label className="item__label">{heading4}</label>
						<h4 className="item__info">{detail4}</h4>
						{detail4b && <h4 className="item__info">{detail4b}</h4>}
					</div>

					{heading5 && (
						<div className="item__detail item__detail--5">
							<label className="item__label">{heading5}</label>
							<h4 className="item__info">{detail5}</h4>
						</div>
					)}

					<div className="item__actions">
						<img
							src={deleteIcon}
							alt={`Click here to delete ${title}`}
							onClick={e => {
								this.showModal();
							}}
						/>
						<Link to={`/${page}/edit/${id}`}>
							<img src={editIcon} alt={`Click here to edit the ${page}`} />
						</Link>
					</div>
				</div>
				<Modal
					show={this.state.show}
					hideModal={this.hideModal}
					detail={detail1}
					heading={heading1}
					title={title}
					id={id}
					newWarehouse={this.props.newWarehouse}
					newInventory={this.props.newInventory}
					newInventoryList={this.props.newInventoryList}
				/>
			</>
		);
	}
}

export default ListItem;
