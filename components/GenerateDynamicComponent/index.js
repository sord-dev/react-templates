import React from 'react'

export function GenerateDynamicComponent({ code, css }) {
    const DynamicComponent = eval(`(${code})`);
    const jsx = <DynamicComponent React={React} />;

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: css }} />
            <div style={{ maxWidth: 'max-content', margin: '24px auto' }}>
                {jsx}
            </div>
        </>
    )
}