import React from 'react'

export function GenerateDynamicComponent({ code, css, defaultProps }) {
    let defaults = JSON.parse(defaultProps);

    const DynamicComponent = eval(`(${code})`);
    const jsx = <DynamicComponent React={React} defaultProps={JSON.parse(defaults)} />;

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: css }} />
            <div style={{ maxWidth: 'max-content', margin: '24px auto' }}>
                {jsx}
            </div>
        </>
    )
}