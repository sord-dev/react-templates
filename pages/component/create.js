import React from 'react'
import { FileUploadForm, Layout } from '../../components'
import { useAuth } from '../../contexts/authContext'

function Create() {
    const { user } = useAuth();
    return (
        <Layout>
            <FileUploadForm user={user} />
        </Layout>
    )
}

export default Create;