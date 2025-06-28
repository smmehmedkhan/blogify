document.addEventListener('DOMContentLoaded', () => {
  const selectorId = document.getElementById('addPostTextArea');

  tinymce.init({
    selector: selectorId,
    plugins:
      'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
    toolbar:
      'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',

    // Configurations for image uploads
    images_upload_url: '/api/images/upload',
    images_upload_credentials: true,
    images_reuse_filename: true,

    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author name',
    mergetags_list: [
      { value: 'First.Name', title: 'First Name' },
      { value: 'Email', title: 'Email' },
    ],
    /**

     ai_request: (request, respondWith) =>
      respondWith.string(() =>
        Promise.reject('See docs to implement AI Assistant'),
      ),
    */
  });
});
