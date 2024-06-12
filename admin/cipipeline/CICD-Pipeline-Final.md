# CI/CD Pipeline

### Code Style
Team will use Prettier styling and adhere to the code styles detailed in admin/styleGuide.md

### Unit Tests
Unit tests run on pull requests to any branch. We use the Jest framework for all unit tests.
These tests test the individual JS functions throughout our app. The pipeline fails if any unit tests do not pass.

### E2E Testing
E2E Testing runs on pull requests to any branch. We use Puppeteer to test all services and functionality.
The majority of our testing is done by these tests. These tests are meant to interact with our web app and ensure all services function as expected.

### JS Docs
We use JS Docs to compile all our documentation into one page. JS Docs are generated on pull requests to main, homepage-front, and calendar-front and populate in the branch named gh-pages.
The documentation page can be found in the README in the main branch of our repository.

### Pulling to Main
All pulls to main must be reviewed and approved by at least one other team member and a team lead. The person that creates the pull request is responsible for resolving all conflicts and
ensuring all tests pass.

### Linting
On pull requests to main, linting tests and Codacy analysis are run. Codacy will pass on "minor" errors but will fail on medium and critical errors
Linting is run on ESLint. Linting passes small issues and throws errors on all other issues.

