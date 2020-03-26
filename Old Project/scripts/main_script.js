/* CSCI 3230U - CSS Frameworks */
$(document).ready(function() {

  $("#soccer_Modal").click(function() {
    $(".modal").addClass("is-active");
  });
  $(".close").click(function() {
     $(".modal").removeClass("is-active");
  });

});
