document.addEventListener('DOMContentLoaded', () => {
  const imgPreview = document.querySelector('.image__preview');
  const imgInput =
    document.getElementById('addPostCoverImage') ||
    document.getElementById('editPostCoverImage') ||
    document.getElementById('photo');

  imgInput.addEventListener('change', function () {
    const file = this.files && this.files[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = function (e) {
        imgPreview.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  });
});
