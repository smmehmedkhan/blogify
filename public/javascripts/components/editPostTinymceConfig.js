const getTinyConfig = {
  selector: 'textarea#editPostTextArea',
  width: '100%',
  height: 790,
  skin: 'oxide-dark',
  content_css: 'dark',
  resize: true,
  plugins: [
    'advlist',
    'anchor',
    'autolink',
    'autosave',
    'code',
    'codesample',
    'directionality',
    'emoticons',
    'fullscreen',
    'help',
    'image',
    'importcss',
    'insertdatetime',
    'lists',
    'link',
    'media',
    'nonbreaking',
    'pagebreak',
    'preview',
    'quickbars',
    'save',
    'searchreplace',
    'table',
    'visualblocks',
    'visualchars',
    'wordcount',
  ],
  toolbar: [
    'undo redo | formatselect | bold italic underline strikethrough | forecolor backcolor |',
    'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |',
    'link image media table blockquote | charmap insertdatetime | code preview fullscreen | help',
  ].join(' '),

  menubar: true,
  branding: false,
  statusbar: true,

  images_upload_url: '/api/images/upload',
  images_upload_credentials: true,
  images_reuse_filename: true,

  setup: function (editor) {
    editor.on('init', function () {
      editor.getContainer().style.border = '2px solid var(--border)';
      editor.getContainer().style.borderRadius = 'var(--radius)';
      editor.getContainer().style.background = 'var(--accent)';
    });
  },
};

document.addEventListener('DOMContentLoaded', function () {
  tinymce.init(getTinyConfig);
});
