import { BasePropertyProps } from 'adminjs';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HtmlEditor, Link, Image, Inject, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';

// import { Editor } from 'react-draft-wysiwyg';
import { Editor } from '@tinymce/tinymce-react';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const RichTextEditorPage: React.FC<BasePropertyProps> = (props) => {
  const [richTextContent, setRichTextContent] = useState('');

  const handleEditorChange = (content, editor) => {
    setRichTextContent(content);
    console.log(content);
    props.onChange(content);
    props.onChange('richTextContent', content);
    // You can perform additional actions with the content if needed
  };
  return (
    <div>
    <Editor
      apiKey="your-api-key"
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
          'image', // Include the Image plugin
        ],
        toolbar: `undo redo | formatselect | bold italic backcolor | 
                   alignleft aligncenter alignright alignjustify | 
                   bullist numlist outdent indent | removeformat | help | 
                   image`, // Add the 'image' button to the toolbar
        image_advtab: true,
        file_picker_types: 'image', // Allow image uploads
        file_picker_callback: function(callback, value, meta) {
          // Open a file picker dialog
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');

          // Handle file selection
          input.onchange = function() {
            const file = (input.files as FileList)[0];
            const reader = new FileReader();

            // Read the file as a data URL
            reader.onload = function() {
              const dataUrl = reader.result as string;

              // Pass the selected image URL to the editor
              callback(dataUrl, { alt: file.name });
            };

            reader.readAsDataURL(file);
          };

          input.click();
        },
      }}
      onEditorChange={handleEditorChange}
    />
  </div>
    // <Editor
    //     // editorState={content} // You should convert this from your stored JSON string
    //     // onEditorStateChange={handleEditorStateChange}
    //     wrapperClassName="wrapper-class"
    //     editorClassName="editor-class"
    //     toolbarClassName="toolbar-class"
    //   />
  );
};

export default RichTextEditorPage;
