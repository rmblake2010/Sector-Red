# Sector-Red

Summary : This is a small web game for a project in a coding bootcamp.  The goal of this web game was to stretch my coding muscles with everything i have learned with JS.

What is this? : This is a turn based game with two spaceships Each ship has four abilities and limited actions per turn.


Goals for this project:

- A MVP (Complete)
- Multiple battles (incomplete)
- Progession system (incomplete)
- Music and sound effects (partially complete)
- Animations (incomplete)
- A map (incomplete)
- items (incomplete)
- interesting AI (incomplete)


1/29/22 :
- Completed what seemed like an okay lay out.

This layout includes:


- Player and Enemy HP;
- Backkground;
- Spaceship imgs;
- Container for skills, energy bar, and items
- Began working on button functionanility 

![prototype-1](https://user-images.githubusercontent.com/4401398/152903113-666cabee-427b-4da1-aead-ac1bf1799888.png)

Button functionanility: 
_____________________________
```
function configureButtons() {
    let buttons = document.querySelectorAll('.btn')
    for(let i = 0; i < buttons.length; i++) {
        document.getElementById(buttons[i].id).addEventListener('mouseover', addDetails)
        document.getElementById(buttons[i].id).addEventListener('mouseout', removeDetails)
        document.getElementById(buttons[i].id).addEventListener('click', btnDetails)
    }
}

function btnDetails(event) {
    switch(event.target.id) {
        case 'laser-btn' :
            laserAttack()
            break;
        case 'projectile-btn' :
            projectileAttack()
            break;
        case 'shield-btn' :
            activateShield()
            break;
        case 'thruster-btn' :
            activateThruster()
            break;
        default: 
            break;
    }
}
```
___________________________________________
My goal was to configure the buttons on load, with each button being assigned to a specific function.
This method did not work and was not used.

1/30/22 : 

Made a ship class to store information such as:
- energy
- health
- speed
- damage

_____________________________________________________________________________________________________________________
```
export default class Ship {
    constructor(url, health, speed) {
        this.url = url
        this.health = health
        this.speed = speed
        this.energy = 5
        this.shield = 0;
    }

    laserAttack() {
        return LASER_DAMAGE
    }

    activateShield() {
        this.shield += 2
    }

    activateThrusters() {
        this.speed += 2
    }

    projectileAttack() {
        return PROJECTILE_DAMAGE
    }

    // for AI actions and possibly friendly AI actions
    battleActions() {
        let actions = []
        while(this.energy != 0) {
            actions.push({damage: this.laserAttack(), energy: 1})
            this.energy -= 1         
        }
        return actions
    }
}
```
 __________________________________________________________________________________________
 
 ** I chose to make activating or using weapons or shields/thrusters a function because later on i would like to add items to effect the return values.
 I feel like this will be much easier with simple functions already in place.
 
  
  
** This worked really well and sped along my progress!
A win/lose condition was finished as well as the "battle button"
![prototype-2](https://user-images.githubusercontent.com/4401398/152903803-5db19af0-8d3a-4e57-b356-839dceb57b1e.png)


1/31/22-2/2/22 :


Properly configured all attack buttons 


<b> Button configuration </b>
___________________________________________
- Laser Button

With the laser attack i knew i needed to manipulate a style to adjust a health bar visually. I used this value to test if the health points (HP) was less that or <= 0.

This method was quickly changed because it adjusted the health points of the enemy when the laserAttack() function was called, which is not what i wanted.
```
//Button actions
function laserAttack() {
    let HP = parseInt(getComputedStyle(enemyHpBar).getPropertyValue('--enemyHp'))
    HP -= 2
        if(HP <= 0 ) {
            handleWin()
        } else {
            enemyHpBar.style.setProperty("--enemyHp", HP + "%")
            console.log(HP)
        }
}



//Handling Win/Lose conditions 

function handleWin() {
    let modal = document.createElement('div')
    let closeBtn = document.createElement('button')
    closeBtn.style.position = 'relative';
    closeBtn.classList.add('center');

    modal.style.position = 'relative';
    modal.classList.add('center')
    
    modal.backgroundColor = 'white';

    
    modal.append(closeBtn);
    document.querySelector('#background').append(modal)

    closeBtn.addEventListener('click', async () => {
        await modal.remove()
        document.querySelector('#enemy').remove();
    })
}

```
I ended up changing the configuration of all buttons into a function called action queue, which took two ship classes, and damage

- Updated laser button 

This updated button configuration checked the players energy, added a totaling variable called damage based off of the players laser attack, and updated the energy styles on  the DOM.

This later became a problem with damage being a totalling variable, but this will be discussed in the thruster button configuration.
```
        //Laser Button Config
           document.querySelector('#laser-btn').addEventListener('click', () => {
                if(player.energy != 0){
                    damage += player.laserAttack()              
                    player.energy -= 1
                    actionStyleUpdate(player.energy)
                    console.log("energy " + player.energy)
                } else {
                   // console.log('out of energy! hit the battle button!~')
                }
        }) 

```
_________________________________________
- Shield Button

the shield button was not to difficult to configure, however the problem lied in when damage was calculated at the end of a turn.
Adding the player health and the shield together did not always return what was wanted and i had to make the decision if the shield would be lost each turn or not.

```       

        document.querySelector('#shield-btn').addEventListener('click', async () => {
            if(player.energy != 0) {
                await player.activateShield()
                player.energy -= 1
                console.log("current shield: " + player.shield)
                actionStyleUpdate(player.energy)
            } else {
               // console.log('out of energy! hit the battle button!~')
            }
        }) 
```
___________________________________________

- Projectile Button

The projectile button made me rethink how i would update the action slots. This is because i wanted the projectile attack to cost 2 energy.

to fix this i added a variable called cost, which i was able to pass into actionStyleUpdate.  

```
        document.querySelector('#projectile-btn').addEventListener('click', () => {
            if(player.energy != 0 && player.energy > 1) {
                let cost = 1;
                damage += player.projectileAttack()
                player.energy -= 2
                actionStyleUpdate(player.energy, cost)
                console.log("energy: " + player.energy)
            } else {
               // console.log('out of energy! hit the battle button!~')
            }
        })
```

- actionStyleUpdate()

I chose to use a switch statement in an if statement because my plan was to ultimately have abilties that cost, 3 or even 4 energy. 

```
function actionStyleUpdate(currentEnergy, cost) {
    let actions = document.querySelectorAll('.action-slot')
    
    if(cost >= 1){
        switch(cost){
            case 1: actions[currentEnergy + 1].style.setProperty('background-color', 'red')
                    actions[currentEnergy].style.setProperty('background-color', 'red')
                    console.log('imhere!')
                    break;
        }
    }else {
        actions[currentEnergy].style.setProperty('background-color', 'red')
    }
}
```
________________________________________________________________________
- Thruster Button

The thruster button opened a whole new can of worms. I wanted shots to have a chance to miss. So not only do the variables that this button effects increment in some way, but i needed a new function that handled the chance for shots to miss.

For the ship class i decided to add a variable called speed. Each ship would have a base speed of 1 and it could be incremented when using activateThrusters()

```
        document.querySelector('#thruster-btn').addEventListener('click', () => {
            if(player.energy != 0) {
                player.activateThrusters()
                player.energy -= 1
                console.log("player speed: " + player.speed)
                actionStyleUpdate(player.energy)
            }else {
                console.log('out of energy! hit the battle button!~')
            }
        })

```
__________________________________________________________________________
- Handling Evasion 
Handling evasion made me rethink how i managed taking in the damage variable...How could i check if something missed if it was all incremented in one variable?

My solution, arrays. Arrays of objects to be specific
```
    let battleActions = [];
    let enemyActions = [];

```
not only this let me store damage in a specific instances, but if i made it into an object i could add specific things to that instance, such as energy, or even an id for different items! I think this change will help me a lot when im developing the game further.

- handleEvasion(speed, battleActions)
what i decided to do was to make a RNG function that rolled between 1 - 10. if the roll is less that or equal to the speed the damage of the specific battleaction would be changed to 0

Ex.  
Ships have a base speed of 1. So at minimum there is a 10% chance that a roll will equal 1. This is then incremented with the thruster button, hopefully making a mathematically sound system 

``
function handleEvasion(speed, battleActions) {

    battleActions.forEach((battleAction) => {
        let roll = Math.floor(Math.random() * 10) + 1
        if (roll <= speed) {
            battleAction.damage = 0
        }
    })
}
``

- Calling handleEvasion

within the fight button (discussed later in this file), is where we call handleEvasion.  i then use a forEach function to increment the damage variable with all the final damage numbers for the turn.

```
        handleEvasion(enemy.speed, battleActions)
        battleActions.forEach((battleAction) => {
            damage += battleAction.damage
        })
```


______________________________________________________________________________
- <b> The battle button </b>
 ![fightbtn-2](https://user-images.githubusercontent.com/4401398/153112646-951a5ff8-db91-4a0c-a16a-afff9f1a3bc2.svg)

This button does alot, probably way to much as of writing this... 
this button does: 
- calculates enemy damage
- handles chance to miss
- checks for overkill (if player or enemy health is negative or if a shot will result in a negative number)
- updates shield
- resets player and enemy energy
- updates hp bar style

This button had many iterations, and will continue too. Check commit logs for previous iterations.

```
    document.querySelector('#battle-btn').addEventListener('click', async () => {
        let playerElemHp = document.querySelector('#player-hp')
        let enemyElemHp = document.querySelector('#enemy-hp')
        let enemyDamage = 0
        enemyActions = enemy.battleActions()


        // Damage that is calculated for evasion (checking for missed shots)
        handleEvasion(enemy.speed, battleActions)
        battleActions.forEach((battleAction) => {
            damage += battleAction.damage
        })
   
        handleEvasion(player.speed, enemyActions)
        enemyActions.forEach(async (enemyAction) => {
            enemyDamage += enemyAction.damage       
        })

        if (enemy.health <= damage) {
            enemy.health -= damage
            enemyElemHp.style.setProperty('--enemyHp', '0%')
            handleWin()
        } else if (player.health + player.shield <= enemyDamage) {
            //health number is not exactly right because it does not take into account the players shield
            player.health -= enemyDamage
            playerElemHp.style.setProperty('--playerHp', '0%')
            handleLose()
        } else {
            enemy.health -= damage
            player.health = handleShield(player.health, player.shield, enemyDamage)
            enemyElemHp.style.setProperty('--enemyHp', enemy.health + '%')
            await playerElemHp.style.setProperty('--playerHp', player.health + '%')
            resetAction()

        }
        player.shield = shieldUpdate(enemyDamage, player)
        player.speed = 1;
        player.energy = 5
        enemy.energy = 5
        grayscaleChange(player.energy)
        damage = 0
        enemyDamage = 0;
        battleActions = [];
        //console.log("player health: " + player.health)

    })
}

```


<b> Styles </b>

added custom background and sprites for styling and pizazz!

- Background :
![backGround](https://user-images.githubusercontent.com/4401398/152904670-4f77cb8d-de0c-4967-a8b6-1f397bbb66e6.png)

- enemy sprite : 
![enemySprite](https://user-images.githubusercontent.com/4401398/152904685-e47be2bb-00e4-4040-bd66-f163b73c5037.svg)
- player sprite: 
![ShipSprite](https://user-images.githubusercontent.com/4401398/152904697-7fca1b3b-1d76-4272-b215-9abc0e0f8fd9.svg)


Added button styles, My goal for was as little text on the screen as possible.
- laser button : ![laserButton](https://user-images.githubusercontent.com/4401398/152904937-88a55ea9-bf60-4dc1-84ad-aa77b1584734.svg)
- shield button : ![shieldButton](https://user-images.githubusercontent.com/4401398/152904956-5adbe67f-5c8f-46a3-bcfc-32ee19e43fbb.svg)
- projectile button : ![projectileButton](https://user-images.githubusercontent.com/4401398/152904967-334fea7a-fdaa-4525-b385-845e3dd105d0.svg)
- thruster button : ![thrusterButton](https://user-images.githubusercontent.com/4401398/152905033-093f7ed9-06b7-4db7-a23d-aa0f172a84d4.svg)
_______
I also wanted each turn to be limited, so a player couldnt just press a button a lot of times and win. However, i wanted to display this limitation visually.
I made these batterys to display how many actions the player has left:
- Battery : ![batterySlot](https://user-images.githubusercontent.com/4401398/152905153-f1b09f2e-0f01-4628-83b5-fbfd9f8f8257.svg)
- Battery when action is depleted: ![batterySlotSpent](https://user-images.githubusercontent.com/4401398/152905165-8831568a-9f6f-4a89-91e7-e929bcbe0fee.svg)



____________________________
2/7/22 :

I decided to scrap the idea for items right now because i did not feel like i would have time to complete for the MVP.
I wanted the MVP to be as "complete" as possible so some html elements were removed temporarily

![prototype-3](https://user-images.githubusercontent.com/4401398/152905848-f66552cd-9f6c-4adc-b4ae-b493ea2c77bd.png)

_____________________________________
Future Progress:

Next for things to do i would like to:
- display enemy intentions
- move the battle button configuration outside of the function it is in
- switch to using a canvas
- integrate jquery
- check win/lose conditions outside of the battle button
- add animations
- sound effects
- more music
- add items





