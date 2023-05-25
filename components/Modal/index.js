import React from 'react'
import styles from './styles.module.css'

export function Modal({ children, show, setShow }) {
    if (!show) return null;

    return (
        <div className={styles['modal-container']}>
            <div className={styles['modal-content']}>
                <div className={styles['toolbar']}>
                    <button className='btn' onClick={() => setShow(false)}>X</button>
                </div>
                {children}
            </div>
        </div>
    )
}