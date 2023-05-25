import React from 'react'
import { FileUploadForm, Layout } from '../../components'
import { useAuth } from '../../contexts/authContext'
import { useRouter } from 'next/router';

function Create() {
    const { user } = useAuth();

    return (
        <Layout>
            <h1>Upload Component</h1>
            <FileUploadForm user={user} />
        </Layout>
    )
}

export default Create;