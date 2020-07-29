const express = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());

mongoose.connect(
	"mongodb+srv://deep:test123@gql-ninja-j4g1l.mongodb.net/test?retryWrites=true&w=majority",
	{ useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.once("open", () => {
	console.log("connected");
});
app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: true
	})
);

app.get("/", (req, res) => {
	res.send("<h1>HII</h1>");
});

app.listen(3000, () => {
	console.log("app is listening on 3000");
});
