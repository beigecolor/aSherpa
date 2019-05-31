console.log('insane in the brain');

var $usersList;
var allUsers = [];

$(document).ready(function(){

  $usersList = $('#userTarget');
  $.ajax({
    method: 'GET',
    url: '/api/users',
    success: handleSuccess,
    error: handleError
  });

  $('#newUserForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/users',
      data: $(this).serialize(),
      success: newUserSuccess,
      error: newUserError
    });
  });

  $usersList.on('click', '.deleteBtn', function() {
    console.log('clicked delete button to', '/api/users/'+$(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/api/users/'+$(this).attr('data-id'),
      success: deleteUserSuccess,
      error: deleteUserError
    });
  });

});

function getUserHtml(user) {
  return `<hr>
          <p>
            <b>${user.firstName}</b>
            by ${user.lastName}
            <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${user._id}>Delete</button>
          </p>`;
}

function getAllUserHtml(users) {
  return users.map(getUserHtml).join("");
}

// helper function to render all posts to view
// note: we empty and re-render the collection each time our post data changes
function render () {
  // empty existing posts from view
  $usersList.empty();

  // pass `allBooks` into the template function
  var usersHtml = getAllUsersHtml(allUsers);

  // append html to the view
  $usersList.append(usersHtml);
};

function handleSuccess(json) {
  allUsers = json;
  render();
}

function handleError(e) {
  console.log('oh no!!!');
  $('#userTarget').text('Failed to load users, is the server working?');
}

function newUserSuccess(json) {
  $('#newUserForm input').val('');
  allUsers.push(json);
  render();
}

function newUserError() {
  console.log('newuser error!');
}

function deleteUserSuccess(json) {
  var user = json;
  console.log(json);
  var userId = user._id;
  console.log('delete user', userId);
  // find the book with the correct ID and remove it from our allBooks array
  for(var index = 0; index < allUsers.length; index++) {
    if(allUsers[index]._id === userId) {
      allUsers.splice(index, 1);
      break;  // we found our book - no reason to keep searching (this is why we didn't use forEach)
    }
  }
  render();
}

function deleteUserError() {
  console.log('deleteuser error!');
}