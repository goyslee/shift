// app.get("/api/foool", (req, res) => {
//   res.send("seggfej");
// });

// const mongodb = require("mongodb").MongoClient;
// const Json2csvParser = require("json2csv").Parser;
// const fs = require("fs");

// let url = "mongodb://username:password@localhost:27017/";
// let url = "mongodb://localhost:27017/";

// mongodb.connect(
//   process.env.DATABASEURL,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   (err, client) => {
//     if (err) throw err;

//     client
//       .db("shiftmanagement2")
//       .collection("colleagues")
//       .find({})
//       .toArray((err, data) => {
//         if (err) throw err;

//         console.log(data);
//         const json2csvParser = new Json2csvParser({ header: true });
//         const csvData = json2csvParser.parse(data);

//         fs.writeFile("goyho_mongodb_fs.csv", csvData, function (error) {
//           if (error) throw error;
//           console.log("Write to goyho_mongodb_fs.csv successfull!");
//         });

//         client.close();
//       });
//   }
// );

// const mongodb = require("mongodb").MongoClient;
// const csvtojson = require("csvtojson");

// // let url = "mongodb://username:password@localhost:27017/";
// // let url = "mongodb://localhost:27017/";

// csvtojson()
//   .fromFile("finalDB.csv")
//   .then((csvData) => {
//     console.log(csvData);

//     mongodb.connect(
//       process.env.DATABASEURLL,
//       { useNewUrlParser: true, useUnifiedTopology: true },
//       (err, client) => {
//         if (err) throw err;

//         client
//           .db("shiftmanagement3")
//           .collection("colleagues")
//           .insertMany(csvData, (err, res) => {
//             if (err) throw err;

//             console.log(`Inserted: ${res.insertedCount} rows`);
//             client.close();
//           });
//       }
//     );
//   });