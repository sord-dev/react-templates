import React, { useState } from 'react';
import { FileUploadForm, Layout, Modal } from '../../components';
import { useAuth } from '../../contexts/authContext';

import { Prism } from 'react-syntax-highlighter';

function Create() {
    const { user } = useAuth();
    const [modal, setModal] = useState(false);

    return (
        <>
            <Layout>
                <FileUploadForm user={user} setShow={setModal} />
            </Layout>

            <Modal show={modal} setShow={setModal}>
                <h3>Utilizing Default Props:</h3>
                <p>There are two ways to upload JSX, the first way is using the <b>defaultProps</b> parameter provided to each component, you&apos;d do so like demonstrated below.</p>
                <Prism language='javascript'>
                    {discordComponentExample}
                </Prism>
                <p>Making use of <b>defaultProps.thumbnail</b> for example, we&apos;ll be able to provide whatever image we want to the component.</p>
                <br />
                <h3>Providing defaultProps:</h3>
                <p>Provide the keys and values inside of a JSON object you can add to the form, this will be provided to the preview component as the <b>defaultProps</b>.</p>

                <div style={{ maxWidth: '50%', margin: '0 auto' }}>
                    <img src="https://i.postimg.cc/mrYjbbSS/component-upload-ssl.png" alt="component upload form screenshot" style={{ border: '1px solid black' }} />
                </div>
                <br />

                <h3>Utilizing ES6 default prop syntax:</h3>
                <p>Alternatively, you can use the shorthand for default props syntax, which looks like this.</p>
                <Prism language='javascript'>
                    {discordComponentExampleDefaultSyntax}
                </Prism>
            </Modal>
        </>
    )
}

const discordComponentExampleDefaultSyntax = `function DiscordProfile({ React, items = [{ tag: 'github', color: 'white' }, { tag: 'linkedin', color: 'blue' }, { tag: 'cv', color: 'green' }] }) {
    return (
      <div className={'profile'}>
        <div className={'thumbnail'}>
          <img src="/bg.png" alt="profile background" draggable='false' fill />
        </div>
        <div className={'avatar'}>
          <img src="https://i.pinimg.com/originals/74/52/d9/7452d9e99c3d42089f992e6d9b06724e.jpg" alt="pfp" draggable='false' />
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
  };`

const discordComponentExample = `function DiscordProfile({ React, defaultProps }) {
    return (
      <div className={'profile'}>
        <div className={'thumbnail'}>
          <img src="/bg.png" alt="profile background" draggable='false' fill />
        </div>
        <div className={'avatar'}>
          <img src={defaultProps.thumbnail} alt="pfp" draggable='false' />
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
            {defaultProps.items.map(i => <div className={'social-tag'} key={i.tag}> <div style={{ backgroundColor: i.color }}></div> {i.tag}</div>)}
          </div>
        </div>
      </div>
    )
  };`

export default Create;