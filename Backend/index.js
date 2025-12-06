const express = require("express");
const dotenv = require("dotenv");
const port = process.env.PORT || 4000;
const bookRoute = require("./routes/bookRoute");
const userRoute = require("./routes/userRoute");
const cors = require("cors");
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('server is working');
});

const mongoose = require("mongoose");
// connect mongodb
const URI = process.env.MONGODBURI || process.env.LOCALURI;
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect(`${URI}`);
}


app.use("/book", bookRoute);
app.use("/user", userRoute);




app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
