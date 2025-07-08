document.addEventListener('DOMContentLoaded', () => {
  const blogImageInput = document.getElementById('photo');
  const previewImg = document.getElementById('photoPreview');

  blogImageInput.addEventListener('change', function () {
    const file = this.files && this.files[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = function (e) {
        previewImg.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  });
});
