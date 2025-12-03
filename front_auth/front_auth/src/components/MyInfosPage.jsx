import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfil } from "../services/api";


function MyInfosPage() {
    //hook de navigation
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [astronomy, setAstronomy] = useState('');
    const [meteo, setMeteo] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    //ma logique pour récupérer les informations personnelles et pour l afficher
    useEffect(() => {
        async function handleMyInfos() {
            const token = localStorage.getItem('token');
            
            //si token est invalide ou introuvable tu rederige
            if(!token){
                navigate('/login');
                return;
            }

            
            try {
                const data = await getProfil(token);
                setEmail(data.user.email);
                setAstronomy(data.astronomy);
                setMeteo(data.meteo);
            } catch(error) {
                console.log("erreur lors de generation d information", error);
            } finally {
                setLoading(false);
            }
        }
        //appel de ma function
        handleMyInfos();
    }, [navigate]);
    if(loading){
        return(
            <div>
                Je genere les informations...
            </div>
        )
    }
  
    return(
        <div>
            <h1>Salut {email}</h1>
            <div>
                <h2>Astronomie pour aujourd'hui:</h2>
                <p>{astronomy}</p>
            </div>
            <div>
                <h2>Meteo pour la semaine actuelle:</h2>
                <p>{meteo}</p>
            </div>
        </div>
    )
}



export default MyInfosPage;