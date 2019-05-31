console.log('insane in the brain');

$.ajax({
  method: "POST",
  url: "http://localhost:3000/api/cities",
  data: $('#city-form').serialize(),
  success: handleCityCreateSuccess,
  error: handleCityCreateError
});

const handleCityCreateSuccess = responseData => {
  console.log("city was successfully created!");
  console.log(`The name of the new city entered is ${responseData.name}`);
  // render book to page
}

const handleError =(jqXHR, status, error) => {  
  console.log(`error: ${error}`);
}