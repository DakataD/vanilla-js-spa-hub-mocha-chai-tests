import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../data/auth.js';
import { createSubmitHandler } from '../utils.js';
import {notificationView} from '../views/notification.js';


const loginTemplate = (onLogin) => html`
    <section id="login">
        <div class="form">
        <h2>Login</h2>
        <form class="login-form" @submit=${onLogin}>
            <input type="text" name="email" id="email" placeholder="email" />
            <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            />
            <button type="submit">login</button>
            <p class="message">
            Not registered? <a href="/register">Create an account</a>
            </p>
        </form>
        </div>
    </section>
`;

export function loginPage(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(onLogin)));

    
    async function onLogin({email, password}, form) {

        if (email == '' || password == '') {
            return notificationView('All fields are required');
        }

        await login(email, password);
        form.reset();
        
        ctx.page.redirect('/');
    }
}
