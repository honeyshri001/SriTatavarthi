/* const navLinks = document.querySelectorAll(".nav-item");
const menuToggle = document.getElementById("navbarSupportedContent");
const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });
navLinks.forEach((l) => {
  l.addEventListener("click", () => {
    bsCollapse.toggle();
  });
}); */

//var jsonFilePath = "https://drive.google.com/file/d/13i9MJDaxYJ7-U_R4x-uYqSXF4wACDY_J/view"; //../data/data.json
var jsonFilePath = "../data/data.json";

$.getJSON(jsonFilePath, {
  format: "json",
})
  .done(function (data) {
    var itmShatam = [];
    var itmAvadanam = [];

    $.each(data.data, function (key, val) {
      if (val.type === 1) itmShatam.push(template1(val, key));
      if (val.type === 2) itmAvadanam.push(template1(val, key));
    });

    var divShatam = $("#divShatam");
    divShatam.html(itmShatam.join(""));

    var divAvadanam = $("#divAvadanam");
    divAvadanam.append(itmAvadanam.join(""));
  })
  .fail(function (xhr, textStatus, errorThrown) {
    //alert(xhr.responseText);
    //alert(textStatus);
  });

function template1(elem, key) {
  var obj = {
    title: elem.title,
    pdf: elem.pdf,
  };
  var str = "";
  str = '<div class="col-12 col-md-4 col-lg-3 col-sm-6 g-2">';
  str += '<div class="card img-thumbnail">';
  str += "<object loading='lazy' data=" + elem.url + "></object>";
  str += '<div class="card-body p-2">';
  str += '<h5 class="card-title">' + elem.title + "</h5>";
  str += '<p class="card-text">' + elem.desc + "</p>";
  str += "</div>";
  str +=
    '<div class="card-footer text-muted">' +
    (elem.pdf != ""
      ? 'View PDF  <a style="color: #dd4b39;" role="button"><i class="fas fa-file-pdf" data-mdb-toggle="modal" data-mdb-target="#pdviewerModal" onclick="viewPDF(\'' +
        elem.title +
        " | " +
        elem.desc +
        "' ,'" +
        elem.pdf +
        "');\"></i></a>"
      : "-NO PDF-") +
    "</div>";
  str += "</div>";
  str += "</div>";

  return str;
}

const scrollTop = function () {
  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = "&uarr;";
  scrollBtn.setAttribute("id", "scroll-btn");
  scrollBtn.setAttribute("class", "btn text-white btn-floating m-1");
  document.body.appendChild(scrollBtn);

  const scrollBtnDisplay = function () {
    window.scrollY > window.innerHeight ? scrollBtn.classList.add("show") : scrollBtn.classList.remove("show");
  };
  window.addEventListener("scroll", scrollBtnDisplay);

  const scrollWindow = function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  scrollBtn.addEventListener("click", scrollWindow);
};
scrollTop();

function viewPDF(title, pdf) {
  let url = "https://drive.google.com/viewerng/viewer?embedded=true&url=https://honeyshri001.github.io/SriTatavarthi/" + pdf;

  let iframe = document.getElementById("pdfViewer");
  let pdftitle = document.getElementById("pdfviewerTitle");
  pdftitle.innerHTML = title;
  iframe.setAttribute("src", url);
}
