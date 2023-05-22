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
            {components.map((c, i) => <ComponentDisplayGridItem  {...c} key={c.id || i+c.title} />)}
        </div>
    )
}

function ComponentDisplayGridItem({ title, publisher, publish_date, thumbnail_url = "https://via.placeholder.com/640x360" }) {
    return (
        <div className={styles['grid-item']}>
            <div className={styles['grid-item-thumbnail']}>
                <Image src={thumbnail_url} alt="component showcase item" fill />
            </div>
            <h5>{title}</h5>
            <div className={styles['grid-item-meta']}>
                <div>
                    {publisher}
                </div>

                <p>{publish_date}</p>
            </div>
        </div>
    )
} 