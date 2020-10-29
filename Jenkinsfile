pipeline {
    agent any

    stages {
        stage('postman tests') {
            steps {
                echo 'postman api tests...'
				nodejs('Node-12') {
					sh 'npm install'
					sh 'npm run api-tests'
				}
            }
        }
    }
}