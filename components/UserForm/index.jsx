import styles from './styles.module.css'

export function UserForm({ onSubmit, page = 'Login' }) {
    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">React<span>Templates</span></h1>
            <h2>{page}</h2>

            <div>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" required />
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" required />
            </div>

            <button className={'btn ' + styles.submitBtn}>Submit</button>
        </form>
    )
}