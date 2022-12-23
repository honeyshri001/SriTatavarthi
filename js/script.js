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
      ? '<a style="color: #dd4b39;" role="button" data-mdb-toggle="modal" data-mdb-target="#pdviewerModal" onclick="viewPDF(\'' +
        elem.title +
        " | " +
        elem.desc +
        "','" +
        elem.pdf +
        '\');"> View PDF  <i class="fas fa-file-pdf fa-lg"></i></a>'
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

$(".nav-link").click(function () {
  $(".navbar-collapse").collapse("hide");
});

let anotherPDF;
WebViewer(
  {
    path: "/lib", // path to the PDF.js Express'lib' folder on your server
    //licenseKey: "jSRLl6oLxSMaH9H8r786", // localhost
    licenseKey: "tKFsD7kxViaz7RlwUIP2", //netlify
    initialDoc: "",
    // initialDoc: '/path/to/my/file.pdf',  // You can also use documents on your server
  },
  document.getElementById("viewer")
).then((instance) => {
  anotherPDF = instance;
  instance.UI.setTheme("dark");
});

function viewPDF(title, pdf) {
  let pdftitle = document.getElementById("pdfviewerTitle");
  pdftitle.innerHTML = title;
  anotherPDF.UI.loadDocument("/" + pdf);
}
