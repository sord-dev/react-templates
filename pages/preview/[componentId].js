import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { transformSync } from '@babel/core';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import styles from '../../styles/Preview.module.css'

import { GenerateDynamicComponent, Layout } from '../../components'
import { AiOutlineDownload, AiOutlineCode, AiOutlineDelete } from 'react-icons/ai'
import axios from 'axios';
import { useAuth } from '../../contexts/authContext';

export default function ComponentPage({ component }) {
  const router = useRouter();
  const { isMe } = useAuth();
  const [codePreview, setCodePreview] = useState(false)
  const { componentId } = router.query;

  let owner = isMe({ username: component?.meta?.author })

  const handleDeleteComponent = async (id) => {
    const res = await axios.post('http://localhost:3000/api/component/delete', { component_id: id });

    if (res.status == 200) {
      router.push('/')
      console.log(res.data)
    } else {
      console.log(res)
    }

  };

  if (component?.code && componentId) {
    return (
      <Layout>
        <div className={styles['metadata']}>
          <h1>{component?.meta?.title}</h1>
          <p>{component?.meta?.author}</p>
        </div>

        <div className={styles['component-preview']}>
          <div className={styles['toolbar']}>
            <div>
              {owner ? <button onClick={() => handleDeleteComponent(component?.meta?.component_id)} className={'btn ' + styles['btn']}><AiOutlineDelete /> Delete</button> : null}
            </div>

            <div>
              <button className={'btn ' + styles['btn']} onClick={() => setCodePreview(prev => !prev)} ><AiOutlineCode /> Show Code</button>
              <button className={'btn ' + styles['btn']} ><AiOutlineDownload /> Download</button>
            </div>
          </div>

          <GenerateDynamicComponent code={component.code} css={component.css} defaultProps={component.defaultProps} />
          <CodePreview codePreview={codePreview} component={component} copyToClipboard={copyToClipboard} />
          <div className={styles['footer']}></div>
        </div>


      </Layout>
    );
  }

  return <h1>Component Not Found</h1>;
}

function CodePreview({ codePreview = false, component = { unconverted: 'Error loading string', css: 'Error loading string' }, copyToClipboard }) {
  return (
    <>
      {
        codePreview ?
          (
            <div className={styles['code-preview']}>
              <div>
                <div className={styles['code-toolbar']}>
                  <h4>JSX</h4>
                  <button onClick={() => copyToClipboard(component?.unconverted)}>Copy</button>
                </div>
                <SyntaxHighlighter language="javascript">
                  {component?.unconverted}
                </SyntaxHighlighter>
              </div>

              <div>
                <div className={styles['code-toolbar']}>
                  <h4>CSS</h4>
                  <button onClick={() => copyToClipboard(component?.css)}>Copy</button>
                </div>
                <SyntaxHighlighter language="css">
                  {component?.css}
                </SyntaxHighlighter>
              </div>
            </div>
          )
          : null
      }
    </>
  )
}

export async function getServerSideProps({ query }) {
  try {
    const componentDat = await axios.get(`http://localhost:3000/api/component/${query.componentId}`);

    const functionCode = extractFunctionFromCode(componentDat.data.jsx);
    const code = renderExtractedFunction(functionCode);

    const defaultProps = {
      thumbnail: 'https://i.pinimg.com/originals/74/52/d9/7452d9e99c3d42089f992e6d9b06724e.jpg',
      items: [{ color: 'blue', tag: 'github' }, { color: 'green', tag: 'linkedin' }, { color: 'purple', tag: 'cv' }]
    }

    return {
      props: {
        component: {
          code,
          css: componentDat.data.css,
          meta: { title: componentDat.data.title, author: componentDat.data.author.username, component_id: componentDat.data.component_id },
          unconverted: componentDat.data.jsx,
          defaultProps
        },
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        component: null,
        error: error.message
      }
    };
  }
}

// server side helpers

function extractFunctionFromCode(code) {
  const exportPattern = /export/gmi;
  const importPattern = /^import .* from .*/gmi;

  return code.replace(exportPattern, '').replace(importPattern, '');
}

function renderExtractedFunction(functionCode) {
  const transformedCode = transformSync(functionCode, {
    presets: ['@babel/preset-react'],
    ast: false,
    code: true,
  }).code;

  return transformedCode.replace(/;\s*$/, '');
}

// client side helpers

function copyToClipboard(string) {
  navigator.clipboard.writeText(string);
}