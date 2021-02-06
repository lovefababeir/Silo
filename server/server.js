const express = require("express");
const app = express();
const cors = require("cors");
const allWarehouse = require("./routes/warehouseroutes");
const allInventory = require("./routes/inventoryroutes");

const bodyparser = require("body-parser");

//middleware for cors
app.use(cors());

//being able to post to the data sets
app.use(express.json());
app.use(bodyparser.json());

//endpoints for all warehouses and warehouse details by Id
app.use("/warehouse", allWarehouse);
app.use("/inventory", allInventory);

app.listen(8080, () => {
	console.log(`InStock listening on 8080`);
});
