import React from 'react'
import styles from './index.module.css'
import Image from 'next/image'

const items = [{ tag: 'github', color: 'white' }, { tag: 'linkedin', color: 'blue' }, { tag: 'cv', color: 'green' }]

export function DiscordProfile() {
  return (
    <div className={styles['profile']}>
      <div className={styles['thumbnail']}>
        <Image src="/bg.png" alt="profile background" draggable='false' fill />
      </div>
      <div className={styles['avatar']}>
          <img src="https://i.pinimg.com/originals/74/52/d9/7452d9e99c3d42089f992e6d9b06724e.jpg" alt="pfp" draggable='false' />
        </div>

      <div className={styles['body']}>
        <div className={styles['meta']}>
          <h2>Ash</h2>
          <p>imsocold96#1172</p>
          <p>i hate living here istg</p>
        </div>

        <div className={styles['spacer']}></div>

        <h3>ABOUT ME</h3>
        <p>just straight struggling fr</p>

        <h3>SOCIALS</h3>
        <div className={styles['tag-list']}>
          {items.map(i => <div className={styles['social-tag']} key={i.tag}> <div style={{ backgroundColor: i.color }}></div> {i.tag}</div>)}
        </div>
      </div>
    </div>
  )
};