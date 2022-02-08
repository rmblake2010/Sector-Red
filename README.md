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


Future Progress:

Next for things to do i would like to:
- add animations
- sound effects
- more music
- add items





