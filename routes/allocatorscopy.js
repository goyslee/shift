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
var pickMen = 0,
  scissor_liftMen = 0,
  loader = 0,
  truckDriver = 0,
  dekitMen = 1,
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
var allocatedTipper = 0;
var allocatedCsc = 0;
var allocatedRt = 0;
var allocatedRunner = 0;
var allocatedLoader = 0;
var allocatedScissor_lift = 0;
var allocatedChillPick = 0;
var minimumRate = 1;
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
router.post("/", middleware.isAdmin, function (req, res) {
  //Create a new Allocator and save it to the database  (DB)
  Allocator.find({}, function (err, foundAllocator) {
    // ez veglegesiti az elozo shift setupot
    foundAllocator.forEach(function (allocator) {
      allocator.isAllocated = true;
      allocator.save();
    });
  });
  Colleague.find({}, function (err, foundColleague) {
    foundColleague.forEach(function (colleague) {
      colleague.allocatedLeader = false;
      colleague.isAllocated = false;
      colleague.save();
    });
  });
  Allocator.create(req.body.allocator, function (err, newlyCreated) {
    if (err) {
      if (err.code === 11000 || err.code === 11001) {
        Allocator.findOne()
          .sort({
            field: "asc",
            _id: -1,
          })
          .limit(1)
          .exec(function (err, foundAllocation) {
            if (err) {
              console.log(err);
            } else {
              foundAllocation.isAllocated = false;
              foundAllocation.save();
            }
          });
        req.flash(
          "error",
          "There is a shift set up under this date already! PLease edit the existing one or delete it first"
        );
        res.redirect("back");
      }
      console.log(err);
      res.render("allocator/allocator");
    } else {
      Allocator.find({}, function (err, foundAllocation) {
        if (err) {
          console.log(err);
        } else {
          req.flash(
            "success",
            "Sheet is ready to set up. Click Allocator > Job Sheets to find record."
          );
          res.redirect("back");
        }
      });
    }
  });
});
// ALLOCATOR SHOW ROUTE
router.get("/allocations/allocationshow/:id", middleware.isLoggedIn, function (
  req,
  res
) {
  //order!!!!!!!!of routes
  //find the allocator with prowided ID
  var jsHours = 0;
  Allocator.findById(req.params.id, function (err, foundAllocator) {
    if (err || !foundAllocator) {
      console.log(err);
      req.flash("error", "Allocator record has not found.");
      res.redirect("back");
    } else {
      Colleague.find({}, function (err, foundColleague) {
        if (err) {
          console.log(err);
        } else {
          Driver.find({}, function (err, foundDriver) {
            if (err || !foundDriver) {
              console.log(err);
            } else {
              Picker.find({}, function (err, foundPicker) {
                if (err) {
                  console.log(err);
                } else {
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
                              Runner.find({}, function (err, foundRunner) {
                                if (err) {
                                  console.log(err);
                                } else {
                                  Dekit.find({}, function (err, foundDekit) {
                                    if (err) {
                                      console.log(err);
                                    } else {
                                      ChillPick.find({}, function (
                                        err,
                                        foundChillPick
                                      ) {
                                        if (err) {
                                          console.log(err);
                                        } else {
                                          Csc.find({}, function (
                                            err,
                                            foundCsc
                                          ) {
                                            if (err) {
                                              console.log(err);
                                            } else {
                                              Hygiene.find({}, function (
                                                err,
                                                foundHygiene
                                              ) {
                                                if (err) {
                                                  console.log(err);
                                                } else {
                                                  Banksman.find({}, function (
                                                    err,
                                                    foundBanksman
                                                  ) {
                                                    if (err) {
                                                      console.log(err);
                                                    } else {
                                                      Loader.find({}, function (
                                                        err,
                                                        foundLoader
                                                      ) {
                                                        if (err) {
                                                          console.log(err);
                                                        } else {
                                                          CounterBalance.find(
                                                            {},
                                                            function (
                                                              err,
                                                              foundCounterBalance
                                                            ) {
                                                              if (err) {
                                                                console.log(
                                                                  err
                                                                );
                                                              } else {
                                                                Racking.find(
                                                                  {},
                                                                  function (
                                                                    err,
                                                                    foundRacking
                                                                  ) {
                                                                    if (err) {
                                                                      console.log(
                                                                        err
                                                                      );
                                                                    } else {
                                                                      Recoup.find(
                                                                        {},
                                                                        function (
                                                                          err,
                                                                          foundRecoup
                                                                        ) {
                                                                          if (
                                                                            err
                                                                          ) {
                                                                            console.log(
                                                                              err
                                                                            );
                                                                          } else {
                                                                            Training.find(
                                                                              {},
                                                                              function (
                                                                                err,
                                                                                foundTraining
                                                                              ) {
                                                                                if (
                                                                                  err
                                                                                ) {
                                                                                  console.log(
                                                                                    err
                                                                                  );
                                                                                } else {
                                                                                  Union.find(
                                                                                    {},
                                                                                    function (
                                                                                      err,
                                                                                      foundUnion
                                                                                    ) {
                                                                                      if (
                                                                                        err
                                                                                      ) {
                                                                                        console.log(
                                                                                          err
                                                                                        );
                                                                                      } else {
                                                                                        Vls.find(
                                                                                          {},
                                                                                          function (
                                                                                            err,
                                                                                            foundVls
                                                                                          ) {
                                                                                            if (
                                                                                              err
                                                                                            ) {
                                                                                              console.log(
                                                                                                err
                                                                                              );
                                                                                            } else {
                                                                                              Pickmanager.find(
                                                                                                {},
                                                                                                function (
                                                                                                  err,
                                                                                                  foundPickmanager
                                                                                                ) {
                                                                                                  if (
                                                                                                    err
                                                                                                  ) {
                                                                                                    console.log(
                                                                                                      err
                                                                                                    );
                                                                                                  } else {
                                                                                                    Scissor_liftmanager.find(
                                                                                                      {},
                                                                                                      function (
                                                                                                        err,
                                                                                                        foundScissor_liftmanager
                                                                                                      ) {
                                                                                                        if (
                                                                                                          err
                                                                                                        ) {
                                                                                                          console.log(
                                                                                                            err
                                                                                                          );
                                                                                                        } else {
                                                                                                          Truckmanager.find(
                                                                                                            {},
                                                                                                            function (
                                                                                                              err,
                                                                                                              foundTruckmanager
                                                                                                            ) {
                                                                                                              if (
                                                                                                                err
                                                                                                              ) {
                                                                                                                console.log(
                                                                                                                  err
                                                                                                                );
                                                                                                              } else {
                                                                                                                Office.find(
                                                                                                                  {},
                                                                                                                  function (
                                                                                                                    err,
                                                                                                                    foundOffice
                                                                                                                  ) {
                                                                                                                    if (
                                                                                                                      err
                                                                                                                    ) {
                                                                                                                      console.log(
                                                                                                                        err
                                                                                                                      );
                                                                                                                    } else {
                                                                                                                      Sd.find(
                                                                                                                        {},
                                                                                                                        function (
                                                                                                                          err,
                                                                                                                          foundSd
                                                                                                                        ) {
                                                                                                                          if (
                                                                                                                            err
                                                                                                                          ) {
                                                                                                                            console.log(
                                                                                                                              err
                                                                                                                            );
                                                                                                                          } else {
                                                                                                                            //render show
                                                                                                                            res.render(
                                                                                                                              "allocator/allocationshow",
                                                                                                                              {
                                                                                                                                foundColleague: foundColleague,
                                                                                                                                allocatorinfo: foundAllocator,
                                                                                                                                foundDriver: foundDriver,
                                                                                                                                foundPicker: foundPicker,
                                                                                                                                foundScissor_lift: foundScissor_lift,
                                                                                                                                foundRt: foundRt,
                                                                                                                                foundTipper: foundTipper,
                                                                                                                                foundRunner: foundRunner,
                                                                                                                                foundDekit: foundDekit,
                                                                                                                                foundChillPick: foundChillPick,
                                                                                                                                foundCsc: foundCsc,
                                                                                                                                foundHygiene: foundHygiene,
                                                                                                                                foundBanksman: foundBanksman,
                                                                                                                                foundLoader: foundLoader,
                                                                                                                                foundCounterBalance: foundCounterBalance,
                                                                                                                                foundRacking: foundRacking,
                                                                                                                                foundRecoup: foundRecoup,
                                                                                                                                foundTraining: foundTraining,
                                                                                                                                foundUnion: foundUnion,
                                                                                                                                foundVls: foundVls,
                                                                                                                                foundPickmanager: foundPickmanager,
                                                                                                                                foundScissor_liftmanager: foundScissor_liftmanager,
                                                                                                                                foundTruckmanager: foundTruckmanager,
                                                                                                                                foundOffice: foundOffice,
                                                                                                                                foundSd: foundSd,
                                                                                                                              }
                                                                                                                            );
                                                                                                                          }
                                                                                                                        }
                                                                                                                      );
                                                                                                                    }
                                                                                                                  }
                                                                                                                );
                                                                                                              }
                                                                                                            }
                                                                                                          );
                                                                                                        }
                                                                                                      }
                                                                                                    );
                                                                                                  }
                                                                                                }
                                                                                              );
                                                                                            }
                                                                                          }
                                                                                        );
                                                                                      }
                                                                                    }
                                                                                  );
                                                                                }
                                                                              }
                                                                            );
                                                                          }
                                                                        }
                                                                      );
                                                                    }
                                                                  }
                                                                );
                                                              }
                                                            }
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
              });
            }
          });
        }
      });
    }
  });
});
//*****************
// DRIVERS ROUTES *
//*****************
// DRIVER SHOW ROUTE
router.get("/:id/drivershow", middleware.isLoggedIn, function (req, res) {
  //order!!!!!!!!of routes
  //find the allocator with prowided ID
  Allocator.findById(req.params.id)
    .populate("drivers")
    .exec(function (err, foundAllocator) {
      if (err) {
        console.log(err);
        req.flash("error", "Something Went wrong.");
        res.redirect("back");
      } else {
        Colleague.find({}, function (err, foundColleague) {
          if (err) {
            console.log(err);
          } else {
            Driver.find({}, function (err, foundDriver) {
              if (err || !foundDriver) {
                console.log(err);
              } else {
                //render show
                res.render("allocator/drivershow", {
                  allocatorinfo: foundAllocator,
                  foundDriver: foundDriver,
                  foundColleague: foundColleague,
                });
              }
            });
          }
        });
      }
    });
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
          console.log(foundColleague);
          if (err) {
            console.log(err);
          } else if (!foundColleague.length) {
            console.log("There is nobody added on shift trained for his task!");
          } else {
            foundColleague[0].isAllocated = true;
            foundColleague[0].allocatedLeader = true;
            foundColleague[0].save();
            console.log(foundColleague.isAllocated);
            console.log(foundColleague[0].id);
            console.log(req.body);
            var text = req.body.driver;
            // console.log(text);
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
                console.log(driver);
                foundAllocator.trucks.push(driver);
                // foundAllocator.isAllocated = true; //kesobb!!!
                foundAllocator.save();
              }
            });
          }
        }
      );
    }
  });
  res.redirect("back");
});
//*****************
// PICKERS ROUTES *
//*****************
// PICKER SHOW ROUTE
router.get("/:id/pickershow", middleware.isLoggedIn, function (req, res) {
  //order!!!!!!!!of routes
  //find the allocator with prowided ID
  Allocator.findById(req.params.id)
    .populate("pickers")
    .exec(function (err, foundAllocator) {
      if (err) {
        console.log(err);
        req.flash("error", "Something Went wrong.");
        res.redirect("back");
      } else {
        Colleague.find({}, function (err, foundColleague) {
          if (err) {
            console.log(err);
          } else {
            Picker.find({}, function (err, foundPicker) {
              if (err || !foundPicker) {
                console.log(err);
              } else {
                //render show
                res.render("allocator/pickershow", {
                  allocatorinfo: foundAllocator,
                  foundPicker: foundPicker,
                  foundColleague: foundColleague,
                });
              }
            });
          }
        });
      }
    });
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
            console.log(foundColleague[0].isAllocated);
            console.log(foundColleague[0].id);
            console.log(req.body);
            var text = req.body.picker;
            // console.log(text);
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
                console.log(picker);
                foundAllocator.pickers.push(picker);
                foundAllocator.save();
              }
            });
          }
        }
      );
    }
  });
  res.redirect("back");
});
//*****************
// RECEIVING ROUTES *
//*****************
// TIPPER SHOW ROUTE
router.get("/:id/tippershow", middleware.isLoggedIn, function (req, res) {
  //order!!!!!!!!of routes
  //find the allocator with prowided ID
  Allocator.findById(req.params.id)
    .populate("tippers")
    .exec(function (err, foundAllocator) {
      if (err) {
        console.log(err);
        req.flash("error", "Something Went wrong.");
        res.redirect("back");
      } else {
        Colleague.find({}, function (err, foundColleague) {
          if (err) {
            console.log(err);
          } else {
            Tipper.find({}, function (err, foundTipper) {
              if (err || !foundTipper) {
                console.log(err);
              } else {
                //render show
                res.render("allocator/tippershow", {
                  allocatorinfo: foundAllocator,
                  foundTipper: foundTipper,
                  foundColleague: foundColleague,
                });
              }
            });
          }
        });
      }
    });
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
            console.log(foundColleague.isAllocated);
            console.log(foundColleague[0].id);
            console.log(req.body);
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
                console.log(tipper);
                foundAllocator.tip.push(tipper);
                // foundAllocator.isAllocated = true; //kesobb!!!
                foundAllocator.save();
              }
            });
          }
        }
      );
    }
  });
  res.redirect("back");
});
//*****************
// DEKIT ROUTES *
//*****************
// DEKIT SHOW ROUTE
router.get("/:id/dekitshow", middleware.isLoggedIn, function (req, res) {
  //order!!!!!!!!of routes
  //find the allocator with prowided ID
  Allocator.findById(req.params.id)
    .populate("dekits")
    .exec(function (err, foundAllocator) {
      if (err) {
        console.log(err);
        req.flash("error", "Something Went wrong.");
        res.redirect("back");
      } else {
        Colleague.find({}, function (err, foundColleague) {
          if (err) {
            console.log(err);
          } else {
            Dekit.find({}, function (err, foundDekit) {
              if (err || !foundDekit) {
                console.log(err);
              } else {
                //render show
                res.render("allocator/dekitshow", {
                  allocatorinfo: foundAllocator,
                  foundDekit: foundDekit,
                  foundColleague: foundColleague,
                });
              }
            });
          }
        });
      }
    });
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
            console.log(foundColleague.isAllocated);
            console.log(foundColleague[0].id);
            console.log(req.body);
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
                console.log(dekit);
                foundAllocator.dekit.push(dekit);
                // foundAllocator.isAllocated = true; //kesobb!!!
                foundAllocator.save();
              }
            });
          }
        }
      );
    }
  });
  res.redirect("back");
});
//*****************
// LOADER ROUTES *
//*****************
// LOADER SHOW ROUTE
router.get("/:id/loadershow", middleware.isLoggedIn, function (req, res) {
  //order!!!!!!!!of routes
  //find the allocator with prowided ID
  Allocator.findById(req.params.id)
    .populate("loaders")
    .exec(function (err, foundAllocator) {
      if (err) {
        console.log(err);
        req.flash("error", "Something Went wrong.");
        res.redirect("back");
      } else {
        Colleague.find({}, function (err, foundColleague) {
          if (err) {
            console.log(err);
          } else {
            Loader.find({}, function (err, foundLoader) {
              if (err || !foundLoader) {
                console.log(err);
              } else {
                //render show
                res.render("allocator/loadershow", {
                  allocatorinfo: foundAllocator,
                  foundLoader: foundLoader,
                  foundColleague: foundColleague,
                });
              }
            });
          }
        });
      }
    });
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
            console.log(foundColleague.isAllocated);
            console.log(foundColleague[0].id);
            console.log(req.body);
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
                console.log(loader);
                foundAllocator.loading.push(loader);
                // foundAllocator.isAllocated = true; //kesobb!!!
                foundAllocator.save();
              }
            });
          }
        }
      );
    }
  });
  res.redirect("back");
});
//*****************
// TRAINING ROUTES *
//*****************
// TRAINING SHOW ROUTE
router.get("/:id/trainingshow", middleware.isLoggedIn, function (req, res) {
  //order!!!!!!!!of routes
  //find the allocator with prowided ID
  Allocator.findById(req.params.id)
    .populate("training")
    .exec(function (err, foundAllocator) {
      if (err) {
        console.log(err);
        req.flash("error", "Something Went wrong.");
        res.redirect("back");
      } else {
        Colleague.find({}, function (err, foundColleague) {
          if (err) {
            console.log(err);
          } else {
            Training.find({}, function (err, foundTraining) {
              if (err || !foundTraining) {
                console.log(err);
              } else {
                //render show
                res.render("allocator/trainingshow", {
                  allocatorinfo: foundAllocator,
                  foundTraining: foundTraining,
                  foundColleague: foundColleague,
                });
              }
            });
          }
        });
      }
    });
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
            console.log(foundColleague.isAllocated);
            console.log(foundColleague[0].id);
            console.log(req.body);
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
                console.log(training);
                foundAllocator.training.push(training);
                // foundAllocator.isAllocated = true; //kesobb!!!
                foundAllocator.save();
              }
            });
          }
        }
      );
    }
  });
  res.redirect("back");
});
// EDIT ROUTE
router.get("/:id/allocatorManualEdit", middleware.isLoggedIn, function (
  req,
  res
) {
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
  var pickers = []; //used**
  var drivers = []; //used
  var dekitC = []; //used
  var tippers = []; // used
  // var cscC = []; // used
  // var rtC = []; //used
  // var runnerC = []; //used
  var loaders = []; // used
  // var scissor_lift = [];
  // var chill_pickC = [];
  var bCount = 0;
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
  Allocator.findById(req.params.id, function (err, foundAllocator) {
    if (err) {
      console.log(err);
      res.redirect("/allocationshow");
    } else if (foundAllocator.allocatedSheet == true) {
      req.flash(
        "error",
        "This sheet has been allocated already using automatic method. If you wish to change anything, please do it manually!"
      );
      res.redirect("back");
    } else {
      foundAllocator.allocatedSheet = true;
      foundAllocator.save();
      //get picker need
      pNeed = foundAllocator.pickTarget / 150 / 9;
      pickMen = Math.round(pNeed);
      // get chutmensneed
      // scissor_liftMen = pickMen * 2 + 1;
      // get loaders need
      lNeed = foundAllocator.loadTarget / 4;
      loaderNeed = Math.round(lNeed);
      // get tipersNeed
      tNeed = foundAllocator.tipTarget / 24 / 9;
      tipMen = Math.round(tNeed / 9);
      if (tipMen <= 1) {
        tipMen = 2;
      }
      // get truckdriverNeed
      tdNeed = foundAllocator.tipTarget / 24;
      replenDriver = Math.round(foundAllocator.pickTarget / 120 / 25);
      truckDriver = Math.round(tdNeed) + replenDriver;
      console.log(truckDriver + " driver needed.");
      dekit = 1;
      //get colleagues in and allocate
      Colleague.find({}, function (err, foundColleague) {
        if (err) {
          console.log(err);
        } else {
          // ***********
          // *  COUNTS *
          // ***********
          foundColleague.forEach(function (colleague) {
            colleague.attended = false;
            if (
              colleague.isIn &&
              colleague.isIn == true &&
              colleague.allocatedLeader == false
            ) {
              colleague.isAllocated = false;
              bCount++;
            }
          });
          var minimumRate = 1;
          foundColleague.forEach(function (colleague) {
            if (dekitCount != dekit) {
              if (
                colleague.isAllocated == false &&
                colleague.isIn == true &&
                colleague.dekit == true
              ) {
                if (colleague.rating[0].dekit >= minimumRate) {
                  var dekitColleague =
                    colleague.firstName + " " + colleague.lastName;
                  dekitCount++;
                  colleague.isAllocated = true;
                  colleague.save();
                  dekitC.push(dekitColleague);
                }
              }
            }
          });
          console.log(dekitC + "(Will be the dekit Colleague)");
          //dekit allocation
          dekitC.forEach(function (foundDekit) {
            var text = "";
            text = foundDekit;
            console.log(text);
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
                console.log(dekit);
                allocatedDekit++;
                foundAllocator.dekit.push(dekit);
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
              console.log(text);
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
                  foundAllocator.dekit.push(dekit);
                  foundAllocator.save();
                }
              });
            });
          }
          // res.redirect("/allocationshow/" + req.params.id);
          // minimumRate = 1;
          bCount = bCount - dekit;
          console.log(dekit + " Dekit colleague has been allocated!");
          console.log(bCount + " Colleagues remainig for allocation");
          // *******************
          //DEKIT ALLOCATION ENDS*
          // *******************
          // *************************
          //RECEIVING ALLOCATION ENDS*
          // *************************
          minimumRate = 1;
          foundColleague.forEach(function (colleague) {
            if (tipCount != tipMen) {
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
          console.log(tippers + "(Will be tipping.)");
          //tipper allocation
          tippers.forEach(function (foundTipper) {
            var text = "";
            text = foundTipper;
            console.log(text);
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
                console.log(tipper);
                allocatedTipper++;
                foundAllocator.tip.push(tipper);
                // foundAllocator.isAllocated = true; //kesobb!!!
                foundAllocator.save();
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
              console.log(text);
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
                  foundAllocator.tip.push(tipper);
                  foundAllocator.save();
                }
              });
            });
          }
          // res.redirect("/allocationshow/" + req.params.id);
          minimumRate = 1;
          bCount = bCount - tipMen;
          console.log(bCount + " colleagues remaining");
          console.log(tipMen + " Tippers colleagues have been allocated!");
          //************************
          //TIPPERS ALLOCATION ENDS*
          //************************
          //***************************
          // DRIVERS ALLOCATION STARTS*
          //***************************
          if (truckDriver >= driverCount) {
            console.log("Allocation done.");
          }
          minimumRate = 1;
          foundColleague.forEach(function (colleague) {
            if (driverCount != truckDriver) {
              if (
                colleague.isAllocated == false &&
                colleague.isIn == true &&
                colleague.trucks == true
              ) {
                if (colleague.rating[0].trucks >= minimumRate) {
                  var driver = colleague.firstName + " " + colleague.lastName;
                  driverCount++;
                  console.log(driverCount);
                  colleague.isAllocated = true;
                  colleague.save();
                  drivers.push(driver);
                }
              }
            }
          });
          console.log(drivers);
          //drivers allocation
          drivers.forEach(function (foundDriver) {
            var text = "";
            text = foundDriver;
            console.log(text);
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
                console.log(driver);
                allocatedDriver++;
                foundAllocator.trucks.push(driver);
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
              console.log(text);
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
                  foundAllocator.trucks.push(driver);
                  foundAllocator.save();
                }
              });
            });
          }
          // res.redirect("/allocationshow/" + req.params.id);
          minimumRate = 1;
          bCount = bCount - driverCount;
          console.log(truckDriver + " Drivers has been allocated!");
          console.log(bCount + " Colleagues remaining for allocation");
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
          foundColleague.forEach(function (colleague) {
            if (loaderCount != loaderNeed) {
              if (
                colleague.isAllocated == false &&
                colleague.isIn == true &&
                colleague.loading == true &&
                colleague.rating[0].loading >= minimumRate
              ) {
                var loader = colleague.firstName + " " + colleague.lastName;
                colleague.isAllocated = true;
                colleague.save();
                loaders.push(loader);
                loaderCount++;
              }
            }
          });
          console.log(loaders);
          //loaders allocation
          loaders.forEach(function (foundLoader) {
            var text = "";
            text = foundLoader;
            console.log(text);
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
                console.log(loader);
                allocatedLoader++;
                foundAllocator.loading.push(loader);
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
              console.log(text);
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
                  foundAllocator.loading.push(loader);
                  foundAllocator.save();
                }
              });
            });
          }
          // res.redirect("/allocationshow/" + req.params.id);
          minimumRate = 1;
          bCount = bCount - loaderCount;
          console.log(loaderNeed + " Loaders has been allocated!");
          console.log(bCount + " Colleagues remaining for allocation");
          //**************************************************************
          //                      LOADERS ALLOCATION FINISHED            *
          //**************************************************************
          // PICKERS ALLOCATION STARTS*
          //***************************
          pickMen = bCount;
          if (pickMen >= pickerCount) {
            console.log("Allocation done.");
          }
          minimumRate = 1;
          foundColleague.forEach(function (colleague) {
            if (pickerCount != pickMen) {
              if (
                colleague.isAllocated == false &&
                colleague.isIn == true &&
                colleague.pick == true
              ) {
                if (colleague.rating[0].pick >= minimumRate) {
                  var picker = colleague.firstName + " " + colleague.lastName;
                  pickerCount++;
                  colleague.isAllocated = true;
                  colleague.save();
                  pickers.push(picker);
                }
              }
            }
          });
          //pickers allocation
          pickers.forEach(function (foundPicker) {
            var text = "";
            text = foundPicker;
            console.log(text);
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
                // picker.save();
                allocatedPicker++;
                foundAllocator.pickers.push(picker);
                // foundAllocator.isAllocated = true; //kesobb!!!
                foundAllocator.save();
              }
            });
          });
          console.log(pickers);
          if (allocatedPicker < pickMen) {
            pickers = [];
            minimumRate = 0;
            foundColleague.forEach(function (colleague) {
              if (pickerCount - pickMen < 0) {
                if (
                  colleague.isAllocated == false &&
                  colleague.isIn == true &&
                  colleague.pick == true
                ) {
                  if (colleague.rating[0].pick >= minimumRate) {
                    var picker = colleague.firstName + " " + colleague.lastName;
                    pickerCount++;
                    colleague.isAllocated = true;
                    colleague.save();
                    pickers.push(picker);
                  }
                }
              }
            });
            pickers.forEach(function (foundPicker) {
              var text = "";
              text = foundPicker;
              console.log(text);
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
                  foundAllocator.pickers.push(picker);
                  foundAllocator.save();
                }
              });
            });
          }
          // res.redirect("/allocationshow/" + req.params.id);
          minimumRate = 1;
          bCount = bCount - pickerCount;
          console.log(pickerCount + " Pickers has been allocated!");

          //**************************************************************
          //                      PICKERS ALLOCATION FINISHED            *
          //**************************************************************
          console.log(
            bCount + " Colleagues remaining for allocation in the database"
          );
          res.redirect("back"); //lehet hogy + req.params.id nem kell!!!
        }
      });
    }
  });
});
//
// DELETE ALLOCATOR ROUTE
router.delete("/:id", middleware.isAdmin, function (req, res) {
  //destroy blog
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
router.delete("/:id/drivershow/:driver_id", middleware.isAdmin, function (
  req,
  res
) {
  //fyndByIdAndRemove
  Colleague.find({}, function (err, foundColleague) {
    if (err) {
      console.log(err);
    } else {
      Driver.findByIdAndRemove(req.params.driver_id, function (
        err,
        deletedDriver
      ) {
        if (err) {
          req.flash("error", "hasn't deleted...");
          res.redirect("back");
        } else {
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
router.delete("/:id/pickershow/:picker_id", middleware.isAdmin, function (
  req,
  res
) {
  //fyndByIdAndRemove
  Colleague.find({}, function (err, foundColleague) {
    if (err) {
      console.log(err);
    } else {
      Picker.findByIdAndRemove(req.params.picker_id, function (
        err,
        deletedPicker
      ) {
        if (err) {
          req.flash("error", "hasn't deleted...");
          res.redirect("back");
        } else {
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
router.delete("/:id/tippershow/:tipper_id", middleware.isAdmin, function (
  req,
  res
) {
  //fyndByIdAndRemove
  Colleague.find({}, function (err, foundColleague) {
    if (err) {
      console.log(err);
    } else {
      Tipper.findByIdAndRemove(req.params.tipper_id, function (
        err,
        deletedTipper
      ) {
        if (err) {
          req.flash("error", "hasn't deleted...");
          res.redirect("back");
        } else {
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
router.delete("/:id/dekitshow/:dekit_id", middleware.isAdmin, function (
  req,
  res
) {
  //fyndByIdAndRemove
  Colleague.find({}, function (err, foundColleague) {
    if (err) {
      console.log(err);
    } else {
      Dekit.findByIdAndRemove(req.params.dekit_id, function (
        err,
        deletedDekit
      ) {
        if (err) {
          req.flash("error", "hasn't deleted...");
          res.redirect("back");
        } else {
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
router.delete("/:id/loadershow/:loader_id", middleware.isAdmin, function (
  req,
  res
) {
  //fyndByIdAndRemove
  Colleague.find({}, function (err, foundColleague) {
    if (err) {
      console.log(err);
    } else {
      Loader.findByIdAndRemove(req.params.loader_id, function (
        err,
        deletedLoader
      ) {
        if (err) {
          req.flash("error", "hasn't deleted...");
          res.redirect("back");
        } else {
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
//Training DESTROY
router.delete("/:id/trainingshow/:training_id", middleware.isAdmin, function (
  req,
  res
) {
  //fyndByIdAndRemove
  Colleague.find({}, function (err, foundColleague) {
    if (err) {
      console.log(err);
    } else {
      Training.findByIdAndRemove(req.params.training_id, function (
        err,
        deletedTraining
      ) {
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
