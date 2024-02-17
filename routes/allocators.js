var express = require("express");
var router = express.Router();
var Allocator = require("../models/allocator");
var Picker = require("../models/picker");
var Driver = require("../models/driver");
var Scissor_lift = require("../models/scissor_lift");
var Csc = require("../models/csc");
var Dekit = require("../models/dekit");
var Tipper = require("../models/tipper");
var Loader = require("../models/loader");
var Banksman = require("../models/banksman");
var Hygiene = require("../models/hygiene");
var Recoup = require("../models/recoup");
var Racking = require("../models/racking");
var ChillPick = require("../models/chill_pick");
var Rt = require("../models/rt");
var Runner = require("../models/runner");
var Training = require("../models/training");
var Union = require("../models/union");
var CounterBalance = require("../models/counterBalance");
var Vls = require("../models/vls");
var Sd = require("../models/sd");
var Pickmanager = require("../models/pickmanager");
var Scissor_liftmanager = require("../models/scissor_liftmanager");
var Truckmanager = require("../models/truckmanager");
var Office = require("../models/office");
var Colleague = require("../models/colleague");
var middleware = require("../middleware");
var moment = require("moment");
var pickMen = 0,
  scissor_liftMen = 0,
  loader = 0,
  truckDriver = 0,
  dekitMen = 1,
  counterBalanceMen = 1,
  banksmanMen = 1,
  rebadgeMen = 0,
  tipMen = 0;
var bCount = 0;
var pNeed = 0;
var lNeed = 0;
var tNeed = 0;
var tdNeed = 0;
var runner = 0;
var allocatedPicker = 0;
var allocatedDriver = 0;
var allocatedDekit = 0;
var allocatedCounterBalance = 0;
var allocatedTipper = 0;
var allocatedCsc = 0;
var allocatedRt = 0;
var allocatedRunner = 0;
var allocatedLoader = 0;
var allocatedScissor_lift = 0;
var allocatedChillPick = 0;
var allocatedBanksman = 0;
var minimumRate = 1;
var counterBalanceCount = 0;
var pickerCount = 0; //used**
var driverCount = 0; //used
var dekitCount = 0; //used
// var cscCount = 0; //used
// var rtCount = 0; //used
var tipCount = 0; //used
// var runnerCount = 0; //used
var loaderCount = 0; //used
// var scissor_liftrCount = 0;
// var chill_pickCount = 0;
var banksmanCount = 0;
//Get all allocatortablerow from DB //INDEX
router.get("/", middleware.isLoggedIn, function (req, res) {
  //Get all allocator, from DB //v15
  Allocator.find({}, function (err, tablerow) {
    if (err) {
      console.log(err);
    } else {
      res.render("allocator/allocator", {
        tablerow: tablerow,
      });
    }
  });
});
//INDEX OF ARCHIVED SHEETS
router.get("/archived", middleware.isLoggedIn, function (req, res) {
  //Get all allocator, from DB //v15
  Allocator.find({}, function (err, tablerow) {
    if (err) {
      console.log(err);
    } else {
      res.render("allocator/archived", {
        foundAllocation: tablerow,
      });
    }
  });
});
//NEW ROUTE
router.get("/allocations", middleware.isLoggedIn, function (req, res) {
  Allocator.find({}, function (err, foundAllocation) {
    if (err) {
      console.log(err);
    } else {
      res.render("allocator/allocations", {
        foundAllocation: foundAllocation,
      });
    }
  });
});
// New allocator Create Route
router.post("/", middleware.isAdmin, async function (req, res) {
  try {
    const { shift, time } = req.body.allocator;
    const formattedTime = moment(time).format("ddd DD MMM YYYY");

    // Update existing Allocators
    const allocators = await Allocator.find({ shift }).exec();
    allocators.forEach(async (allocator) => {
      if (allocator.time === time) {
        allocator.time = formattedTime;
        allocator.isAllocated = false;
      } else {
        // Resetting counts
        allocator.counterBalanceCount = 0;
        allocator.bCount = 0;
        allocator.pickerCount = 0;
        allocator.driverCount = 0;
        allocator.dekitCount = 0;
        allocator.tipCount = 0;
        allocator.loaderCount = 0;
        allocator.banksmanCount = 0;
        allocator.isAllocated = true;
      }
      await allocator.save();
    });

    // Update colleagues
    const colleagues = await Colleague.find({ shift }).exec();
    colleagues.forEach(async (colleague) => {
      colleague.allocatedLeader = false;
      colleague.isAllocated = false;
      await colleague.save();
    });

    // Create new Allocator
    const newAllocatorName = `${formattedTime} ${shift}`;
    const existingAllocator = await Allocator.findOne({ name: newAllocatorName }).exec();
    if (existingAllocator) {
      req.flash(
        "error",
        "There is a shift set up under this date already! Please edit the existing one or delete it first",
      );
      return res.redirect("back");
    }

    const newlyCreated = await Allocator.create({
      ...req.body.allocator,
      name: newAllocatorName,
      isAllocated: false,
    });
    await newlyCreated.save();

    req.flash(
      "success",
      "Sheet is ready to set up. Click Deployment > Deployment Sheets to find record.",
    );
    res.redirect("back");
  } catch (err) {
    console.error(err);
    req.flash("error", "An error occurred while processing your request.");
    res.redirect("back");
  }
});

