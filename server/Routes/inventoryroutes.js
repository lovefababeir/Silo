const express = require("express");
const router = express.Router();
let inventory = require("../json-data/newInventoryFile.json");
const { route } = require("./warehouseroutes");
const { v4: uuidv4 } = require("uuid");

//GET request for the list of all inventory
router.get("/", (req, res) => {
	if (!inventory) {
		res.status(404).json({
			success: false,
			message: "Sorry, no data available for your request",
		});
	}
	res.status(200).json(
		inventory.map(item => ({
			warehouseID: item.warehouseID,
			warehouseName: item.warehouseName,
			itemName: item.itemName,
			id: item.id,
			description: item.description,
			category: item.category,
			status: item.status,
			quantity: item.quantity,
		}))
	);
});

//GET request for a specific item in a specific warehouse using the unique ID of the item
router.get("/:id", (req, res) => {
	const inventoryID = req.params.id;

	const merchandise = inventory.find(item => {
		return item.id === inventoryID;
	});

	if (!merchandise) {
		res.status(400).send({
			success: false,
			message:
				"Could not complete request. Please check that you have the endpoint /:id where id is the unique id of the item",
		});
	} else {
		res.status(200).json(merchandise);
	}
});

//GET request for the inventory list of a specified warehouse using warehouse ID
router.get("/warehouse/:warehouseID", (req, res) => {
	const warehouseID = req.params.warehouseID;

	const warehouseInventory = inventory.filter(item => {
		return warehouseID === item.warehouseID;
	});
	if (!warehouseInventory) {
		res.status(400).send({
			success: false,
			message:
				"Could not complete request. Please check that you have the endpoint /warehouse/:warehouseID and that your warehouseID matches the ID of the warehouse you would like to get the list of inventory for",
		});
	}
	res.status(200).json(warehouseInventory);
});

router.delete("/:id", (req, res) => {
	for (var i = 0; i < inventory.length; i++) {
		if (inventory[i].id === req.params.id) {
			inventory.splice(i, 1);
		}
	}

	console.log(inventory);

	res.status(200).json(inventory);
});

//post new item to inventory
router.post("/", (req, res) => {
	const newItem = {
		...req.body,
		id: uuidv4(),
	};
	inventory.push(newItem);
	res.status(201).json(newItem);
});

//PUT request for a specific item in a specific warehouse using the unique item ID
router.put("/:id", (req, res) => {
	//storing values given from front end in a variable
	const itemID = req.params.id;
	const warehouseName = req.body.warehouseName;
	const itemName = req.body.itemName;
	const description = req.body.description;
	const category = req.body.category;
	const status = req.body.status;
	// testing to see if the values given in the frontend are not empty
	if (itemName && description && category && warehouseName && status) {
		//test if ID already exist and can be edited
		if (
			inventory.find(item => {
				return item.id === itemID;
			}).id
		) {
			//finding the location of the inventory record in the list of inventory and getting the object.
			const invIndex = inventory.findIndex(item => {
				return item.id === itemID;
			});

			var data = inventory[invIndex];

			//finding and an item that has the same warehouse to get the warehouse ID
			const warehouse = inventory.find(item => {
				return item.warehouseName === warehouseName;
			});
			//checking if status is changed to being out of stock quantity should be 0
			if (status === "Out of Stock") {
				data.quantity = 0;
			}
			//replacing values in the object for the corresponding given itemID
			data.warehouseID = warehouse.warehouseID;
			data.warehouseName = warehouseName;
			data.itemName = itemName;
			data.description = description;
			data.category = category;
			data.status = status;
			res.status(200).json(inventory);
		} else {
			res.status(400).json({
				success: false,
				message: "Could not complete request. ID not recognized",
			});
		}
	} else {
		res.status(400).json({
			success: false,
			message:
				"Could not complete request. Please check that you have the endpoint /:id and have inserted a valid item id. Also make sure the body you submitted includes values for the item name, description, warehouse name, status and category",
		});
	}
});

module.exports = router;
