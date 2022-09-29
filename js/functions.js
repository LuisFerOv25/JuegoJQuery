var playing = false;
var score;
var trialsLeft;
var step;
var action;
var fruits = [
  "apple",
  "banana",
  "cherries",
  "grapes",
  "mango",
  "orange",
  "peach",
  "pear",
  "watermelon",
];

$(function () {
  $("#startreset").click(function () {
    if (playing == true) {
      location.reload();
    } else {
      playing = true;
      score = 0;
      $("#scorevalue").html(score);
      $("#trialsLeft").show();
      trialsLeft = 5;
      addHearts();
      $("#gameOver").hide();
      $("#startreset").html("Reset Game");
      startAction();
    }
  });

  $("#fruit1").mouseover(function () {
    score++;
    $("#scorevalue").html(score);
    $("#slicesound")[0].play();
    clearInterval(action);
    $("#fruit1").hide("explode", 500);
    setTimeout(startAction, 500);
  });

  function addHearts() {
    $("#trialsLeft").empty();
    for (i = 0; i < trialsLeft; i++) {
      $("#trialsLeft").append('<img src="images/heart.png" class="life">');
    }
  }

  function startAction() {
    $("#fruit1").show();
    chooseFruit();
    $("#fruit1").css({
      left: Math.round(550 * Math.random()),
      top: -1000,
    });

    step = 1 + Math.round(5 * Math.random());
    action = setInterval(function () {
      $("#fruit1").css("top", $("#fruit1").position().top + step);
      if ($("#fruit1").position().top > $("#fruitsContainer").height()) {
        if (trialsLeft > 1) {
          $("#fruit1").show();
          chooseFruit();
          $("#fruit1").css({
            left: Math.round(550 * Math.random()),
            top: -50,
          });
          step = 1 + Math.round(5 * Math.random());
          trialsLeft--;
          addHearts();
        } else {
          playing = false;
          $("#startreset").html("Start Game");
          $("#gameOver").show();
          $("#gameOver").html(
            "<p>Game Over!</p><p>Your score is " + score + "</p>"
          );
          $("#trialsLeft").hide();
          stopAction();
        }
      }
    }, 10);
  }

  function chooseFruit() {
    $("#fruit1").attr(
      "src",
      "images/" + fruits[Math.round(8 * Math.random())] + ".png"
    );
  }

  function stopAction() {
    clearInterval(action);
    $("#fruit1").hide();
  }
});

//BARRA DE CARGA

$(document).ready(function () {
  var percent = 0;

  timerId = setInterval(function () {
    //increment progress bar
    percent += 10;
    $(".progress-bar").css("width", percent + "%");
    $(".progress-bar").attr("aria-valuenow", percent);
    $(".progress-bar").text(percent + "%");

    //complete
    if (percent == 100) {
      clearInterval(timerId);
      $(".information").show();
    }
  }, 1000);
});

//CONOCE MÁS

$(function () {
  $("input").checkboxradio();
});

$(function () {
  $("#button").on("click", function () {
    $(".newClass").switchClass("newClass", "anotherNewClass", 1000);
    $(".anotherNewClass").switchClass("anotherNewClass", "newClass", 1000);
  });
});

$(function () {
  $("#sortable1").sortable({
    items: "li:not(.ui-state-disabled)",
  });

  $("#sortable2").sortable({
    cancel: ".ui-state-disabled",
  });

  $("#sortable1 li, #sortable2 li").disableSelection();
});
