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
  var str = "";
  str = '<div class="col-12 col-md-4 col-lg-3 col-sm-6 g-2">';
  str += '<div class="card img-thumbnail">';
  // str += '<iframe src="' + elem.url + '" title="YouTube video player"';
  // str += 'frameborder="0"';
  // str += 'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"';
  // str += "allowfullscreen></iframe>";
  str += "<object loading='lazy' data=" + elem.url + "></object>";
  str += '<div class="card-body">';
  str +=
    '<h5 class="card-title">' +
    // elem.title +
    // (elem.pdf != ""
    //   ? ' <img src="https://img.icons8.com/office/30/null/pdf.png" data-bs-target="#modal' + key + '" style="cursor:pointer"></img>'
    //   : "");
    elem.title +
    (elem.pdf != ""
      ? ' <i data-bs-toggle="modal" style="cursor: pointer;color:rgb(166, 77, 77)" data-bs-target="#myModal' + key + '" class="fas fa-file-pdf"></i>'
      : "");
  str += '</h5><p class="card-text">' + elem.desc + "</p>";
  str += "</div>";
  str += "</div>";
  str += "</div>";

  if (elem.pdf != "") {
    str += '<div class="modal fade" id="myModal' + key + '">';
    str += '<div class="modal-dialog modal-xl">';
    str += '<div class="modal-content">';
    str += '  <div class="modal-header">';
    str += '     <h5 class="modal-title">' + elem.title + "<br/>" + elem.desc + "</h5>";
    str += '    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>';
    str += "</div>";
    str += '<div class="modal-body">';
    //str += '   <iframe loading="lazy" src="' + elem.pdf + '" width="100%" height="600px"></iframe>';
    str += "<object loading='lazy'  data=" + elem.url + "></object>";
    str += "</div>";
    str += "</div>";
    str += "</div>";
    str += "</div>";
  }

  return str;
}

const scrollTop = function () {
  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = "&uarr;";
  scrollBtn.setAttribute("id", "scroll-btn");
  document.body.appendChild(scrollBtn);

  const scrollBtnDisplay = function () {
    window.scrollY > window.innerHeight ? scrollBtn.classList.add("show") : scrollBtn.classList.remove("show");
  };
  window.addEventListener("scroll", scrollBtnDisplay);

  const scrollWindow = function () {
    // if (window.scrollY != 0) {
    //   setTimeout(function () {
    //     window.scrollTo(0, window.scrollY - 350);
    //     scrollWindow();
    //   }, 10);
    // }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  scrollBtn.addEventListener("click", scrollWindow);
};
scrollTop();
