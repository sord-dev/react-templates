import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const uploadComponent = async (data) => {
  const res = await axios.post('http://localhost:3000/api/component/create', data);

  console.log(res) // toast notification for success or fail (prompt to look at component?)
}

export const FileUploadForm = ({ user = null }) => {
  const router = useRouter()
  if(!user) router.push('/login') // change this auth
  const [fileName, setFileName] = useState('');
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

      setTimeout(() => uploadComponent({ ...item, title: fileName, user_id: user.user_id }), 200)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="component_name" onChange={e => setFileName(e.target.value)} />
      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};
