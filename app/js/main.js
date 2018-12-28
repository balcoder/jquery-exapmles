$(document).ready(function(){
  $('#no-script').remove();

  $('#celebs ').addClass('table-style');
  $('#celebs th, #celebs td').addClass('zebra');
  $('#disclaimer').addClass('ptb-40');
  $('p#html-replaced').html('<strong>Warning!</strong> Text has been replaced … ');
$('h2#text-replaced').text('<strong>Warning!</strong> Title elements can be …');

  //$('#celebs tr ').remove(':contains("Singer")');

  $('<input type="button" id="toggleButton" value="Hide Disclamer" />').
  insertAfter('#disclaimer');
  $('<strong>START!</strong>').prependTo('#disclaimer');
  $('<strong>END!</strong>').appendTo('#disclaimer');

  //toggle button
  // $('#toggleButton').click(function() {
  //   if($('#disclaimer').is(':visible')){
  //     $('#disclaimer').hide();
  //   } else {
  //     $('#disclaimer').show();
  //   }
  // });
  $('#toggleButton').click(function() {
    // add a callback function to run after the slideToggle has finished
    $('#disclaimer').slideToggle(1000, function() {
      alert('The toggle effect has finished')
    });
    if($('#disclaimer').is(':visible')) {
      $('#toggleButton').val('Show Disclamer')
    } else {
      $('#toggleButton').val('Hide Disclamer')
    }
    $('#disclaimer').animate({
      opacity: 'hide',
      height: 'hide'
    }, 'slow');


  });

  // add mouseover functionality to table
  // $('#celebs tbody tr').mouseover(function(){
  //   $(this).addClass('zebraHover');
  // });
  // $('#celebs tbody tr').mouseout(function(){
  //   $(this).removeClass('zebraHover');
  // });
  // $('#celebs tbody tr').hover(function() {
  //   $(this).addClass('zebraHover');
  // }, function() {
  //   $(this).removeClass('zebraHover');
  // });

  $('#celebs tbody tr').click(function() {
    $(this).toggleClass('zebraHover');
    $(this).nextAll().toggleClass('zebra');
  });

  // add and remove spoiler span
  $('.spoiler').hide();
  $('<input type="button" class="revealer" value="Tell me more">').insertBefore(
    '.spoiler');
  $('.revealer').click(function(){
    $(this).hide();
    $(this).next().fadeIn();
  });

  $('p').animate({
    padding: '20px',
    fontSize: '30px'
  }, 2000);

  //navigation hover effect
  $('#navigation li').hover(function() {
    $(this).animate({paddingLeft: '+=15px', fontSize: '+=5px'}, 200);
  }, function() {
    $(this).animate({paddingLeft: '-=15px', fontSize: '-=5px'}, 200);
  });






}); // end document.ready
