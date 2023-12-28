import { BasePropertyProps } from 'adminjs';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { Editor } from 'react-draft-wysiwyg';
import { Editor } from '@tinymce/tinymce-react';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const RichTextEditorPage: React.FC<BasePropertyProps> = (props) => {
  // const { onChange, value } = props;

  // const handleChange = (content: string) => {
  //   onChange(content);
  // };
  const [richTextContent, setRichTextContent] = useState('');

  //   const handleSave = () => {
  //     onSave(richTextContent);
  //     // You can add additional logic here, such as saving to the server
  //   };
  return (
    // <ReactQuill
    //     value={richTextContent}
    //     onChange={(value) => setRichTextContent(value)}
    //     modules={{
    //       // Configure modules as needed, including image editing options
    //       toolbar: [
    //         [{ header: [1, 2, false] }],
    //         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    //         [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    //         ['link', 'image'],
    //         ['clean'],
    //       ],
    //     }}
    //     formats={[
    //       'header',
    //       'bold', 'italic', 'underline', 'strike', 'blockquote',
    //       'list', 'bullet',
    //       'link', 'image',
    //     ]}
    //   />
    //   <div>
    //   <h2>CKEditor 5 React App</h2>
    //   <CKEditor
    //     editor={ ClassicEditor }
    //     data="<p>Hello from CKEditor 5!</p>"
    //     onReady={ ( editor ) => {
    //       console.log( "CKEditor5 React Component is ready to use!", editor );
    //     } }
    //     onChange={ ( event, editor ) => {
    //       const data = editor.getData();
    //       console.log( { event, editor, data } );
    //     } }
    //   />
    // </div>
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
        images_upload_url: '/upload-image-endpoint', // Replace with your server endpoint
        image_edit_button: 'ImageEdit',
        // images_upload_handler: function (blobInfo, success, failure) {
        //   // Handle image upload to your server here
        //   // Call success with the image URL after successful upload
        //   // Call failure if there's an error
        // },
      }}
      // onEditorChange={handleEditorChange}
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
