import AdminJS from 'adminjs';
import { BasePropertyProps } from 'adminjs';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import React from 'react';


const ShowAction: React.FC<BasePropertyProps> = (props) => {
  const { record } = props;

  // Assuming you have a property named 'content' in your resource
  const s3Url = record.params.richTextContent || '';
  console.log(s3Url);

  const [fetchedContent, setFetchedContent] = React.useState('');

  React.useEffect(() => {
    // Fetch content from the S3 URL
    axios.get(s3Url)
  .then(response => {
    // Access the content in the 'data' property of the response
    const fileContent = response.data;
    console.log('File Content:', fileContent);
  })
  .catch(error => {
    console.error('Error fetching file content:', error.message);
  });
    // const fetchData = async () => {
    //   if(s3Url){try {
    //     const response = await fetch(s3Url);
    //     const textData = await response.text();
    //     console.log(response);
    //     setFetchedContent(textData);
    //   } catch (error) {
    //     console.error('Error fetching content:', error);
    //   }}
    // };

    // fetchData();
  }, []);

  return (
    <div>
      <Editor
        apiKey="your-api-key"
        initialValue={fetchedContent}
        init={{
          height: 500,
          readonly: true,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
            'image', // Include the Image plugin
          ],
          toolbar: `undo redo | formatselect | bold italic backcolor | 
                     alignleft aligncenter alignright alignjustify | 
                     bullist numlist outdent indent | removeformat | help | image`,
          image_advtab: true,
        }}
      />
    </div>
  );
};
export default ShowAction;

