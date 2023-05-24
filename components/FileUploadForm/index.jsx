import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import JSONPretty from 'react-json-pretty';
import theme from 'react-json-pretty/themes/acai.css';

import styles from './styles.module.css'

const uploadComponent = async (data) => {
  const res = await axios.post('http://localhost:3000/api/component/create', data);

  console.log(res) // toast notification for success or fail (prompt to look at component?)
}

export const FileUploadForm = ({ user = null }) => {
  const router = useRouter()
  if (!user) router.push('/login') // change this auth
  const [fileName, setFileName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [json, setJSON] = useState('');

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
    <form className={styles['form']} onSubmit={handleSubmit}>
      <div className={styles['input-group']}>
        <label htmlFor="component_name" >Component Title</label>
        <input type="text" name="component_name" onChange={e => setFileName(e.target.value)} required />
      </div>

      <div className={styles['input-group']}>
        <label htmlFor="component_default_props" >Component Default Props</label>
        <input type="text" onChange={e => setJSON(e.target.value)} />
        <JSONPretty data={json} theme={theme} />
      </div>

      <div className={styles['input-group']}>
        <label htmlFor="file_upload">Component JSX and CSS Files</label>
        <input type="file" multiple onChange={handleFileChange} required />
      </div>

      <button type="submit" className={'btn ' + styles['btn']} >Upload Component</button>
    </form>
  );
};
