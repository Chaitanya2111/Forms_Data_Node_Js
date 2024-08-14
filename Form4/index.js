const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/Form.html');

})

app.post('/submitFormData',(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const department = req.body.department;
    const dateOfBirth = req.body.dateOfBirth;
    // const fatherName = req.body. FatherMotherHusbundName;
    const gender = req.body.gender;
    const maritalStatus = req.body.maritalStatus;
    const height = req.body.height;
    const bloodGroup = req.body.bloodGroup;


    const sql =  require('mssql/msnodesqlv8');

    const config = {
        user :'sa',
        password : '12345678',
        server : 'MSI\\SQLEXPRESS',
        database: 'EMPDB'
    };

    sql.connect(config,(err)=>{
        if(err){
            console.log(err);
            return;
        }

        console.log('Connected to MSSQl');

        const request = new sql.Request();

        request
        .input("name", sql.NVARCHAR(255), name)
        .input("email", sql.NVARCHAR(255) ,email)
        .input("password", sql.NVARCHAR(255), password)
        .input("department", sql.NVARCHAR(255), department)
        .input("dateOfBirth", sql.Date, dateOfBirth)
        // .input(" FatherMotherHusbundName", sql.VarChar, fatherName)
        .input("gender", sql.NVARCHAR(255), gender)
        .input("maritalStatus", sql.NVARCHAR(255), maritalStatus)
        .input("height", sql.Int, height)
        .input("bloodGroup", sql.NVARCHAR(255), bloodGroup);

        console.log('Name:', name);

        request.query(`
        INSERT INTO EmployeeInfo (name, email, password, department, dateOfBirth, gender, maritalStatus, height, bloodGroup)
        VALUES (@name, @email, @password, @department, @dateOfBirth,  @gender, @maritalStatus, @height, @bloodGroup)`,
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                console.log("Data Saved Successfully")
            }

            sql.close();
            res.send("Form submitted successfully");
        }
        );
        
    });
});

app.listen(3007,()=>{
    console.log("Server is running on  http://localhost:3007")
})
