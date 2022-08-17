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
};

// Display bookmarker
function displaybookmarker() {
  bookMarkList = "";
  bookMarkListArray.forEach((bookMarkElement, key) => {
    bookMarkList += `
    <div class="list-group-item mb-4 bg-light shadow ">
    <div class="row">
        <div class="col-lg-8 col-md-8 col-sm-12 ">
            <div class="pt-2" id="name${key}">
                ${bookMarkElement.name}
            </div>
            <div class="pt-2 editinput" id="editinput${key}">
                <input type="text" value=" ${bookMarkElement.name}" class="form-control"  id="editinputfield${key}">
            </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 ">
            <a class="btn btn-outline-info mt-1 btn-sm" href="${bookMarkElement.link}" target="_blank">Visit</a>
            <button class="btn btn-outline-success mt-1 btn-sm" onclick=updateItem(${key}) id="editbtn${key}">Edit</button>
            <button class="btn btn-outline-success mt-1 btn-sm updatebtn" onclick=saveupdateItem(${key}) id="updatebtn${key}">update</button>
            <button class="btn btn-outline-danger mt-1 btn-sm" onclick=deleteItem(${key})>Delete</button>
        </div>
    </div>
</div>
    
    `;
  });
  if (bookMarkListArray !== null && bookMarkListArray.length) {
    document.getElementById("bookmarklist").innerHTML = bookMarkList;
    Array.from(document.getElementsByClassName(`editinput`)).forEach((box) => {
      box.style.display = "none";
    });
    Array.from(document.getElementsByClassName(`updatebtn`)).forEach(
      (updatebox) => {
        updatebox.style.display = "none";
      }
    );
  } else {
    displaynobookmarker();
  }
  localStorage.setItem("bookmarker", JSON.stringify(bookMarkListArray));
}
function displaynobookmarker() {
  bookMarkList = "";
  bookMarkList += `
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 ">
                <div class="pt-2">
                <i class="nosaved">
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
  checkerdisplay();
};

function checkerdisplay() {
  if (bookMarkListArray !== null && bookMarkListArray.length) {
    displaybookmarker();
  } else {
    displaynobookmarker();
    bookMarkListArray = [];
  }
}
// Delete element
function deleteItem(key) {
  Swal.fire({
    title: "Do you want to delete the selected item?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "confirm",
    denyButtonText: `Don't save`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      bookMarkListArray.splice(key, 1);
      displaybookmarker();
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });
}

// Update
function updateItem(key) {
  document.getElementById(`name${key}`).style.display = "none";
  document.getElementById(`editinput${key}`).style.display = "inline-block";
  document.getElementById(`editbtn${key}`).style.display = "none";
  document.getElementById(`updatebtn${key}`).style.display = "inline-block";
}

// save updates
function saveupdateItem(key) {
  bookMarkListArray[key].name = document.getElementById(
    `editinputfield${key}`
  ).value;
  document.getElementById(`name${key}`).style.display = "inline-block";
  document.getElementById(`editinput${key}`).style.display = "none";
  document.getElementById(`editbtn${key}`).style.display = "inline-block";
  document.getElementById(`updatebtn${key}`).style.display = "none";
  displaybookmarker();
}

// Search
document.getElementById("search-input").onkeyup = function () {
  var searchBookMarker = "";
  if (this.value.length) {
    bookMarkListArray.forEach((element, key) => {
      console.log(element);
      if (element.name.toLowerCase().includes(this.value.toLowerCase())) {
        searchBookMarker += `
            <div class="list-group-item mb-4 bg-light shadow ">
            <div class="row">
                <div class="col-lg-8 col-md-8 col-sm-12 ">
                    <div class="pt-2" id="name${key}">
                        ${element.name}
                    </div>
                    <div class="pt-2 editinput" id="editinput${key}">
                        <input type="text" value=" ${element.name}" class="form-control"  id="editinputfield${key}">
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 ">
                    <a class="btn btn-outline-info mt-1 btn-sm" href="${element.link}" target="_blank">Visit</a>
                    <button class="btn btn-outline-success mt-1 btn-sm" onclick=updateItem(${key}) id="editbtn${key}">Edit</button>
                    <button class="btn btn-outline-success mt-1 btn-sm updatebtn" onclick=saveupdateItem(${key}) id="updatebtn${key}">update</button>
                    <button class="btn btn-outline-danger mt-1 btn-sm" onclick=deleteItem(${key})>Delete</button>
                </div>
            </div>
        </div>
            `;
      }
      document.getElementById("bookmarklist").innerHTML = searchBookMarker;

      Array.from(document.getElementsByClassName(`editinput`)).forEach(
        (box) => {
          box.style.display = "none";
        }
      );
      Array.from(document.getElementsByClassName(`updatebtn`)).forEach(
        (updatebox) => {
          updatebox.style.display = "none";
        }
      );
    });
  } else {
    checkerdisplay();
  }
};
