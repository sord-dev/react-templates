// pages/components/[componentId].js
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { transformSync } from '@babel/core';

import fs from 'fs';

export default function ComponentPage({ component }) {
  const router = useRouter();
  const { componentId } = router.query;

  useEffect(() => {
    document.body.style.backgroundColor = '#313338';
    return () => document.body.style.backgroundColor = 'white';
  }, [])

  if (component.code && componentId) {
    // Evaluate the cleaned code
    const DynamicComponent = eval(`(${component.code})`);

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: component.css }} />
        <div style={{ maxWidth: 'max-content', margin: '24px auto' }}>
          <DynamicComponent React={React} />
        </div>
      </>
    );
  }

  return <h1>Component Not Found</h1>;
}

function extractFunctionFromCode(code) {
  const exportPattern = /export/gmi;
  const importPattern = /^import .* from .*/gmi;

  let functionCode = code.replace(exportPattern, '');
  functionCode = functionCode.replace(importPattern, '');

  return functionCode;
}

function renderExtractedFunction(functionCode) {
  // Transform JSX to JavaScript using Babel
  const transformedCode = transformSync(functionCode, {
    presets: ['@babel/preset-react'],
    ast: false,
    code: true,
  }).code;

  // Remove the trailing semicolon if present
  const cleanedCode = transformedCode.replace(/;\s*$/, '');

  return cleanedCode;
}

export async function getServerSideProps() {
  const str = (
    await fs.promises.readFile('./public/DiscordProfile/index.jsx')
  ).toString();

  const functionCode = extractFunctionFromCode(str);
  const code = renderExtractedFunction(functionCode);

  const css = (
    await fs.promises.readFile('./public/DiscordProfile/index.module.css')
  ).toString();

  return {
    props: {
      component: {
        code,
        css,
      },
    },
  };
}
