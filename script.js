import Ship from './Ship.js'

const playerShip = new Ship('./assets/player-assets/player-ship-temp.svg', 15, 1)
const enemyShip = new Ship('./assets/enemy-assets/enemy-ship-temp.svg', 15, 1)

let enemyHP = 100
let enemyHpBar = document.getElementById('enemy-hp')
let backGround = document.querySelector('#background')
let actionUI =  document.querySelectorAll('.action-slot')


//practicing manipulating enemy HP

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

    winText.innerText = 'The ship is obiliterated by your shots...You hover over the battle sight..'
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
function actionQueue(player, enemy, damage, enemyAction) {
           document.querySelector('#laser-btn').addEventListener('click',  () => {
                if(player.energy != 0){
                    damage += player.laserAttack()              
                    player.energy -= 1
                    console.log("energy " + player.energy)
                } else {
                    console.log('out of energy! hit the battle button!~')
                }
        })  
        document.querySelector('#battle-btn').addEventListener('click', async () => {
            let playerElemHp = document.querySelector('#player-hp')
            let enemyElemHp = document.querySelector('#enemy-hp')
           
           
           if(enemy.health <= damage){
                enemyElemHp.style.setProperty('--enemyHp', '0%')
                handleWin()
           } else if(player.health <= enemyAction){
                playerElemHp.style.setProperty('--playerHp', '0%')
                handleLose()
           }else {
                enemy.health -= damage
                player.health -= enemyAction

                enemyElemHp.style.setProperty('--enemyHp', enemy.health + '%') 
                await playerElemHp.style.setProperty('--playerHp', player.health + '%')   
           }

            player.energy = 5
            damage = 0
        })

    }
    






//Battle Rotation (Complete action between AI and user this function needs to hold all queues for attacks and defenses for a turn)



// Building battle Scene with ship Classes... Testing this for encapsulation

function battleScene(player, enemy) {
    // rendering enemy sprite & player sprite into ship-container
    let playerElement = document.createElement('img')
    let enemyElement = document.createElement('img')

    playerElement.src = player.url
    enemyElement.src = enemy.url

    document.querySelector('#player').append(playerElement)
    document.querySelector('#enemy').append(enemyElement)

    let damage = 0
    let enemyAction = 0;
    enemyAction = enemy.battleActions()
    actionQueue(player, enemy,  damage, enemyAction)
    
   

}




configureButtons()
battleScene(playerShip, enemyShip);


