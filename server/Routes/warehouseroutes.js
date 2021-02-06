const express = require("express");
const router = express.Router();
let warehouse = require("../json-data/warehouses");
let inventory = require("../json-data/newInventoryFile.json");
const { v4: uuidv4 } = require("uuid");
//get ALL warehouse endpoint
router.get("/", (req, res) => {
	res.status(200).json(
		warehouse.map(w => ({
			id: w.id,
			name: w.name,
			address: w.address,
			city: w.city,
			country: w.country,
			contact: {
				contact: w.contact.name,
				position: w.contact.position,
				phone: w.contact.phone,
				email: w.contact.email,
			},
		}))
	);
});
//GET single warehouse endpoint
//need to add inventory get request for single warehouse inventory
router.get("/:id", (req, res) => {
	console.log("Request for warehouse details");
	let warehouseD = [];
	warehouseD.push(
		warehouse.find(w => {
			return w.id === req.params.id;
		})
	);
	warehouseD = warehouseD.map(details => {
		return {
			id: details.id,
			name: details.name,
			address: details.address,
			city: details.city,
			country: details.country,
			contact: {
				contactName: details.contact.name,
				position: details.contact.position,
				phone: details.contact.phone,
				email: details.contact.email,
			},
		};
	});
	var wiDetails = Object.assign(warehouseD[0], {
		inventoryList: inventory.filter(i => {
			return i.warehouseID === req.params.id;
		}),
	});
	res.status(200).json(wiDetails);
});
//edit warehouse
router.put("/:id", (req, res) => {
	console.log("req body", req.body);
	modified = warehouse.find(warehouse => warehouse.id == req.params.id);
	let warehouseName = req.body.name;
	let address = req.body.address;
	let city = req.body.city;
	let country = req.body.country;
	let name = req.body.contact.name;
	let position = req.body.contact.position;
	let phone = req.body.contact.phone;
	let email = req.body.contact.email;
	// modified.id = modified.id;
	modified.name = warehouseName;
	modified.address = address;
	modified.city = city;
	modified.country = country;
	modified.contact.name = name;
	modified.contact.position = position;
	modified.contact.phone = phone;
	modified.contact.email = email;
	res.status(200).json(warehouse);
});
//delete warehouse
router.delete("/:id", (req, res) => {
	console.log(req.params.id);
	for (var i = 0; i < warehouse.length; i++) {
		if (warehouse[i].id == req.params.id) {
			warehouse.splice(i, 1);
		}
	}
	res.status(200).json(warehouse);
});
//add a new warehouse
router.post("/add", (req, res) => {
	console.log("req body", req.body);
	const newWarehouse = {
		...req.body,
		id: uuidv4(),
	};
	warehouse.push(newWarehouse);
	res.status(201).json(warehouse);
});
module.exports = router;
