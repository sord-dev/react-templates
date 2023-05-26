import React from 'react';
import { useRouter } from 'next/router';
import { transformSync } from '@babel/core';

import styles from '../../../styles/Preview.module.css'

import { GenerateDynamicComponent } from '../../../components'
import axios from 'axios';


export default function ComponentPage({ component }) {
  const router = useRouter();
  const { componentId } = router.query;

  if (component?.code && componentId) {
    return (
      <div style={{maxWidth: 'max-content', margin: '0 auto'}}>
          <GenerateDynamicComponent code={component.code} css={component.css} defaultProps={component.defaultProps} />
      </div>
    );
  }

  return <h1>Component Not Found</h1>;
}

export async function getServerSideProps({ query }) {
  try {
    const componentDat = await axios.get(`http://localhost:3000/api/component/${query.componentId}`);

    const functionCode = extractFunctionFromCode(componentDat.data.jsx);
    const code = renderExtractedFunction(functionCode);

    return {
      props: {
        component: {
          code,
          css: componentDat.data.css,
          meta: { title: componentDat.data.title, author: componentDat.data.author.username, component_id: componentDat.data.component_id },
          unconverted: componentDat.data.jsx,
          defaultProps: componentDat.data.defaultProps
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