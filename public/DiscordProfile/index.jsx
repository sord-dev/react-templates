function DiscordProfile({ React, items = [{ tag: 'github', color: 'white' }, { tag: 'linkedin', color: 'blue' }, { tag: 'cv', color: 'green' }] }) {
  return (
    <div className={'profile'}>
      <div className={'thumbnail'}>
        <img src="/bg.png" alt="profile background" draggable='false' fill />
      </div>

      <div className={'body'}>
        <div className={'meta'}>
          <h2>Ash</h2>
          <p>imsocold96#1172</p>
          <p>i hate living here istg</p>
        </div>

        <div className={'spacer'}></div>

        <h3>ABOUT ME</h3>
        <p>just straight struggling fr</p>

        <h3>SOCIALS</h3>
        <div className={'tag-list'}>
          {items.map(i => <div className={'social-tag'} key={i.tag}> <div style={{ backgroundColor: i.color }}></div> {i.tag}</div>)}
        </div>
      </div>
    </div>
  )
};