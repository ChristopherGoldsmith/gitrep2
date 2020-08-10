    let loginMod = {
        login: '',
        init: function(){
            this.popDom()
            this.cacheDom();
            this.bindEvents();
        },
        cacheDom: function(){
            this.container1 = document.getElementById('container');
            this.username = document.getElementById('username');
            this.password = document.getElementById('password');
            this.submit = document.getElementById('submit1');
            this.newID = document.getElementById('newID');
            this.test = document.getElementById('test');
        },
        parts: ['Chest', 'Back', 'Legs', 'Shoulders'],
        clearData: function(){
            console.log(this);
            localStorage.clear();
        },
        saveData: async function(data){
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                }
            fetch('/users', options).then(function(response){
            console.log(response)
            });
        },
        createNewID: async function(){
            unInput = this.username.value;
            pwInput = this.password.value;
            const response = await fetch(`/users/${unInput}`);
            const data = await response.json();
            let newInfo = function(u, p, w){
                this.username = u,
                this.password = p,
                this.workoutInfo = w
            };
            info = new newInfo(unInput, pwInput, []);
            console.log(data)
            if(data.username != unInput){
                alert(`Your new account ${unInput} has been created`);
                this.saveData(info);
            } else{
                return alert(`${unInput} is already taken`);
            };
        },
        /*findWork: async function(un, wrk){
            const response = await fetch(`getWorkout/${un}/${wrk}`);
            const data = await response.json();
            console.log(data);
        },*/
        loginUser: async function(un, pw){
            const response = await fetch(`/authUsers/${un}/${pw}`);
            const data = await response.json();
            this.login = data;
            if(data == 'pwinvalid'){
                return alert('Your username or password is invalid');
            } else if(data == un){
              console.log(`Welcome ${this.login}!`); 
              return mainUI.init();     
            } else{
                alert('You have entered your username or password incorrectly');
            };
            console.log(data);
        },
        bindEvents: function(){
            this.submit.addEventListener('click', this.clkSubmit.bind(this));
            this.newID.addEventListener('click', this.createNewID.bind(this));
            this.test.addEventListener('click', this.clearData.bind(this));
        },
        create: function(type, attach, text, css, id){
            let newDiv = document.createElement(type);
            if(type != 'input'){
                txt = document.createTextNode(text);
                newDiv.appendChild(txt);
                newDiv.className = css;
                attach.appendChild(newDiv);
            };
            if(type == 'input'){
                newDiv.placeholder = text;
                box = document.createElement('div')
                box.className = css;
                box.appendChild(newDiv)
                attach.appendChild(box);
            }
            newDiv.id = id;
            return newDiv;
        },  
        popDom: function(){
            x = document.getElementById('container');
            x.innerHTML = '';
            un = this.create('input', x, 'Username', 'userInput', 'username');
            pw = this.create('input', x, 'Password', 'userInput', 'password');
            pw.type = 'password';
            sub = this.create('div', x , 'Submit', 'submitButton', 'submit1');
            newID = this.create('div', x, 'New Account', 'accButton', 'newID' )
        },
        clkSubmit: function(){
            this.loginUser(this.username.value, this.password.value);
            
        },
        popWorkoutModule: function(){
            console.log(this.parts);
            y = this.parts.length;
            x.innerHTML = '';
            for(i = 0; y > i; i++){
                this.create('div', this.container1, this.parts[i], 'textbox', this.parts[i]);
            }
            this.create('div', this.container1, 'Sumbit', 'submitButton', 'submit2');
        }
    }
    let mainUI = {
        init: function(){
            this.popDom();
            this.cacheDom();
            this.bindEvents();
        },
        cacheDom: function(){
            this.container = document.getElementById('container');
            this.workout = document.getElementById('workout');
            this.profile = document.getElementById('profile');
            this.createTrainingPlan = document.getElementById('createTrainingPlan');
            this.nutrition = document.getElementById('nutrition');
        },
        popDom: function(){
            x = document.getElementById('container');
            x.innerHTML = '';
            workout = loginMod.create('div', x, 'WORKOUT!', 'textbox', 'workout');
            profile = loginMod.create('div', x, 'Profile', 'textbox', 'profile');
            createTrainingPlan = loginMod.create('div', x, 'New Training Plan', 'textbox', 'createTrainingPlan');
            nutrition = loginMod.create('div', x, 'Nutrition', 'textbox', 'nutrition');
            /*Top bar has hamburger menu[profile, settings, stats], name and date.  buttons for previous workouts, create workout
            */
        },
        bindEvents: function(){
            this.workout.addEventListener('click', workoutMod.init.bind(workoutMod));
            //this.profile.addEventListener('click', profileMod.init.bind());
            //this.createTrainingPlan.addEventListener('click', trainngPlanMod.bind());
            //this.nutrition.addEventListener('click', nurtitionMod.init.bind());
        },
    };
    let workoutMod = {
        init: function (){
            console.log(this)
            this.popDom();
            this.cacheDom();
            this.bindEvents();
        },
        cacheDom: function(){
            this.container = document.getElementById('container');
            this.newWorkout = document.getElementById('newWorkout');
            this.useTP = document.getElementById('useTP');
            this.prevWorkout = document.getElementById('prevWorkout');
            this.profile = localStorage.getItem(loginMod.login);
        },
        popDom: function(){
            x = document.getElementById('container');
            x.innerHTML = '';
            createWorkout = loginMod.create('div', x, 'New Workout!', 'textbox', 'newWorkout');
            useTP = loginMod.create('div', x, 'Follow Training Plan', 'textbox', 'useTP');
            usePrevWorkout = loginMod.create('div', x, 'Use Past Workout', 'textbox', 'prevWorkout');
        },
        bindEvents: function(){
            x = this.newWorkoutFun;
            this.newWorkout.addEventListener('click', x.init.bind(this.newWorkoutFun));
            //this.newWorkout.addEventListener('click', this.newWorkoutFun.init.bind(newWorkoutFun));
        },
        newWorkoutFun:{
            init: function(){
                this.popDom();
                this.cacheDom();
                this.bindEvents();
            },
            cacheDom: function(){
                this.container = document.getElementById('container');
                this.newExc = document.getElementById('newExc');
                this.excName = document.getElementById('excName');
                this.excWeight = document.getElementById('excWeight');
                this.excVolume = document.getElementById('excVolume');
                this.excSubmit = document.getElementById('excSubmit');
                this.excContainer = document.getElementById('excContainer');
                this.wrkSubmit = document.getElementById('wrkSubmit');
                this.table;
                this.wrk;
            },
            bindEvents: function(){
                this.excSubmit.addEventListener('click', this.createExc.bind());
                this.wrkSubmit.addEventListener('click', this.saveData.bind());
            },
            popDom: function(){
                x = document.getElementById('container');
                x.innerHTML = '';
                newExc = loginMod.create('div', x, '', '', 'newExc');
                y = document.getElementById('newExc');
                excName = loginMod.create('input', y, 'Name', '', 'excName');
                excWeight = loginMod.create('input', y, 'Weight', '', 'excWeight');
                excReps = loginMod.create('input', y, 'Reps', '', 'excReps');
                excVolume = loginMod.create('input', y, 'Sets', '', 'excVolume');
                excSubmit = loginMod.create('button', y, 'Create', '', 'excSubmit');
                wrkSubmit = loginMod.create('button', y, 'Finalize', '', 'wrkSubmit');                
                excContainer = loginMod.create('div', x, '', '', 'excContainer');
            },
            saveData: async function(data, un){
                console.log(data);
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                    }
                    console.log(options, '219');
                fetch(`/workouts`, options).then(res =>
                console.log(res))
            },
            createExc: function(){
                a = this.excName.value;
                b = this.excWeight.value;
                c = this.excReps.value;
                d = this.excVolume.value;
                let saveExer = function(){
                    this.name = arguments[0];
                    this.weight = arguments[1];
                    this.sets = arguments[2];
                    this.reps = arguments[3];
                };
                let newExc = new saveExer(a, b, c, d);
                this.exc = newExc;
                console.log(this);
                console.log(newExc.name);
                newExc.username = loginMod.login;
                workoutMod.newWorkoutFun.saveData(newExc, 'TheOddSoul');
                style = 'textbox2';
                if(!this.table){
                    root = loginMod.create('table', this.excContainer, '', 'textbox2', 'root');
                    this.table = true;
                };
                e = document.getElementById('root');
                //make table format!
                volume = loginMod.create('tr', e, `${a}: ${b} pounds for ${d} sets of ${c} reps`, style, ``);
            }
        }
    };

loginMod.init();

/* 
-First screen is profile screen asking for login info or to create account.
-Hamburger Menu in top left with workout histoory and profile details.
-Create workout = primary / secondary (can choose 1 twice to create double workout,
or only choose 1 for half workout) with option for strength hypertrophy or hybrid
runs both in system then generates a 5-7 exercise workout.
-Has timer for workouts based on type (str or hyp).
-Exercises are objects with attributes showing muscle groups used to perform excersize,
with a rating on how much they are worked (maybe 1-5) and the primary group of muscles
the excesize is used to workout.
-Success or fail on each exersize.  Buttons for reps and time, this will determine what
your next workout weight needs to be.  
-A focus opetion for focusing onn any perticular muscle.

Main screen - Create workout (has options to save workout, has option to use template
exercises and to creat your own excercises);
-Use saved workout
-Training progress chart.  Chart showing logged workouts, str progress, weight, bodyfat%
cardio progress, other records;  Want trackable things for other things such as mma.

Biggest gains leader board (Only available to those that have logged 10+ workouts, seperated into fitness
level categories and types of workout);

*/