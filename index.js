import express from 'express';
import accountsRouter from './routes/accounts.js';
import {promises as fs} from 'fs';

const {readFile, writeFile} = fs;

const app = express();
app.use(express.json());

app.use("/accounts", accountsRouter);

app.listen(3000, async () => {
	
    try{
        await readFile("accounts.json");
        console.log("arquivo ja estava criado");	
    } catch(err){
        const initialJson = {
            nextId: 1,
            accounts:[]
        }		
        await writeFile("accounts.json", JSON.stringify(initialJson)).then( () => {
            console.log("arquivo criado com sucesso");
        }).catch(err => {
            console.log(err);
        });
    }

});



