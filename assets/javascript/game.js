 
//global vars
 var counter = 0;

var targetNumber = 0;
var wins=0;
var losses=0;
 
  var numberOptions = [12,8,3,2,9,11,6,1,7,10,5,4];
var imageCrystal=[];

var images= ["./assets/images/0.jpg", "./assets/images/1.jpg", "./assets/images/2.jpg", "./assets/images/3.jpg"]


//functions
function targetRand(){ // between 19 - 120.
  targetNumber = Math.floor(Math.random() * 102) + 19; //(max - min + 1)+ min;
  $("#number-to-guess").text(targetNumber);
}


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function reset(array){
  targetRand();
  counter = 0;
  $("#total").text(counter);
 
  
}

function attribute(array){
  for (var i = 0; i < 4; i++) {

imageCrystal[i].attr("data-crystalvalue", numberOptions[i]);
 $("#crystals").append(imageCrystal[i]);
 }
}
// 
//randomize target number
targetRand();
  // Next we create a for loop to create crystals for every numberOption.


  for (var i = 0; i < 4; i++) {

    // For each iteration, we will create an imageCrystal
    imageCrystal[i] = $("<img>");

    // First each crystal will be given the class ".crystal-image".
    // This will allow the CSS to take effect.
    imageCrystal[i].addClass("crystal-image");

    // Each imageCrystal will be given a src link to the crystal image

    imageCrystal[i].attr("src", images[i]);
 

    // Each imageCrystal will be given a data attribute called data-crystalValue.
    // This data attribute will be set equal to the array value.
    

    imageCrystal[i].attr("data-crystalvalue", numberOptions[i]);

    // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
    $("#crystals").append(imageCrystal[i]);
  }

  // This time, our click event applies to every single crystal on the page. Not just one.
  $(".crystal-image").on("click", function() {

    // Determining the crystal's value requires us to extract the value from the data attribute.
    // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
    // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
    // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter
    
    var crystalValue = ($(this).attr("data-crystalvalue"));
    crystalValue = parseInt(crystalValue);
    // We then add the crystalValue to the user's "counter" which is a global variable.
    // Every click, from every crystal adds to the global counter.
    counter += crystalValue;
$("#total").text(counter);
    // All of the same game win-lose logic applies. So the rest remains unchanged.
    alert("New score: " + counter);

    if (counter === targetNumber) {
      alert("You win!");
      
     $("#wins").text(++wins);
      reset(numberOptions);
      numberOptions= shuffle(numberOptions);
     attribute(numberOptions);
  
    }

    else if (counter >= targetNumber) {
      alert("You lose!!");
    $("#losses").text(++losses);
   
      reset(numberOptions);
      numberOptions= shuffle(numberOptions);
      attribute(numberOptions);
   
    }

  });