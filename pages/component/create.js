import React, { useState } from 'react'
import { FileUploadForm, Layout, Modal } from '../../components'
import { useAuth } from '../../contexts/authContext'

function Create() {
    const { user } = useAuth();
    const [modal, setModal] = useState(false);

    return (
        <>
            <Layout>
                <h1>Upload Component</h1>
                <FileUploadForm user={user} setShow={setModal} />
            </Layout>
            <Modal show={modal} setShow={setModal}>
                <h2>Uploading a template component:</h2>

                <img src="https://media.tenor.com/WfPqwlGNOsUAAAAS/taco-time-dancing.gif" alt="taco time" width={'200px'} draggable='false' />
            </Modal>
        </>
    )
}

export default Create;