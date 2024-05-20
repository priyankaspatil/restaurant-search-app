const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("./json/db.json");
const businessesdb = JSON.parse(
  fs.readFileSync("./json/businesses.json", "UTF-8")
);

server.use(jsonServer.defaults());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.get("/businesses", (req, res) => {
  try {
    res.status(200).json(businessesdb.businesses);
  } catch (error) {
    res.status(500).json();
  }
});

server.get("/businesses/search", (req, res) => {
  console.log("search");
  try {
    const searchTerm = req.params.term;
    console.log(searchTerm);
    const searchedBusinesses = businessesdb.businesses.filter((business) =>
      business.name.toLowerCase().includes(`${searchTerm}`.toLowerCase())
    );
    res.status(200).json(searchedBusinesses);
  } catch (error) {
    res.status(500).json();
  }
});

server.get("/businesses/:id", (req, res) => {
  try {
    const business = businessesdb.businesses.filter(
      (item) => item.id === req.params.id
    );

    if (business.length === 1) {
      res.status(200).json(business[0]);
    } else {
      res.status(200).json({
        status: 400,
        message: "the business you are looking for doesn't exist.",
      });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  }
});

server.use(router);

server.listen(3000, () => {
  console.log("Run Auth API Server");
});
