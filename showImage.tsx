import React from "react";
import { Box, Label } from "@adminjs/design-system";
import { BasePropertyProps } from "adminjs";

const CustomShowComponent: React.FC<BasePropertyProps> = (props) => {
    const { record, property } = props;
    // Reconstruct the items array
  const items = Object.keys(record.params)
  .filter(key => key.startsWith('items.'))
  .reduce((result, key) => {
    const match = key.match(/^items\.(\d+)\.(.+)/);
    if (match) {
      const index = parseInt(match[1]);
      const subkey = match[2];
      result[index] = result[index] || {};
      result[index][subkey] = record.params[key];
    }
    return result;
  }, []);    
  return (
    <Box variant="grey" id="show-images">
      <Box variant="container">
        <Box p="xl">
          <Label>Images</Label>
          {items.map((image, index) => (
            <div key={index} >
              <img src={`https://${image.bucket}.s3.${image.region}.amazonaws.com/${image.s3Key}`} alt={`Image ${index}`} style={{height:"100px", width: "100px"}}/>
              {/* <p>Date Created: {image.dateCreated.toISOString()}</p> */}
              {/* Add additional information as needed */}
            </div>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CustomShowComponent;