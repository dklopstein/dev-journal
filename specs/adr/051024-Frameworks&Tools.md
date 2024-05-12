# Frameworks and Tools

- During our weekly Friday meeting on May 10th, we decided on the tech stack we would use.

### Notes
- The app was to be built using HTML, CSS, and JavaScript.
- We needed to decide on our database/storage, the testing framework, and wrapper framework.

Do we want to use a wrapper like Electron to give our app a cleaner, out-of-browser interface?
- No one on team knew much about frameworks such as Electron
- We elected to keep it in the browser for now, but if we have more time, we will attempt it.

What are we going to use to store user data?
- The app is meant to be local-first; this eliminates the option to use cloud-based storage services.
- The only data we store for each day is the journal entry, the sentiment rating, and the tasks completed on the day
Because of this, we do not need a heavy database service to store user data. We will just use LocalStorage from
Javascript to store user data locally.

What are we going to do to test our code? When should testing happen?
- Testing should happen as we develop. It is a good Agile practice to test as you develop, so we will
continuously test code as it is written.
- We will test responsiveness and accessibilty of our interface manually and using services such as LightHouse
- We will test the correctness of functionality through unit tests. We decided to use Jest since we don't expect
to have to do heavy testing and because we already have experience with it.

**Decisions**:\
No wrapper framework; app just functions in the browser\
LocalStorage to store user data\
Manual testing, LightHouse, and Jest primarily to test app\
