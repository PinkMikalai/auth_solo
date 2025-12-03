


import { generateAstronomy, generateMeteo } from '../services/gemini.service.js';


export async function myInfosController(req, res, next){
    // ici je recupere les infos de l'utilisateur
    const user = req.user;
    const { date_naissance, lieu_naissance } = user;
    

    try {
        if(date_naissance || lieu_naissance){
            //ici je genere les donnees generatives via l utilisateur
            const astronomy = await generateAstronomy(date_naissance, lieu_naissance);
            const meteo = await generateMeteo(lieu_naissance);
            //ici je renvoi la response avec les donnees generatives
            // console.log('astronomy', astronomy);
            // console.log('meteo', meteo);
            
            return res.status(200).json({
                success: true,
                message: "astronomie et meteo generatives",
                data: { astronomy, meteo }
            });
        }else{
            throw new Error("date de naissance et lieu de naissance sont requis");
        }
    }catch (error) {
        console.log('erreur lors de la generation des infos', error);
        next(error);
    }
}
