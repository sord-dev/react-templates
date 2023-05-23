import { Layout, UserForm } from "../components";

import styles from '../styles/Register.module.css'

export default function Login() {
    const onSubmit = e => {
        e.preventDefault()
        const data = new FormData(e.target);

        let username = data.get('username');
        let password =  data.get('password');

        if(!username || !password) return; 

        const formValues = { username, password }
        console.log(formValues)

        e.target.reset()
    }

    return (
        <Layout>
            <div className={styles['form-container']}>
                <UserForm  onSubmit={onSubmit} page="Register" />
            </div>
        </Layout>
    )
}