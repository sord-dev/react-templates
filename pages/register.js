import { useRouter } from "next/router";
import { Layout, UserForm } from "../components";

import styles from '../styles/Register.module.css'
import { useAuth } from "../contexts/authContext";
import { useState } from "react";

export default function Register() {
    const [error, setError] = useState(null)
    const { register } = useAuth();
    const router = useRouter()

    const onSubmit = async e => {
        e.preventDefault()
        const data = new FormData(e.target);

        let username = data.get('username').toString();
        let password = data.get('password').toString();

        if (!username || !password) return;

        const formValues = { username, password }

        try {
            await register(formValues)
            setError('')
            router.push('/')
        } catch (e) {

            setError(e.response.data.error || e.message)
        }

        e.target.reset()
    }

    return (
        <Layout>
            <div className={styles['form-container']}>
                <UserForm onSubmit={onSubmit} page="Register" error={error} />
            </div>
        </Layout>
    )
}