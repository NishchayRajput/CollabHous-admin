// RichTextEditorPage.jsx
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditorPage = ({ onSave }) => {
  const [richTextContent, setRichTextContent] = useState('');

  const handleSave = () => {
    onSave(richTextContent);
    // You can add additional logic here, such as saving to the server
  };

  return (
    <div>
      <ReactQuill
        value={richTextContent}
        onChange={(value) => setRichTextContent(value)}
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image', 'video'],
            ['clean'],
          ],
        }}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default RichTextEditorPage;
