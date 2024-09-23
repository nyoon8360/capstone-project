# Tasks

## Setup (Done as group)
* [ ] Create client and server directories
* [ ] Create a Maven project in server dir.
* [ ] Add jUnit5 Jupiter, Spring Boot JDBC, Spring Boot Devtools, MySQL Connector, Spring Security, Spring Boot Starter Validation, and Spring Boot Starter Web as maven dependencies and refresh Maven
* [ ] Create a react app in client dir
* [ ] Clean folders to only have needed files (remove cruft).
* [ ] Add dependencies (React Dom Router, Fetch API)

## Back-End
* [ ] [Assigned To: ] Implement AppUser, PokemonInstance, and Area models
    1. Add validation annotations to all fields
* [ ] [Assigned To: ] Create data layer’s custom DataException class
* [ ] [Assigned To: ] Implement AppUserJdbcTemplateRepository class alongside its interface
    1. Methods should throw DataAccessException
    2. Get all AppUsers
    3. Get AppUsers by username
    4. Add AppUser
    5. Delete AppUser by Id
    6. Any retrievals of AppUsers should also query for their roles and attach them to the created AppUser object instance
* [ ] [Assigned To: ] Create tests for AppUserJdbcTemplateRepository
* [ ] [Assigned To: ] Implement PokemonInstanceJdbcTemplateRepository class alongside its interface
    1. Methods should throw DataAccessException
    2. Get all PokemonInstances with a matching app_user_id
    3. Add a PokemonInstance
    4. Update a PokemonInstance by Id
    5. Delete a PokemonInstance by Id
* [ ] [Assigned To: ] Create tests for PokemonInstanceJdbcTemplateRepository
* [ ] [Assigned To: ] Implement AreaJdbcTemplateRepository class alongside its interface
    1. Methods should throw DataAccessException
    2. Get all Areas
    3. Add an Area
    4. Update an Area by Id
    5. Delete an Area by Id
* [ ] [Assigned To: ] Create tests for AreaJdbcTemplateRepository
* [ ] [Assigned To: ] Implement AreaEncounterJdbcTemplateRepository class alongside its interface
    1. Methods should throw DataAccessException
    2. Get all AreaEncounters with a matching area_id
    3. Add an AreaEncounter
    4. Update an AreaEncounter by Id
    5. Delete an AreaEncounter by Id
* [ ] [Assigned To: ] Create tests for AreaEncounterJdbcTemplateRepository
* [ ] [Assigned To: ] Implement AppUserService class
    1. Add any validation rules that can't be handled through annotations for app users
    2. Should take an AppUserRepository isntance as a dependency
* [ ] [Assigned To: ] Implement PokemonInstanceService class
    1. Add any validation rules that can't be handled through annotations for pokemon instances
    2. Should take a PokemonInstanceRepository instance as a dependency
* [ ] [Assigned To: ] Implement AreaService class
    1. Add any validation rules that can't be handled through annotations for areas
    2. Should take an AreaRepository instance as a dependency
* [ ] [Assigned To: ] Implement AreaEncounterService class
    1. Add any validation rules that can't be handled through annotations for area encounters
    2. Should take an AreaEncounterRepository instance as a dependency
* [ ] [Assigned To: ] Implement AppUserController class
* [ ] [Assigned To: ] Implement AppUserController tests
* [ ] [Assigned To: ] Implement PokemonInstanceController class
* [ ] [Assigned To: ] Implement PokemonInstanceController tests
* [ ] [Assigned To: ] Implement AreaController class
* [ ] [Assigned To: ] Implement AreaController tests
* [ ] [Assigned To: ] Implement AreaEncounterController class
* [ ] [Assigned To: ] Implement AreaEncounterController tests
* [ ] [Assigned To: ] Create App class
    1. Instantiate all required classes with valid arguments, dependency injection. run controller

## Front-End
* [ ] [Assigned To: ] Implement a Login component with buttons to login or create account
    1. Login takes to login page with info
    2. Create account allows for user input for account creation
    3. When login or register buttons are pressed, blur background and slightly zoom out.
* [ ] [Assigned To: ] Implement a SarfariZoneEntrance component to look at team or board shuttle
* [ ] [Assigned To: ] Implement Shuttle component for selecting area to travel to
    1. Fetch list of all available areas
    2. Display list of all available areas as buttons
* [ ] [Assigned To: ] Implement Area component for looking for pokemon
    1. Conditionally render area component based on which area was chosen
    2. Fetch list of all area_encounters for current area
* [ ] [Assigned To: ] Implement Encounter component
    1. Add the buttons for each “move” user is allowed to do.
    2. See buttons work correctly with moves
* [ ] [Assigned To: ] Implement PCBox component to create a list of pokemon with each user
    1. Implement release button for users
    2. Fetch list of all PokemonInstances owned by user and display them
* [ ] [Assigned To: ] Implement Account.js
    1. Add button to allow deletion of own account and all related PokemonInstances
    2. Use window.confirm() to prompt confirmation for the user before deletion
    3. Return user to Login page upon successful deletion
* [ ] [Assigned To: ] Implement AdminPanelHome component
    1. Implement Areas button that will navigate to AdminPanelAreas component
    2. Implement Players button that will navigate to AdminPanelPlayers component
    3. Implement Logout button that will log user out of account and navigate to Login component.
* [ ] [Assigned To: ] Implement AdminPanelPlayers component
    1. Fetch all players
    2. Implement delete option for player accounts
    3. Prompt user for confirmation before deleting player account
    4. Refresh component on load and when player data changes
    5. Implement EditPCBox button that will navigate to AdminPanelPlayerForm page
    6. Implement Back button that will navigate to AdminPanelHome page
* [ ] [Assigned To: ] Implement AdminPanelAreas component
    1. Fetch all areas
    2. Implement delete option for areas
    3. Prompt user for confirmation before deleting area
    4. Add and edit area buttons will navigate to AdminPanelAreaForm page
    5. Back button will navigate to AdminPanelHome page
    6. Refresh component on load and when area data changes
* [ ] [Assigned To: ] Implement AdminPanelPlayerForm component
    1. Fetch player PCBox data to prefill table with all player owned pokemon
    2. Make all stat fields of pokemon in table directly editable
    3. Add pokemon button will not actually perform a POST request. Instead it will add new pokemon to table.
    4. Upon submission, perform PUT request with all data in table
    5. Cancel button will navigate to AdminPanelPlayers page without performing any http requests.
    6. Prompt user to confirm Canceling the submission and notify that all changes won't be applied including added pokemon
* [ ] [Assigned To: ] Implement AdminPanelAreaForm component
    1. Fetch all PokemonEncounters for the current area to display
    2. Implement Add Pokemon Encounter button that wont actually perform a POST request but instead will add the new PokemonEncounter to the table.
    3. Make Encounter Rate field in table editable
    4. Upon submission, perform PUT request with all data in table and in Environment Name input field.
    5. Implement cancel button that will navigate to AdminPanelAreas component.
    6. Prompt user to confirm Canceling the submission and notify that all changes won't be applied including added pokemon encounters
* [ ] [Assigned To: ] Implement NotFound component
    1. Add some fun custom styling and graphics just to make not found page unique.
