const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/form.html')
})


app.post('/submit',(req,res)=>{
    const name =  req.body.name;
    const email = req.body.email;
    const age = req.body.age;
    const message = req.body.message;
    const gender = req.body.gender;
 

    const sql = require('mssql/msnodesqlv8');

    const config ={
        user : 'sa',
        password : '12345678',
        server : 'MSI\\SQLEXPRESS',
        database : 'FormDb'
    };

    sql.connect(config,err =>{
        if(err){
            console.log(err);
            return;
        }

        console.log('Connected to MSSQL');

        const request = new sql.Request();
        request.query(`INSERT INTO std (name,email,age,message,gender) VALUES ('${name}','${email}','${age}','${message}','${gender}'`, (err,result)=>{
            if(err){
                console.log(err)
            }else{
                console.log('Data saved successfully!')
            }

            sql.close();
            res.send('Form submitted successfully!')
        });
    });
});


app.listen(3004,()=>{
    console.log('Server is running on http://localhost:3004')
})
