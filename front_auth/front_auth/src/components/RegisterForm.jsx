import { useState } from "react";
import { register } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function RegisterForm() {
    //etat pour stocker les valeur du form
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [date_naissance, setDate_naissance] =useState();
    const [lieu_naissance, setLieu_naissance] = useState('');
    //etat pour stocker les messages d'erreur
    const [message, setMessage] = useState('');
    //etat pour savoir si on est en train d'envoyer une requeste
    const [loading, setLoading] = useState(false);
    //hook pour naviguer vers une autre page
    const navigate = useNavigate();

    //la function utilisé quand on soumet le formulaire
    async function handleSubmit(event) {
        //empeche le rechargement de la page quand on soumet le form
        event.preventDefault();
        //Je change le status du state loading
        setLoading(true);
        setMessage('');
        try {
            //on appelant notre service api
            const result = await register(email, date_naissance, lieu_naissance, password);
            //on affiche un message de succes
            setMessage('super frero, inscription réussit, éclate toi avec les injections sql')
            //faire une redirection vers login
            setTimeout(()=>{
                navigate('/login');
            }, 3000)
        } catch (error) {
            console.error('erreur', error);
            setMessage(error.message);
        }finally{
            setLoading(false);
        }
    }

    return (
        <div>
            <h2>Inscription</h2>

            {/*formulaire avec la logique de submit*/}
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
                <div>
                   <label htmlFor="date_naissance">Date de naissance:</label>
                    <input 
                        type="date"
                        id="date_naissance"
                        name="date_naissance"
                        min="1900-01-01"
                        max={new Date().toISOString().split('T')[0]}
                        placeholder="jj/mm/aaaa"
                        value={date_naissance} 
                        onChange={(e)=>{setDate_naissance(e.target.value)}}
                        required
                        disabled={loading}
                    />
                </div>
                <div>
                    <label htmlFor="lieu_naissance">Ville de naissance:</label>
                    <input 
                        type="text"
                        id="lieu_naissance"
                        name="lieu_naissance"
                        placeholder="Entrez votre ville de naissance"
                        value={lieu_naissance} 
                        onChange={(e)=>setLieu_naissance(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Chargement' : 'sinscrire'}
                </button>
            </form>

            {/* afficher les message de succes et d'erreurs */}
            {message}

            <div>deja un compte ? <Link to={'/login'}>Se connecter</Link></div>
        </div>
    )
}

export default RegisterForm;