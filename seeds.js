var mongoose = require("mongoose");
var Colleague = require("./models/colleague");
var Comment = require("./models/comment");
const { parseTwoDigitYear } = require("moment");

//smith
let SmithNumber = 1;
let uNumber = 2001;
// let dynamicTeam = 0;
// let lastName = "";
// let fullName = "";
let data = [
  {
    firstName: "John",
    // lastName: lastName,
    // fullName: fullName,
    // userNumber: uNumber.toString(),
    startDate: Date.now().toString(),
    position: "Warehouse Operative",
    organization: "JS",
    shift: "Middles",
    // team: dynamicTeam,
    colleagueinfo: "",
    firstAider: false,
    pick: true,
    trucks: true,
    scissor_lift: false,
    loading: true,
    tip: true,
    dekit: true,
    chill_pick: false,
    rt: false,
    racking: false,
    counterBalance: false,
    recoup: false,
    banksman: false,
    training: false,
    union: false,
    check: false,
    ambient_pick: false,
    vls: false,
    holiday: false,
    isIn: true,
    absence: false,
    isAllocated: false,
  },
];

//earlies
let data2 = [
  {
    firstName: "John",
    // lastName: lastName,
    // fullName: fullName,
    // userNumber: uNumber.toString(),
    startDate: Date.now().toString(),
    position: "Warehouse Operative",
    organization: "JS",
    shift: "Earlies",
    // team: dynamicTeam,
    colleagueinfo: "",
    firstAider: false,
    pick: true,
    trucks: true,
    scissor_lift: false,
    loading: true,
    tip: true,
    dekit: true,
    chill_pick: false,
    rt: false,
    racking: false,
    counterBalance: false,
    recoup: false,
    banksman: false,
    training: false,
    union: false,
    check: false,
    ambient_pick: false,
    vls: false,
    holiday: false,
    isIn: true,
    absence: false,
    isAllocated: false,
  },
];

let data3 = [
  {
    firstName: "John",
    // lastName: lastName,
    // fullName: fullName,
    // userNumber: uNumber.toString(),
    startDate: Date.now().toString(),
    position: "Warehouse Operative",
    organization: "JS",
    shift: "Nights",
    // team: dynamicTeam,
    colleagueinfo: "",
    firstAider: false,
    pick: true,
    trucks: true,
    scissor_lift: false,
    loading: true,
    tip: true,
    dekit: true,
    chill_pick: false,
    rt: false,
    racking: false,
    counterBalance: false,
    recoup: false,
    banksman: false,
    training: false,
    union: false,
    check: false,
    ambient_pick: false,
    vls: false,
    holiday: false,
    isIn: true,
    absence: false,
    isAllocated: false,
  },
];

