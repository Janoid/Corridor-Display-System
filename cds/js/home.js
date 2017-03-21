// global variables
var JSONDataURL;
var JSONDataMESS;
var JSONDataLESS;
var JSONDataVID;
var messageCounterLess = 0;
var messageCounterMess = 0;
var messageCounterURLS = 0;
var messageCounterVID = 0;
numMessages = 0;
var count = 0;
var responseComplete = false;


// open jQuery
$(document).ready(function(){

  // display splash screen
  splashScreen();

  // retrieve all data.
  getData('http://api.computing-moodle.co.uk/api.php/display/urls/');
  getData('http://api.computing-moodle.co.uk/api.php/display/messages/');
  getData('http://api.computing-moodle.co.uk/api.php/display/lessons/');
  getData('http://api.computing-moodle.co.uk/api.php/display/videos/');

  var refreshId = setInterval(function() {
    if(responseComplete){
      $('#header').remove();
      switch (count) {
        case 0 : displayLessons(JSONDataLESS);
          count++;
          break;
        case 1 : displayMessages(JSONDataMESS);
          count++;
          break;
        case 2 : displayURL(JSONDataURL);
          count++;
          break;
        case 3 : displayVid(JSONDataVID);
          count++;
          break;
        default: count = 0;
          break;
      }
    }
  }, 3000 );

});


// splash screen creation method.
function splashScreen() {
  var $header = $("<div id='header'></div>");
  $('.container').append($header);
  $('#header').append('<h1>Welcome Screen</h1>');
}

// getData method, will get data from the URL populate page.
function getData(theUrl) {
    responseComplete = false;
    // url data collection.
    $.ajax({
        url: theUrl,
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function(dataURL) {
    			$(dataURL.urls).each(function(index, value) {
    				storeDataURL(dataURL);
    			});
        },
    });
		// Messages data collection.
		$.ajax({
        url: theUrl,
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function(dataMESS) {
    			$(dataMESS.messages).each(function(index, value) {
    				storeDataMESS(dataMESS);
    			});
        },
    });

		// Lessons data collection.
		$.ajax({
        url: theUrl,
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function(dataLESS) {
    			$(dataLESS.lessons).each(function(index, value) {
    				storeDataLESS(dataLESS);
    			});
        },
    });

    // Videos data collection
    $.ajax({
      url: theUrl,
      dataType: 'json',
      type: 'get',
      cache: false,
      success: function(dataVID) {
        $(dataVID.videos).each(function(index, value) {
          storeDataVID(dataVID);
        });
      },
    });
}

// function for storing data for URL
function storeDataURL(dataURL){
  JSONDataURL = dataURL;
  responseComplete = true;
}

// function for storing data for Messages
function storeDataMESS(dataMESS){
	JSONDataMESS = dataMESS;
	responseComplete = true;
}

// function for storing data for Lessons
function storeDataLESS(dataLESS){
	JSONDataLESS = dataLESS;
	responseComplete = true;
}

// function for storing data for videos
function storeDataVID(dataVID){
  JSONDataVID = dataVID;
  responseComplete = true;
}

// timer set function
// function timer() {
//   var count = 1;
//   var counter = setInterval(timer, 1000);
//
//   count = count - 1;
//
//   if(count <= 0)
//   {
//     clearInterval(counter);
//     ;
//     return;
//   }
// }

// DisplayLessons()
function displayLessons(JSONDataLESS) {
  numMessages = JSONDataLESS.lessons.length;
    if(responseComplete){
      $('.vid-container').remove();
      $('#splashScreen').remove();
      // create div tag to place in container
      var $lessons = $("<div class='lessons'><div class='row'><div class='column center_align fs_5em margin_top' id='groupname'></div></div><div class='row'><div class='column'></div><div class='column center_align fs_3em margin_top'><div id='subject'></div><div id='room'></div><div id='start'></div><div id='end'></div></div><div class='column'></div></div></div>");
      // append lessons div to container
      $('.container').append($lessons);
      // if messageCounter > numMessages, populate div information.
      if (numMessages > messageCounterLess) {

        $('#groupname').html(JSONDataLESS.lessons[messageCounterLess].groupname);
        $('#subject').html(JSONDataLESS.lessons[messageCounterLess].subject);
        $('#room').html(JSONDataLESS.lessons[messageCounterLess].room);
        $('#start').html(JSONDataLESS.lessons[messageCounterLess].starttime);
        $('#end').html(JSONDataLESS.lessons[messageCounterLess].endtime);
        //inc messageCounter with 1.
        messageCounterLess++;

      } else {
        splashScreen();
        getData('http://api.computing-moodle.co.uk/api.php/display/lessons/');
        numMessages = 0;
        messageCounterLess = 0;
      }
    }
}

