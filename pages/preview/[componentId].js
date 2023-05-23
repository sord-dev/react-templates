import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { transformSync } from '@babel/core';
import fs from 'fs';

export default function ComponentPage({ component }) {
  const router = useRouter();
  const { componentId } = router.query;

  useEffect(() => {
    document.body.style.backgroundColor = '#313338';
  }, []);

  if (component.code && componentId) {
    const DynamicComponent = eval(`(${component.code})`);
    const jsx = <DynamicComponent React={React} />;
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: component.css }} />
        <div style={{ maxWidth: 'max-content', margin: '24px auto' }}>
          {jsx}
        </div>
      </>
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