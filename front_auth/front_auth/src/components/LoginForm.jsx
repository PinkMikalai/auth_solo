import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api";

function LoginForm () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    //pour rediriger vers une autre page
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const result = await login(email, password);
            // console.log('mon token ->', result.token);

            //je stock mon token dans le localstorage de mon client
            localStorage.setItem('token', result.token);
            //modifier le message de validation
            setMessage('connexion réussie');
            //redirection apres 3 secondes
            setTimeout(() => {
                navigate('/profile')
            }, 3000);
        } catch (error) {
            console.error('error', error);
            setMessage(error);
        }finally{
            setLoading(false);
        }
        
    }

    return(
        <div>
            <h2>page login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)} 
                        required 
                        disabled={loading}
                    />
                </div>
                <div>
                    <label htmlFor="password">MDP:</label>
                    <input 
                        type="password"
                        id="password"
                        value={password} 
                        onChange={(e)=>{setPassword(e.target.value)}}
                        required
                        disabled={loading}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Chargement' : 'Connexion'}
                </button>
            </form>

            {/* afficher les message de succes et d'erreurs */}
            {message}

            <p>pas de compte? <Link to={'/register'}>Inscription</Link></p>
        </div>
    )
}

export default LoginForm;