const express    = require("express");
const app        = express();
const port       = process.env.PORT || 8080;
const firebaseDB = require('./controller/firestoreFunctions.js');
const bodyParser = require('body-parser');

app.use(express.static("public"));
// app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.set("views", "views");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("index");
});

app.post("/budget/items", (req, res) => {
	if(req.body.function === "addItem") {
		firebaseDB.addItem(req.body.uid, req.body.name, req.body.amount, res);
	}
	else if (req.body.function === "addExpense") {
		firebaseDB.addExpense(req.body.uid, req.body.name, req.body.amount, req.body.description, res);
	}
	else if (req.body.function === "addIncome") {
		firebaseDB.addIncome(req.body.uid, req.body.amount, req.body.itemArray, res);
	}
	else {
		console.log(req.query.function);
	}
});

app.get("/budget/items", (req, res) => {
	if(req.query.function === "getItems") {
		if(req.query.itemName) {
			firebaseDB.getItem(req.query.uid, req.query.itemName, res);
		}
		else {
			firebaseDB.getItems(req.query.uid, res);
		}
	}
	else if (req.query.function === "getExpenses") {
		firebaseDB.getExpenses(req.query.uid, res);
	}
	else if (req.query.function === "getIncome") {
		if(req.query.batchID) {
			firebaseDB.getIncomeItems(req.query.uid, req.query.batchID, res);
		}
		else {
			firebaseDB.getIncomeBatches(req.query.uid, res);
		}
	}
	else {
		console.log(req.query.function);
	}
});


app.listen(port, function() {
	console.log("port: " + port);
});