function seedDB() {
  // Remove all colleagues
  Colleague.remove({}, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("removed colleagues!");
    //add a few colleagues
    for (var i = 0; i < 160; i++) {
      data.forEach(function (seed) {
        SmithNumber++;
        uNumber++;
        if (SmithNumber > 0 && SmithNumber < 21) {
          seed.team = 1;
        }

        if (SmithNumber > 20 && SmithNumber < 41) {
          seed.team = 2;
        }
        if (SmithNumber > 40 && SmithNumber < 61) {
          seed.team = 3;
        }
        if (SmithNumber > 60 && SmithNumber < 81) {
          seed.team = 4;
        }
        if (SmithNumber > 80 && SmithNumber < 101) {
          seed.team = 5;
        }
        if (SmithNumber > 100 && SmithNumber < 121) {
          seed.team = 6;
        }
        if (SmithNumber > 120 && SmithNumber < 141) {
          seed.team = 7;
        }
        if (SmithNumber > 140 && SmithNumber < 161) {
          seed.team = 8;
        }
        seed.lastName = "Smith0" + SmithNumber.toString();
        seed.fullName = seed.firstName + " " + seed.lastName;
        seed.userNumber = uNumber.toString();

        Colleague.create(seed, function (err, colleague) {
          if (err) {
            console.log(err);
          } else {
            console.log(colleague.fullName);

            // console.log("added a colleague");
            //create a comment
            // Comment.create(
            // 	{
            // 		text: "Nem tul nehez targy",
            // 		author:"zkindla"
            // 	}, function(err, comment){
            // 		if(err) {
            // 			console.log(err);
            // 		} else {
            // 			colleague.comments.push(comment);
            // 			colleague.save();
            // 			console.log("Created new comment");
            // 		}
            // 	});
          }
        });
      });
    }
    //earlies
    for (var i = 170; i < 330; i++) {
      data2.forEach(function (seed) {
        SmithNumber++;
        uNumber++;
        if (SmithNumber > 170 && SmithNumber < 191) {
          seed.team = 1;
        }

        if (SmithNumber > 190 && SmithNumber < 211) {
          seed.team = 2;
        }
        if (SmithNumber > 210 && SmithNumber < 231) {
          seed.team = 3;
        }
        if (SmithNumber > 230 && SmithNumber < 251) {
          seed.team = 4;
        }
        if (SmithNumber > 250 && SmithNumber < 271) {
          seed.team = 5;
        }
        if (SmithNumber > 270 && SmithNumber < 291) {
          seed.team = 6;
        }
        if (SmithNumber > 290 && SmithNumber < 311) {
          seed.team = 7;
        }
        if (SmithNumber > 310 && SmithNumber < 331) {
          seed.team = 8;
        }
        seed.lastName = "Smith0" + SmithNumber.toString();
        seed.fullName = seed.firstName + " " + seed.lastName;
        seed.userNumber = uNumber.toString();

        Colleague.create(seed, function (err, colleague) {
          if (err) {
            console.log(err);
          } else {
            console.log(colleague.fullName);

            // console.log("added a colleague");
            //create a comment
            // Comment.create(
            // 	{
            // 		text: "Nem tul nehez targy",
            // 		author:"zkindla"
            // 	}, function(err, comment){
            // 		if(err) {
            // 			console.log(err);
            // 		} else {
            // 			colleague.comments.push(comment);
            // 			colleague.save();
            // 			console.log("Created new comment");
            // 		}
            // 	});
          }
        });
      });
    }
    //NIghts
    for (var i = 330; i < 491; i++) {
      data3.forEach(function (seed) {
        SmithNumber++;
        uNumber++;
        if (SmithNumber > 330 && SmithNumber < 351) {
          seed.team = 1;
        }

        if (SmithNumber > 350 && SmithNumber < 371) {
          seed.team = 2;
        }
        if (SmithNumber > 370 && SmithNumber < 391) {
          seed.team = 3;
        }
        if (SmithNumber > 390 && SmithNumber < 411) {
          seed.team = 4;
        }
        if (SmithNumber > 410 && SmithNumber < 431) {
          seed.team = 5;
        }
        if (SmithNumber > 430 && SmithNumber < 451) {
          seed.team = 6;
        }
        if (SmithNumber > 450 && SmithNumber < 471) {
          seed.team = 7;
        }
        if (SmithNumber > 470 && SmithNumber < 491) {
          seed.team = 8;
        }
        seed.lastName = "Smith0" + SmithNumber.toString();
        seed.fullName = seed.firstName + " " + seed.lastName;
        seed.userNumber = uNumber.toString();

        Colleague.create(seed, function (err, colleague) {
          if (err) {
            console.log(err);
          } else {
            console.log(colleague.fullName);

            // console.log("added a colleague");
            //create a comment
            // Comment.create(
            // 	{
            // 		text: "Nem tul nehez targy",
            // 		author:"zkindla"
            // 	}, function(err, comment){
            // 		if(err) {
            // 			console.log(err);
            // 		} else {
            // 			colleague.comments.push(comment);
            // 			colleague.save();
            // 			console.log("Created new comment");
            // 		}
            // 	});
          }
        });
      });
    }
  });
  //add a few comments
}

module.exports = seedDB; //this will send this function out and stored inside of seedDB variable in app.js and executed on start of app.js
