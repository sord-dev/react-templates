import styles from '../styles/Home.module.css'
import { ComponentDisplayGrid, Layout } from '../components'

import { AiOutlineSearch } from 'react-icons/ai'
import { useEffect, useState } from 'react'

const TEMP_DATA = [
  {
    id: 1,
    title: 'Component One',
    publisher: 'Stef',
    publish_date: 'Monday 22 May 2023',
    thumbnail_url: 'https://via.placeholder.com/640x360'
  },
  {
    id: 2,
    title: 'Component Two',
    publisher: 'Stef',
    publish_date: 'Monday 22 May 2023',
    thumbnail_url: 'https://via.placeholder.com/640x360'
  },
  {
    id: 3,
    title: 'Component Three',
    publisher: 'Stef',
    publish_date: 'Monday 22 May 2023',
    thumbnail_url: 'https://via.placeholder.com/640x360'
  },
  {
    id: 4,
    title: 'Component Four',
    publisher: 'Stef',
    publish_date: 'Monday 22 May 2023',
    thumbnail_url: 'https://via.placeholder.com/640x360'
  }
];

export default function Home() {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => { // set query and reset form values
    e.preventDefault();

    const data = new FormData(e.target);
    const q = data.get('component');

    if (q) {
      setQuery(q);
      e.target.reset();
    }
  }

  useEffect(() => { // log query on stage change, will search for components from server
    if (!query) return;
    console.log(query)
  }, [query])

  return (
    <Layout>
      <section className={styles['title-section']}>
        <h3>Free Pre-made React Components</h3>
        <p>We&apos;re all sick of building the same components over and over... Well, here&apos;s a place to download them on the fly.</p>

        <HomePageSearchBar onSubmit={handleSearch} />
      </section>

      <section className={styles['latest-components-section']}>
        <div>
          <h4>Latest Components</h4>
          <p>Check out the most viewed latest components here.</p>
        </div>

        <ComponentDisplayGrid components={TEMP_DATA} />
      </section>
    </Layout>
  )
}

function HomePageSearchBar({onSubmit}) {
  return (
    <form onSubmit={onSubmit}>
    <input type="text" name='component' placeholder='Table component...' />
    <button className={styles['search-btn'] + ' btn'} ><AiOutlineSearch /></button>
  </form>
  )
}