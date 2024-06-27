function previewImage(event) {
  var reader = new FileReader();
  reader.onload = function() {
    var display_img = document.getElementById('display_img');
    display_img.src = reader.result;
  }
  reader.readAsDataURL(event.target.files[0]);
}