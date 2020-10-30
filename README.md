# finlex-test-task
```
git clone git@github.com:yasirgit/finlex-test-task.git
docker-compose up --build
```

### Challenges
1. __countarrayelements__ folder contains Challenge 1
2. __robotcontrollerapi__ folder contains Challenge 2

### Heroku App
```
https://mighty-coast-15235.herokuapp.com
````

### REST API
```
https://mighty-coast-15235.herokuapp.com/api-docs/
Docker container: http://localhost:[port]/api-docs/
```

### Jenkins CI
```
1. Create job (preferably, multibranch pipeline)
2. Set gitrepo and credentials
3. Build (Jenkins file pipeline script will be executed from the gitrepo)
4. Both unit tests and integration tests run by pipleline
```

### DB
After connecting to mysql db (docker container) run this sql file __robot_position.sql__ to import table

### Comment Doc (JsDoc)
Run following command after adding or editing comments
```
npm run doc
```


