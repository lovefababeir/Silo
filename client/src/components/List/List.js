import React from "react";
import sortIcon from "../../assets/Icons/sort-24px.svg";
import ListItem from "../ListItem/ListItem.js";
import "../List/List.scss";
import { Link } from "react-router-dom";

class List extends React.Component {
	render() {
		const {
			title,
			list,
			tableHeadings,
			linkFunction,
			sortHandler,
		} = this.props;
		const { heading1, heading2, heading3, heading4, heading5 } = tableHeadings;

		return (
			<>
				{/* -----------HEADING FOR PAGE (only for warehouse and inventory pages)----------- */}
				{(title === "Inventory" || title === "Warehouses") && (
					<div className="page__header">
						<h1 className="page__title">{title}</h1>
						<div className="page__cta-box">
							<input
								type="text"
								className="page__search"
								placeholder="Search..."
							></input>
							<Link to={`/${title}/add`} className="page__add-link">
								<button className="page__add-content">
									+ {`Add New ${heading1}`}
								</button>
							</Link>
						</div>
					</div>
				)}
				{/* -------------------------------------------- */}
				{/* -----------TABLE HEADING----------- */}
				<div className="table">
					<label className="table__titles">
						{heading1}
						<img
							src={sortIcon}
							className="sortIcon"
							alt="sort icon"
							onClick={e => sortHandler(1)}
						/>
					</label>
					<label className="table__titles">
						{heading2}
						<img
							src={sortIcon}
							className="sortIcon"
							alt="sort icon"
							onClick={e => sortHandler(2)}
						/>
					</label>
					<label className="table__titles table__titles--3">
						{heading3}
						<img
							src={sortIcon}
							className="sortIcon"
							alt="sort icon"
							onClick={e => sortHandler(3)}
						/>
					</label>
					<label
						className={`table__titles table__titles--4 ${
							title === "Inventory" ? "qtyColumn" : ""
						}`}
					>
						{heading4}
						<img
							src={sortIcon}
							className="sortIcon"
							alt="sort icon"
							onClick={e => sortHandler(4)}
						/>
					</label>
					{heading5 && (
						<label
							className="table__titles table__titles--5"
							onClick={e => sortHandler(5)}
						>
							{heading5}
							<img src={sortIcon} className="sortIcon" alt="sort icon" />
						</label>
					)}
					<label className="table__titles table__titles--actions">
						Actions
					</label>
				</div>
				{/* -------------------------------------------- */}
				{/* ----------LIST FOR WAREHOuSE PAGE-------- */}
				{title === "Warehouses" &&
					list.map(item => {
						return (
							<ListItem
								detail1={item.name}
								detail2={item.contact.contact}
								detail3={`${item.address} ${item.city}, ${item.country}`}
								detail4={item.contact.phone}
								detail4b={item.contact.email}
								detail5={null}
								tableHeadings={tableHeadings}
								title={title}
								key={item.id}
								id={item.id}
								newWarehouse={this.props.newWarehouse}
								linkFunction={linkFunction}
							/>
						);
					})}
				{/* -------------------------------------------- */}
				{/* ----------LIST FOR INVENTORY PAGE------------ */}
				{title === "Inventory" &&
					list
						.sort((a, b) => a.itemName - b.itemName)
						.map(item => {
							return (
								<ListItem
									detail1={item.itemName}
									detail2={item.status}
									detail3={item.category}
									detail4={item.quantity}
									detail4b={null}
									detail5={item.warehouseName}
									tableHeadings={tableHeadings}
									title={title}
									key={item.id}
									id={item.id}
									newInventory={this.props.newInventory}
									linkFunction={linkFunction}
								/>
							);
						})}
				{/* -------------------------------------------- */}
				{/* -----List of items for WAREHOUSE DETAILS PAGE-----*/}
				{title !== "Inventory" &&
					title !== "Warehouses" &&
					list.map(item => {
						// console.log(item)
						return (
							<ListItem
								//switch what you would pass on to 2 and 3
								detail1={item.itemName}
								detail2={item.status}
								detail3={item.category}
								detail4={item.quantity}
								detail4b={null}
								detail5={item.warehouseName}
								tableHeadings={tableHeadings}
								title={title}
								key={item.id}
								id={item.id}
								linkFunction={linkFunction}
								newInventoryList={this.props.newInventoryList}
								warehouseID={item.warehouseID}
							/>
						);
					})}
			</>
		);
	}
}
export default List;
