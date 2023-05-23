import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export function Layout({ children }) {
    return (
        <>
            <Head>
                <title>ReactTemplates</title>
                <meta
                    name="description"
                    content="Free react component templates - I'm sick of building these components over and over as well, here's a place to download them on the fly." />
                <link rel="icon" href="/favicon.svg" />
            </Head>

            <header>
                <Link href={'/'}>
                    <div className='title-container container'>
                        <Image src={'/favicon.svg'} width={72} height={72} alt='main logo' />
                        <h2 className='title'>
                            React
                            <span>
                                Templates
                            </span>
                        </h2>
                    </div>
                </Link>

                <div className='nav-controls'>
                    <Link href={'/login'}><button className='btn'>Login</button></Link>
                    <Link href={'/register'}><button className='btn primary'>Sign Up</button></Link>
                    <Link href={'/component/create'}><button className='btn primary'>Upload</button></Link>
                </div>
            </header>

            <main className='container'>
                {children}
            </main>

            <footer>
                <div className='footer-container container'>
                    <p>Made with ❤️ by <a href="http://github.com/sord-dev" target="_blank" rel="noopener noreferrer">stef.</a></p>
                </div>
            </footer>
        </>
    )
}
