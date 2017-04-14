/*
Scott Kinder
JQuery Cup page
*/

"use strict";

(function() {

	var app = new Clarifai.App(
		's19v7HEjbnUYo9gGEQQihgdk0dgK14p2Trqfbpn3',
		'xlQkPSP5z2AKxyfUTzq3LmZMlxVn57LRsrE53zyi'
	);

	$(document).ready(function() {

		$("#imageupload").on("click", function() {
			$.fn.uploadImage();
		});

		console.log("hello")
		app.models.predict("bd367be194cf45149e75f01d59f77ba7", 'http://www.womenfitness.net/wp/wp-content/uploads/2016/11/MEALS.jpg').then(
			function(response) {
				console.log(response);
			},
			function(err) {
				console.error(err);
			}
		);
	});

	
	$.fn.uploadImage = function() {
		var imageUrl = $("#imageinput").val();
		var j;
		app.models.predict("bd367be194cf45149e75f01d59f77ba7", imageUrl).then(
			function(response) {
				//console.log(response);
				var concepts = response["outputs"][0]["data"]["concepts"];
				if (!$("#uploadedimage").length) {
					$("#imagewrapper").append('<div id="uploadedimage"></div><button id="analyzefood">Continue</button>');
				}
				$("#uploadedimage").empty();
				$("#uploadedimage").attr("style", "background-image: url('" + imageUrl + "')");
				//console.log(results)
				for (var i = 0; i < 7; i++) {
					j = i;
					$("#uploadedimage").append("<div class='fooditem'><p><input class='fooditemcheckbox' type='checkbox'>" + concepts[i]["name"] + "&nbsp;<img class='removebox' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Red_X.svg/768px-Red_X.svg.png'></p></div>");
				}
				$("#uploadedimage").append("<div class='fooditem'><p><input class='fooditemcheckbox' type='checkbox'>other: <input type='text'></p></div>");
				$(".removebox").on("click", function() {
					j++;
					$(this).closest('div').remove();
					$("#uploadedimage").prepend("<div class='fooditem'><p><input class='fooditemcheckbox' type='checkbox'>" + concepts[j]["name"] + "</p></div>");
				});
			},
			function(err) {
				console.error(err);
			}
		);
	};

	function userIdCheck() {
		return $.ajax({
			url: 'tdxuwajax.php',
			type: 'post',
			data: { "type": "useridcheck"},
		});
	}

	$.fn.loadButton = function(x, y) {
		var loading = document.createElement("img");
		loading.id = "load";
		loading.style.left = "" + x + "px";
		loading.style.top = "" + y + "px";
		loading.src = "https://webster.cs.washington.edu/images/babynames/loading.gif";
		$("#content").append(loading);
	};

	
})();