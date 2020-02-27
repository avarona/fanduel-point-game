# Fanduel Assessment

## Notes
1. Used CRA to spin up a react app
2. Decided to use React Context instead of Redux inorder to avoid prop drilling
3. Abstracted out common utility functions, the context Provider component, api call, constants and mocks
4. Co-located styles and tests with their components/functions for better organization

## App Structure
```
- App
    - Match
        - Player
- api.js
- AppContext.js
- constants.js
- mocks.js
- utils.js
```

## How to run
`yarn install` - install all dependecies

`yarn start` - start in development mode

`yarn test [--coverage]` - run tests with the option of building a coverage report
