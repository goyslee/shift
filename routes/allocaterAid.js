 if (err.code === 11000 || err.code === 11001) {
     Allocator.findOne().sort({
         field: 'asc',
         _id: -1
     }).limit(1).exec((err, foundAllocation) => {
         foundAllocation.remove();
         if (err) {
             console.log(err);
         } else {
             foundAllocation.isAllocated = false;
             foundAllocation.save();
         }
     });
     req.flash("error", "There is a shift set up under this date already! PLease edit the existing one or delete it first");
     res.redirect("back");
 }