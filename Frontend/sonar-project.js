const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner({
  serverUrl: 'https://sonarcloud.io',
  options: {
    'sonar.projectKey': 'angulart',
    'sonar.projectName': 'angulart',
    'sonar.projectVersion': '1.0',
    'sonar.sources': '.',
    'sonar.exclusions': '**/node_modules/**,**/*.spec.ts,.browserslistrc',
    'sonar.tests': '.', // specify the directory containing your test files
    'sonar.test.inclusions': '**/*.spec.ts',
    'sonar.sourceEncoding': 'UTF-8',
    'sonar.login': 'ce2b65e06c05e88e7ffa46195476cee812e2dcf1',
    'sonar.organization': 'angulart',
  }
}, () => {
  console.log('SonarQube scan completed');
});
