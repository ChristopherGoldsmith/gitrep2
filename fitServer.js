const express = require('express');
const Datastore = require('nedb');
const { response } = require('express');
const app = express();
//set route
app.listen(4000, () => console.log('listening fitServer'))
//set static folder
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}))

//database creation and loading
const database = new Datastore('datastore.db');
database.loadDatabase();

//Body Parser and Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}));


app.post('/users', (request, response) => {
    console.log(`Creating Account UN:${request.body.username} PW:${request.body.password}`);
    const info = request.body;
    const un = request.body.username

    database.find({username: un}, (err, data) => {
        userInfo = data[0];
        if (err){
            console.log('error 400 /users');
        } else if (data[0]){
            console.log(`${data[0].username} is already taken, please choose another userID`)
        } else {
            database.insert(info);
        };
    })

    //response.json(data);
});
app.post('/workouts', (req, res) => {
    console.log(`Creating Workout Name:${req.body.name}`);
    const user = req.body.username;
    database.find({username: user}, (err, data) => {
        userInfo = data[0];
        if(err){
            console.log('400 error apx line 32');
        } else {
            workout = req.body;
            const check = userInfo.workoutInfo;
            let x = 0;
            for(item of check){
                console.log(check[x].name ,'1', workout.name)
                if (check[x].name == workout.name){
                    let thisWorkout = check[x];
                    database.remove({username: `${user}`}, {$set: {thisWorkout: []}});
                }
                x = x + 1;
            };    
            database.update({username: `${user}`}, {$addToSet: {workoutInfo: workout}});
            res.json(userInfo);
        };
    });
});

app.get('/users/:username', (req, res) =>{
    const info = req.params;
    const un = info.username;
    database.find({username: un}, (err, data) => {
        userInfo = data[0];
        console.log(userInfo, '1');
        if(err){
            console.log('An error has occured', '2');
            return res.end();
        } else if(data == false){
            console.log('no user of this name found');
            return res.json({username: false});
        } else {
            return res.json(userInfo);
        };
    });
});
app.get('/authUsers/:username/:password', (req, res) =>{
    console.log('line 46');
    const info =  req.params;
    const un = info.username;
    const pw = info.password;
    database.find({username: un}, (err, data) => {
        userInfo = data[0];
        if(err){
            console.log('error id400 has occured');
        } else if(userInfo.password != pw){
            console.log('pwinvalid');
            return res.json('password invalid');
        }else{
            res.json(data[0].username);
        }
    })
});
app.get('getWorkout/:username/:workout', (req, res) => {
    const info = req.params;
    console.log(info)
    const un = info.username;
    const wrk = info.workout;
    console.log(un, wrk);
    database.find({username: un}, err, data => {
        const userInfo = data[0];
        const wrkInfo = userInfo.workoutInfo;
        console.log(wrkInfo, 'js69');
        if(err){
            console.log('400 information invalid APX JS LINE 62')
        } else {
            x = 0;
            for(item of wrkInfo){
                if(wrkInfo[x].name == wrk){
                    return res.json({}) //bad
                } else {
                    x = x + 1;
                }
            };
        };
    });
});
app.get('/deleteWrk/:username/:workout', (req, res) => {
    const info = req.params;
    const un = info.username;
    const wrk = info.workout;
    
    database.find({username: un}), err, data => {
        if(err){
            console.log('400 error in deletion function');
        } else {
            userData = data[0];
                for(item of userData){
                    if(userData.workoutInfo[x].name == wrk){
                        database.remove
                    }
                }
            database.remove({workout: wrk})
        };
    };

    database.remove();
})