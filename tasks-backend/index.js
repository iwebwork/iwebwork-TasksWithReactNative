const app = require('express')()

app.get('/', (req, res) => {
    res.status(200).send('Meu Back')
});

app.listen(3000, () =>{
    console.log('back rodando...')
});