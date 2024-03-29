$(document).ready(function () {
  $("main#spapp > section").height($(document).height() - 60);

  var app = $.spapp({ pageNotFound: "error_404" }); // initialize
  app.route({
    view: "students",
    load: "students.html",
  });
  app.route({
    view: "form",
    load: "form.html",
  });

  // run app
  app.run();
});
