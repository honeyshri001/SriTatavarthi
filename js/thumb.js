var jsonFilePath = "../data/sanchika.json";

var path = window.location.pathname;
var page = path.split("/").pop();
console.log(page);

$.getJSON(jsonFilePath, {
  format: "json",
})
  .done(function (data) {
    //Lets Sort the Data based on ID
    data.data.sort(function (a, b) {
      return a.id - b.id;
    });

    // NEWest to OLDest
    data.data.reverse();

    //Now Populate the Cards with thumbnails

    var i = 0;

    $.each(data.data, function (key, val) {
      if (i < 3) $("#divSancikalu").append(LoadThumbnail(val));
      if (page != "magazine.html") i++;
    });

    document.getElementById("badge_canvas0").innerHTML += getBadge();
  })
  .fail(function (xhr, textStatus, errorThrown) {
    //alert(xhr.responseText);
    //alert(textStatus);
  });

function LoadThumbnail(obj) {
  // If absolute URL from the remote server is provided, configure the CORS
  // header on that server.

  //var url = "https://cors-anywhere.herokuapp.com/https://sritatavarthy.netlify.app/pdf/cover-page.pdf";

  var elementID = "canvas" + $("canvas").length; // Unique ID

  var canvas = document.createElement("canvas");
  canvas.id = elementID;

  var url = "../pdf/sanchika/" + obj.url;

  // Loaded via <script> tag, create shortcut to access PDF.js exports.
  var pdfjsLib = window["pdfjs-dist/build/pdf"];

  // The workerSrc property shall be specified.
  pdfjsLib.GlobalWorkerOptions.workerSrc = "//mozilla.github.io/pdf.js/build/pdf.worker.js";

  // Asynchronous download of PDF
  var loadingTask = pdfjsLib.getDocument(url);
  loadingTask.promise.then(
    function (pdf) {
      console.log("PDF loaded");

      // Fetch the first page
      var pageNumber = 1;
      pdf.getPage(pageNumber).then(function (page) {
        console.log("Page loaded");

        var scale = 1;
        var viewport = page.getViewport({ scale: scale });

        // Prepare canvas using PDF page dimensions
        //var canvas = div; //document.getElementById("the-canvas");
        var context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function () {
          console.log("Page rendered");
        });
      });
    },
    function (reason) {
      // PDF loading error
      console.error(reason);
    }
  );

  var section = document.createElement("div");
  section.className = "col-12 col-md-4 col-lg-3 col-sm-6 g-2";

  var div = document.createElement("div");
  div.className = "card mb-3";

  //div.style = "max-width: 22rem;";

  var divBody = document.createElement("div");
  divBody.className = "card-body bg-warning";
  divBody.id = "badge_" + elementID;
  divBody.innerHTML = '<h5 class="card-title">' + obj.title + "</h5>";
  divBody.innerHTML += '<p class="card-text">' + obj.desc + "</p>";
  divBody.innerHTML += '<a href="' + url + '" target="_blank" class="btn btn-primary">Read</a></a>';

  //canvas.className = "card-img card-img-top";
  section.appendChild(div);
  div.appendChild(canvas);
  div.appendChild(divBody);

  return section;
}

function getBadge(txt) {
  return '<span class="position-absolute top-0 start-0 p-2 translate-middle badge rounded-pill"><img src="imgs/new.png" style="height:50px" /></span>';
}
