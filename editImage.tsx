import React, { useState } from "react";
import { Box, DropZone, Label } from "@adminjs/design-system";
import { EditPropertyProps } from "adminjs";

const FormPage: React.FC<EditPropertyProps> = (props) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDrop = (files: File[]) => {
    try {
      if (files.length > 0) {
        const fileArray = files.map((file) => file);

        setUploadedFile(files[0]); // Assuming you want to set the uploaded file somewhere
        props.onChange(props.property.name, [
          {
            file: fileArray,
          },
        ]);
      }      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box variant="grey" id="form">
      <Box variant="container">
        <Box p="xl">
          <Label>Attachment</Label>
          <DropZone multiple onChange={handleDrop} />
          {uploadedFile && <p>File uploaded: {uploadedFile.name}</p>}
        </Box>
      </Box>
    </Box>
  );
};

export default FormPage;
