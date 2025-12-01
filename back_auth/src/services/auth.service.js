import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db/index.js';
import { env } from '../config/env.js';

export async function register({email,date_naissance, lieu_naissance,  password}) {
    // validation basique (si les champs sont présent)
    if(!email || !date_naissance || !lieu_naissance || !password) {
       const error = new Error('email, date de naissance, lieu de naissance et mdp obligatoire');
       error.status = 400;
       throw error;
    }
    //hash du mdp
    const hash = await bcrypt.hash(password, 10); 
    //enregistrer l'utilisateur dans la db
    const query = `INSERT INTO users (email, date_naissance, lieu_naissance, password_hash) VALUES (?,?,?,?)`;
    const [result] = await pool.execute(query, [email, date_naissance, lieu_naissance, hash]);

    return {
        id: result.insertId,
        email,
        date_naissance, 
        lieu_naissance,
        created_at: new Date()
    }
}