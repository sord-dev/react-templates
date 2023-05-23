import React, { useState } from 'react';

export const FileUploadForm = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    setSelectedFiles(filesArray);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedFiles.length == 2) {
      let item = { css: '', code: '' };
      selectedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          const fileContent = reader.result;

          if (file.type == 'text/plain') {
            item.code = fileContent
          } else if (file.type == 'text/css') {
            item.css = fileContent
          } else return
        };

        reader.readAsText(file);
      });

      setTimeout(() => console.log(item), 200)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};
