//importer l'outil de gemini
import { GoogleGenerativeAI } from "@google/generative-ai";
//import de la key api
import { env } from '../config/env.js'

//initialise un objet du client gemini ( on initialise l'outil qui nous permet de communiquer avec l'ia)
const genAI = new GoogleGenerativeAI(env.geminiApiKey);
//le model de l'ia quon souhaite utiliser 
const model = genAI.getGenerativeModel({model: 'gemini-2.0-flash-lite'});

export async function test() {
    
    const prompt = "le meilleur framework dev est ? ";


    const result = await model.generateContent(prompt);
    const response = result.response;

    const text = response.text();

    console.log(text);
    
}

// une function qui nous permet de genener l astronomie d utilisateur
//dans les parametre je indique de ce que j ai besoin de l'utilisateur pour generer l'astronomie
export async function generateAstronomy(date_naissance, lieu_naissance) {
   

    //ici je genere le prompt pour la generation de l'astronomie
    const prompt = `
    genere un resume de l'astronomie pour ajourd hui  via les informations suivantes :
    - ${date_naissance},
    - ${lieu_naissance}, je veux un text court net et concise
    `;
    //ici je genere le contenu de l'astronomie

    const result = await model.generateContent(prompt);
    const response = result.response;

    const text = response.text();
   
    return text;
}

export async function generateMeteo(lieu_naissance){
    const prompt = `
    donne moi la meteo pour la semaine actuelle en fonction de la localisation via les informations suivantes :
    ma ville : ${lieu_naissance}, je veux que le text soit court net et concise
    `;
    //ici je genere le contenu de la meteo

    const result = await model.generateContent(prompt);
    const response = result.response;

    const text = response.text();
    console.log("service meteo",text);
    return text;
} 