import express from 'express';
import {promises as fs} from 'fs';

const {readFile, writeFile} = fs;

const router = express.Router();

router.post('/', async (req, res) => {
   
    try {
        let account = req.body

        const data = JSON.parse(await readFile("accounts.json"));
        account = {id: data.nextId++, ...account};

        data.accounts.push(account);
        await writeFile("accounts.json", JSON.stringify(data, null, 2));
        
        res.send(account);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.get('/', async (req, res) => {
    try{
        const data = JSON.parse(await readFile('accounts.json'));
        const accounts = data.accounts;
        res.send(accounts);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.get('/:id', async (req, res) => {
    try{
        const data = JSON.parse(await readFile('accounts.json'));
        const account = data.accounts.find(account => account.id === parseInt(req.params.id));
        res.send(account);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const data = JSON.parse(await readFile('accounts.json'));
        data.accounts = data.accounts.filter(account => account.id !== parseInt(req.params.id));
        await writeFile('accounts.json', JSON.stringify(data, null, 2));
        res.end();
    } catch (error) {
        res.status(400).send({error: error.message})
    }
});

//atualização completa do objeto
router.put('/', async (req, res) => {
   try {
        const account = req.body;
        
        const data = JSON.parse(await readFile('accounts.json'));
        const index = data.accounts.findIndex(a => a.id === account.id);
        data.accounts[index] = account;

        await writeFile('accounts.json', JSON.stringify(data, null, 2));
        res.send( data.accounts[index]);
   } catch (error) {
        res.status(400).send({error: error.message});
   }
});

//atualização parcial do objeto
router.patch('/updateBalance', async (req, res) => {
    try {
        const account = req.body;

        const data = JSON.parse(await readFile('accounts.json'));
        const index = data.accounts.findIndex(a => a.id === account.id);
        data.accounts[index].balance = account.balance;
        await writeFile('accounts.json', JSON.stringify(data, null, 2));
        res.send(data.accounts[index]);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

export default router;