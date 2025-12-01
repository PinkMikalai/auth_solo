//import des hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfil } from "../services/api";

function ProfilePage() {
    //hook de navigation
    const navigate = useNavigate();
    //state de stockage
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    //chargé au chargement de la page
    useEffect(()=>{
        async function handleProfile() {
            //recuperer le token dans le localstorage
            const token = localStorage.getItem('token');
            if(!token){
                navigate('/login');
                return;
            }
            try {
                //on call l'api! function getProfile
                const data = await getProfil(token);
                
                setUser(data.user);

            } catch (error) {
                console.log('erreur', error);
                setError(error.message);

                //gestion au cas ou le token est invalide ou introuvable
                if(error.message.includes('401') || error.message.includes('Token')){
                    localStorage.removeItem('token');
                    navigate('/login');
                }

            }finally{
                setLoading(false);
            }
        }

        //appel de ma function
        handleProfile();
    }, [navigate])
  
    if(loading){
        return(
            <div>
                en chargement
            </div>
        )
    }
    
    return(
        <div>
            <h2>profile page</h2>
            {user && (
                <div>
                    <p>id: {user.id}</p>
                    <p>email: {user.email}</p>
                    <p> date de naissance: {new Date(user.date_naissance).toLocaleDateString()}</p>
                    <p> ville de naissance: {user.lieu_naissance}</p>
                    <p>age: {new Date().getFullYear() - new Date(user.date_naissance).getFullYear()}</p>
                    <p>inscrit le: {new Date(user.created_at).toLocaleDateString()}</p>
                 </div>
             )}
        </div>
    )
}
    
export default ProfilePage;