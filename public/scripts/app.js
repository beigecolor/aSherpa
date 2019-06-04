console.log("insane in the membrane");

//remove alerts
if (document.querySelectorAll(".alert")) {
  let delay = 0;

  setTimeout(() => {
    const alerts = document.querySelectorAll(".alert");
    alerts.forEach(alert => {
      delay += 500;
      setTimeout(() => {
        alert.remove();
      }, delay);
    });
  }, 3000);
}

document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems);
});
