import { useState } from "react";
import { Layout, UserForm } from "../components";
import { useAuth } from "../contexts/authContext";

import styles from '../styles/Register.module.css'
import { useRouter } from "next/router";

export default function Login() {
    const [error, setError] = useState(null)
    const { login } = useAuth();
    const router = useRouter()

    const onSubmit = async e => {
        e.preventDefault()
        const data = new FormData(e.target);

        let username = data.get('username').toString();
        let password = data.get('password').toString();

        if (!username || !password) return;

        const formValues = { username, password }

        try {
            await login(formValues)
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
                <UserForm onSubmit={onSubmit} page="Login" error={error} />
            </div>
        </Layout>
    )
}