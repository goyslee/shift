var express = require("express");
var router = express.Router();
var Colleague = require("../models/colleague");
var Colleagueshiftstate = require("../models/colleagueshiftstate");
var middleware = require("../middleware");

var collInNum = 0;
var agentcollInNum = 0;
var hygieneNum = 0;
var noMatch = "";

//Get all colleaguestablerow from DB //INDEX
router.get("/", middleware.isLoggedIn, function (req, res) {
  //v15
  if (req.query.search) {
    //v15
    const regex = new RegExp(escapeRegex(req.query.search), "gi"); //v15
    //Get all colleagues, from DB //v15
    Colleague.find(
      {
        lastName: regex,
      },
      null,
      {
        sort: {
          lastName: 1,
        },
      },
      function (err, tablerow) {
        //v15
        if (err) {
          //v15
          console.log(err); //v15
        } else {
          //v15
          if (tablerow.length < 1) {
            //v15
            noMatch =
              "There is no colleagues matches with the searched criteria. Please try an another one."; //v15
          } //v15
          res.render("colleagues/colleagues", {
            hygieneNum: hygieneNum,
            agentcollInNum: agentcollInNum,
            collInNum: collInNum,
            tablerow: tablerow,
            noMatch: noMatch,
          }); //v15
        }
      },
    ); //v15
  } else {
    //v15

    ///Get all colleagues, from DB
    Colleague.find(
      {
        shift: "Earlies",
      },
      null,
      {
        sort: {
          lastName: 1,
        },
      },
      function (err, tablerow) {
        if (err) {
          console.log(err);
        } else {
          tablerow.forEach(function (coll) {
            if (
              (coll.isIn == true && coll.team === 1) ||
              (coll.isIn == true && coll.team === 2) ||
              (coll.isIn == true && coll.team === 3) ||
              (coll.isIn == true && coll.team === 4) ||
              (coll.isIn == true && coll.team === 5) ||
              (coll.isIn == true && coll.team === 6)
            ) {
              collInNum++;
            }

            if (coll.isIn == true && coll.team === 10) {
              agentcollInNum++;
            }
            if (coll.isIn == true && coll.team === 9) {
              hygieneNum++;
            }
          });
          res.render("colleagues/colleagues", {
            hygieneNum: hygieneNum,
            agentcollInNum: agentcollInNum,
            collInNum: collInNum,
            tablerow: tablerow,
            noMatch: noMatch,
          });
        }
      },
    );
  } //v15
});

