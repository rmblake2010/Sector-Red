# Sector-Red

Summary : This is a small web game for a project in a coding bootcamp.  The goal of this web game was to stretch my coding muscles with everything i had learned with JS.

What is this? : This is a turn based game with two spaceships, each ship has four abilities and limited actions per turn.


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
-Completed what seemed like an okay lay out.

This layout includes:

-Player and Enemy HP;
-Backkground;
-Spaceship imgs;
-Container for skills, energy bar, and items
-Began working on button functionanility 

![prototype-1](https://user-images.githubusercontent.com/4401398/152903113-666cabee-427b-4da1-aead-ac1bf1799888.png)

Button functionanility: 
_____________________________
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
___________________________________________
My goal was to configure the buttons on load, with each button being assigned to a specific function.
This method did not work and was not used.




