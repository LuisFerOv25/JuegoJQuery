var jugar = false;
var puntuacion;
var campovida;
var velocidad;
var mover;
var frut_ver = [
	"aji",
	"arbeja",
	"banano",
	"cebolla",
	"coco",
	"fresa",
	"limon",
	"mango",
	"manverde",
	"manzroja",
	"naranja",
	"papa",
	"pera",
	"piña",
	"repollo",
	"tomate",
	"uva",
	"zanahoria",
];

$(function () {
	$("#btnInicio").click(function () {
		if (jugar == true) {
			location.reload();
		} else {
			jugar = true;
			puntuacion = 0;
			$("#puntos").html(puntuacion);
			$("#campovida").show();

			campovida = 4;
			Vida();
			$("#dialog").hide();
			$("#btnInicio").html(
				'<button id="button" class="btn btn-primary">Reiniciar</button>'
			);
			startAction();
		}
	});

	$("#instru").click(function () {
		$("#mostrarinst").show();
	});
	$("#mvespada").click(function () {
		$("#draggable").show();
	});

	$("#frutaverdura").mouseover(function () {
		puntuacion++;
		$("#puntos").html(puntuacion);
		$("#slicesound")[0].play();
		clearInterval(mover);
		$("#frutaverdura").hide("explode", 500);
		setTimeout(startAction, 500);
	});

	function Vida() {
		$("#campovida").empty();
		for (i = 0; i < campovida; i++) {
			$("#campovida").append('<img src="img/vida.png" class="vida">');
		}
	}

	function startAction() {
		$("#frutaverdura").show();
		FrutaVerduraRandom();
		$("#frutaverdura").css({
			left: Math.round(550 * Math.random()),
			top: -1000,
		});

		velocidad = 1 + Math.round(5 * Math.random());
		mover = setInterval(function () {
			$("#frutaverdura").css("top", $("#frutaverdura").position().top + velocidad);
			if ($("#frutaverdura").position().top > $("#tablero").height()) {
				if (campovida > 1) {
					$("#frutaverdura").show();
					FrutaVerduraRandom();
					$("#frutaverdura").css({
						left: Math.round(550 * Math.random()),
						top: -50,
					});
					velocidad = 1 + Math.round(6 * Math.random());
					campovida--;
					Vida();
				} else {
					jugar = false;
					$(function () {
						$("#dialog").dialog();
						$("#dialog").html(
							"<p>Game Over!</p><p>Tu puntuacion es: " + puntuacion + "</p>"
						);
					});
					$("#btnInicio").html('<button id="button" class="btn btn-primary">Comenzar</button>');

					$("#campovida").hide();

					pararMovi();
				}
			}
		}, 10);
	}

	function FrutaVerduraRandom() {
		$("#frutaverdura").attr(
			"src",
			"img/" + frut_ver[Math.round(18 * Math.random())] + ".png"
		);
	}

	function pararMovi() {
		clearInterval(mover);
		$("#frutaverdura").hide();
	}
});

$(function () {
	var state = true;
	$("#instru").on("click", function () {
		if (state) {
			$("#effect").animate(
				{
					backgroundColor: "#aa0000",
					color: "#08D91B",
					width: 500,
				},
				1000
			);
		} else {
			$("#effect").animate(
				{
					backgroundColor: "#08D91B",
					color: "#000",
					width: 440,
				},
				1000
			);
		}
		state = !state;
	});
});

$( function() {
    $( "#draggable" ).draggable();
	$("#draggable").html(
		'<img src="img/espada.png" class="tamañoes">'
	);

  } );