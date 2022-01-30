import Ship from './Ship.js'

const playerShip = new Ship('./assets/player-assets/player-ship-temp.svg', 15, 1)
const enemyShip = new Ship('./assets/enemy-assets/enemy-ship-temp.svg', 15, 1)

let enemyHP = 100
let enemyHpBar = document.getElementById('enemy-hp')
let backGround = document.querySelector('#background')
const INITIAL_ENERGY = 5
let battleEnergy = INITIAL_ENERGY
let actionUI =  document.querySelectorAll('.action-slot')


//practicing manipulating enemy HP

//Config for Buttons
function configureButtons() {
    let buttons = document.querySelectorAll('.btn')
    for(let i = 0; i < buttons.length; i++) {
        document.getElementById(buttons[i].id).addEventListener('mouseover', addDetails)
        document.getElementById(buttons[i].id).addEventListener('mouseout', removeDetails)
        document.getElementById(buttons[i].id).addEventListener('click', actionButtons)
    }
}

/*
function btnDetails(event) {


}
*/

//Button actions
function laserAttack(energy, actionBar) {
    let HP = parseInt(getComputedStyle(enemyHpBar).getPropertyValue('--enemyHp'))
    HP -= 2
    const laserCost = 2;
        if(HP <= 0 ) {
            handleWin()
        } else {
            enemyHpBar.style.setProperty("--enemyHp", HP + "%")
              
        }
    return energy -= 2
}

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
function userBattlePrep(energy) {
    return energy -= 1

}




//Battle Rotation (Complete action between AI and user this function needs to hold all queues for attacks and defenses for a turn)



// Building battle Scene with ship Classes... Testing this for encapsulation

async function battleScene(player, enemy, e) {
    // rendering enemy sprite & player sprite into ship-container
    let playerElement = document.createElement('img')
    let enemyElement = document.createElement('img')

    playerElement.src = player.url
    enemyElement.src = enemy.url

    document.querySelector('#player').append(playerElement)
    document.querySelector('#enemy').append(enemyElement)

    await userBattlePrep(player.energy)



}




configureButtons()
battleScene(playerShip, enemyShip);