// ALLOCATOR SHOW ROUTE
router.get("/allocations/allocationshow/:id", middleware.isLoggedIn, function (req, res) {
  //order!!!!!!!!of routes
  //find the allocator with prowided ID
  var jsHours = 0;
  Allocator.findById(req.params.id, function (err, foundAllocator) {
    if (err || !foundAllocator) {
      console.log(err);
      req.flash("error", "Deployment record has not found.");
      res.redirect("back");
    } else {
      Colleague.find(
        {},
        null,
        {
          sort: {
            firstName: 1,
          },
        },
        function (err, foundColleague) {
          if (err) {
            console.log(err);
          } else {
            Driver.find({}, function (err, foundDriver) {
              if (err || !foundDriver) {
                console.log(err);
              } else {
                allocatedDriver = 0;
                foundDriver.forEach(function (eachDriver) {
                  allocatedDriver++;
                });
                Picker.find({}, function (err, foundPicker) {
                  if (err) {
                    console.log(err);
                  } else {
                    allocatedPicker = 0;
                    foundPicker.forEach(function (eachPicker) {
                      allocatedPicker++;
                    });
                    Scissor_lift.find({}, function (err, foundScissor_lift) {
                      if (err) {
                        console.log(err);
                      } else {
                        Rt.find({}, function (err, foundRt) {
                          if (err) {
                            console.log(err);
                          } else {
                            Tipper.find({}, function (err, foundTipper) {
                              if (err) {
                                console.log(err);
                              } else {
                                allocatedTipper = 0;
                                foundTipper.forEach(function (eachTipper) {
                                  allocatedTipper++;
                                });
                                Runner.find({}, function (err, foundRunner) {
                                  if (err) {
                                    console.log(err);
                                  } else {
                                    Dekit.find({}, function (err, foundDekit) {
                                      if (err) {
                                        console.log(err);
                                      } else {
                                        allocatedDekit = 0;
                                        foundDekit.forEach(function (eachDekit) {
                                          allocatedDekit++;
                                        });
                                        ChillPick.find({}, function (err, foundChillPick) {
                                          if (err) {
                                            console.log(err);
                                          } else {
                                            Csc.find({}, function (err, foundCsc) {
                                              if (err) {
                                                console.log(err);
                                              } else {
                                                Hygiene.find({}, function (err, foundHygiene) {
                                                  if (err) {
                                                    console.log(err);
                                                  } else {
                                                    Banksman.find(
                                                      {},
                                                      function (err, foundBanksman) {
                                                        if (err) {
                                                          console.log(err);
                                                        } else {
                                                          allocatedBanksman = 0;
                                                          foundBanksman.forEach(
                                                            function (eachBanksman) {
                                                              allocatedBanksman++;
                                                            },
                                                          );
                                                          Loader.find(
                                                            {},
                                                            function (err, foundLoader) {
                                                              if (err) {
                                                                console.log(err);
                                                              } else {
                                                                allocatedLoader = 0;
                                                                foundLoader.forEach(
                                                                  function (eachLoader) {
                                                                    allocatedLoader++;
                                                                  },
                                                                );
                                                                CounterBalance.find(
                                                                  {},
                                                                  function (
                                                                    err,
                                                                    foundCounterBalance,
                                                                  ) {
                                                                    if (err) {
                                                                      console.log(err);
                                                                    } else {
                                                                      allocatedCounterBalance = 0;
                                                                      foundCounterBalance.forEach(
                                                                        function (
                                                                          eachCounterBalance,
                                                                        ) {
                                                                          allocatedCounterBalance++;
                                                                        },
                                                                      );
                                                                      Racking.find(
                                                                        {},
                                                                        function (
                                                                          err,
                                                                          foundRacking,
                                                                        ) {
                                                                          if (err) {
                                                                            console.log(err);
                                                                          } else {
                                                                            Recoup.find(
                                                                              {},
                                                                              function (
                                                                                err,
                                                                                foundRecoup,
                                                                              ) {
                                                                                if (err) {
                                                                                  console.log(err);
                                                                                } else {
                                                                                  Training.find(
                                                                                    {},
                                                                                    function (
                                                                                      err,
                                                                                      foundTraining,
                                                                                    ) {
                                                                                      if (err) {
                                                                                        console.log(
                                                                                          err,
                                                                                        );
                                                                                      } else {
                                                                                        Union.find(
                                                                                          {},
                                                                                          function (
                                                                                            err,
                                                                                            foundUnion,
                                                                                          ) {
                                                                                            if (
                                                                                              err
                                                                                            ) {
                                                                                              console.log(
                                                                                                err,
                                                                                              );
                                                                                            } else {
                                                                                              Vls.find(
                                                                                                {},
                                                                                                function (
                                                                                                  err,
                                                                                                  foundVls,
                                                                                                ) {
                                                                                                  if (
                                                                                                    err
                                                                                                  ) {
                                                                                                    console.log(
                                                                                                      err,
                                                                                                    );
                                                                                                  } else {
                                                                                                    Pickmanager.find(
                                                                                                      {},
                                                                                                      function (
                                                                                                        err,
                                                                                                        foundPickmanager,
                                                                                                      ) {
                                                                                                        if (
                                                                                                          err
                                                                                                        ) {
                                                                                                          console.log(
                                                                                                            err,
                                                                                                          );
                                                                                                        } else {
                                                                                                          Scissor_liftmanager.find(
                                                                                                            {},
                                                                                                            function (
                                                                                                              err,
                                                                                                              foundScissor_liftmanager,
                                                                                                            ) {
                                                                                                              if (
                                                                                                                err
                                                                                                              ) {
                                                                                                                console.log(
                                                                                                                  err,
                                                                                                                );
                                                                                                              } else {
                                                                                                                Truckmanager.find(
                                                                                                                  {},
                                                                                                                  function (
                                                                                                                    err,
                                                                                                                    foundTruckmanager,
                                                                                                                  ) {
                                                                                                                    if (
                                                                                                                      err
                                                                                                                    ) {
                                                                                                                      console.log(
                                                                                                                        err,
                                                                                                                      );
                                                                                                                    } else {
                                                                                                                      Office.find(
                                                                                                                        {},
                                                                                                                        function (
                                                                                                                          err,
                                                                                                                          foundOffice,
                                                                                                                        ) {
                                                                                                                          if (
                                                                                                                            err
                                                                                                                          ) {
                                                                                                                            console.log(
                                                                                                                              err,
                                                                                                                            );
                                                                                                                          } else {
                                                                                                                            Sd.find(
                                                                                                                              {},
                                                                                                                              function (
                                                                                                                                err,
                                                                                                                                foundSd,
                                                                                                                              ) {
                                                                                                                                if (
                                                                                                                                  err
                                                                                                                                ) {
                                                                                                                                  console.log(
                                                                                                                                    err,
                                                                                                                                  );
                                                                                                                                } else {
                                                                                                                                  //render show
                                                                                                                                  res.render(
                                                                                                                                    "allocator/allocationshow",
                                                                                                                                    {
                                                                                                                                      foundColleague:
                                                                                                                                        foundColleague,
                                                                                                                                      allocatorinfo:
                                                                                                                                        foundAllocator,
                                                                                                                                      foundDriver:
                                                                                                                                        foundDriver,
                                                                                                                                      foundPicker:
                                                                                                                                        foundPicker,
                                                                                                                                      foundScissor_lift:
                                                                                                                                        foundScissor_lift,
                                                                                                                                      foundRt:
                                                                                                                                        foundRt,
                                                                                                                                      foundTipper:
                                                                                                                                        foundTipper,
                                                                                                                                      foundRunner:
                                                                                                                                        foundRunner,
                                                                                                                                      foundDekit:
                                                                                                                                        foundDekit,
                                                                                                                                      foundChillPick:
                                                                                                                                        foundChillPick,
                                                                                                                                      foundCsc:
                                                                                                                                        foundCsc,
                                                                                                                                      foundHygiene:
                                                                                                                                        foundHygiene,
                                                                                                                                      foundBanksman:
                                                                                                                                        foundBanksman,
                                                                                                                                      foundLoader:
                                                                                                                                        foundLoader,
                                                                                                                                      foundCounterBalance:
                                                                                                                                        foundCounterBalance,
                                                                                                                                      foundRacking:
                                                                                                                                        foundRacking,
                                                                                                                                      foundRecoup:
                                                                                                                                        foundRecoup,
                                                                                                                                      foundTraining:
                                                                                                                                        foundTraining,
                                                                                                                                      foundUnion:
                                                                                                                                        foundUnion,
                                                                                                                                      foundVls:
                                                                                                                                        foundVls,
                                                                                                                                      foundPickmanager:
                                                                                                                                        foundPickmanager,
                                                                                                                                      foundScissor_liftmanager:
                                                                                                                                        foundScissor_liftmanager,
                                                                                                                                      foundTruckmanager:
                                                                                                                                        foundTruckmanager,
                                                                                                                                      foundOffice:
                                                                                                                                        foundOffice,
                                                                                                                                      foundSd:
                                                                                                                                        foundSd,
                                                                                                                                    },
                                                                                                                                  );
                                                                                                                                }
                                                                                                                              },
                                                                                                                            );
                                                                                                                          }
                                                                                                                        },
                                                                                                                      );
                                                                                                                    }
                                                                                                                  },
                                                                                                                );
                                                                                                              }
                                                                                                            },
                                                                                                          );
                                                                                                        }
                                                                                                      },
                                                                                                    );
                                                                                                  }
                                                                                                },
                                                                                              );
                                                                                            }
                                                                                          },
                                                                                        );
                                                                                      }
                                                                                    },
                                                                                  );
                                                                                }
                                                                              },
                                                                            );
                                                                          }
                                                                        },
                                                                      );
                                                                    }
                                                                  },
                                                                );
                                                              }
                                                            },
                                                          );
                                                        }
                                                      },
                                                    );
                                                  }
                                                });
                                              }
                                            });
                                          }
                                        });
                                      }
                                    });
                                  }
                                });
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        },
      );
    }
  });
});
//*****************
// DRIVERS ROUTES *
//*****************
// DRIVER SHOW ROUTE
router.get("/:id/drivershow", middleware.isLoggedIn, async function (req, res) {
  try {
    // Find the allocator with the provided ID and populate drivers
    const foundAllocator = await Allocator.findById(req.params.id).populate("drivers").exec();

    // Fetch colleagues and drivers sorted by firstName
    const [foundColleague, foundDriver] = await Promise.all([
      Colleague.find({}).sort({ firstName: 1 }).exec(),
      Driver.find({}).sort({ firstName: 1 }).exec(),
    ]);

    // Render the allocator/drivershow page with fetched data
    res.render("allocator/drivershow", {
      allocatorinfo: foundAllocator,
      foundDriver: foundDriver,
      foundColleague: foundColleague,
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong.");
    res.redirect("back");
  }
});

//DRIVER UPDATE ROUTE Working fully
router.post("/:id/drivershow", middleware.isAdmin, function (req, res) {
  Allocator.findById(req.params.id, function (err, foundAllocator) {
    if (err) {
      console.log(err);
    } else {
      Colleague.find(
        {
          fullName: req.body.driver,
        },
        function (err, foundColleague) {
          if (err) {
            console.log(err);
          } else if (!foundColleague.length) {
          } else {
            foundColleague[0].isAllocated = true;
            foundColleague[0].allocatedLeader = true;
            foundColleague[0].save();

            var text = req.body.driver;

            var author = {
              id: foundAllocator.id,
            };
            var colleagueId = foundColleague[0].id; //new
            //new
            var newDriver = {
              text: text,
              author: author,
              colleagueId: colleagueId, //new
            };
            Driver.create(newDriver, function (err, driver) {
              if (err) {
                console.log(err);
              } else {
                // foundAllocator.trucks.push(driver);
                driverCount++;

                foundAllocator.save();
              }
            });
          }
        },
      );
    }
  });
  res.redirect("back");
});
//*****************
// PICKERS ROUTES *
//*****************
// PICKER SHOW ROUTE
router.get("/:id/pickershow", middleware.isLoggedIn, async function (req, res) {
  try {
    // Find the allocator with the provided ID and populate pickers
    const foundAllocator = await Allocator.findById(req.params.id).populate("pickers").exec();

    // Fetch colleagues and pickers sorted by firstName for colleagues
    const [foundColleague, foundPicker] = await Promise.all([
      Colleague.find({}).sort({ firstName: 1 }).exec(),
      Picker.find({}).exec(), // Assuming no sorting needed for pickers, adjust if necessary
    ]);

    // Render the allocator/pickershow page with fetched data
    res.render("allocator/pickershow", {
      allocatorinfo: foundAllocator,
      foundPicker: foundPicker,
      foundColleague: foundColleague,
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong.");
    res.redirect("back");
  }
});

//PICKER UPDATE ROUTE Working fully
router.post("/:id/pickershow", middleware.isAdmin, function (req, res) {
  Allocator.findById(req.params.id, function (err, foundAllocator) {
    if (err) {
      console.log(err);
    } else {
      Colleague.find(
        {
          fullName: req.body.picker,
        },
        function (err, foundColleague) {
          if (err) {
            console.log(err);
          } else if (!foundColleague.length) {
            console.log("There is nobody added on shift trained for his task!");
          } else {
            foundColleague[0].allocatedLeader = true;
            foundColleague[0].isAllocated = true;
            foundColleague[0].save();

            var text = req.body.picker;

            var author = {
              id: foundAllocator.id,
            };
            var colleagueId = foundColleague[0].id; //new
            //new
            var newPicker = {
              text: text,
              author: author,
              colleagueId: colleagueId, //new
            };
            Picker.create(newPicker, function (err, picker) {
              if (err) {
                console.log(err);
              } else {
                // foundAllocator.pickers.push(picker);
                pickerCount++;
                foundAllocator.save();
              }
            });
          }
        },
      );
    }
  });
  res.redirect("back");
});
//*****************
// RECEIVING ROUTES *
//*****************
// TIPPER SHOW ROUTE
router.get("/:id/tippershow", middleware.isLoggedIn, async function (req, res) {
  try {
    // Find the allocator with the provided ID and populate tippers
    const foundAllocator = await Allocator.findById(req.params.id).populate("tippers").exec();

    // Fetch colleagues and tippers sorted by firstName for colleagues
    const [foundColleague, foundTipper] = await Promise.all([
      Colleague.find({}).sort({ firstName: 1 }).exec(),
      Tipper.find({}).exec(), // Assuming no sorting needed for tippers, adjust if necessary
    ]);

    // Render the allocator/tippershow page with fetched data
    res.render("allocator/tippershow", {
      allocatorinfo: foundAllocator,
      foundTipper: foundTipper,
      foundColleague: foundColleague,
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong.");
    res.redirect("back");
  }
});
router.get("/:id/tippershow", middleware.isLoggedIn, async function (req, res) {
  try {
    // Find the allocator with the provided ID and populate tippers
    const foundAllocator = await Allocator.findById(req.params.id).populate("tippers").exec();

    // Fetch colleagues and tippers sorted by firstName for colleagues
    const [foundColleague, foundTipper] = await Promise.all([
      Colleague.find({}).sort({ firstName: 1 }).exec(),
      Tipper.find({}).exec(),
    ]);

    // Render the allocator/tippershow page with fetched data
    res.render("allocator/tippershow", {
      allocatorinfo: foundAllocator,
      foundTipper: foundTipper,
      foundColleague: foundColleague,
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong.");
    res.redirect("back");
  }
});

//Receiving UPDATE ROUTE Working fully
router.post("/:id/tippershow", middleware.isAdmin, function (req, res) {
  Allocator.findById(req.params.id, function (err, foundAllocator) {
    if (err) {
      console.log(err);
    } else {
      Colleague.find(
        {
          fullName: req.body.tipper,
        },
        function (err, foundColleague) {
          if (err) {
            console.log(err);
          } else if (!foundColleague.length) {
            console.log("There is nobody added on shift trained for his task!");
          } else {
            foundColleague[0].isAllocated = true;
            foundColleague[0].allocatedLeader = true;
            foundColleague[0].save();

            var text = req.body.tipper;
            // console.log(text);
            var author = {
              id: foundAllocator.id,
            };
            var colleagueId = foundColleague[0].id; //new
            //new
            var newTipper = {
              text: text,
              author: author,
              colleagueId: colleagueId, //new
            };
            Tipper.create(newTipper, function (err, tipper) {
              if (err) {
                console.log(err);
              } else {
                // foundAllocator.tip.push(tipper);
                tipCount++;
                foundAllocator.save();
              }
            });
          }
        },
      );
    }
  });
  res.redirect("back");
});
//*****************
// COUNTER BALANCE ROUTES *
//*****************
// COUNTER BALANCE SHOW ROUTE
router.get("/:id/counterBalanceshow", middleware.isLoggedIn, async function (req, res) {
  try {
    // Find the allocator with the provided ID and populate counterBalances
    const foundAllocator = await Allocator.findById(req.params.id)
      .populate("counterBalances")
      .exec();

    // Fetch colleagues and counter balances sorted by firstName for colleagues
    const [foundColleague, foundCounterBalance] = await Promise.all([
      Colleague.find({}).sort({ firstName: 1 }).exec(),
      CounterBalance.find({}).exec(),
    ]);

    // Render the allocator/counterBalanceshow page with fetched data
    res.render("allocator/counterBalanceshow", {
      allocatorinfo: foundAllocator,
      foundCounterBalance: foundCounterBalance,
      foundColleague: foundColleague,
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong.");
    res.redirect("back");
  }
});

//COUNTER BALANCE UPDATE ROUTE Working fully
router.post("/:id/counterBalanceshow", middleware.isAdmin, function (req, res) {
  Allocator.findById(req.params.id, function (err, foundAllocator) {
    if (err) {
      console.log(err);
    } else {
      Colleague.find(
        {
          fullName: req.body.counterBalance,
        },
        function (err, foundColleague) {
          if (err) {
            console.log(err);
          } else if (!foundColleague.length) {
            console.log("There is nobody added on shift trained for his task!");
          } else {
            foundColleague[0].isAllocated = true;
            foundColleague[0].allocatedLeader = true;
            foundColleague[0].save();

            var text = req.body.counterBalance;
            // console.log(text);
            var author = {
              id: foundAllocator.id,
            };
            var colleagueId = foundColleague[0].id; //new
            //new
            var newCounterBalance = {
              text: text,
              author: author,
              colleagueId: colleagueId, //new
            };
            CounterBalance.create(newCounterBalance, function (err, counterBalance) {
              if (err) {
                console.log(err);
              } else {
                // foundAllocator.counterBalance.push(counterBalance);
                counterBalanceCount++;
                foundAllocator.save();
              }
            });
          }
        },
      );
    }
  });
  res.redirect("back");
});
//*****************
// DEKIT ROUTES *
//*****************
// DEKIT SHOW ROUTE
router.get("/:id/dekitshow", middleware.isLoggedIn, async function (req, res) {
  try {
    const foundAllocator = await Allocator.findById(req.params.id).populate("dekits").exec();
    const [foundColleague, foundDekit] = await Promise.all([
      Colleague.find({}).sort({ firstName: 1 }).exec(),
      Dekit.find({}).exec(),
    ]);

    res.render("allocator/dekitshow", {
      allocatorinfo: foundAllocator,
      foundDekit: foundDekit,
      foundColleague: foundColleague,
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong.");
    res.redirect("back");
  }
});

//DEKIT UPDATE ROUTE Working fully
router.post("/:id/dekitshow", middleware.isAdmin, function (req, res) {
  Allocator.findById(req.params.id, function (err, foundAllocator) {
    if (err) {
      console.log(err);
    } else {
      Colleague.find(
        {
          fullName: req.body.dekit,
        },
        function (err, foundColleague) {
          if (err) {
            console.log(err);
          } else if (!foundColleague.length) {
            console.log("There is nobody added on shift trained for his task!");
          } else {
            foundColleague[0].isAllocated = true;
            foundColleague[0].allocatedLeader = true;
            foundColleague[0].save();

            var text = req.body.dekit;
            // console.log(text);
            var author = {
              id: foundAllocator.id,
            };
            var colleagueId = foundColleague[0].id; //new
            //new
            var newDekit = {
              text: text,
              author: author,
              colleagueId: colleagueId, //new
            };
            Dekit.create(newDekit, function (err, dekit) {
              if (err) {
                console.log(err);
              } else {
                // foundAllocator.dekit.push(dekit);
                dekitCount++;
                foundAllocator.save();
              }
            });
          }
        },
      );
    }
  });
  res.redirect("back");
});
//*****************
// BALER ROUTES *
//*****************
// BALER SHOW ROUTE
router.get("/:id/banksmanshow", middleware.isLoggedIn, async function (req, res) {
  try {
    const foundAllocator = await Allocator.findById(req.params.id).populate("banksmans").exec();
    const [foundColleague, foundBanksman] = await Promise.all([
      Colleague.find({}).sort({ firstName: 1 }).exec(),
      Banksman.find({}).exec(),
    ]);

    res.render("allocator/banksmanshow", {
      allocatorinfo: foundAllocator,
      foundBanksman: foundBanksman,
      foundColleague: foundColleague,
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong.");
    res.redirect("back");
  }
});

//BALER UPDATE ROUTE Working fully
router.post("/:id/banksmanshow", middleware.isAdmin, function (req, res) {
  Allocator.findById(req.params.id, function (err, foundAllocator) {
    if (err) {
      console.log(err);
    } else {
      Colleague.find(
        {
          fullName: req.body.banksman,
        },
        function (err, foundColleague) {
          if (err) {
            console.log(err);
          } else if (!foundColleague.length) {
            console.log("There is nobody added on shift trained for his task!");
          } else {
            foundColleague[0].isAllocated = true;
            foundColleague[0].allocatedLeader = true;
            foundColleague[0].save();

            var text = req.body.banksman;
            // console.log(text);
            var author = {
              id: foundAllocator.id,
            };
            var colleagueId = foundColleague[0].id; //new
            //new
            var newBanksman = {
              text: text,
              author: author,
              colleagueId: colleagueId, //new
            };
            Banksman.create(newBanksman, function (err, banksman) {
              if (err) {
                console.log(err);
              } else {
                // foundAllocator.banksman.push(banksman);
                banksmanCount++;
                foundAllocator.save();
              }
            });
          }
        },
      );
    }
  });
  res.redirect("back");
});
//*****************
// LOADER ROUTES *
//*****************
// LOADER SHOW ROUTE
router.get("/:id/loadershow", middleware.isLoggedIn, async function (req, res) {
  try {
    const foundAllocator = await Allocator.findById(req.params.id).populate("loaders").exec();
    const [foundColleague, foundLoader] = await Promise.all([
      Colleague.find({}).sort({ firstName: 1 }).exec(),
      Loader.find({}).exec(),
    ]);

    res.render("allocator/loadershow", {
      allocatorinfo: foundAllocator,
      foundLoader: foundLoader,
      foundColleague: foundColleague,
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong.");
    res.redirect("back");
  }
});

//LOADER UPDATE ROUTE Working fully
router.post("/:id/loadershow", middleware.isAdmin, function (req, res) {
  Allocator.findById(req.params.id, function (err, foundAllocator) {
    if (err) {
      console.log(err);
    } else {
      Colleague.find(
        {
          fullName: req.body.loader,
        },
        function (err, foundColleague) {
          if (err) {
            console.log(err);
          } else if (!foundColleague.length) {
            console.log("There is nobody added on shift trained for his task!");
          } else {
            foundColleague[0].isAllocated = true;
            foundColleague[0].allocatedLeader = true;
            foundColleague[0].save();

            var text = req.body.loader;
            // console.log(text);
            var author = {
              id: foundAllocator.id,
            };
            var colleagueId = foundColleague[0].id; //new
            //new
            var newLoader = {
              text: text,
              author: author,
              colleagueId: colleagueId, //new
            };
            Loader.create(newLoader, function (err, loader) {
              if (err) {
                console.log(err);
              } else {
                // foundAllocator.loading.push(loader);
                loaderCount++;
                foundAllocator.save();
              }
            });
          }
        },
      );
    }
  });
  res.redirect("back");
});
//*****************
// TRAINING ROUTES *
//*****************
// TRAINING SHOW ROUTE
router.get("/:id/trainingshow", middleware.isLoggedIn, async function (req, res) {
  try {
    const foundAllocator = await Allocator.findById(req.params.id).populate("training").exec();
    const [foundColleague, foundTraining] = await Promise.all([
      Colleague.find({}).sort({ firstName: 1 }).exec(),
      Training.find({}).exec(),
    ]);

    res.render("allocator/trainingshow", {
      allocatorinfo: foundAllocator,
      foundTraining: foundTraining,
      foundColleague: foundColleague,
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong.");
    res.redirect("back");
  }
});

//TRAINING UPDATE ROUTE Working fully
router.post("/:id/trainingshow", middleware.isAdmin, function (req, res) {
  Allocator.findById(req.params.id, function (err, foundAllocator) {
    if (err) {
      console.log(err);
    } else {
      Colleague.find(
        {
          fullName: req.body.training,
        },
        function (err, foundColleague) {
          if (err) {
            console.log(err);
          } else if (!foundColleague.length) {
            console.log("There is nobody added on shift trained for his task!");
          } else {
            foundColleague[0].isAllocated = true;
            foundColleague[0].allocatedLeader = true;
            foundColleague[0].save();

            var text = req.body.training;
            // console.log(text);
            var author = {
              id: foundAllocator.id,
            };
            var colleagueId = foundColleague[0].id; //new
            //new
            var newTraining = {
              text: text,
              author: author,
              colleagueId: colleagueId, //new
            };
            Training.create(newTraining, function (err, training) {
              if (err) {
                console.log(err);
              } else {
                // foundAllocator.training.push(training);

                foundAllocator.save();
              }
            });
          }
        },
      );
    }
  });
  res.redirect("back");
});
// EDIT ROUTE
router.get("/:id/allocatorManualEdit", middleware.isLoggedIn, function (req, res) {
  Allocator.findById(req.params.id, function (err, foundAllocator) {
    if (err) {
      res.redirect("/allocator"); //nem nyultam hozza
    } else {
      res.render("allocator/allocatorManualEdit", {
        allocator: foundAllocator,
      });
    }
  });
}); //ez mashova kell
//UPDATE ROUTE (update as a PUT request) //ez csinalja meg a vegleges rutint
router.post("/:id", middleware.isAdmin, function (req, res) {
  var serviceHours = 8;
  var pickers = []; //used**
  var drivers = []; //used
  var dekitC = []; //used
  var banksmanC = []; //used
  var counterBalanceC = []; //used
  var tippers = []; // used
  var banksmans = [];
  // var cscC = []; // used
  // var rtC = []; //used
  // var runnerC = []; //used
  var loaders = []; // used
  // var scissor_lift = [];
  // var chill_pickC = [];

  Allocator.findById(req.params.id, function (err, foundAllocator) {
    if (err) {
      console.log(err);
      res.redirect("/allocationshow");
    } else if (foundAllocator.allocatedSheet == true) {
      req.flash(
        "error",
        "This sheet has been allocated already using automatic method. If you wish to change anything, please do it manually!",
      );
      res.redirect("back");
    } else {
      foundAllocator.allocatedSheet = true;
      foundAllocator.save();
      //get picker need
      if (foundAllocator.shift === "Nights") {
        serviceHours = 9;
      }
      // pickMen = foundAllocator.pickMen;
      //get loaders need
      loaderNeed = foundAllocator.loaderNeed;
      // get tipersNeed
      tipMen = foundAllocator.tipMen;

      // get truckdriverNeed
      truckDriver = foundAllocator.truckDriver;

      dekit = 1;
      banksman = 1;
      counterBalance = 1;
      //get colleagues in and allocate
      Colleague.find(
        {
          shift: foundAllocator.shift,
        },
        function (err, foundColleague) {
          if (err) {
            console.log(err);
          } else {
            // ***********
            // *  COUNTS *
            // ***********
            foundColleague.forEach(function (colleague) {
              colleague.attended = false;
              if (colleague.isIn && colleague.isIn == true && colleague.allocatedLeader == false) {
                colleague.isAllocated = false;
                bCount++;
              }
            });
            //COUNTER BALANCE Starts
            var minimumRate = 1;
            var randomCounterBalanceFrom = [];
            foundColleague.forEach(function (randomColleague) {
              if (
                randomColleague.isAllocated == false &&
                randomColleague.isIn == true &&
                randomColleague.counterBalance == true
              ) {
                var counterBalance = randomColleague.firstName + " " + randomColleague.lastName;
                randomCounterBalanceFrom.push(counterBalance);
              }
            });

            randomCounterBalanceFrom.forEach(function (colleague) {
              var randomColl = getRandomInt(randomCounterBalanceFrom.length);
              if (counterBalanceCount != counterBalanceMen) {
                var counterBalance = randomCounterBalanceFrom[randomColl];
                foundColleague.forEach(function (fcolleague) {
                  var finalColleagueName = fcolleague.firstName + " " + fcolleague.lastName;
                  if (counterBalance === finalColleagueName) {
                    fcolleague.isAllocated = true;
                    fcolleague.save();
                  }
                });
                counterBalanceCount++;
                counterBalanceC.push(counterBalance);
                randomCounterBalanceFrom.splice(randomColl, 1);
              }
            });
            console.log(counterBalanceC + "(Will be the counterBalance Colleague)");
            //counterBalance allocation
            counterBalanceC.forEach(function (foundCounterBalance) {
              var text = "";
              text = foundCounterBalance;

              var author = {
                id: foundAllocator.id,
              };
              var colleagueId = ""; //new
              foundColleague.forEach(function (colleague) {
                //new
                if (text === colleague.fullName) {
                  //new
                  colleagueId = colleague.id; //new
                  text = text; //new
                } //new
              }); //new
              var newCounterBalance = {
                text: text,
                author: author,
                colleagueId: colleagueId, //new
              };
              CounterBalance.create(newCounterBalance, function (err, counterBalance) {
                if (err) {
                  console.log(err);
                } else {
                  allocatedCounterBalance++;
                  // foundAllocator.counterBalance.push(counterBalance);
                  // foundAllocator.isAllocated = true; //kesobb!!!
                  foundAllocator.save();
                }
              });
            });
            if (allocatedCounterBalance < counterBalance) {
              counterBalanceC = [];
              minimumRate = getRandomInt(minimumRate - 1);
              foundColleague.forEach(function (colleague) {
                if (counterBalanceCount - counterBalance < 0) {
                  if (
                    colleague.isAllocated == false &&
                    colleague.isIn == true &&
                    colleague.counterBalance == true
                  ) {
                    if (colleague.rating[0].counterBalance >= minimumRate) {
                      var counterBalance = colleague.firstName + " " + colleague.lastName;
                      counterBalanceCount = counterBalance;
                      colleague.isAllocated = true;
                      colleague.save();
                      counterBalanceC.push(counterBalance);
                    }
                  }
                }
              });
              counterBalanceC.forEach(function (foundCounterBalance) {
                var text = "";
                text = foundCounterBalance;

                var author = {
                  id: foundAllocator.id,
                };
                var colleagueId = ""; //new
                foundColleague.forEach(function (colleague) {
                  //new
                  if (text === colleague.fullName) {
                    //new
                    colleagueId = colleague.id; //new
                    text = text; //new
                  } //new
                }); //new
                var newCounterBalance = {
                  text: text,
                  author: author,
                  colleagueId: colleagueId, //new
                };
                CounterBalance.create(newCounterBalance, function (err, counterBalance) {
                  if (err) {
                    console.log(err);
                  } else {
                    //save counterBalance
                    counterBalance.save();
                    allocatedCounterBalance++;
                    /// CounterBalance.find?? push counterBalance.id?
                    // foundAllocator.counterBalance.push(counterBalance);
                    foundAllocator.save();
                  }
                });
              });
            }
            // res.redirect("/allocationshow/" + req.params.id);
            // minimumRate = 1;
            bCount = bCount - counterBalance;

            // *******************
            //COUNTER BALANCE ALLOCATION ENDS*
            // *******************
            //DEKIT Starts
            var minimumRate = 1;
            var randomDekitFrom = [];
            foundColleague.forEach(function (randomColleague) {
              if (
                randomColleague.isAllocated == false &&
                randomColleague.isIn == true &&
                randomColleague.dekit == true
              ) {
                var dekit = randomColleague.firstName + " " + randomColleague.lastName;
                randomDekitFrom.push(dekit);
              }
            });

            randomDekitFrom.forEach(function (colleague) {
              var randomColl = getRandomInt(randomDekitFrom.length);
              if (dekitCount != dekitMen) {
                var dekit = randomDekitFrom[randomColl];
                foundColleague.forEach(function (fcolleague) {
                  var finalColleagueName = fcolleague.firstName + " " + fcolleague.lastName;
                  if (dekit === finalColleagueName) {
                    fcolleague.isAllocated = true;
                    fcolleague.save();
                  }
                });
                dekitCount++;
                dekitC.push(dekit);
                randomDekitFrom.splice(randomColl, 1);
              }
            });

            //dekit allocation
            dekitC.forEach(function (foundDekit) {
              var text = "";
              text = foundDekit;

              var author = {
                id: foundAllocator.id,
              };
              var colleagueId = ""; //new
              foundColleague.forEach(function (colleague) {
                //new
                if (text === colleague.fullName) {
                  //new
                  colleagueId = colleague.id; //new
                  text = text; //new
                } //new
              }); //new
              var newDekit = {
                text: text,
                author: author,
                colleagueId: colleagueId, //new
              };
              Dekit.create(newDekit, function (err, dekit) {
                if (err) {
                  console.log(err);
                } else {
                  allocatedDekit++;
                  // foundAllocator.dekit.push(dekit);
                  // foundAllocator.isAllocated = true; //kesobb!!!
                  foundAllocator.save();
                }
              });
            });
            if (allocatedDekit < dekit) {
              dekitC = [];
              minimumRate = getRandomInt(minimumRate - 1);
              foundColleague.forEach(function (colleague) {
                if (dekitCount - dekit < 0) {
                  if (
                    colleague.isAllocated == false &&
                    colleague.isIn == true &&
                    colleague.dekit == true
                  ) {
                    if (colleague.rating[0].dekit >= minimumRate) {
                      var dekit = colleague.firstName + " " + colleague.lastName;
                      dekitCount = dekit;
                      colleague.isAllocated = true;
                      colleague.save();
                      dekitC.push(dekit);
                    }
                  }
                }
              });
              dekitC.forEach(function (foundDekit) {
                var text = "";
                text = foundDekit;

                var author = {
                  id: foundAllocator.id,
                };
                var colleagueId = ""; //new
                foundColleague.forEach(function (colleague) {
                  //new
                  if (text === colleague.fullName) {
                    //new
                    colleagueId = colleague.id; //new
                    text = text; //new
                  } //new
                }); //new
                var newDekit = {
                  text: text,
                  author: author,
                  colleagueId: colleagueId, //new
                };
                Dekit.create(newDekit, function (err, dekit) {
                  if (err) {
                    console.log(err);
                  } else {
                    //save driver
                    dekit.save();
                    allocatedDekit++;
                    /// Driver.find?? push driver.id?
                    // foundAllocator.dekit.push(dekit);
                    foundAllocator.save();
                  }
                });
              });
            }
            // res.redirect("/allocationshow/" + req.params.id);
            // minimumRate = 1;
            bCount = bCount - dekit;

            // *******************
            //DEKIT ALLOCATION ENDS*
            // *******************
            //BALER Starts
            var minimumRate = 1;
            var randomBanksmanFrom = [];
            foundColleague.forEach(function (randomColleague) {
              if (
                randomColleague.isAllocated == false &&
                randomColleague.isIn == true &&
                randomColleague.banksman == true
              ) {
                var banksman = randomColleague.firstName + " " + randomColleague.lastName;
                randomBanksmanFrom.push(banksman);
              }
            });

            randomBanksmanFrom.forEach(function (colleague) {
              var randomColl = getRandomInt(randomBanksmanFrom.length);
              if (banksmanCount != banksmanMen) {
                var banksman = randomBanksmanFrom[randomColl];
                foundColleague.forEach(function (fcolleague) {
                  var finalColleagueName = fcolleague.firstName + " " + fcolleague.lastName;
                  if (banksman === finalColleagueName) {
                    fcolleague.isAllocated = true;
                    fcolleague.save();
                  }
                });
                banksmanCount++;
                banksmanC.push(banksman);
                randomBanksmanFrom.splice(randomColl, 1);
              }
            });

            //banksman allocation
            banksmanC.forEach(function (foundBanksman) {
              var text = "";
              text = foundBanksman;

              var author = {
                id: foundAllocator.id,
              };
              var colleagueId = ""; //new
              foundColleague.forEach(function (colleague) {
                //new
                if (text === colleague.fullName) {
                  //new
                  colleagueId = colleague.id; //new
                  text = text; //new
                } //new
              }); //new
              var newBanksman = {
                text: text,
                author: author,
                colleagueId: colleagueId, //new
              };
              Banksman.create(newBanksman, function (err, banksman) {
                if (err) {
                  console.log(err);
                } else {
                  allocatedBanksman++;
                  // foundAllocator.banksman.push(banksman);
                  // foundAllocator.isAllocated = true; //kesobb!!!
                  foundAllocator.save();
                }
              });
            });
            if (allocatedBanksman < banksman) {
              banksmanC = [];
              minimumRate = getRandomInt(minimumRate - 1);
              foundColleague.forEach(function (colleague) {
                if (banksmanCount - banksman < 0) {
                  if (
                    colleague.isAllocated == false &&
                    colleague.isIn == true &&
                    colleague.banksman == true
                  ) {
                    if (colleague.rating[0].banksman >= minimumRate) {
                      var banksman = colleague.firstName + " " + colleague.lastName;
                      banksmanCount = banksman;
                      colleague.isAllocated = true;
                      colleague.save();
                      banksmanC.push(banksman);
                    }
                  }
                }
              });
              banksmanC.forEach(function (foundBanksman) {
                var text = "";
                text = foundBanksman;

                var author = {
                  id: foundAllocator.id,
                };
                var colleagueId = ""; //new
                foundColleague.forEach(function (colleague) {
                  //new
                  if (text === colleague.fullName) {
                    //new
                    colleagueId = colleague.id; //new
                    text = text; //new
                  } //new
                }); //new
                var newBanksman = {
                  text: text,
                  author: author,
                  colleagueId: colleagueId, //new
                };
                Banksman.create(newBanksman, function (err, banksman) {
                  if (err) {
                    console.log(err);
                  } else {
                    //save driver
                    banksman.save();
                    allocatedBanksman++;
                    /// Banksman.find?? push driver.id?
                    // foundAllocator.banksman.push(banksman);
                    foundAllocator.save();
                  }
                });
              });
            }
            // res.redirect("/allocationshow/" + req.params.id);
            // minimumRate = 1;
            bCount = bCount - banksman;

            // *******************
            //BALER ALLOCATION ENDS*
            // *******************
            // **************************
            //RECEIVING ALLOCATION STARTS*
            // ***************************
            minimumRate = 1;
            var randomTippersFrom = [];
            foundColleague.forEach(function (randomColleague) {
              if (
                randomColleague.isAllocated == false &&
                randomColleague.isIn == true &&
                randomColleague.tip == true
              ) {
                var tipper = randomColleague.firstName + " " + randomColleague.lastName;
                randomTippersFrom.push(tipper);
              }
            });

            randomTippersFrom.forEach(function (colleague) {
              var randomColl = getRandomInt(randomTippersFrom.length);

              if (tipCount != tipMen) {
                var tipper = randomTippersFrom[randomColl];
                foundColleague.forEach(function (fcolleague) {
                  var finalColleagueName = fcolleague.firstName + " " + fcolleague.lastName;
                  if (tipper === finalColleagueName) {
                    fcolleague.isAllocated = true;
                    fcolleague.save();
                  }
                });
                tipCount++;
                tippers.push(tipper);
                randomTippersFrom.splice(randomColl, 1);
              }
            });

            //tipper allocation
            tippers.forEach(function (foundTipper) {
              var text = "";
              text = foundTipper;

              var author = {
                id: foundAllocator.id,
              };
              var colleagueId = ""; //new
              foundColleague.forEach(function (colleague) {
                //new
                if (text === colleague.fullName) {
                  //new
                  colleagueId = colleague.id; //new
                  text = text; //new
                } //new
              }); //new
              var newTipper = {
                text: text,
                author: author,
                colleagueId: colleagueId, //new
              };
              Tipper.create(newTipper, function (err, tipper) {
                if (err) {
                  console.log(err);
                } else {
                  allocatedTipper++;
                  // foundAllocator.tip.push(tipper);
                  // foundAllocator.isAllocated = true; //kesobb!!!
                  // foundAllocator.save();
                }
              });
            });
            if (allocatedTipper < tipMen) {
              tippers = [];
              minimumRate = 0;
              foundColleague.forEach(function (colleague) {
                if (tipCount - tipMen < 0) {
                  if (
                    colleague.isAllocated == false &&
                    colleague.isIn == true &&
                    colleague.tip == true
                  ) {
                    if (colleague.rating[0].tip >= minimumRate) {
                      var tipper = colleague.firstName + " " + colleague.lastName;
                      tipCount++;
                      colleague.isAllocated = true;
                      colleague.save();
                      tippers.push(tipper);
                    }
                  }
                }
              });
              tippers.forEach(function (foundTipper) {
                var text = "";
                text = foundTipper;

                var author = {
                  id: foundAllocator.id,
                };
                var colleagueId = ""; //new
                foundColleague.forEach(function (colleague) {
                  //new
                  if (text === colleague.fullName) {
                    //new
                    colleagueId = colleague.id; //new
                    text = text; //new
                  } //new
                }); //new
                var newTipper = {
                  text: text,
                  author: author,
                  colleagueId: colleagueId, //new
                };
                Tipper.create(newTipper, function (err, tipper) {
                  if (err) {
                    console.log(err);
                  } else {
                    //save tipper
                    tipper.save();
                    allocatedTipper++;
                    // foundAllocator.tip.push(tipper);
                    foundAllocator.save();
                  }
                });
              });
            }
            // res.redirect("/allocationshow/" + req.params.id);
            minimumRate = 1;
            bCount = bCount - tipMen;

            //**************************
            //RECEIVING ALLOCATION ENDS*
            //**************************
            //***************************
            // DRIVERS ALLOCATION STARTS*
            //***************************
            if (truckDriver >= driverCount) {
              console.log("Allocation done.");
            }
            minimumRate = 1;
            var randomDriversFrom = [];
            foundColleague.forEach(function (randomColleague) {
              if (
                randomColleague.isAllocated == false &&
                randomColleague.isIn == true &&
                randomColleague.trucks == true
              ) {
                var driver = randomColleague.firstName + " " + randomColleague.lastName;
                randomDriversFrom.push(driver);
              }
            });

            randomDriversFrom.forEach(function (colleague) {
              var randomColl = getRandomInt(randomDriversFrom.length);
              if (driverCount != truckDriver) {
                var driver = randomDriversFrom[randomColl];
                foundColleague.forEach(function (fcolleague) {
                  var finalColleagueName = fcolleague.firstName + " " + fcolleague.lastName;
                  if (driver === finalColleagueName) {
                    fcolleague.isAllocated = true;
                    fcolleague.save();
                  }
                });
                driverCount++;
                drivers.push(driver);
                randomDriversFrom.splice(randomColl, 1);
              }
            });

            //drivers allocation
            drivers.forEach(function (foundDriver) {
              var text = "";
              text = foundDriver;

              var author = {
                id: foundAllocator.id,
              };
              var colleagueId = ""; //new
              foundColleague.forEach(function (colleague) {
                //new
                if (text === colleague.fullName) {
                  //new
                  colleagueId = colleague.id; //new
                  text = text; //new
                } //new
              }); //new
              var newDriver = {
                text: text,
                author: author,
                colleagueId: colleagueId, //new
              };
              Driver.create(newDriver, function (err, driver) {
                if (err) {
                  console.log(err);
                } else {
                  //save driver
                  // driver.save();

                  allocatedDriver++;
                  // foundAllocator.trucks.push(driver);
                  // foundAllocator.isAllocated = true; //kesobb!!!
                  foundAllocator.save();
                }
              });
            });
            if (allocatedDriver < truckDriver) {
              drivers = [];
              minimumRate = 0;
              foundColleague.forEach(function (colleague) {
                if (driverCount - truckDriver < 0) {
                  if (
                    colleague.isAllocated == false &&
                    colleague.isIn == true &&
                    colleague.trucks == true
                  ) {
                    if (colleague.rating[0].trucks >= minimumRate) {
                      var driver = colleague.firstName + " " + colleague.lastName;
                      driverCount++;
                      colleague.isAllocated = true;
                      colleague.save();
                      drivers.push(driver);
                    }
                  }
                }
              });
              drivers.forEach(function (foundDriver) {
                var text = "";
                text = foundDriver;

                var author = {
                  id: foundAllocator.id,
                };
                var colleagueId = ""; //new
                foundColleague.forEach(function (colleague) {
                  //new
                  if (text === colleague.fullName) {
                    //new
                    colleagueId = colleague.id; //new
                    text = text; //new
                  } //new
                }); //new
                var newDriver = {
                  text: text,
                  author: author,
                  colleagueId: colleagueId, //new
                };
                Driver.create(newDriver, function (err, driver) {
                  if (err) {
                    console.log(err);
                  } else {
                    //save driver
                    driver.save();
                    allocatedDriver++;
                    /// Driver.find?? push driver.id?
                    // foundAllocator.trucks.push(driver);
                    foundAllocator.save();
                  }
                });
              });
            }
            // res.redirect("/allocationshow/" + req.params.id);
            minimumRate = 1;
            bCount = bCount - driverCount;
            //**************************************************************
            //                      DRIVERS ALLOCATION FINISHED            *
            //**************************************************************
            //***************************
            // LOADERS ALLOCATION STARTS*
            //***************************
            if (loaderNeed >= loaderCount) {
              console.log("Allocation done.");
            }
            minimumRate = 1;
            var randomLoadersFrom = [];
            foundColleague.forEach(function (randomColleague) {
              if (
                randomColleague.isAllocated == false &&
                randomColleague.isIn == true &&
                randomColleague.loading == true
              ) {
                var loader = randomColleague.firstName + " " + randomColleague.lastName;
                randomLoadersFrom.push(loader);
              }
            });

            randomLoadersFrom.forEach(function (colleague) {
              var randomColl = getRandomInt(randomLoadersFrom.length);
              if (loaderCount != loaderNeed) {
                var loader = randomLoadersFrom[randomColl];
                foundColleague.forEach(function (fcolleague) {
                  var finalColleagueName = fcolleague.firstName + " " + fcolleague.lastName;
                  if (loader === finalColleagueName) {
                    fcolleague.isAllocated = true;
                    fcolleague.save();
                  }
                });
                loaderCount++;
                loaders.push(loader);
                randomLoadersFrom.splice(randomColl, 1);
              }
            });

            //loaders allocation
            loaders.forEach(function (foundLoader) {
              var text = "";
              text = foundLoader;

              var author = {
                id: foundAllocator.id,
              };
              var colleagueId = ""; //new
              foundColleague.forEach(function (colleague) {
                //new
                if (text === colleague.fullName) {
                  //new
                  colleagueId = colleague.id; //new
                  text = text; //new
                } //new
              }); //new
              var newLoader = {
                text: text,
                author: author,
                colleagueId: colleagueId, //new
              };
              Loader.create(newLoader, function (err, loader) {
                if (err) {
                  console.log(err);
                } else {
                  //save loader
                  // loader.save();

                  allocatedLoader++;
                  // foundAllocator.loading.push(loader);
                  // foundAllocator.isAllocated = true; //kesobb!!!
                  foundAllocator.save();
                }
              });
            });
            if (allocatedLoader < loaderNeed) {
              loaders = [];
              minimumRate = 1;
              foundColleague.forEach(function (colleague) {
                if (loaderCount - loaderNeed < 0) {
                  if (
                    colleague.isAllocated == false &&
                    colleague.isIn == true &&
                    colleague.loading == true
                  ) {
                    if (colleague.rating[0].loading >= minimumRate) {
                      var loader = colleague.firstName + " " + colleague.lastName;
                      loaderCount++;
                      colleague.isAllocated = true;
                      colleague.save();
                      loaders.push(loader);
                    }
                  }
                }
              });
              loaders.forEach(function (foundLoader) {
                var text = "";
                text = foundLoader;

                var author = {
                  id: foundAllocator.id,
                };
                var colleagueId = ""; //new
                foundColleague.forEach(function (colleague) {
                  //new
                  if (text === colleague.fullName) {
                    //new
                    colleagueId = colleague.id; //new
                    text = text; //new
                  } //new
                }); //new
                var newLoader = {
                  text: text,
                  author: author,
                  colleagueId: colleagueId, //new
                };
                Loader.create(newLoader, function (err, loader) {
                  if (err) {
                    console.log(err);
                  } else {
                    //save loader
                    loader.save();
                    allocatedLoader++;
                    /// Loader.find?? push loader.id?
                    // foundAllocator.loading.push(loader);
                    foundAllocator.save();
                  }
                });
              });
            }
            // res.redirect("/allocationshow/" + req.params.id);
            minimumRate = 1;
            bCount = bCount - loaderCount;

            //**************************************************************
            //                      LOADERS ALLOCATION FINISHED            *
            //**************************************************************
            // PICKERS ALLOCATION STARTS*
            //***************************

            foundColleague.forEach(function (pickerek) {
              if (pickerek.isIn == true && pickerek.isAllocated == false) {
                // console.log(pickerek.isAllocated);
                // console.log(pickMen);
                pickMen++;
              }
            });
            // if (pickMen >= pickerCount) {
            //   console.log("Allocation done.");
            // }
            // minimumRate = 1;
            // foundColleague.forEach(function (colleague) {
            //   if (pickMen != 0) {
            //     if (
            //       colleague.isAllocated == false &&
            //       colleague.isIn == true &&
            //       colleague.pick == true
            //     ) {
            //       if (colleague.rating[0].pick >= minimumRate) {
            //         var picker = colleague.firstName + " " + colleague.lastName;
            //         pickerCount++;
            //         colleague.isAllocated = true;
            //         colleague.save();
            //         pickers.push(picker);
            //       }
            //     }
            //   }
            // });
            //pickers allocation
            // pickers.forEach(function (foundPicker) {
            //   var text = "";
            //   text = foundPicker;

            //   var author = {
            //     id: foundAllocator.id,
            //   };
            //   var colleagueId = ""; //new
            //   foundColleague.forEach(function (colleague) {
            //     //new
            //     if (text === colleague.fullName) {
            //       //new
            //       colleagueId = colleague.id; //new
            //       text = text; //new
            //     } //new
            //   }); //new
            //   var newPicker = {
            //     text: text,
            //     author: author,
            //     colleagueId: colleagueId, //new
            //   };
            //   Picker.create(newPicker, function (err, picker) {
            //     if (err) {
            //       console.log(err);
            //     } else {
            //       //save picker
            //       // picker.save();
            //       allocatedPicker++;
            //       // foundAllocator.pickers.push(picker);
            //       // foundAllocator.isAllocated = true; //kesobb!!!
            //       foundAllocator.save();
            //     }
            //   });
            // });

            pickers = [];
            minimumRate = 0;
            foundColleague.forEach(function (colleague) {
              if (
                colleague.isAllocated == false &&
                colleague.isIn == true &&
                colleague.pick == true
              ) {
                // if (colleague.rating[0].pick >= minimumRate) {
                var picker = colleague.firstName + " " + colleague.lastName;
                pickerCount++;
                colleague.isAllocated = true;
                colleague.save();
                pickers.push(picker);
                // }
              }
            });
            pickers.forEach(function (foundPicker) {
              var text = "";
              text = foundPicker;

              var author = {
                id: foundAllocator.id,
              };
              var colleagueId = ""; //new
              foundColleague.forEach(function (colleague) {
                //new
                if (text === colleague.fullName) {
                  //new
                  colleagueId = colleague.id; //new
                  text = text; //new
                } //new
              }); //new
              var newPicker = {
                text: text,
                author: author,
                colleagueId: colleagueId, //new
              };
              Picker.create(newPicker, function (err, picker) {
                if (err) {
                  console.log(err);
                } else {
                  //save picker
                  picker.save();
                  allocatedPicker++;
                  /// Picker.find?? push picker.id?
                  // foundAllocator.pickers.push(picker);
                  foundAllocator.save();
                }
              });
            });

            // res.redirect("/allocationshow/" + req.params.id);
            minimumRate = 1;
            bCount = bCount - allocatedPicker;
            // console.log(bCount + " is the body count remaining");

            //**************************************************************
            //                      PICKERS ALLOCATION FINISHED            *
            //**************************************************************

            res.redirect("back"); //lehet hogy + req.params.id nem kell!!!
          }
        },
      );
    }
  });
});
//
// DELETE ALLOCATOR ROUTE
router.delete("/:id", middleware.isAdmin, function (req, res) {
  //destroy allocator
  Allocator.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      console.log(err);
      res.redirect("/allocator/allocations");
    } else {
      res.redirect("/allocator/allocations");
    }
  });
  //redirect somewhere
});
//Driver DESTROY
router.delete("/:id/drivershow/:driver_id", middleware.isAdmin, function (req, res) {
  //fyndByIdAndRemove
  Colleague.find({}, function (err, foundColleague) {
    if (err) {
      console.log(err);
    } else {
      Driver.findByIdAndRemove(req.params.driver_id, function (err, deletedDriver) {
        if (err) {
          req.flash("error", "hasn't deleted...");
          res.redirect("back");
        } else {
          allocatedDriver--;
          foundColleague.forEach(function (colleague) {
            if (colleague.id === deletedDriver.colleagueId) {
              colleague.isAllocated = false;
              colleague.allocatedLeader = false;

              colleague.save();
            }
          });
          res.redirect("/allocator/" + req.params.id + "/drivershow");
        }
      });
    }
  });
});
//Picker DESTROY
router.delete("/:id/pickershow/:picker_id", middleware.isAdmin, function (req, res) {
  //fyndByIdAndRemove
  Colleague.find({}, function (err, foundColleague) {
    if (err) {
      console.log(err);
    } else {
      Picker.findByIdAndRemove(req.params.picker_id, function (err, deletedPicker) {
        if (err) {
          req.flash("error", "hasn't deleted...");
          res.redirect("back");
        } else {
          pickerCount--;
          foundColleague.forEach(function (colleague) {
            if (colleague.id === deletedPicker.colleagueId) {
              colleague.isAllocated = false;
              colleague.allocatedLeader = false;

              colleague.save();
            }
          });
          res.redirect("/allocator/" + req.params.id + "/pickershow");
        }
      });
    }
  });
});
//RECEIVING DESTROY
router.delete("/:id/tippershow/:tipper_id", middleware.isAdmin, function (req, res) {
  //fyndByIdAndRemove
  Colleague.find({}, function (err, foundColleague) {
    if (err) {
      console.log(err);
    } else {
      Tipper.findByIdAndRemove(req.params.tipper_id, function (err, deletedTipper) {
        if (err) {
          req.flash("error", "hasn't deleted...");
          res.redirect("back");
        } else {
          tipCount--;
          foundColleague.forEach(function (colleague) {
            if (colleague.id === deletedTipper.colleagueId) {
              colleague.isAllocated = false;
              colleague.allocatedLeader = false;

              colleague.save();
            }
          });
          res.redirect("/allocator/" + req.params.id + "/tippershow");
        }
      });
    }
  });
});
//Dekit DESTROY
router.delete("/:id/dekitshow/:dekit_id", middleware.isAdmin, function (req, res) {
  //fyndByIdAndRemove
  Colleague.find({}, function (err, foundColleague) {
    if (err) {
      console.log(err);
    } else {
      Dekit.findByIdAndRemove(req.params.dekit_id, function (err, deletedDekit) {
        if (err) {
          req.flash("error", "hasn't deleted...");
          res.redirect("back");
        } else {
          dekitCount--;
          foundColleague.forEach(function (colleague) {
            if (colleague.id === deletedDekit.colleagueId) {
              colleague.isAllocated = false;
              colleague.allocatedLeader = false;

              colleague.save();
            }
          });
          res.redirect("/allocator/" + req.params.id + "/dekitshow");
        }
      });
    }
  });
});
//Loader DESTROY
router.delete("/:id/loadershow/:loader_id", middleware.isAdmin, function (req, res) {
  //fyndByIdAndRemove
  Colleague.find({}, function (err, foundColleague) {
    if (err) {
      console.log(err);
    } else {
      Loader.findByIdAndRemove(req.params.loader_id, function (err, deletedLoader) {
        if (err) {
          req.flash("error", "hasn't deleted...");
          res.redirect("back");
        } else {
          loaderCount--;
          foundColleague.forEach(function (colleague) {
            if (colleague.id === deletedLoader.colleagueId) {
              colleague.isAllocated = false;
              colleague.allocatedLeader = false;

              colleague.save();
            }
          });
          res.redirect("/allocator/" + req.params.id + "/loadershow");
        }
      });
    }
  });
});
//Banksman DESTROY
router.delete("/:id/banksmanshow/:banksman_id", middleware.isAdmin, function (req, res) {
  //fyndByIdAndRemove
  Colleague.find({}, function (err, foundColleague) {
    if (err) {
      console.log(err);
    } else {
      Banksman.findByIdAndRemove(req.params.banksman_id, function (err, deletedBanksman) {
        if (err) {
          req.flash("error", "hasn't deleted...");
          res.redirect("back");
        } else {
          banksmanCount--;
          foundColleague.forEach(function (colleague) {
            if (colleague.id === deletedBanksman.colleagueId) {
              colleague.isAllocated = false;
              colleague.allocatedLeader = false;

              colleague.save();
            }
          });
          res.redirect("/allocator/" + req.params.id + "/banksmanshow");
        }
      });
    }
  });
});
//CounterBalance DESTROY
router.delete(
  "/:id/counterBalanceshow/:counterBalance_id",
  middleware.isAdmin,
  function (req, res) {
    //fyndByIdAndRemove
    Colleague.find({}, function (err, foundColleague) {
      if (err) {
        console.log(err);
      } else {
        CounterBalance.findByIdAndRemove(
          req.params.counterBalance_id,
          function (err, deletedCounterBalance) {
            if (err) {
              req.flash("error", "hasn't deleted...");
              res.redirect("back");
            } else {
              counterBalanceCount--;
              foundColleague.forEach(function (colleague) {
                if (colleague.id === deletedCounterBalance.colleagueId) {
                  colleague.isAllocated = false;
                  colleague.allocatedLeader = false;
                  colleague.save();
                }
              });
              res.redirect("/allocator/" + req.params.id + "/counterBalanceshow");
            }
          },
        );
      }
    });
  },
);
//Training DESTROY
router.delete("/:id/trainingshow/:training_id", middleware.isAdmin, function (req, res) {
  //fyndByIdAndRemove
  Colleague.find({}, function (err, foundColleague) {
    if (err) {
      console.log(err);
    } else {
      Training.findByIdAndRemove(req.params.training_id, function (err, deletedTraining) {
        if (err) {
          req.flash("error", "hasn't deleted...");
          res.redirect("back");
        } else {
          foundColleague.forEach(function (colleague) {
            if (colleague.id === deletedTraining.colleagueId) {
              colleague.isAllocated = false;
              colleague.allocatedLeader = false;
              colleague.save();
            }
          });
          res.redirect("/allocator/" + req.params.id + "/trainingshow");
        }
      });
    }
  });
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
module.exports = router;
