// pages/components/[componentId].js
import { useRouter } from 'next/router';
import { renderToStaticMarkup } from 'react-dom/server';

const components = { // from db/server-side
  'component1': () => <h1 className="component1">Component 1</h1>,
  'component2': () => <h1 className="component2">Component 2</h1>,
};

const styles = { // from db/server-side
  'component1': '.component1 { color: red; }',
  'component2': '.component2 { color: blue; }',
};

export default function ComponentPage() {
  const router = useRouter();
  const { componentId } = router.query;

  if (typeof componentId === 'string' && componentId in components) {
    const Component = components[componentId];
    const css = styles[componentId];
    const html = renderToStaticMarkup(<Component />);
    return (
      <>
        <style>{css}</style>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </>
    );
  }

  return <h1>Component Not Found</h1>;
}
