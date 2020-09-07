const polka = require("polka");
const { Currency, Name, Log, sequelize } = require("./model");
const { init } = require("./initDB");
const cors = require('cors');
const bodyParser = require('body-parser');

const server = polka();

server.use(cors());
server.use(bodyParser.json());

server.get("/currencies", async (req, res) => {
  const users = await Currency.findAll();
  res.end(JSON.stringify(users));
});

server.get("/currencies/:id", async (req, res) => {
  const ticker = req.params.id;
  const users = await Currency.findAll({
    where: {
      ticker: ticker,
    },
  });
  res.end(JSON.stringify(users));
});

server.get("/names", async (req, res) => {
  const names = await Name.findAll();
  res.end(JSON.stringify(names));
});

server.get("/names/:id", async (req, res) => {
  const ticker = req.params.id;
  const names = await Name.findAll({
    where: {
      ticker: ticker,
    },
  });

  res.end(JSON.stringify(names));
});

server.post('/logs', (req, res) => {
  Log.create(req.body);
  res.end('Logger activated');
});

server.listen(3333, (err) => {
  init();
  setInterval(() => init(), 1000 * 60 * 60); //1h
  if (err) throw err;
  console.log(`Running on localhost:3333`);
});
