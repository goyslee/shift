                   //***************************
                    // DRIVERS ALLOCATION STARTS*
                    //***************************
                    if (truckDriver >= driverCount) {
                        console.log("Allocation done.");
                    }
                    minimumRate = 1;
                    var randomDriversFrom = [];
                    foundColleague.forEach(function(randomColleague){
                        if (randomColleague.isAllocated == false && randomColleague.isIn == true && randomColleague.trucks == true) {
                            var driver = randomColleague.firstName + " " + randomColleague.lastName;
                            randomDriversFrom.push(driver);
                        }
                    });
                    console.log("all drivers on shift: " + randomDriversFrom);
                    randomDriversFrom.forEach(function(colleague) {
                        var randomColl = getRandomInt(randomDriversFrom.length);
                        if (driverCount != truckDriver) {
                                    var driver = randomDriversFrom[randomColl];
                                    foundColleague.forEach(function(fcolleague){
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
                    console.log(drivers);
                    //drivers allocation
                    drivers.forEach(function(foundDriver) {
                        var text = "";
                        text = foundDriver;
                        console.log(text);
                        var author = {
                            id: foundAllocator.id
                        };
                        var colleagueId = ""; //new
                        foundColleague.forEach(function(colleague) { //new
                            if (text === colleague.fullName) { //new
                                colleagueId = colleague.id //new
                                text = text //new
                            } //new
                        }); //new
                        var newDriver = {
                            text: text,
                            author: author,
                            colleagueId: colleagueId //new
                        };
                        Driver.create(newDriver, function(err, driver) {
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
                        foundColleague.forEach(function(colleague) {
                            if (driverCount - truckDriver < 0) {
                                if (colleague.isAllocated == false && colleague.isIn == true && colleague.trucks == true) {
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
                        drivers.forEach(function(foundDriver) {
                            var text = "";
                            text = foundDriver;
                            console.log(text);
                            var author = {
                                id: foundAllocator.id
                            };
                            var colleagueId = "" //new
                            foundColleague.forEach(function(colleague) { //new
                                if (text === colleague.fullName) { //new
                                    colleagueId = colleague.id //new
                                    text = text //new
                                } //new
                            }); //new
                            var newDriver = {
                                text: text,
                                author: author,
                                colleagueId: colleagueId //new
                            };
                            Driver.create(newDriver, function(err, driver) {
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






                    minimumRate = 1;
                    var randomDriversFrom = [];
                    foundColleague.forEach(function(randomColleague){
                        if (randomColleague.isAllocated == false && randomColleague.isIn == true && randomColleague.trucks == true) {
                            var driver = randomColleague.firstName + " " + randomColleague.lastName;
                            randomDriversFrom.push(driver);
                        }
                    });
                    console.log("all drivers on shift: " + randomDriversFrom);
                    randomDriversFrom.forEach(function(colleague) {
                        var randomColl = getRandomInt(randomDriversFrom.length);
                        if (driverCount != truckDriver) {
                                    var driver = randomDriversFrom[randomColl];
                                    foundColleague.forEach(function(fcolleague){
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