// DisplayLessons()
function displayMessages(JSONDataMESS) {
  numMessages = JSONDataMESS.messages.length;
  if(responseComplete){

    $('.lessons').remove();

    if(numMessages > messageCounterMess) {

      if (JSONDataMESS.messages[messageCounterMess].type === 'WARN') {

        var $warn = $("<div class='warn'><div class='row'><div class='column fs_5em center_align'><div id='heading-warn'></div></div></div><div class='row fs_5em center_align margin_top'><div class='column'><div id='message-warn'></div></div></div><div class='row'><div class='column'></div><div class='column'></div><div class='column'><div id='warn-logo'></div></div></div></div>");

        $('.container').append($warn);

        $('#heading-warn').html(JSONDataMESS.messages[messageCounterMess].heading);
        $('#message-warn').html(JSONDataMESS.messages[messageCounterMess].message);

        if(JSONDataMESS.messages[messageCounterMess].logo != "")
          $('#logo-warn').css('background-image', 'url("' + JSONDataMESS.messages[messageCounterMess].logo + '")');

        $('#heading-warn').css('color', "#" + JSONDataMESS.messages[messageCounterMess].headingcolour);
        $('#message-warn').css('color', "#" + JSONDataMESS.messages[messageCounterMess].textcolour);
        $('.warn').css('background-color', "#" + JSONDataMESS.messages[messageCounterMess].backgroundcolour);


        if (JSONDataMESS.messages[messageCounterMess].background != "")
          $('.warn').css('background-image', 'url("' + JSONDataMESS.messages[messageCounterMess].background + '")');

      } else if (JSONDataMESS.messages[messageCounterMess].type === 'ADVI') {

        var $advi = $("<div class='advi'><div class='row'><div class='column fs_5em center_align'><div id='heading-advi'></div></div></div><div class='row fs_5em center_align margin_top'><div class='column'><div id='message-advi'></div></div></div><div class='row'><div class='column'></div><div class='column'></div><div class='column'><div id='advi-logo'></div></div></div></div>");

        $('.container').append($advi);

        $('#heading-advi').html(JSONDataMESS.messages[messageCounterMess].heading);
        $('#message-advi').html(JSONDataMESS.messages[messageCounterMess].message);
        $('#logo-advi').html(JSONDataMESS.messages[messageCounterMess].logo);

        $('#heading-advi').css('color', "#" + JSONDataMESS.messages[messageCounterMess].headingcolour);
        $('#message-advi').css('color', "#" + JSONDataMESS.messages[messageCounterMess].textcolour);
        $('.advi').css('background-color', "#" + JSONDataMESS.messages[messageCounterMess].backgroundcolour);

        if (JSONDataMESS.messages[messageCounterMess].background != "")
          $('.advi').css('background-image', 'url("' + JSONDataMESS.messages[messageCounterMess].background + '")');

      } else if (JSONDataMESS.messages[messageCounterMess].type == 'JOB') {

        var $job = $("<div class='job'><div class='row'><div class='column' id='heading-job'></div></div><div class='row'><div class='column'></div><div class='column' id='message-job'></div><div class='column'></div></div><div class='row'><div class='column'></div><div class='column'></div><div class='column' id='logo-job'></div></div></div>");

        $('.container').append($job);

        $('#heading-job').html(JSONDataMESS.messages[messageCounterMess].heading);
        $('#message-job').html(JSONDataMESS.messages[messageCounterMess].message);
        $('#logo-job').css('background', "url(" + JSONDataMESS.messages[messageCounterMess].logo + ")");

        $('#heading-job').css('color', "#" + JSONDataMESS.messages[messageCounterMess].headingcolour);
        $('#message-job').css('color', "#" + JSONDataMESS.messages[messageCounterMess].textcolour);
        $('.job').css('background-color', "#" + JSONDataMESS.messages[messageCounterMess].backgroundcolour);

        if (JSONDataMESS.messages[messageCounterMess].background != "")
          $('.job').css('background-image', 'url("' + JSONDataMESS.messages[messageCounterMess].background + '")');

      } else if (JSONDataMESS.messages[messageCounterMess].type == 'FACT') {

        var $fact = $("<div class='fact'><div class='row'><div class='column fs_5em center_align'><div id='heading-fact'></div></div></div><div class='row'><div class='column _10'></div><div class='column _8'><div id='message-fact'></div></div><div class='column _10'></div></div><div class='row'><div class='column'></div><div class='column'></div><div class='column'><div id='logo-fact'></div></div></div></div>");

        $('.container').append($fact);

        $('#heading-fact').html(JSONDataMESS.messages[messageCounterMess].heading);
        $('#message-fact').html(JSONDataMESS.messages[messageCounterMess].message);
        $('#logo-fact').html(JSONDataMESS.messages[messageCounterMess].logo);

        $('#heading-fact').css('color', "#" + JSONDataMESS.messages[messageCounterMess].headingcolour);
        $('#message-fact').css('color', "#" + JSONDataMESS.messages[messageCounterMess].textcolour);
        $('.fact').css('background-color', "#" + JSONDataMESS.messages[messageCounterMess].backgroundcolour);

        if (JSONDataMESS.messages[messageCounterMess].background != "")
          $('.fact').css('background-image', 'url("' + JSONDataMESS.messages[messageCounterMess].background + '")');

      } else if (JSONDataMESS.messages[messageCounterMess].type == 'IMAG') {

        var $imag = $("<div class='imag'><div class='row'><div class='column fs_5em center_align'><div id='heading-imag'></div></div></div><div class='row'><div class='column'></div></div></div>");

        $('.container').append($imag);

        $('#heading-imag').html(JSONDataMESS.messages[messageCounterMess].heading);
        $('#message-imag').html(JSONDataMESS.messages[messageCounterMess].message);
        $('#logo-imag').html(JSONDataMESS.messages[messageCounterMess].logo);

        $('#heading-imag').css('color', "#" + JSONDataMESS.messages[messageCounterMess].headingcolour);
        $('#message-imag').css('color', "#" + JSONDataMESS.messages[messageCounterMess].textcolour);
        $('.imag').css('background-color', "#" + JSONDataMESS.messages[messageCounterMess].backgroundcolour);

        if (JSONDataMESS.messages[messageCounterMess].background != "")
          $('.imag').css('background-image', 'url("' + JSONDataMESS.messages[messageCounterMess].background + '")');

      } else if (JSONDataMESS.messages[messageCounterMess].type === 'CONG') {

        var $cong = $("<div class='cong'><div class='row'><div class='column fs_5em center_align'><div id='heading-cong'></div></div></div><div class='row'><div class='column center_align'><div id='message-cong'></div></div></div></div>");

        $('.container').append($cong);

        $('#heading-cong').html(JSONDataMESS.messages[messageCounterMess].heading);
        $('#message-cong').html(JSONDataMESS.messages[messageCounterMess].message);
        $('#logo-cong').html(JSONDataMESS.messages[messageCounterMess].logo);

        $('#heading-cong').css('color', "#" + JSONDataMESS.messages[messageCounterMess].headingcolour);
        $('#message-cong').css('color', "#" + JSONDataMESS.messages[messageCounterMess].textcolour);
        $('.cong').css('background-color', "#" + JSONDataMESS.messages[messageCounterMess].backgroundcolour);

        if (JSONDataMESS.messages[messageCounterMess].background != "")
          $('.cong').css('background-image', 'url("' + JSONDataMESS.messages[messageCounterMess].background + '")');

      } else if (JSONDataMESS.messages[messageCounterMess].type == 'SPLIT') {

        var $split = ("<div class='split'><div class='row'><div id='heading-split center_align fs_5em'></div><div class='column'><div id='message-split'></div></div><div class='column'><div id='logo-split'></div></div></div></div>");

        $('.container').append($split);

        $('#heading-split').html(JSONDataMESS.messages[messageCounterMess].heading);
        $('#message-split').html(JSONDataMESS.messages[messageCounterMess].message);
        $('#logo-split').html(JSONDataMESS.messages[messageCounterMess].logo);

        $('#heading-split').css('color', "#" + JSONDataMESS.messages[messageCounterMess].headingcolour);
        $('#message-split').css('color', "#" + JSONDataMESS.messages[messageCounterMess].textcolour);
        $('.split').css('background-color', "#" + JSONDataMESS.messages[messageCounterMess].backgroundcolour);

        if (JSONDataMESS.messages[messageCounterMess].background != "")
          $('.warn').css('background-image', 'url("' + JSONDataMESS.messages[messageCounterMess].background + '")');

      }

      // messages page
      // $('#heading').html(JSONDataMESS.messages[messageCounterMess].heading);
      // $('#message').html(JSONDataMESS.messages[messageCounterMess].message);
      // $('#logo').html(JSONDataMESS.messages[messageCounterMess].logo);
      // $('#heading').css('color', "#" + JSONDataMESS.messages[messageCounterMess].headingcolour);
      // $('#message').css('color', "#" + JSONDataMESS.messages[messageCounterMess].textcolour);
      // $('#messages-section').css('background-color', "#" + JSONDataMESS.messages[messageCounterMess].backgroundcolour);
      messageCounterMess++;
    } else {
      splashScreen();
      getData('http://api.computing-moodle.co.uk/api.php/display/messages/');
      numMessages = 0;
      messageCounterMess = 0;
    }
  }
}

