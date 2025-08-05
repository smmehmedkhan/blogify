/**
 * EasyMDE Configuration for Blogify
 * Handles markdown editor initialization with media upload and drag & drop support
 */
class EasyMDEConfig {
  // Configuration constants
  static CONSTANTS = {
    MAX_FILE_SIZE: 100 * 1024 * 1024, // 100 MB
    READING_SPEED: 200, // Words per minute
    UPLOAD_ENDPOINT: '/api/media/upload', // Changed to media endpoint
    SUPPORTED_MEDIA_TYPES: {
      image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      video: ['video/mp4', 'video/webm', 'video/ogg'],
      audio: ['audio/mp3', 'audio/wav', 'audio/ogg'],
    },
  };

  constructor() {
    this.csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute('content');
    this.editor = null;
    this.init();
  }

  /**
   * Initialize the EasyMDE editor
   */
  init() {
    const targetTextArea =
      document.getElementById('addPostTextArea') ||
      document.getElementById('editPostTextArea');
    if (!targetTextArea) return;

    this.editor = new EasyMDE({
      element: targetTextArea,
      ...this.getEditorConfig(),
    });

    this.setupDragAndDrop();
  }

  /**
   * Get complete editor configuration
   */
  getEditorConfig() {
    return {
      maxHeight: '717px',
      minHeight: '480px',
      placeholder: 'Start writing your blog post in Markdown...',
      initialValue:
        localStorage.getItem(`draft_${window.location.pathname}`) || '',
      forceSync: true,
      indentWithTabs: true,
      autosave: {
        enabled: true,
        uniqueId: `blogify_${window.location.pathname}`,
        delay: 3000,
      },
      renderingConfig: {
        singleLineBreaks: false,
        codeSyntaxHighlighting: true,
        markedOptions: { breaks: false, gfm: true },
      },
      status: this.getStatusConfig(),
      shortcuts: this.getShortcuts(),
      toolbar: this.getToolbar(),
      hideIcons: ['image'],
      uploadImage: true,
      imageUploadEndpoint: EasyMDEConfig.CONSTANTS.UPLOAD_ENDPOINT,
      onToggleFullScreen: (fullscreen) =>
        document.body.classList.toggle('easymde-fullscreen', fullscreen),
    };
  }

  /**
   * Configure status bar elements
   */
  getStatusConfig() {
    return [
      'autosave',
      'lines',
      'words',
      'cursor',
      {
        className: 'reading-time',
        defaultValue: (el) => (el.innerHTML = '0 min read'),
        onUpdate: (el) => {
          const readingTime = Math.ceil(
            (this.editor?.value() || '').split(' ').length /
              EasyMDEConfig.CONSTANTS.READING_SPEED,
          );
          el.innerHTML = `${readingTime} min read`;
        },
      },
    ];
  }

  /**
   * Define keyboard shortcuts
   */
  getShortcuts() {
    return {
      drawTable: 'Cmd-Alt-T',
      toggleBold: 'Cmd-B',
      toggleItalic: 'Cmd-I',
      toggleStrikethrough: 'Cmd-Alt-S',
      toggleCodeBlock: 'Cmd-Alt-C',
      togglePreview: 'Cmd-P',
      toggleSideBySide: 'F9',
      toggleFullScreen: 'F11',
    };
  }

  /**
   * Configure toolbar buttons
   */
  getToolbar() {
    return [
      'bold',
      'italic',
      'strikethrough',
      'heading',
      '|',
      'code',
      'quote',
      'unordered-list',
      'ordered-list',
      'clean-block',
      '|',
      'link',
      {
        name: 'upload-media',
        action: () => this.openMediaPicker(),
        className: 'fa fa-upload',
        title: 'Upload Media (Images, Videos, Audio)',
      },
      'table',
      'horizontal-rule',
      '|',
      'preview',
      'side-by-side',
      'fullscreen',
      '|',
      'undo',
      'redo',
      'guide',
      '|',
      {
        name: 'save-draft',
        action: (editor) => this.saveDraft(editor),
        className: 'fa fa-save',
        title: 'Save Draft (Ctrl+S)',
      },
      {
        name: 'word-count',
        action: (editor) => this.showWordCount(editor),
        className: 'fa fa-calculator',
        title: 'Word Count & Statistics',
      },
    ];
  }

