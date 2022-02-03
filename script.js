import Ship from './Ship.js'

const playerShip = new Ship('./assets/player-assets/ShipSprite.svg', 15, 1)
const enemyShip = new Ship('./assets/enemy-assets/enemySprite.svg', 15, 1)

let enemyHP = 100
let enemyHpBar = document.getElementById('enemy-hp')
let backGround = document.querySelector('#background')
let actionUI =  document.querySelectorAll('.action-slot')




//Config for Buttons
function configureButtons() {
    let buttons = document.querySelectorAll('.btn')
    for(let i = 0; i < buttons.length; i++) {
        document.getElementById(buttons[i].id).addEventListener('mouseover', addDetails)
        document.getElementById(buttons[i].id).addEventListener('mouseout', removeDetails)
       // document.getElementById(buttons[i].id).addEventListener('click', actionButtons)
    }
}

//Button actions

/*
function actionButtons(event) {
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
        case 'battle-btn' :

            break;
        default: 
            break;
    }
}
*/



//Handling Win/Lose conditions 

function handleWin() {
    let winText = document.createElement('p')
    let modal = document.createElement('div')
    let closeBtn = document.createElement('button')

    winText.innerText = 'The ship is obiliterated by your shots...You look for anything to scavenge as you hover over the battle site...'
    winText.style.fontWeight = 'bold'
    winText.classList.add('center')
    modal.append(winText)

    closeBtn.style.position = 'relative';
    closeBtn.style.left = '25%'
    closeBtn.innerText = 'Fly on'
    closeBtn.classList.add('center');

    modal.style.position = 'relative';
    modal.classList.add('center')
    modal.style.bottom = '40%'
    modal.style.zIndex = '2'

    modal.style.backgroundColor = 'white';
    modal.append(closeBtn);
    document.querySelector('#background').append(modal)

    closeBtn.addEventListener('click', async () => {
        await modal.remove()
        document.querySelector('#enemy').remove();
        document.querySelector('.UI-Container').classList.add('hide')
        document.querySelector('#battle-btn').classList.add('hide')
    })
}

function handleLose(){
    let loseText = document.createElement('p')
    let modal = document.createElement('div')
    let closeBtn = document.createElement('button')

    loseText.innerText = 'Your ship, now mangled by a flurry of bolts, lies vacant. While you drift into space.'
    loseText.style.fontWeight = 'bold'
    loseText.classList.add('center')
    modal.append(loseText)

    closeBtn.style.position = 'relative';
    closeBtn.style.left = '25%'
    closeBtn.innerText = 'Game Over'
    closeBtn.classList.add('center');

    modal.style.position = 'relative';
    modal.classList.add('center')
    modal.style.bottom = '40%'
    modal.style.zIndex = '2'

    modal.style.backgroundColor = 'white';
    modal.append(closeBtn);
    document.querySelector('#background').append(modal)
    closeBtn.addEventListener('click', async () => {
        await modal.remove()
        document.querySelector('#player').remove();
        document.querySelector('.UI-Container').classList.add('hide')
        document.querySelector('#battle-btn').classList.add('hide')
    })
}

//Item Description details
function addDetails() {
    let details = document.createElement('div')
    details.style.position = 'relative';
    details.style.width = '6em';
    details.style.height = '7em';
    details.style.bottom = '8em';
    details.style.left = '0em';
    details.style.border = 'solid', '1px', 'blue';
    details.style.backgroundColor = 'white'
    details.style.zIndex = '2'
    this.append(details)
}

function removeDetails(event) {
   this.lastChild.remove()
}


