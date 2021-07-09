$("#create_user").submit(function (event) {
  alert("Data succeffuly inserted");
});

if (window.location.pathname == "/") {
  $ondelete = $(".table.tbody td a.delete");
  $ondelete.click(function () {
    var id = $(this).attr("data-id");
  });

  var request = {
    url: `http://localhost:3000/api/users/${id}`,
    method: "DELETE",
  };

  if (confirm("Do you really want to delete the record?")) {
    $.ajax(request).done(function (response) {
      alert("Data is successfully deleted");
      location.reload();
    });
  }
}
