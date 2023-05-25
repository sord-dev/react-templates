import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { transformSync } from '@babel/core';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import styles from '../../styles/Preview.module.css'

import { GenerateDynamicComponent, Layout } from '../../components'
import { AiOutlineDownload, AiOutlineCode } from 'react-icons/ai'
import axios from 'axios';

export default function ComponentPage({ component }) {
  const router = useRouter();
  const [codePreview, setCodePreview] = useState(false)
  const { componentId } = router.query;

  if (component?.code && componentId) {
    return (
      <Layout>
        <h1>{component?.meta?.title}</h1>
        <div className={styles['component-preview']}>
          <div className={styles['toolbar']}>
            <div>
              <button className={'btn ' + styles['btn']} onClick={() => setCodePreview(prev => !prev)} ><AiOutlineCode /> Show Code</button>
              <button className={'btn ' + styles['btn']} ><AiOutlineDownload /> Download</button>
            </div>
          </div>

          <GenerateDynamicComponent code={component.code} css={component.css} />
          <CodePreview codePreview={codePreview} component={component} />
          <div className={styles['footer']}></div>
        </div>


      </Layout>
    );
  }

  return <h1>Component Not Found</h1>;
}

function CodePreview({ codePreview = false, component = { unconverted: 'Error loading string', css: 'Error loading string' } }) {
  return (
    <>
      {
        codePreview ?
          (
            <div className={styles['code-preview']}>
              <div>
                <h4>JSX</h4>
                <SyntaxHighlighter language="javascript">
                  {component?.unconverted}
                </SyntaxHighlighter>
              </div>

              <div>
                <h4>CSS</h4>
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

export async function getServerSideProps() {
  try {
    const componentDat = await axios.get('http://localhost:3000/api/component/1');

    const functionCode = extractFunctionFromCode(componentDat.data.jsx);
    const code = renderExtractedFunction(functionCode);

    return {
      props: {
        component: {
          code,
          css: componentDat.data.css,
          meta: { title: componentDat.data.title, author: componentDat.data.author.username },
          unconverted: componentDat.data.jsx
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