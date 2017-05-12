var $speechInput,
  $recBtn,
  $loader,
  recognition,
  messageRecording = "Recording...",
  messageWait = "Please wait...",
  messageCouldntHear = "I couldn't hear you, could you say that again?",
  messageInternalError = "Oh no, there has been an internal server error",
  messageSorry = "I'm sorry, I don't have the answer to that yet.";

$(document).ready(function() {
  $speechInput = $("#speech");
  $recBtn = $("#rec");
  $loader = $('.loader');

  $speechInput.keypress(function(event) {
    if (event.which == 13) {
      event.preventDefault();
      send();
    }
  });
  $recBtn.on("click", function(event) {
    switchRecognition();
  });
});

function startRecognition() {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
      recognition.interimResults = false;

  recognition.onstart = function(event) {
    respond(messageRecording);
    updateRec();
  };
  recognition.onresult = function(event) {
    recognition.onend = null;

    var text = "";
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        text += event.results[i][0].transcript;
      }
      setInput(text);
    stopRecognition();
  };
  recognition.onend = function() {
    respond(messageCouldntHear);
    stopRecognition();
  };
  recognition.lang = "en-US";
  recognition.start();
}

function stopRecognition() {
  if (recognition) {
    recognition.stop();
    recognition = null;
  }
  updateRec();
}

function switchRecognition() {
  if (recognition) {
    stopRecognition();
  } else {
    startRecognition();
  }
}

function setInput(text) {
  $speechInput.val(text);
  send();
}

function updateRec() {
  $recBtn
    .find('img')
    .attr(
      "src",
      recognition ? "https://image.flaticon.com/icons/svg/25/25632.svg" : "https://image.flaticon.com/icons/svg/25/25682.svg"
    );
}

function send() {
  $("#spokenResponse").addClass("is-active").find(".spoken-response__text").html(messageWait);
  var text = $speechInput.val();
  $speechInput.select();
  $loader.show();
  $.ajax({
    type: "GET",
    url: URL + "/api/bot?q="+text+"&platform=web&user="+CUSTOMER.sessionToken,
    success: function(data) {
      prepareResponse(data);
      $loader.hide();
    },
    error: function() {
      respond(messageInternalError);
      $loader.hide();
    }
  });
}

function prepareResponse(val) {
  var spokenResponse = val.data;
  respond(spokenResponse);
}

function respond(val) {
  if (val == "") {
    val = messageSorry;
  }

  if (val !== messageRecording) {
    var msg = new SpeechSynthesisUtterance();
    msg.voiceURI = "native";
    msg.text = val;
    msg.lang = "en-US";
    window.speechSynthesis.speak(msg);
  }

  $("#spokenResponse").addClass("is-active").find(".spoken-response__text").html(val);
}
