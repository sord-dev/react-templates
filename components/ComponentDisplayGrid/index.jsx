import Image from 'next/image'
import React from 'react'

import styles from './styles.module.css'

// components = [c, c, c, c]
// c = { title: 'component name', publisher: 'stef', publish_date: 'Monday 22 May 2023', thumbnail_url: "https://via.placeholder.com/640x360" }

export function ComponentDisplayGrid({ components = [] }) {
    const Error = ({ message = '' }) => (<h2>{message}</h2>)
    if (!components.length) return <Error message={'no components provided'} />;

    return (
        <div className={styles['latest-components-grid']}>
            {components.map((c, i) => <ComponentDisplayGridItem  {...c} key={c.component_id || i + c.title} />)}
        </div>
    )
}

function ComponentDisplayGridItem({ title, User, createdAt, thumbnail_url }) {
    let src = thumbnail_url ? thumbnail_url : 'https://via.placeholder.com/640x360';

    return (
        <div className={styles['grid-item']}>
            <div className={styles['grid-item-thumbnail']}>
                <Image src={src} alt="component showcase item" fill />
            </div>
            <h5>{title}</h5>
            <div className={styles['grid-item-meta']}>
                <div>
                    {User.username}
                </div>

                <p>{createdAt}</p>
            </div>
        </div>
    )
} 