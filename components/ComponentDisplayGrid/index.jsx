import Image from 'next/image'
import React from 'react'

import styles from './styles.module.css'
import Link from 'next/link';

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

function ComponentDisplayGridItem({ title, author, createdAt, thumbnail_url, component_id, User }) {
    let src = thumbnail_url ? thumbnail_url : 'https://via.placeholder.com/640x360';

    let username = author ? author.username : User.username;

    return (
        <Link href={`/preview/${component_id}`}>
            <div className={styles['grid-item']}>
                <div className={styles['grid-item-thumbnail']}>
                    <Image src={src} alt="component showcase item" fill />
                </div>
                <h5>{title}</h5>
                <div className={styles['grid-item-meta']}>
                    <div>
                        {username}
                    </div>

                    <p>{new Date(createdAt).toLocaleString()}</p>
                </div>
            </div>
        </Link>
    )
} 