// Display URL's()
  function displayURL(JSONDataURL) {
  numMessages = JSONDataURL.urls.length;
  if(responseComplete){

    $('.warn').remove();
    $('.advi').remove();
    $('.job').remove();
    $('.fact').remove();
    $('.imag').remove();
    $('.cong').remove();
    $('.split').remove();

    var $urls = $("<div class='url-container'><div class='row margin_top'><div class='column fs_5em center_align' id='top'></div></div><div class='row margin_top'><div class='column'></div><div class='column center_align' id='url-info'></div><div class='column'></div></div><div class='row margin_top'><div class='column center_align fs_5em' id='bottom'></div></div></div>");
    $('.container').append($urls);
    if(numMessages > messageCounterURLS) {
     // urls page
      $('#top').html(JSONDataURL.urls[messageCounterURLS].toptext);
      $('#url-info').append(qrMaker(JSONDataURL));
      $('#bottom').html(JSONDataURL.urls[messageCounterURLS].bottomtext);
      $('#url-container').css('background-color', "#" + JSONDataURL.urls[messageCounterURLS].backgroundcolour);
      messageCounterURLS++;
    } else {
      splashScreen();
      getData('http://api.computing-moodle.co.uk/api.php/display/urls/');
      numMessages = 0;
      messageCounterURLS = 0;
    }
  }
}

// Display Videos()
function displayVid(JSONDataVID) {
  numMessages = JSONDataVID.videos.length;

  if(responseComplete){

    $('.url-container').remove();

    var $vid = $("<div class='vid-container'><div class='row'><div class='column center_align holder'></div></div></div>");

    $('.container').append($vid);

    if(numMessages > messageCounterVID) {

      var $video = JSONDataVID.videos[messageCounterVID].url.replace("watch?v=", "embed/");

      var $line = $("<iframe width='100%' height='100%' src=" + $video + "?autoplay=1></iframe>");
      $('.holder').append($line);

      messageCounterVID++;
    } else {

      splashScreen();
      getData('http://api.computing-moodle.co.uk/api.php/display/videos/');
      numMessages = 0
      messageCounterVID = 0;

    }
  }
}

function qrMaker(JSONDataURL){
  $('#url-info').qrcode({
		render	: "table",
		text	: JSONDataURL.urls[messageCounterURLS].url
	});
}
