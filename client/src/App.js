import React, { Component } from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Warehouse from "./components/Warehouse/Warehouse";
import WarehouseDetail from "./components/WarehouseDetail/WarehouseDetail";
import WarehouseAdd from "./components/WarehouseAdd/WarehouseAdd";
import WarehouseEdit from "./components/WarehouseEdit/WarehouseEdit";
import Inventory from "./components/Inventory/Inventory";
import InventoryAdd from "./components/InventoryAdd/InventoryAdd";
import InventoryEdit from "./components/InventoryEdit/InventoryEdit";
import InventoryDetails from "./components/InventoryDetails/InventoryDetails";

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Header />
				<section className="main">
					<div className="main-content">
						<Switch>
							<Route exact path="/" component={Warehouse} />
							<Route exact path="/Warehouses/add" component={WarehouseAdd} />

							<Route
								exact
								path="/Warehouses/edit/:warehouseID"
								component={WarehouseEdit}
							/>

							<Route
								exact
								path="/Warehouses/:warehouseID"
								component={WarehouseDetail}
							/>

							<Route exact path="/Inventory" component={Inventory} />
							<Route exact path="/Inventory/add" component={InventoryAdd} />

							<Route exact path="/Inventory/edit/:id" component={InventoryEdit} />

							<Route exact path="/Inventory/:id" component={InventoryDetails} />
						</Switch>
					</div>
				</section>
				<footer>
					<p className="copyright">InStock Inc. All Rights Reserved.</p>
				</footer>
			</BrowserRouter>
		);
	}
}

export default App;
