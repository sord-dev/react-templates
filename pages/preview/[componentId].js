import React from 'react';
import { useRouter } from 'next/router';
import { transformSync } from '@babel/core';

import styles from '../../styles/Preview.module.css'

import fs from 'fs';

import { GenerateDynamicComponent, Layout } from '../../components'
import { AiOutlineDownload, AiOutlineCode } from 'react-icons/ai'

export default function ComponentPage({ component }) {
  const router = useRouter();
  const { componentId } = router.query;

  if (component.code && componentId) {
    console.log(component);
    return (
      <Layout>
        <h1>{component?.meta?.title}</h1>
        <div className={styles['component-preview']}>
          <div className={styles['toolbar']}>
            <div>
              <button className={'btn ' + styles['btn']} ><AiOutlineCode /> Show Code</button>
              <button className={'btn ' + styles['btn']} ><AiOutlineDownload /> Download</button>
            </div>
          </div>

          <GenerateDynamicComponent code={component.code} css={component.css} />

          <div className={styles['footer']}></div>
        </div>
      </Layout>
    );
  }

  return <h1>Component Not Found</h1>;
}

export async function getServerSideProps() {
  const [str, css] = await Promise.all([
    fs.promises.readFile('./public/DiscordProfile/index.jsx').then((file) => file.toString()),
    fs.promises.readFile('./public/DiscordProfile/index.module.css').then((file) => file.toString()),
  ]);

  const functionCode = extractFunctionFromCode(str);
  const code = renderExtractedFunction(functionCode);

  return {
    props: {
      component: {
        code,
        css,
        meta: { title: 'Discord Component!' }
      },
    },
  };
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