# finlex-test-task
```
git clone git@github.com:yasirgit/finlex-test-task.git
docker-compose up --build
```
After finishing the build process, change the *.env* file db configuration according to the *docker-compose.yml* file

### Challenges
1. __countarrayelements__ folder contains Challenge 1
2. __robotcontrollerapi__ folder contains Challenge 2

### Heroku App
```
https://mighty-coast-15235.herokuapp.com 

- Autometic deployment after each and every commits
````

### REST API
```
https://mighty-coast-15235.herokuapp.com/api-docs/
Docker container: http://localhost:[port]/api-docs/
```

### Jenkins CI
```
1. Install Jenkins
- docker run -p 8080:8080 -p 50000:50000 -d -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts
2. Create job (preferably, multibranch pipeline)
3. Set gitrepo and credentials
4. Build (Jenkins file pipeline script will be executed from the gitrepo)
5. Both unit tests and integration tests run by pipleline
```

### DB
After connecting to mysql db (docker container) run this sql file __robot_position.sql__ to import table

### Comment Doc (JsDoc)
Run following command after adding or editing comments
```
npm run doc
```


