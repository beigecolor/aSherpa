console.log("insane in the membrane");

/**
 * Queries all the cities
 * @param {city} params
 */
function getAllCities(params) {
  $.ajax({
    method: "GET",
    url: `/api/v1/cities/${params}`,
    success: handleSuccess,
    error: err => {
      console.log(err);
    }
  });
}

/**
 * Returns the promise success
 * @param {*} response
 */
function handleSuccess(response) {
  response.forEach(user => {
    let card = `
      
        <div class="card horizontal">
          <div class="card-image">
            <img src="images/jim.jpeg"">
          </div>
          <div class="card-stacked">
            <div class="card-content">
              <div><strong>Name</strong></div>
              <div>${user.name}</div>
              <div><strong>City</strong></div>
              <div>${user.city}</div>
            </div>
            <div class="card-action">
              <a href = "mailto:${user.email}">Email Me</a>
            </div>
          </div>
        </div>
      
      `;
    $("#SearchCards").append(card);
  });
}

/**
 * Search for Local Cities
 */
$("#searchBtn").click(() => {
  const value = $("#searchLocal").val();
  getAllCities(value);
});

//remove alerts
// if (document.querySelectorAll(".alert")) {
//   let delay = 0;

//   setTimeout(() => {
//     const alerts = document.querySelectorAll(".alert");
//     alerts.forEach(alert => {
//       delay += 500;
//       setTimeout(() => {
//         alert.remove();
//       }, delay);
//     });
//   }, 3000);
// }

document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems);
});

// $userContainer.on("click", ".delete", handleDeleteclick);

// function handleDeleteclick(e) {
//   const userId = $(this)
//     .parent("")
//     .attr("id");
//   $.ajax({
//     method: "DELETE",
//     url: `${url}${movieId}`,
//     success: "/logout",
//     error: err => {
//       console.log(err);
//     }
//   });
// }
