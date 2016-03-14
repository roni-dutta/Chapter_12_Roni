//Variables
var category, startList, stopList, orders, price,
  homeContent = $("#displayBody, h2, p"),
  cartContent = $("#showMore, #addToCart");
//FUNCTIONS
function compute() {
  $("input").click(function () {
    var it = $("input"),
      items = $('.details >span'),
      i;
    orders = '';
    price = 0;
    for (i = 0; i < it.length; i++) {
      if (it[i].checked) {
        price += parseFloat(it[i].value);
        orders += '<tr><td>' + items[i].innerHTML + '</td><td>' + parseFloat(it[i].value) + '</td></tr>';
      }
    }
  });
}

function bagsList() {
  $.ajax({
    type: "GET",
    url: "../htmlFiles/items.html",
    success: function (html) {
      var a = $(html),
        b = a.find('#cat1'),
        c = b.slice(startList, stopList);
      $("#items").append(c);
      startList += 5;
      stopList += 5;
      compute();
    }
  });
} /*end Bags List*/
function shoesList() {
  $.ajax({
    type: "GET",
    url: "../htmlFiles/itemsShoes.html",
    success: function (html) {
      var a = $(html),
        b = a.find('#cat2'),
        c = b.slice(startList, stopList);
      $("#items").append(c);
      startList += 5;
      stopList += 5;
      compute();
    }
  });
} /*end Bags List*/

//FUNCTIONS
//CLICKS
$("#icon").click(function () {
  var d = $("#display"),
    ml = d.css('margin-left'),
    cartStyle = $("#leftSideBar").addClass('cartStyle');
  if (ml === '0px') {
    d.animate({
      'margin-left': '15%'
    });
    cartStyle;
  } else {
    d.animate({
      'margin-left': 0
    });
    cartStyle;
  }
});


$("#home").click(function () {
  homeContent.show();
  cartContent.hide();
  $("#items").html('').hide();
});

$("#bags").click(function () {
  category = 'bags';
  homeContent.hide();
  cartContent.show();
  $("#items").html('').show();
  $("table").find("tr:gt(0)").remove();
  $("#totalAmt").html("0");
  startList = 0;
  stopList = 5;
  bagsList();
});

$("#shoes").click(function () {
  category = 'shoes';
  homeContent.hide();
  cartContent.show();
  $("#items").html('').show();
  $("table").find("tr:gt(0)").remove();
  $("#totalAmt").html("0");


  startList = 0;
  stopList = 5;
  shoesList();
});

$("#showMore").click(function () {
  if (category === 'bags') {
    bagsList();
  } else {
    shoesList();
  }
});

$("#addToCart").click(function () {
  compute();
  $("table").find("tr:gt(0)").remove();
  $("#totalAmt").html("0");
  $("#cartTable").append(orders);
  $("#totalAmt").html(price);
});
//CLICKS
