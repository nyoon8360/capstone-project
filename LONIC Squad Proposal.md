# LONIC Squad Proposal
Logan Debrecht, Nicholas Yoon, Oliver Farnum

### 1. Problem Statement
The Pokemon Safari Zone has been a staple feature of the pokemon game series from its inception. These mini-game-esque zones allow users to break from the typical gameplay loop of battling pokemon as the primary source of expanding their rosters. However, for fans of the pokemon series, and specifically this mini-game, there is no current standalone game for the Safari Zone. Furthermore, in order to access the Safari Zone in already existing pokemon titles, the players have to commit the time to play through the game to unlock it as well as invest money into purchasing the game cartridges and consoles required to play them. And for those who do decide to invest the time and money solely to access the Safari Zone in existing titles, most progression is tied to activities outside of mini game they enjoy.

### 2. Technical Solution
- #### Secnario 1: 
    Timmy’s console broke and is unable to get a new one till Christmas. He loves pokemon and still wants to catch and collect some of them. He uses Pokemon Safari to scratch that itch and plays his favorite game until he gets his new console. It allows him to still see his progress for free on his desktop.	
- #### Secnario 2:
    Bob is stuck on a bus in the middle of traffic. It’s going to be another hour before he reaches his next stop. He’s in desperate need of any sort of entertainment to make it through his commute so he opens his phone browser and begins to play Pokemon safari. Because it’s browser based, it’s a lightweight, portable way for him to play his favorite game.

### 3. Glossary
- #### Player
    - Users whose primary goal is to play and enjoy the game.
- #### Admin
    - Users who have expanded access to player data and can manipulate existing data for the purpose of compensation, events, balancing, etc.
- #### The Safari Zone
    - The main setting of the game 

- #### PC Box
    - The player’s inventory containing all of the pokemon they have captured.
- #### Pokemon
    - The primary collectible creatures that the players are attempting to catch during encounters
- #### Encounters
    - The game state during which players are faced with a specific pokemon and are given action options to attempt to capture said pokemon.
- #### Environments
    - Different locations players can travel to within the Safari Zone that contain specific rosters of pokemon with varying chances to encounter them.
- #### Catch Rate
    - The chance for a pokemon to get captured by a pokeball. Can be affected by player actions.
- #### Throw Bait
    - A player action that lowers the chance for encountered pokemon to flee but reduces their catch rate.
- #### Throw Mud
    - A player action that increases the catch rate of a pokemon but increases their chance to flee.
- #### Throw Pokeball
    - A player action that attempts to catch the pokemon.

### 4. High Level Requirement
- Create an account (user,admin)
- Login to existing accounts (user, admin)
- See team (user, admin)
- Edit team(admin)
- Release team member(user,admin)
- Catch pokemon(user,admin)
- Travel to different environments (user, admin)
- Delete Account

### 5. User Stories/Scenarios
- #### Create an account (user,admin)
    - Create an account to play the game.
    - Suggested Data: (* required)
        - Username  *
        - Password  * 
    - Precondition: User must open the game and not be logged into an account.
    - Post-condition: User has an account they can log in with to play.
- #### Login to existing accounts (user, admin)
    - Log into an existing account
    - Precondition: User has an existing account they know the username and password of.
    - Post-condition: User is logged into their account and can access their game information.
- #### See team (user, admin)
    - List of users owned pokemon names with sprites next to them. 
    - Precondition: Must be logged in.
    - Post-condition: See users team displayed.
- #### Edit team(admin)
    - Add to team or edit stats
    - Precondition: must be an admin
    - Post-condition: team is changed
- #### Release team member(user,admin)
    - Delete an instance of pokemon from the team into the “wild”
    - Precondition: user must be logged in. 
    - Post-condition: team is now without that pokemon
- #### Catch pokemon(user,admin)
    - Attempt to catch an encountered pokemon.
    - Precondition: User must be logged in and playing a game.
    - Post-condition: User has either caught a pokemon and added it to their team, or failed to catch one. User is placed back into their game.
- #### Travel to different environments (user, admin)
    - Move from catching location to another to find pokemon
    - Precondition: logged in
    - Post-condition: moved locations
- #### Delete account (user, admin)
    - User may delete their own account
    - Admin may delete a selected user
    - Precondition: User/Admin must be logged in, and a selected account must exist.
    - Post-condition: All information pertaining to the selected account is deleted. If a user was logged in, they are now logged out.




