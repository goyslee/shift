// $('td:contains("$init")').each(function () {
//   $(this).html($(this).html().split("$init").join(" "));
// });

// '.tbl-content' consumed little space for vertical scrollbar, scrollbar width depend on browser/os/platfrom. Here calculate the scollbar width .

$(window)
  .on("load resize ", function () {
    var scrollWidth =
      $(".tbl-content").width() - $(".tbl-content table").width();
    $(".tbl-header").css({
      "padding-right": scrollWidth,
    });
  })
  .resize();





// checkbox.addEventListener('change', function () {
//   if (this.checked) {
//     return true
    
//   } else {
    
//     return false
//   }
// });

// const chks = () => { 
// const checkbox = document.querySelectorAll("input[type=checkbox]");
// for (let i = 0; i < checkbox.length; i++) {
//   checkbox[i].addEventListener('change', function () {
//     if (this.checked) {
//       return true

//     } else {

//       return false
//     }
//   });
// }
// }

$('form').submit(function () {

  $(":checkbox:not(:checked)").each(function (element, index) {
    $(this).attr({ value: 'false', checked: 'checked' });
  });

  return true;
});

// function validate() {
//   var checkbox = document.querySelector('input[name="colleague[dekit]"]:checked');
//   if (!checkbox) {
    
//     return false;
//   }
//   else return true;
// }
// validate();

// $("check").on('change', function () {
//   if ($(this).is(':checked')) {
//     $(this).attr('value', 'true');
//   } else {
//     $(this).attr('value', 'false');
//   }
// });
// $("check").is(':checked', function () {
//   $("check").attr('value', 'true');
// });
// $("form").submit(function () {
//   $("input").removeAttr("disabled");
// });
// function check() {
//   document.getElementsByClassName("check").checked = true;
// }
// function uncheck() {
//   document.getElementsByClassName("check").unchecked = false;
// }
$.fn.extend({
  sortSelect() {
    let options = this.find("option"),
      arr = options
      .map(function (_, o) {
        return {
          t: $(o).text(),
          v: o.value
        };
      })
      .get();

    arr.sort((o1, o2) => {
      // sort select
      let t1 = o1.t.toLowerCase(),
        t2 = o2.t.toLowerCase();
      return t1 > t2 ? 1 : t1 < t2 ? -1 : 0;
    });

    options.each((i, o) => {
      o.value = arr[i].v;
      $(o).text(arr[i].t);
    });
  },
});

$.fn.extendm({
  sortSelect() {
    let options = this.find("optmy"),
      arr = options
      .map(function (_, o) {
        return {
          t: $(o).text(),
          v: o.value
        };
      })
      .get();

    arr.sort((o1, o2) => {
      // sort select
      let t1 = o1.t.toLowerCase(),
        t2 = o2.t.toLowerCase();
      return t1 > t2 ? 1 : t1 < t2 ? -1 : 0;
    });

    options.each((i, o) => {
      o.value = arr[i].v;
      $(o).text(arr[i].t);
    });
  },
});

$("select").sortSelect();
var rotas = {
  earlies: {
    w1: [0, 1, 1, 1, 1, 0, 1],
    w2: [1, 1, 1, 1, 0, 1, 1],
    w3: [1, 0, 0, 1, 1, 1, 1],
    w4: [0, 0, 1, 1, 1, 1, 0],
    w5: [0, 1, 1, 1, 0, 1, 1],
    w6: [1, 1, 1, 0, 1, 1, 1],
    w7: [1, 1, 0, 0, 0, 1, 1],
    w8: [0, 1, 1, 1, 1, 0, 0],
  },
  middles: {
    w1: [0, 1, 1, 1, 1, 0, 0],
    w2: [1, 1, 1, 1, 0, 1, 1],
    w3: [1, 0, 0, 1, 1, 1, 1],
    w4: [1, 0, 1, 1, 1, 1, 0],
    w5: [0, 1, 1, 1, 0, 1, 1],
    w6: [1, 1, 0, 0, 1, 1, 1],
    w7: [1, 1, 0, 0, 1, 1, 1],
    w8: [1, 0, 1, 1, 1, 1, 0],
  },
  nights: {
    w1: [1, 1, 1, 0, 0, 1, 1],
    w2: [1, 1, 0, 0, 1, 1, 1],
    w3: [1, 0, 0, 1, 1, 1, 0],
    w4: [0, 1, 1, 1, 1, 0, 0],
    w5: [1, 1, 1, 0, 0, 1, 1],
    w6: [1, 0, 0, 1, 1, 1, 1],
    w7: [1, 0, 0, 1, 1, 1, 0],
    w8: [0, 1, 1, 1, 1, 0, 0],
  },
};

// $(document).ready(function () {
//   check();
//   uncheck();
// });

// -------------------------------------------------------------------------------------------------