  /**
   * Setup drag and drop functionality for all media types
   */
  setupDragAndDrop() {
    const codeMirror = this.editor.codemirror.getWrapperElement();

    const events = {
      dragover: (e) => {
        e.preventDefault();
        codeMirror.classList.add('drag-over');
      },
      dragleave: (e) => {
        e.preventDefault();
        codeMirror.classList.remove('drag-over');
      },
      drop: (e) => {
        e.preventDefault();
        codeMirror.classList.remove('drag-over');
        this.handleDroppedFiles(e.dataTransfer.files);
      },
    };

    Object.entries(events).forEach(([event, handler]) =>
      codeMirror.addEventListener(event, handler),
    );
  }

  /**
   * Handle dropped files - supports all media types
   */
  handleDroppedFiles(files) {
    const mediaFiles = Array.from(files).filter((file) =>
      this.isMediaFile(file),
    );

    if (mediaFiles.length === 0) {
      Toastify({
        text: 'Please drop media files only (images, videos, audio)',
        duration: 3000,
        backgroundColor: '#f44336',
      }).showToast();
      return;
    }

    mediaFiles.forEach((file) => this.uploadMedia(file));
  }

  /**
   * Check if file is a supported media type
   */
  isMediaFile(file) {
    return Object.values(EasyMDEConfig.CONSTANTS.SUPPORTED_MEDIA_TYPES)
      .flat()
      .includes(file.type);
  }

  /**
   * Open file picker for media selection
   */
  openMediaPicker() {
    const input = document.createElement('input');
    const acceptTypes = Object.values(
      EasyMDEConfig.CONSTANTS.SUPPORTED_MEDIA_TYPES,
    )
      .flat()
      .join(',');

    Object.assign(input, {
      type: 'file',
      accept: acceptTypes,
      multiple: true,
    });

    input.onchange = (e) => {
      Array.from(e.target.files).forEach((file) => this.uploadMedia(file));
      input.remove();
    };

    document.body.appendChild(input);
    input.click();
  }

  /**
   * Upload media file to server
   */
  uploadMedia(file) {
    if (!this.validateFile(file)) return;

    window.toast.show('info', 'File upload in progress...');

    const formData = new FormData();
    formData.append('file', file);

    fetch(EasyMDEConfig.CONSTANTS.UPLOAD_ENDPOINT, {
      method: 'POST',
      headers: { 'X-CSRF-Token': this.csrfToken },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Upload failed: ${response.status}`);
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data.location) {
          this.insertMediaMarkdown(data.location, file);
          window.toast.show('success', 'File uploaded successfully!');
        } else {
          throw new Error('Invalid server response');
        }
      })
      .catch((error) => {
        console.error('Media upload error:', error);
        window.toast.show('error', 'Media upload failed.');
      });
  }

  /**
   * Validate file size and type
   */
  validateFile(file) {
    if (!file) {
      window.toast.show('warning', 'Please select at least one media file');
      return false;
    }

    if (file.size > EasyMDEConfig.CONSTANTS.MAX_FILE_SIZE) {
      window.toast.show('warning', 'File size must be less than 100MB');
      return false;
    }

    if (!this.isMediaFile(file)) {
      window.toast.show('warning', 'File type is not supported');
      return false;
    }

    return true;
  }

  /**
   * Insert appropriate markdown based on media type
   */
  insertMediaMarkdown(url, file) {
    if (!this.editor) return;

    const cm = this.editor.codemirror;
    const cursor = cm.getCursor();
    const cleanName = file.name.replace(/\.[^/.]+$/, '');

    let markdown;
    if (file.type.startsWith('image/')) {
      markdown = `![${cleanName}](${url})`;
    } else if (file.type.startsWith('video/')) {
      markdown = `<video controls>\n  <source src="${url}" type="${file.type}">\n  Your browser does not support the video tag.\n</video>`;
    } else if (file.type.startsWith('audio/')) {
      markdown = `<audio controls>\n  <source src="${url}" type="${file.type}">\n  Your browser does not support the audio tag.\n</audio>`;
    }

    cm.replaceRange(markdown, cursor);
    cm.setCursor({ line: cursor.line, ch: cursor.ch + markdown.length });
    cm.focus();
  }

  /**
   * Save draft to localStorage
   */
  saveDraft(editor) {
    localStorage.setItem(`draft_${window.location.pathname}`, editor.value());
    window.toast.show('info', 'Post saved locally as a draft.');
  }

  /**
   * Show word count statistics
   */
  showWordCount(editor) {
    const text = editor.value();
    const words = text.split(/\s+/).filter((word) => word.length > 0).length;
    const chars = text.length;
    window.toast.show('info', `Words: ${words}, Characters: ${chars}`);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => new EasyMDEConfig());