router.get("/earlies", middleware.isLoggedIn, async function (req, res) {
  var noMatch = "";
  var collInNum = 0;
  var agentcollInNum = 0;
  var hygieneNum = 0;

  try {
    var query = { shift: "Earlies" };
    var sort = { lastName: 1 };
    if (req.query.search) {
      const regex = new RegExp(escapeRegex(req.query.search), "gi");
      query.lastName = regex;
    }

    var tablerow = await Colleague.find(query, null, { sort }).exec();

    if (req.query.search && tablerow.length < 1) {
      noMatch =
        "There is no colleagues matches with the searched criteria. Please try an another one.";
    }

    if (!req.query.search) {
      tablerow.forEach((coll) => {
        if (coll.isIn && coll.shift === "Earlies") collInNum++;
        if (coll.isIn && coll.team === 10) agentcollInNum++;
        if (coll.isIn && coll.team === 9) hygieneNum++;
      });
    }

    res.render("colleagues/colleagues", {
      hygieneNum: hygieneNum,
      agentcollInNum: agentcollInNum,
      collInNum: collInNum,
      tablerow: tablerow,
      noMatch: noMatch,
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Something Went wrong.");
    res.redirect("back");
  }
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

router.get("/middles", middleware.isLoggedIn, async function (req, res) {
  var noMatch = "";
  var collInNum = 0;
  var agentcollInNum = 0;
  var hygieneNum = 0;

  try {
    var query = { shift: "Middles" };
    var sort = { lastName: 1 };
    if (req.query.search) {
      const regex = new RegExp(escapeRegex(req.query.search), "gi");
      query.lastName = regex;
    }

    var tablerow = await Colleague.find(query, null, { sort }).exec();

    if (req.query.search && tablerow.length < 1) {
      noMatch =
        "There is no colleagues matches with the searched criteria. Please try an another one.";
    }

    if (!req.query.search) {
      tablerow.forEach((coll) => {
        if (coll.isIn && coll.shift === "Middles") collInNum++;
        if (coll.isIn && coll.team === 10) agentcollInNum++;
        if (coll.isIn && coll.team === 9) hygieneNum++;
      });
    }

    res.render("colleagues/colleagues", {
      hygieneNum: hygieneNum,
      agentcollInNum: agentcollInNum,
      collInNum: collInNum,
      tablerow: tablerow,
      noMatch: noMatch,
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Something Went wrong.");
    res.redirect("back");
  }
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

router.get("/nights", middleware.isLoggedIn, async function (req, res) {
  var noMatch = "";
  var collInNum = 0;
  var agentcollInNum = 0;
  var hygieneNum = 0;

  try {
    var query = { shift: "Nights" };
    var sort = { lastName: 1 };
    if (req.query.search) {
      const regex = new RegExp(escapeRegex(req.query.search), "gi");
      query.lastName = regex;
    }

    var tablerow = await Colleague.find(query, null, { sort }).exec();

    if (req.query.search && tablerow.length < 1) {
      noMatch =
        "There is no colleagues matches with the searched criteria. Please try an another one.";
    }

    if (!req.query.search) {
      tablerow.forEach((coll) => {
        if (coll.isIn && coll.shift === "Nights") collInNum++;
        if (coll.isIn && coll.team === 10) agentcollInNum++;
        if (coll.isIn && coll.team === 9) hygieneNum++;
      });
    }

    res.render("colleagues/colleagues", {
      hygieneNum: hygieneNum,
      agentcollInNum: agentcollInNum,
      collInNum: collInNum,
      tablerow: tablerow,
      noMatch: noMatch,
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Something Went wrong.");
    res.redirect("back");
  }
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// Earlies team1
router.get("/earlies/team1", middleware.isLoggedIn, async (req, res) => {
  try {
    const tablerow = await Colleague.find({ team: 1, shift: "Earlies" }).sort({ lastName: 1 });

    res.render("colleagues/team", {
      tablerow: tablerow,
      team: 1,
      shift: "Earlies",
      routeshift: "earlies",
    });
  } catch (err) {
    console.log(err);
    res.redirect("back"); // Or handle the error in a more user-friendly way
  }
});

// Earlies team2
router.get("/earlies/team2", middleware.isLoggedIn, async (req, res) => {
  try {
    const tablerow = await Colleague.find({ team: 2, shift: "Earlies" }).sort({ lastName: 1 });

    res.render("colleagues/team", {
      tablerow: tablerow,
      team: 2,
      shift: "Earlies",
      routeshift: "earlies",
    });
  } catch (err) {
    console.log(err);
    res.redirect("back"); // Or handle the error in a more user-friendly way
  }
});

// Earlies team3
router.get("/earlies/team3", middleware.isLoggedIn, async (req, res) => {
  try {
    const tablerow = await Colleague.find({ team: 3, shift: "Earlies" }).sort({ lastName: 1 });

    res.render("colleagues/team", {
      tablerow: tablerow,
      team: 3,
      shift: "Earlies",
      routeshift: "earlies",
    });
  } catch (err) {
    console.log(err);
    res.redirect("back"); // Or handle the error in a more user-friendly way
  }
});

// Earlies team4
router.get("/earlies/team4", middleware.isLoggedIn, async (req, res) => {
  try {
    const tablerow = await Colleague.find({ team: 4, shift: "Earlies" }).sort({ lastName: 1 });

    res.render("colleagues/team", {
      tablerow: tablerow,
      team: 4,
      shift: "Earlies",
      routeshift: "earlies",
    });
  } catch (err) {
    console.log(err);
    res.redirect("back"); // Or handle the error in a more user-friendly way
  }
});

// Earlies team5
router.get("/earlies/team5", middleware.isLoggedIn, async (req, res) => {
  try {
    const tablerow = await Colleague.find({ team: 5, shift: "Earlies" }).sort({ lastName: 1 });

    res.render("colleagues/team", {
      tablerow: tablerow,
      team: 5,
      shift: "Earlies",
      routeshift: "earlies",
    });
  } catch (err) {
    console.log(err);
    res.redirect("back"); // Or handle the error in a more user-friendly way
  }
});

// Earlies team6
router.get("/earlies/team6", middleware.isLoggedIn, async (req, res) => {
  try {
    const tablerow = await Colleague.find({ team: 6, shift: "Earlies" }).sort({ lastName: 1 });

    res.render("colleagues/team", {
      tablerow: tablerow,
      team: 6,
      shift: "Earlies",
      routeshift: "earlies",
    });
  } catch (err) {
    console.log(err);
    res.redirect("back"); // Or handle the error in a more user-friendly way
  }
});

// Earlies team7
router.get("/earlies/team7", middleware.isLoggedIn, async (req, res) => {
  try {
    const tablerow = await Colleague.find({ team: 7, shift: "Earlies" }).sort({ lastName: 1 });

    res.render("colleagues/team", {
      tablerow: tablerow,
      team: 7,
      shift: "Earlies",
      routeshift: "earlies",
    });
  } catch (err) {
    console.log(err);
    res.redirect("back"); // Or handle the error in a more user-friendly way
  }
});

// Earlies team8
router.get("/earlies/team8", middleware.isLoggedIn, async (req, res) => {
  try {
    const tablerow = await Colleague.find({ team: 8, shift: "Earlies" }).sort({ lastName: 1 });

    res.render("colleagues/team", {
      tablerow: tablerow,
      team: 8,
      shift: "Earlies",
      routeshift: "earlies",
    });
  } catch (err) {
    console.log(err);
    res.redirect("back"); // Or handle the error in a more user-friendly way
  }
});

//earlies9
router.get("/earlies/team9", middleware.isLoggedIn, async (req, res) => {
  try {
    const tablerow = await Colleague.find({ team: 9, shift: "Earlies" }).sort({ lastName: 1 });

    res.render("colleagues/team", {
      tablerow: tablerow,
      team: 9,
      shift: "Earlies",
      routeshift: "earlies",
    });
  } catch (err) {
    console.log(err);
    res.redirect("back"); // Or handle the error in a more user-friendly way
  }
});

// Middles team1
router.get("/middles/team1", middleware.isLoggedIn, async (req, res) => {
  try {
    const tablerow = await Colleague.find({ team: 1, shift: "Middles" }).sort({ lastName: 1 });

    res.render("colleagues/team", {
      tablerow: tablerow,
      team: 1,
      shift: "Middles",
      routeshift: "middles",
    });
  } catch (err) {
    console.log(err);
    res.redirect("back"); // Or handle the error in a more user-friendly way
  }
});

// Middles team2
router.get("/middles/team2", middleware.isLoggedIn, async (req, res) => {
  try {
    const tablerow = await Colleague.find({ team: 2, shift: "Middles" }).sort({ lastName: 1 });

    res.render("colleagues/team", {
      tablerow: tablerow,
      team: 2,
      shift: "Middles",
      routeshift: "middles",
    });
  } catch (err) {
    console.log(err);
    res.redirect("back"); // Or handle the error in a more user-friendly way
  }
});

// Middles team3
router.get("/middles/team3", middleware.isLoggedIn, async (req, res) => {
  try {
    const tablerow = await Colleague.find({ team: 3, shift: "Middles" }).sort({ lastName: 1 });

    res.render("colleagues/team", {
      tablerow: tablerow,
      team: 3,
      shift: "Middles",
      routeshift: "middles",
    });
  } catch (err) {
    console.log(err);
    res.redirect("back"); // Or handle the error in a more user-friendly way
  }
});

// Middles team4
router.get("/middles/team4", middleware.isLoggedIn, async (req, res) => {
  try {
    const tablerow = await Colleague.find({ team: 4, shift: "Middles" }).sort({ lastName: 1 });

    res.render("colleagues/team", {
      tablerow: tablerow,
      team: 4,
      shift: "Middles",
      routeshift: "middles",
    });
  } catch (err) {
    console.log(err);
    res.redirect("back"); // Or handle the error in a more user-friendly way
  }
});

// Middles team5
router.get("/middles/team5", middleware.isLoggedIn, async (req, res) => {
  try {
    const tablerow = await Colleague.find({ team: 5, shift: "Middles" }).sort({ lastName: 1 });

    res.render("colleagues/team", {
      tablerow: tablerow,
      team: 5,
      shift: "Middles",
      routeshift: "middles",
    });
  } catch (err) {
    console.log(err);
    res.redirect("back"); // Or handle the error in a more user-friendly way
  }
});

// Middles team6
router.get("/middles/team6", middleware.isLoggedIn, async (req, res) => {
  try {
    const tablerow = await Colleague.find({ team: 6, shift: "Middles" }).sort({ lastName: 1 });

    res.render("colleagues/team", {
      tablerow: tablerow,
      team: 6,
      shift: "Middles",
      routeshift: "middles",
    });
  } catch (err) {
    console.log(err);
    res.redirect("back"); // Or handle the error in a more user-friendly way
  }
});

// Middles team7
router.get("/middles/team7", middleware.isLoggedIn, async (req, res) => {
  try {
    const tablerow = await Colleague.find({ team: 7, shift: "Middles" }).sort({ lastName: 1 });

    res.render("colleagues/team", {
      tablerow: tablerow,
      team: 7,
      shift: "Middles",
      routeshift: "middles",
    });
  } catch (err) {
    console.log(err);
    res.redirect("back"); // Or handle the error in a more user-friendly way
  }
});

// Middles team8
router.get("/middles/team8", middleware.isLoggedIn, async (req, res) => {
  try {
    const tablerow = await Colleague.find({ team: 8, shift: "Middles" }).sort({ lastName: 1 });

    res.render("colleagues/team", {
      tablerow: tablerow,
      team: 8,
      shift: "Middles",
      routeshift: "middles",
    });
  } catch (err) {
    console.log(err);
    res.redirect("back"); // Or handle the error in a more user-friendly way
  }
});

router.get("/middles/team9", middleware.isLoggedIn, async (req, res) => {
  try {
    const tablerow = await Colleague.find({ team: 9, shift: "Middles" }).sort({ lastName: 1 });

    res.render("colleagues/team", {
      tablerow: tablerow,
      team: 9,
      shift: "Middles",
      routeshift: "middles",
    });
  } catch (err) {
    console.log(err);
    res.redirect("back"); // Or handle the error in a more user-friendly way
  }
});

// Nights team1
router.get("/nights/team1", middleware.isLoggedIn, async (req, res) => {
  try {
    const tablerow = await Colleague.find({ team: 1, shift: "Nights" }).sort({ lastName: 1 });

    res.render("colleagues/team", {
      tablerow: tablerow,
      team: 1,
      shift: "Nights",
      routeshift: "nights",
    });
  } catch (err) {
    console.log(err);
    res.redirect("back"); // Or handle the error in a more user-friendly way
  }
});

// Nights team2
router.get("/nights/team2", middleware.isLoggedIn, async (req, res) => {
  try {
    const tablerow = await Colleague.find({ team: 2, shift: "Nights" }).sort({ lastName: 1 });

    res.render("colleagues/team", {
      tablerow: tablerow,
      team: 2,
      shift: "Nights",
      routeshift: "nights",
    });
  } catch (err) {
    console.log(err);
    res.redirect("back"); // Or handle the error in a more user-friendly way
  }
});
// Nights team3
router.get("/nights/team3", middleware.isLoggedIn, async (req, res) => {
  try {
    const tablerow = await Colleague.find({ team: 3, shift: "Nights" }).sort({ lastName: 1 });

    res.render("colleagues/team", {
      tablerow: tablerow,
      team: 3,
      shift: "Nights",
      routeshift: "nights",
    });
  } catch (err) {
    console.log(err);
    res.redirect("back"); // Or handle the error in a more user-friendly way
  }
});

// Nights team4
router.get("/nights/team4", middleware.isLoggedIn, async (req, res) => {
  try {
    const tablerow = await Colleague.find({ team: 4, shift: "Nights" }).sort({ lastName: 1 });

    res.render("colleagues/team", {
      tablerow: tablerow,
      team: 4,
      shift: "Nights",
      routeshift: "nights",
    });
  } catch (err) {
    console.log(err);
    res.redirect("back"); // Or handle the error in a more user-friendly way
  }
});

// Nights team5
router.get("/nights/team5", middleware.isLoggedIn, async (req, res) => {
  try {
    const tablerow = await Colleague.find({ team: 5, shift: "Nights" }).sort({ lastName: 1 });

    res.render("colleagues/team", {
      tablerow: tablerow,
      team: 5,
      shift: "Nights",
      routeshift: "nights",
    });
  } catch (err) {
    console.log(err);
    res.redirect("back"); // Or handle the error in a more user-friendly way
  }
});
// Nights team6
router.get("/nights/team6", middleware.isLoggedIn, async (req, res) => {
  try {
    const tablerow = await Colleague.find({ team: 6, shift: "Nights" }).sort({ lastName: 1 });

    res.render("colleagues/team", {
      tablerow: tablerow,
      team: 6,
      shift: "Nights",
      routeshift: "nights",
    });
  } catch (err) {
    console.log(err);
    res.redirect("back"); // Or handle the error in a more user-friendly way
  }
});

// Nights team7
router.get("/nights/team7", middleware.isLoggedIn, async (req, res) => {
  try {
    const tablerow = await Colleague.find({ team: 7, shift: "Nights" }).sort({ lastName: 1 });

    res.render("colleagues/team", {
      tablerow: tablerow,
      team: 7,
      shift: "Nights",
      routeshift: "nights",
    });
  } catch (err) {
    console.log(err);
    res.redirect("back"); // Or handle the error in a more user-friendly way
  }
});
// Nights team8
router.get("/nights/team8", middleware.isLoggedIn, async (req, res) => {
  try {
    const tablerow = await Colleague.find({ team: 8, shift: "Nights" }).sort({ lastName: 1 });

    res.render("colleagues/team", {
      tablerow: tablerow,
      team: 9,
      shift: "Nights",
      routeshift: "nights",
    });
  } catch (err) {
    console.log(err);
    res.redirect("back"); // Or handle the error in a more user-friendly way
  }
});

//managers
router.get("/manager", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      team: null,
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/manager", {
        tablerow: tablerow,
      });
    },
  );
});

// hygiene
//team6
router.get("/hygiene", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      team: 9,
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
      });
    },
  );
});
//LOADERS
//loaders earlies
router.get("/loadingEarlies", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      loading: true,
      shift: "Earlies",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Earlies",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//loaders middles
router.get("/loadingMiddles", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      loading: true,
      shift: "Middles",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        noSearch: true,
        tablerow: tablerow,
        Whatshift: "Middles",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//loaders nights
router.get("/loadingNights", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      loading: true,
      shift: "Nights",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Nights",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});
//PICKERS
//pickers earlies
router.get("/pickEarlies", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      pick: true,
      shift: "Earlies",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Earlies",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//pickers middles
router.get("/pickMiddles", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      pick: true,
      shift: "Middles",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Middles",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//pickers nights
router.get("/pickNights", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      pick: true,
      shift: "Nights",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Nights",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

// RECOUP
//recoup earlies
router.get("/RecoupTrainedEarlies", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      recoup: true,
      shift: "Earlies",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Earlies",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//recoup trained middles
router.get("/RecoupTrainedMiddles", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      recoup: true,
      shift: "Middles",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Middles",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//recoup trained nights
router.get("/RecoupTrainedNights", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      recoup: true,
      shift: "Nights",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Nights",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//REACH TRUCK DRIVERS
//drivers earlies
router.get("/rtTrainedEarlies", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      trucks: true,
      shift: "Earlies",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Earlies",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//drivers middles
router.get("/rtTrainedMiddles", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      trucks: true,
      shift: "Middles",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Middles",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//drivers nights
router.get("/rtTrainedNights", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      trucks: true,
      shift: "Nights",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Nights",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//De-kit(dekit)
//De-kit earlies
router.get("/dekitTrainedEarlies", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      dekit: true,
      shift: "Earlies",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Earlies",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//De-kit middles
router.get("/dekitTrainedMiddles", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      dekit: true,
      shift: "Middles",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Middles",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//De-kit nights
router.get("/dekitTrainedNights", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      dekit: true,
      shift: "Nights",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Nights",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//AMBIENT PICK
//ambient_pick earlies
router.get("/amPickEarlies", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      ambient_pick: true,
      shift: "Earlies",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Earlies",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//ambient_pick middles
router.get("/amPickMiddles", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      ambient_pick: true,
      shift: "Middles",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Middles",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//ambient_pick nights
router.get("/amPickNights", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      ambient_pick: true,
      shift: "Nights",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Nights",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//Receiving earlies
router.get("/receivingTrainedEarlies", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      tip: true,
      shift: "Earlies",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Earlies",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//Receiving middles
router.get("/receivingTrainedMiddles", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      tip: true,
      shift: "Middles",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Middles",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//Receiving nights
router.get("/receivingTrainedNights", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      tip: true,
      shift: "Nights",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Nights",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//BANKSMAN
//banksman earlies
router.get("/banksmanEarlies", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      banksMan: true,
      shift: "Earlies",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Earlies",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//banksman middles
router.get("/banksmanMiddles", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      banksMan: true,
      shift: "Middles",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Middles",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//banksman nights
router.get("/banksmanNights", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      banksMan: true,
      shift: "Nights",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Nights",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//counterbalance
router.get("/cbEarlies", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      counterBalance: true,
      shift: "Earlies",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Earlies",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//counterBalance middles
router.get("/cbMiddles", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      counterBalance: true,
      shift: "Middles",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Middles",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//counterBalance nights
router.get("/cbNights", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      counterBalance: true,
      shift: "Nights",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Nights",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//scissor lift
//scissor lift earlies
router.get("/scEarlies", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      scissor_lift: true,
      shift: "Earlies",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Earlies",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//scissor lift middles
router.get("/scMiddles", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      scissor_lift: true,
      shift: "Middles",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Middles",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//scissor lift nights
router.get("/scNights", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      scissor_lift: true,
      shift: "Nights",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Nights",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//scissor lift
//scissor lift earlies
router.get("/chPickEarlies", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      chill_pick: true,
      shift: "Earlies",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Earlies",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//scissor lift middles
router.get("/chPickMiddles", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      chill_pick: true,
      shift: "Middles",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Middles",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//scissor lift nights
router.get("/chPickNights", middleware.isLoggedIn, function (req, res) {
  Colleague.find(
    {
      chill_pick: true,
      shift: "Nights",
    },
    null,
    {
      sort: {
        lastName: 1,
      },
    },
    function (err, tablerow) {
      if (err) {
        console.log(err);
      } else {
      }
      res.render("colleagues/colleagues", {
        tablerow: tablerow,
        Whatshift: "Nights",
        hygieneNum: hygieneNum,
        agentcollInNum: agentcollInNum,
        collInNum: collInNum,
        tablerow: tablerow,
        noMatch: noMatch,
      });
    },
  );
});

//NEW Colleague
router.get("/newcolleague", middleware.isAdmin, function (req, res) {
  res.render("colleagues/newcolleague");
});

// New colleagues Create Route
router.post("/", middleware.isAdmin, function (req, res) {
  //Create a new Colleague and save it to the database  (DB)
  Colleague.create(req.body.colleague, function (err, newlyCreated) {
    if (err) {
      console.log(err);
      res.render("colleagues/newcolleague");
    } else {
      //redirect back to colleagues
      newlyCreated.fullName = newlyCreated.firstName + " " + newlyCreated.lastName;
      newlyCreated.save();
      newlyCreated.holiday = false;
      newlyCreated.isAllocated = false;
      if (!req.body.colleague.startDate) {
        newlyCreated.startDate = Date.now();
      }
      req.flash(
        "success",
        newlyCreated.fullName +
          " has been succesfully added to the database, please check in the menu at " +
          newlyCreated.shift +
          " >> Team" +
          newlyCreated.team +
          ".",
      );
      if (newlyCreated.team && newlyCreated.shift) {
        res.redirect(
          "/colleagues/" + newlyCreated.shift.toLowerCase() + "/team" + newlyCreated.team,
        );
      }
      if (!newlyCreated.team && newlyCreated.shift) {
        res.redirect("/colleagues/" + newlyCreated.shift.toLowerCase());
      }
      if (!newlyCreated.shift) {
        res.redirect("/colleagues");
      }
      // res.redirect("back"); //nem nyultam hozza
    }
  });
});

// COLLEAGUE SHOW ROUTE
router.get("/:id", middleware.isLoggedIn, async function (req, res) {
  try {
    const foundColleague = await Colleague.findById(req.params.id).populate("comments").exec();
    if (!foundColleague) {
      req.flash("error", "Colleague record has not found.");
      return res.redirect("back");
    }
    res.render("colleagues/colleagueshow", {
      colleagueinfo: foundColleague,
    });
  } catch (err) {
    console.log(err);
    req.flash("error", `An error occurred: ${err}`);
    res.redirect("back");
  }
});

// EDIT ROUTE
router.get("/:id/colleagueedit", middleware.isAdmin, async function (req, res) {
  try {
    const foundColleague = await Colleague.findById(req.params.id);
    if (!foundColleague) {
      return res.redirect("/colleagues");
    }
    res.render("colleagues/colleagueedit", {
      colleague: foundColleague,
    });
  } catch (err) {
    console.error(err);
    res.redirect("/colleagues");
  }
});

// // UPDATE ROUTE (update as a PUT request)

// router.put('/:id', middleware.isAdmin, async (req, res) => {
//   const { id } = req.params;
//   const colleague = await Colleague.findByIdAndUpdate(id, { ...req.body.colleague })
//   console.log(req.body)
//   res.redirect(`/colleagues/${colleague.shift.toLowerCase()}`)
// })

router.put("/:id", middleware.isAdmin, async (req, res) => {
  try {
    const updatedColleague = await Colleague.findByIdAndUpdate(
      req.params.id,
      { ...req.body.colleague },
      { new: true }, // This option returns the document after update was applied
    );

    if (!updatedColleague) {
      req.flash("error", "No colleague found with the given ID.");
      return res.redirect(`/colleagues/${req.params.id}/colleagueedit`);
    }

    req.flash(
      "success",
      `${updatedColleague.fullName}'s details has been successfully updated in the database.`,
    );

    if (updatedColleague.team && updatedColleague.shift) {
      return res.redirect(
        `/colleagues/${updatedColleague.shift.toLowerCase()}/team${updatedColleague.team}`,
      );
    }

    if (!updatedColleague.team && updatedColleague.shift) {
      return res.redirect(`/colleagues/${updatedColleague.shift.toLowerCase()}`);
    }

    res.redirect(`/:id`);
  } catch (err) {
    console.error(err);
    req.flash("error", "Nothing has updated, due to an Error " + err);
    res.redirect(`/colleagues/${req.params.id}/colleagueedit`);
  }
});

//Team 1 earlies 10 pm start
router.put("/earlies/team1/ten", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 1,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = true;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//Team 2 earlies 10 pm start
router.put("/earlies/team2/ten", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 2,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = true;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//Team 3 earlies 10 pm start
router.put("/earlies/team3/ten", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 3,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = true;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//Team 4 earlies 10 pm start
router.put("/earlies/team4/ten", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 4,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = true;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//Team 5 earlies 10 pm start
router.put("/earlies/team5/ten", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 5,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = true;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//Team 6 earlies 10 pm start
router.put("/earlies/team6/ten", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 6,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = true;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//Team 7 earlies 10 pm start
router.put("/earlies/team7/ten", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 7,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = true;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//Team 8 earlies 10 pm start
router.put("/earlies/team8/ten", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 8,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = true;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//Team 1 earlies 9 pm start
router.put("/earlies/team1/nine", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 1,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//Team 2 earlies 9 pm start
router.put("/earlies/team2/nine", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 2,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//Team 3 earlies 9 pm start
router.put("/earlies/team3/nine", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 3,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//Team 4 earlies 9 pm start
router.put("/earlies/team4/nine", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 4,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//Team 5 earlies 9 pm start
router.put("/earlies/team5/nine", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 5,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//Team 6 earlies 9 pm start
router.put("/earlies/team6/nine", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 6,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//Team 7 earlies 9 pm start
router.put("/earlies/team7/nine", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 7,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//Team 8 earlies 9 pm start
router.put("/earlies/team8/nine", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 8,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

// //Team 1 middles 10 pm start
// router.put("/middles/team1/ten", middleware.isAdmin, function (req, res) {
//   Colleague.find({
//       team: 1,
//       shift: "Middles",
//     },
//     function (err, updatedColleague) {
//       if (err) {
//         req.flash("error", err);
//         res.redirect("back");
//       } else {
//         updatedColleague.forEach(function (updatedColleague) {
//           updatedColleague.ten = true;
//           updatedColleague.save();
//         });
//       }
//       res.redirect("back");
//     }
//   );
// });
// //Team 2 middles 10 pm start
// router.put("/middles/team2/ten", middleware.isAdmin, function (req, res) {
//   Colleague.find({
//       team: 2,
//       shift: "Middles",
//     },
//     function (err, updatedColleague) {
//       if (err) {
//         req.flash("error", err);
//         res.redirect("back");
//       } else {
//         updatedColleague.forEach(function (updatedColleague) {
//           updatedColleague.ten = true;
//           updatedColleague.save();
//         });
//       }
//       res.redirect("back");
//     }
//   );
// });
// //Team 3 middles 10 pm start
// router.put("/middles/team3/ten", middleware.isAdmin, function (req, res) {
//   Colleague.find({
//       team: 3,
//       shift: "Middles",
//     },
//     function (err, updatedColleague) {
//       if (err) {
//         req.flash("error", err);
//         res.redirect("back");
//       } else {
//         updatedColleague.forEach(function (updatedColleague) {
//           updatedColleague.ten = true;
//           updatedColleague.save();
//         });
//       }
//       res.redirect("back");
//     }
//   );
// });
// //Team 4 middles 10 pm start
// router.put("/middles/team4/ten", middleware.isAdmin, function (req, res) {
//   Colleague.find({
//       team: 4,
//       shift: "Middles",
//     },
//     function (err, updatedColleague) {
//       if (err) {
//         req.flash("error", err);
//         res.redirect("back");
//       } else {
//         updatedColleague.forEach(function (updatedColleague) {
//           updatedColleague.ten = true;
//           updatedColleague.save();
//         });
//       }
//       res.redirect("back");
//     }
//   );
// });
// //Team 5 middles 10 pm start
// router.put("/middles/team5/ten", middleware.isAdmin, function (req, res) {
//   Colleague.find({
//       team: 5,
//       shift: "Middles",
//     },
//     function (err, updatedColleague) {
//       if (err) {
//         req.flash("error", err);
//         res.redirect("back");
//       } else {
//         updatedColleague.forEach(function (updatedColleague) {
//           updatedColleague.ten = true;
//           updatedColleague.save();
//         });
//       }
//       res.redirect("back");
//     }
//   );
// });
// //Team 6 middles 10 pm start
// router.put("/middles/team6/ten", middleware.isAdmin, function (req, res) {
//   Colleague.find({
//       team: 6,
//       shift: "Middles",
//     },
//     function (err, updatedColleague) {
//       if (err) {
//         req.flash("error", err);
//         res.redirect("back");
//       } else {
//         updatedColleague.forEach(function (updatedColleague) {
//           updatedColleague.ten = true;
//           updatedColleague.save();
//         });
//       }
//       res.redirect("back");
//     }
//   );
// });
// //Team 7 middles 10 pm start
// router.put("/middles/team7/ten", middleware.isAdmin, function (req, res) {
//   Colleague.find({
//       team: 7,
//       shift: "Middles",
//     },
//     function (err, updatedColleague) {
//       if (err) {
//         req.flash("error", err);
//         res.redirect("back");
//       } else {
//         updatedColleague.forEach(function (updatedColleague) {
//           updatedColleague.ten = true;
//           updatedColleague.save();
//         });
//       }
//       res.redirect("back");
//     }
//   );
// });
// //Team 8 middles 10 pm start
// router.put("/middles/team8/ten", middleware.isAdmin, function (req, res) {
//   Colleague.find({
//       team: 8,
//       shift: "Middles",
//     },
//     function (err, updatedColleague) {
//       if (err) {
//         req.flash("error", err);
//         res.redirect("back");
//       } else {
//         updatedColleague.forEach(function (updatedColleague) {
//           updatedColleague.ten = true;
//           updatedColleague.save();
//         });
//       }
//       res.redirect("back");
//     }
//   );
// });

// //Team 1 middles 9 pm start
// router.put("/middles/team1/nine", middleware.isAdmin, function (req, res) {
//   Colleague.find({
//       team: 1,
//       shift: "Middles",
//     },
//     function (err, updatedColleague) {
//       if (err) {
//         req.flash("error", err);
//         res.redirect("back");
//       } else {
//         updatedColleague.forEach(function (updatedColleague) {
//           updatedColleague.ten = false;
//           updatedColleague.save();
//         });
//       }
//       res.redirect("back");
//     }
//   );
// });
// //Team 2 middles 9 pm start
// router.put("/middles/team2/nine", middleware.isAdmin, function (req, res) {
//   Colleague.find({
//       team: 2,
//       shift: "Middles",
//     },
//     function (err, updatedColleague) {
//       if (err) {
//         req.flash("error", err);
//         res.redirect("back");
//       } else {
//         updatedColleague.forEach(function (updatedColleague) {
//           updatedColleague.ten = false;
//           updatedColleague.save();
//         });
//       }
//       res.redirect("back");
//     }
//   );
// });
// //Team 3 middles 9 pm start
// router.put("/middles/team3/nine", middleware.isAdmin, function (req, res) {
//   Colleague.find({
//       team: 3,
//       shift: "Middles",
//     },
//     function (err, updatedColleague) {
//       if (err) {
//         req.flash("error", err);
//         res.redirect("back");
//       } else {
//         updatedColleague.forEach(function (updatedColleague) {
//           updatedColleague.ten = false;
//           updatedColleague.save();
//         });
//       }
//       res.redirect("back");
//     }
//   );
// });
// //Team 4 middles 9 pm start
// router.put("/middles/team4/nine", middleware.isAdmin, function (req, res) {
//   Colleague.find({
//       team: 4,
//       shift: "Middles",
//     },
//     function (err, updatedColleague) {
//       if (err) {
//         req.flash("error", err);
//         res.redirect("back");
//       } else {
//         updatedColleague.forEach(function (updatedColleague) {
//           updatedColleague.ten = false;
//           updatedColleague.save();
//         });
//       }
//       res.redirect("back");
//     }
//   );
// });
// //Team 5 middles 9 pm start
// router.put("/middles/team5/nine", middleware.isAdmin, function (req, res) {
//   Colleague.find({
//       team: 5,
//       shift: "Middles",
//     },
//     function (err, updatedColleague) {
//       if (err) {
//         req.flash("error", err);
//         res.redirect("back");
//       } else {
//         updatedColleague.forEach(function (updatedColleague) {
//           updatedColleague.ten = false;
//           updatedColleague.save();
//         });
//       }
//       res.redirect("back");
//     }
//   );
// });
// //Team 6 middles 9 pm start
// router.put("/middles/team6/nine", middleware.isAdmin, function (req, res) {
//   Colleague.find({
//       team: 6,
//       shift: "Middles",
//     },
//     function (err, updatedColleague) {
//       if (err) {
//         req.flash("error", err);
//         res.redirect("back");
//       } else {
//         updatedColleague.forEach(function (updatedColleague) {
//           updatedColleague.ten = false;
//           updatedColleague.save();
//         });
//       }
//       res.redirect("back");
//     }
//   );
// });
// //Team 7 middles 9 pm start
// router.put("/middles/team7/nine", middleware.isAdmin, function (req, res) {
//   Colleague.find({
//       team: 7,
//       shift: "Middles",
//     },
//     function (err, updatedColleague) {
//       if (err) {
//         req.flash("error", err);
//         res.redirect("back");
//       } else {
//         updatedColleague.forEach(function (updatedColleague) {
//           updatedColleague.ten = false;
//           updatedColleague.save();
//         });
//       }
//       res.redirect("back");
//     }
//   );
// });
// //Team 8 middles 9 pm start
// router.put("/middles/team8/nine", middleware.isAdmin, function (req, res) {
//   Colleague.find({
//       team: 8,
//       shift: "Middles",
//     },
//     function (err, updatedColleague) {
//       if (err) {
//         req.flash("error", err);
//         res.redirect("back");
//       } else {
//         updatedColleague.forEach(function (updatedColleague) {
//           updatedColleague.ten = false;
//           updatedColleague.save();
//         });
//       }
//       res.redirect("back");
//     }
//   );
// });

//Team 1 nights 10 pm start
router.put("/nights/team1/ten", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 1,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = true;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//Team 2 nights 10 pm start
router.put("/nights/team2/ten", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 2,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = true;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//Team 3 nights 10 pm start
router.put("/nights/team3/ten", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 3,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = true;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//Team 4 nights 10 pm start
router.put("/nights/team4/ten", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 4,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = true;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//Team 5 nights 10 pm start
router.put("/nights/team5/ten", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 5,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = true;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//Team 6 nights 10 pm start
router.put("/nights/team6/ten", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 6,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = true;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//Team 7 nights 10 pm start
router.put("/nights/team7/ten", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 7,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = true;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//Team 8 nights 10 pm start
router.put("/nights/team8/ten", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 8,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = true;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//Team 1 nights 9 pm start
router.put("/nights/team1/nine", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 1,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//Team 2 nights 9 pm start
router.put("/nights/team2/nine", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 2,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//Team 3 nights 9 pm start
router.put("/nights/team3/nine", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 3,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//Team 4 nights 9 pm start
router.put("/nights/team4/nine", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 4,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//Team 5 nights 9 pm start
router.put("/nights/team5/nine", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 5,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//Team 6 nights 9 pm start
router.put("/nights/team6/nine", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 6,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//Team 7 nights 9 pm start
router.put("/nights/team7/nine", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 7,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//Team 8 nights 9 pm start
router.put("/nights/team8/nine", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 8,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.ten = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//All colleagues in Earlies T1
router.put("/earlies/team1/in", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 1,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          if (updatedColleague.holiday == true || updatedColleague.absence == true) {
            updatedColleague.isIn = false;
          } else {
            updatedColleague.isIn = true;
          }
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//All colleagues in Earlies T2
router.put("/earlies/team2/in", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 2,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          if (updatedColleague.holiday == true || updatedColleague.absence == true) {
            updatedColleague.isIn = false;
          } else {
            updatedColleague.isIn = true;
          }
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//All colleagues in Earlies T3
router.put("/earlies/team3/in", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 3,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          if (updatedColleague.holiday == true || updatedColleague.absence == true) {
            updatedColleague.isIn = false;
          } else {
            updatedColleague.isIn = true;
          }
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//All colleagues in Earlies T4
router.put("/earlies/team4/in", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 4,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          if (updatedColleague.holiday == true || updatedColleague.absence == true) {
            updatedColleague.isIn = false;
          } else {
            updatedColleague.isIn = true;
          }
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//All colleagues in Earlies T5
router.put("/earlies/team5/in", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 5,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          if (updatedColleague.holiday == true || updatedColleague.absence == true) {
            updatedColleague.isIn = false;
          } else {
            updatedColleague.isIn = true;
          }
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//All colleagues in Earlies T6
router.put("/earlies/team6/in", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 6,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          if (updatedColleague.holiday == true || updatedColleague.absence == true) {
            updatedColleague.isIn = false;
          } else {
            updatedColleague.isIn = true;
          }
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//All colleagues in Earlies T7
router.put("/earlies/team7/in", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 7,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          if (updatedColleague.holiday == true || updatedColleague.absence == true) {
            updatedColleague.isIn = false;
          } else {
            updatedColleague.isIn = true;
          }
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//All colleagues in Earlies T8
router.put("/earlies/team8/in", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 8,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          if (updatedColleague.holiday == true || updatedColleague.absence == true) {
            updatedColleague.isIn = false;
          } else {
            updatedColleague.isIn = true;
          }
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//All colleagues Off Earlies T1
router.put("/earlies/team1/off", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 1,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.isIn = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//All colleagues Off EARLIES T2
router.put("/earlies/team2/off", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 2,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.isIn = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//All colleagues Off EARLIES T3
router.put("/earlies/team3/off", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 3,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.isIn = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//All colleagues Off EARLIES T4
router.put("/earlies/team4/off", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 4,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.isIn = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//All colleagues Off EARLIES T5
router.put("/earlies/team5/off", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 5,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.isIn = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//All colleagues Off EARLIES T6
router.put("/earlies/team6/off", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 6,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.isIn = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//All colleagues Off EARLIES T7
router.put("/earlies/team7/off", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 7,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.isIn = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//All colleagues Off EARLIES T8
router.put("/earlies/team8/off", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 8,
      shift: "Earlies",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.isIn = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//All colleagues in Midlles T1
router.put("/middles/team1/in", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 1,
      shift: "Middles",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          if (updatedColleague.holiday == true || updatedColleague.absence == true) {
            updatedColleague.isIn = false;
          } else {
            updatedColleague.isIn = true;
          }
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//All colleagues in Midlles T2
router.put("/middles/team2/in", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 2,
      shift: "Middles",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          if (updatedColleague.holiday == true || updatedColleague.absence == true) {
            updatedColleague.isIn = false;
          } else {
            updatedColleague.isIn = true;
          }
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//All colleagues in Midlles T3
router.put("/middles/team3/in", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 3,
      shift: "Middles",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          if (updatedColleague.holiday == true || updatedColleague.absence == true) {
            updatedColleague.isIn = false;
          } else {
            updatedColleague.isIn = true;
          }
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//All colleagues in Midlles T4
router.put("/middles/team4/in", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 4,
      shift: "Middles",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          if (updatedColleague.holiday == true || updatedColleague.absence == true) {
            updatedColleague.isIn = false;
          } else {
            updatedColleague.isIn = true;
          }
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//All colleagues in Midlles T5
router.put("/middles/team5/in", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 5,
      shift: "Middles",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          if (updatedColleague.holiday == true || updatedColleague.absence == true) {
            updatedColleague.isIn = false;
          } else {
            updatedColleague.isIn = true;
          }
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//All colleagues in Midlles T6
router.put("/middles/team6/in", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 6,
      shift: "Middles",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          if (updatedColleague.holiday == true || updatedColleague.absence == true) {
            updatedColleague.isIn = false;
          } else {
            updatedColleague.isIn = true;
          }
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//All colleagues in Midlles T7
router.put("/middles/team7/in", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 7,
      shift: "Middles",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          if (updatedColleague.holiday == true || updatedColleague.absence == true) {
            updatedColleague.isIn = false;
          } else {
            updatedColleague.isIn = true;
          }
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//All colleagues in Midlles T8
router.put("/middles/team8/in", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 8,
      shift: "Middles",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          if (updatedColleague.holiday == true || updatedColleague.absence == true) {
            updatedColleague.isIn = false;
          } else {
            updatedColleague.isIn = true;
          }
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//All colleagues Off Middles T1
router.put("/middles/team1/off", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 1,
      shift: "Middles",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.isIn = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//All colleagues Off Middles T2
router.put("/middles/team2/off", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 2,
      shift: "Middles",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.isIn = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//All colleagues Off Middles T3
router.put("/middles/team3/off", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 3,
      shift: "Middles",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.isIn = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//All colleagues Off Middles T4
router.put("/middles/team4/off", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 4,
      shift: "Middles",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.isIn = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//All colleagues Off Middles T5
router.put("/middles/team5/off", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 5,
      shift: "Middles",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.isIn = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//All colleagues Off Middles T6
router.put("/middles/team6/off", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 6,
      shift: "Middles",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.isIn = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//All colleagues Off Middles T7
router.put("/middles/team7/off", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 7,
      shift: "Middles",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.isIn = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//All colleagues Off Middles T8
router.put("/middles/team8/off", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 8,
      shift: "Middles",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.isIn = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//All colleagues in NIGTHS T1
router.put("/nights/team1/in", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 1,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          if (updatedColleague.holiday == true || updatedColleague.absence == true) {
            updatedColleague.isIn = false;
          } else {
            updatedColleague.isIn = true;
          }
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//All colleagues in NIGTHS T2
router.put("/nights/team2/in", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 2,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          if (updatedColleague.holiday == true || updatedColleague.absence == true) {
            updatedColleague.isIn = false;
          } else {
            updatedColleague.isIn = true;
          }
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//All colleagues in NIGTHS T3
router.put("/nights/team3/in", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 3,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          if (updatedColleague.holiday == true || updatedColleague.absence == true) {
            updatedColleague.isIn = false;
          } else {
            updatedColleague.isIn = true;
          }
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//All colleagues in NIGTHS T4
router.put("/nights/team4/in", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 4,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          if (updatedColleague.holiday == true || updatedColleague.absence == true) {
            updatedColleague.isIn = false;
          } else {
            updatedColleague.isIn = true;
          }
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//All colleagues in NIGTHS T5
router.put("/nights/team5/in", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 5,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          if (updatedColleague.holiday == true || updatedColleague.absence == true) {
            updatedColleague.isIn = false;
          } else {
            updatedColleague.isIn = true;
          }
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//All colleagues in NIGTHS T6
router.put("/nights/team6/in", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 6,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          if (updatedColleague.holiday == true || updatedColleague.absence == true) {
            updatedColleague.isIn = false;
          } else {
            updatedColleague.isIn = true;
          }
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//All colleagues in NIGTHS T7
router.put("/nights/team7/in", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 7,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          if (updatedColleague.holiday == true || updatedColleague.absence == true) {
            updatedColleague.isIn = false;
          } else {
            updatedColleague.isIn = true;
          }
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//All colleagues in NIGTHS T8
router.put("/nights/team8/in", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 8,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          if (updatedColleague.holiday == true || updatedColleague.absence == true) {
            updatedColleague.isIn = false;
          } else {
            updatedColleague.isIn = true;
          }
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//All colleagues Off NIGTHS t1
router.put("/nights/team1/off", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 1,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.isIn = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

//All colleagues Off NIGTHS t2
router.put("/nights/team2/off", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 2,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.isIn = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//All colleagues Off NIGTHS T3
router.put("/nights/team3/off", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 3,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.isIn = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//All colleagues Off NIGTHS T4
router.put("/nights/team4/off", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 4,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.isIn = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//All colleagues Off NIGTHS T5
router.put("/nights/team5/off", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 5,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.isIn = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//All colleagues Off NIGTHS T6
router.put("/nights/team6/off", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 6,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.isIn = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//All colleagues Off NIGTHS T7
router.put("/nights/team7/off", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 7,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.isIn = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});
//All colleagues Off NIGTHS T8
router.put("/nights/team8/off", middleware.isAdmin, function (req, res) {
  Colleague.find(
    {
      team: 8,
      shift: "Nights",
    },
    function (err, updatedColleague) {
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      } else {
        updatedColleague.forEach(function (updatedColleague) {
          updatedColleague.isIn = false;
          updatedColleague.save();
        });
      }
      res.redirect("back");
    },
  );
});

// DELETE ROUTE
router.delete("/:id", middleware.isLoggedIn, function (req, res) {
  //destroy blog
  Colleague.findByIdAndRemove(req.params.id, function (err, deleted) {
    if (err) {
      req.flash("error", "there was en error, this record has not been deleted");
      res.redirect("/colleagues");
    }
    if (deleted.team && deleted.shift) {
      res.redirect("/colleagues/" + deleted.shift.toLowerCase() + "/team" + deleted.team);
    }
    if (!deleted.team && deleted.shift) {
      res.redirect("/colleagues/" + deleted.shift.toLowerCase());
    }
    if (!deleted.shift) {
      res.redirect("/colleagues");
    }
  });
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"); //v15 Fuzzy search
}

module.exports = router;
