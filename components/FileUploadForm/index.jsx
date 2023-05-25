import axios from 'axios';
import React, { useState } from 'react';

import { BiQuestionMark } from 'react-icons/bi'

import JSONPretty from 'react-json-pretty';
import theme from 'react-json-pretty/themes/acai.css';

import styles from './styles.module.css'

const uploadComponent = async (data, setError) => {
  try {
    const res = await axios.post('http://localhost:3000/api/component/create', data);
    console.log(res.data) // toast notification for success or fail (prompt to look at component?)
  } catch (error) {
    console.log(error);
    setError(error.message)
  }

}

export const FileUploadForm = ({ user = null, setShow }) => {
  const [fileName, setFileName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [json, setJSON] = useState('{ "items": [{ "tag": "github", "color": "white" }, { "tag": "linkedin", "color": "blue" }, { "tag": "cv", "color": "green" }], "thumbnail": "https://somerandom.place.png" }');

  const [error, setError] = useState(null);
 

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

      setTimeout(async () => await uploadComponent({ ...item, title: fileName, user_id: user.user_id, defaultProps: json }, setError), 200)
    }
  };

  return (
    <form className={styles['form']} onSubmit={handleSubmit}>
      {error ? error : null}
      <div className={styles['input-group']}>
        <label htmlFor="component_name" >Component Title</label>
        <input type="text" name="component_name" onChange={e => setFileName(e.target.value)} required />
      </div>

      <div className={styles['input-group']}>
        <label htmlFor="component_default_props" >Component Default Props</label>
        <textarea type="text" onChange={e => setJSON(e.target.value)} value={json}/>
        <JSONPretty data={json} theme={theme} />
      </div>

      <div className={styles['input-group']}>
        <label htmlFor="file_upload">Component JSX and CSS Files</label>
        <input type="file" multiple onChange={handleFileChange} required />
      </div>

      <div>
        <p className={styles['faq']} onClick={() => setShow(true)}>
          <BiQuestionMark /> How do I upload a component?
        </p>
      </div>

      <button type="submit" className={'btn ' + styles['btn']} >Upload Component</button>

    </form>
  );
};
