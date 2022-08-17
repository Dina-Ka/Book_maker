// Global variables
var siteNameInput = document.getElementById("siteNameInput");
var siteLinkInput = document.getElementById("siteLinkInput");
var saveBookMark = document.getElementById("savebookmark");
var bookMarkListArray = [];
var bookMarkList;
// End:: Globa; Variables

// ********** Add New Iteam *************

saveBookMark.onclick = function () {
  var siteNameValue = siteNameInput.value;
  var siteLinkValue = siteNameInput.value;
  var bookmarkJson = {
    name: siteNameValue,
    link: siteLinkValue,
  };
  bookMarkListArray.push(bookmarkJson);
  displaybookmarker();
  clearinputs();
  console.log("1");

  localStorage.setItem("bookmarker", JSON.stringify(bookMarkListArray));
};

// Display bookmarker
function displaybookmarker() {
  bookMarkList = "";
  console.log("2");
  bookMarkListArray.forEach((bookMarkElement) => {
    bookMarkList += `
    <div class="list-group-item mb-4 bg-light shadow ">
    <div class="row">
        <div class="col-lg-8 col-md-8 col-sm-12 ">
            <div class="pt-2">
                ${bookMarkElement.name}
            </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 ">
            <a class="btn btn-outline-info mt-1 btn-sm" href="${bookMarkElement.link}" target="_blank">Visit</a>
            <button class="btn btn-outline-success mt-1 btn-sm">Edit</button>
            <button class="btn btn-outline-danger mt-1 btn-sm">Delete</button>
        </div>
    </div>
</div>
    
    `;
  });
  document.getElementById("bookmarklist").innerHTML = bookMarkList;
}
function displaynobookmarker() {
  bookMarkList = "";
  bookMarkList += `
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 ">
                <div class="pt-2">
                <i>
                There is no saved items in the list
                </i>
                </div>
            </div> 
        </div>
        
        `;

  document.getElementById("bookmarklist").innerHTML = bookMarkList;
}

// Clear Inputs
function clearinputs() {
  document.getElementById("siteNameInput").value = "";
  document.getElementById("siteLinkInput").value = "";
}

// On page load
window.onload = function () {
  clearinputs();
  bookMarkListArray = JSON.parse(localStorage.getItem("bookmarker"));
  if (bookMarkListArray !== null) {
    displaybookmarker();
  } else {
    displaynobookmarker();
  }
};