// Function that allows user to queue actions within the energy limit
function actionQueue(player, enemy, damage) {
    let battleActions = [];
    let enemyActions = [];
        //Laser Button Config
           document.querySelector('#laser-btn').addEventListener('click', () => {
                if(player.energy != 0){                             
                    player.energy -= 1
                    battleActions.push({damage: player.laserAttack(), energy: 1})
                    actionStyleUpdate(player.energy)
                    console.log("energy " + player.energy)
                } else {
                    console.log('out of energy! hit the battle button!~')
                }
        }) 

        //Shield Button Config
        document.querySelector('#shield-btn').addEventListener('click', async () => {
            if(player.energy != 0) {
                await player.activateShield()
                player.energy -= 1
                actionStyleUpdate(player.energy)
            } else {
                console.log('out of energy! hit the battle button!~')
            }
        })

        //Thruster Button config
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

        //Projectile Button config
        document.querySelector('#projectile-btn').addEventListener('click', () => {
            if(player.energy != 0 && player.energy > 1) {
                let cost = 1;   
                player.energy -= 2
                battleActions.push({damage: player.projectileAttack(), energy: 2})
                actionStyleUpdate(player.energy, cost)
                console.log("energy: " + player.energy)
            } else {
                console.log('out of energy! hit the battle button!~')
            }
        })

        // Begin Battle- Fight Button config 
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
            console.log("user damage after evasion: " + damage)
         

            handleEvasion(player.speed, enemyActions)
            enemyActions.forEach((enemyAction) => {
                enemyDamage += enemyAction.damage
            })
        
            console.log("enemy damage after evasion: " +enemyDamage)


    
           if(enemy.health <= damage){
                enemy.health -= damage
                enemyElemHp.style.setProperty('--enemyHp', '0%')
                handleWin()
           } else if(player.health + player.shield <= enemyDamage){
               //health number is not exactly right because it does not take into account the players shield
                player.health -= enemyDamage
                playerElemHp.style.setProperty('--playerHp', '0%')
                handleLose()
           }else {

  
                enemy.health -= damage

                // this will be a bug once i make an actual AI
                player.health = handleShield(player.health, player.shield, enemyDamage)
                
                enemyElemHp.style.setProperty('--enemyHp', enemy.health + '%') 
                await playerElemHp.style.setProperty('--playerHp', player.health + '%')   
                resetAction()
           }
            player.shield = shieldUpdate(enemyDamage, player)
            player.speed = 1;
            player.energy = 5
            enemy.energy = 5
            damage = 0
            enemyDamage = 0;
            battleActions = [];
    
        })
    }
    
//Function that handles evasion (hit or miss chance w/ shots)
function handleEvasion(speed, battleActions) {

    battleActions.forEach((battleAction) => {
        let roll = Math.floor(Math.random() * 10) + 1
        if(roll <= speed){                 
            battleAction.damage = 0
        }
    }) 
}

// function that updates the style of the action slot from blue to red
function actionStyleUpdate(currentEnergy, cost) {
    let actions = document.querySelectorAll('.action-slot')
    
    if(cost === 1){
        switch(cost){
            case 1: actions[currentEnergy + 1].style.setProperty('background-color', 'red')
                    actions[currentEnergy].style.setProperty('background-color', 'red')
                    
                    break;
            default :
                break;
        }
    }else {
        actions[currentEnergy].style.setProperty('background-color', 'red')
    }
}

//Function that resets action bar styles after a completed round (meaning after the fight button has been clicked)

function resetAction(){
    let actions = document.querySelectorAll('.action-slot')

    actions.forEach((action) => {
        action.style.setProperty('background-color', 'royalblue')
    })
}

//handles shield when enemy deals damage to player health
function handleShield(health, shield, enemyAction) {
    let totalHP = health + shield

    return totalHP - enemyAction
}

//Updates shield after a completed rotation, checks for negative value
function shieldUpdate(enemyAttack, player) {
   let mitigate = player.shield - enemyAttack 

   if(mitigate < 0 || NaN){
        return 0
   } else {
       return mitigate
   }
}

//Battle Rotation (Complete action between AI and user this function needs to hold all queues for attacks and defenses for a turn)

function battleScene(player, enemy) {
    // rendering enemy sprite & player sprite into ship-container
    let playerElement = document.createElement('img')
    let enemyElement = document.createElement('img')

    playerElement.src = player.url
    enemyElement.src = enemy.url

    document.querySelector('#player').append(playerElement)
    document.querySelector('#enemy').append(enemyElement)

    let damage = 0
    actionQueue(player, enemy,  damage)

}

configureButtons()
battleScene(playerShip, enemyShip);


