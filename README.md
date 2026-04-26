# Space Travel

React application for managing interplanetary evacuation logistics. Commanders can view and manage spacecraft, view planets, and dispatch spacecraft between planets.

Built for Springboard Software Engineering Career Track unit 15.12 (Testing React) assessment.

## Features

- Home page with overview of app functionality
- - Spacecrafts page listing all spacecraft with view / build / decommission actions
  - - Spacecraft detail page
    - - Construction page with form validation (name, capacity, description required)
      - - Planets page listing planets and stationed spacecraft, with dispatch (destination must differ from origin)
        - - Loading component for async API responses
          - - Unmatched routes redirect to home
           
            - ## Folder Structure
           
            - ```
              src/
                components/   Reusable building blocks
                context/      React context providers
                pages/        Route-level components
                routes/       Routing configuration
                services/     External API clients (SpaceTravelApi, SpaceTravelMockApi)
              ```

              ## Conventions

              - JavaScript: camelCase
              - - CSS: CSS Modules with BEM naming
                - - Tests: React Testing Library + Jest, colocated as `*.test.js`
                 
                  - ## Getting Started
                 
                  - ```
                    npm install
                    npm start
                    npm test
                    ```

                    ## API

                    The app uses a mock API backed by `localStorage` (`services/SpaceTravelMockApi.js`). Application code should call `services/SpaceTravelApi.js`, which wraps the mock. Clear `localStorage` to reset state.
                    
