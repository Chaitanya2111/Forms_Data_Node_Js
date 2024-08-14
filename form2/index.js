const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/form.html')
})


app.post('/submit',(req,res)=>{
    const name =  req.body.name;
    const sirname =  req.body.sirname;
    const email = req.body.email;
    const mobilenumber = req.body.mobilenumber;
    const age = req.body.age;
    const degree = req.body.degree;
    const state = req.body.state;
 

    const sql = require('mssql/msnodesqlv8');

    const config ={
        user : 'sa',
        password : '12345678',
        server : 'MSI\\SQLEXPRESS',
        database : 'demo'
    };

    sql.connect(config,err =>{
        if(err){
            console.log(err);
            return;
        }

        console.log('Connected to MSSQL');

        const request = new sql.Request();
        request.query(`INSERT INTO formdata (name,sirname,email,mobilenumber,age,degree,state) VALUES ('${name}','${sirname}','${email}','${mobilenumber}','${age}','${degree}','${state}')`,(err,result)=>{
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


app.listen(3002,()=>{
    console.log('Server is running on http://localhost:3002')
})
