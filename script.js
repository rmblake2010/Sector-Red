let enemyHP = 100
let enemyHpBar = document.getElementById('enemy-hp')
let backGround = document.querySelector('#background')


//practicing manipulating enemy HP

//Config for Buttons
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

configureButtons()

//Battle Rotation (Complete action between AI and user this function needs to hold all queues for attacks and defenses for a turn)

function battleRotation() {
    let userEnergy = 5
    
}