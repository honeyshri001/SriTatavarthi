var jsonFilePath = "../data/sanchika.json";
$.getJSON(jsonFilePath, {
  format: "json",
})
  .done(function (data) {
    $.each(data.data, function (key, val) {
      $("#divSancikalu").append(LoadThumbnail(val));
    });
  })
  .fail(function (xhr, textStatus, errorThrown) {
    //alert(xhr.responseText);
    //alert(textStatus);
  });

function LoadThumbnail(obj) {
  // If absolute URL from the remote server is provided, configure the CORS
  // header on that server.
  //var url = "../pdf/sanchika/cover-page.pdf";
  //var url = "https://cors-anywhere.herokuapp.com/https://sritatavarthy.netlify.app/pdf/cover-page.pdf";

  var elementID = "canvas" + $("canvas").length; // Unique ID

  var canvas = document.createElement("canvas");
  canvas.id = elementID;

  //var url = "https://cors-anywhere.herokuapp.com/https://honeyshri001.github.io/SriTatavarthi/pdf/sanchika/" + obj.url;
  //var url2 = "https://honeyshri001.github.io/SriTatavarthi/pdf/" + obj.url;

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
  div.className = "card img-thumbnail";
  //div.style = "max-width: 22rem;";

  var divBody = document.createElement("div");
  divBody.className = "card-body";

  divBody.innerHTML = '<h5 class="card-title">' + obj.title + "</h5>";
  divBody.innerHTML += '<p class="card-text">' + obj.desc + "</p>";
  divBody.innerHTML += '<a href="' + url2 + '" target="_blank" class="btn btn-primary">Read</a></a>';

  //canvas.className = "card-img card-img-top";
  section.appendChild(div);
  div.appendChild(canvas);
  div.appendChild(divBody);

  return section;
}

function getThumbTemplate() {
  var str = '<div class="card">';
  str = str + '<div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">{DIV}';

  str = str + ' <a href="#!">';
  str = str + '   <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>';
  str = str + "  </a>";
  str = str + " </div>";
  str = str + '<div class="card-body">';
  str = str + '  <h5 class="card-title">Card title</h5>';
  str = str + ' <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card`s content.</p>';
  str = str + '  <a href="#!" class="btn btn-primary">Button</a>';
  str = str + " </div>";
  str = str + "</div>";

  return str;
}
