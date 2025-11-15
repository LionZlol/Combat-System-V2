/* ===== UI REFERENCES ===== */
const ui = {
    // ===== MAIN UI =====
    title: document.getElementById('title'),

    // ===== ACTION BUTTONS =====
    fightBtn: document.getElementById('fightBtn'),
    magicBtn: document.getElementById('magicBtn'),
    itemBtn: document.getElementById('itemBtn'),
    summonBtn: document.getElementById('summonBtn'),
    actBtn: document.getElementById('actBtn'),

    // ===== ATTACK BUTTONS =====
    basicAtkBtn: document.getElementById('basicAtkBtn'),
    poweredAtkBtn: document.getElementById('poweredAtkBtn'),
    superPoweredAtkBtn: document.getElementById('superPoweredAtkBtn'),

    // ===== MAGIC BUTTONS =====
    fireballBtn: document.getElementById('fireballBtn'),

    // ===== MENUS =====
    fightMenu: document.getElementById('fightMenu'),
    magicMenu: document.getElementById('magicMenu'),
    itemMenu: document.getElementById('itemMenu'),
    summonMenu: document.getElementById('summonMenu'),
    actMenu: document.getElementById('actMenu'),

    // ===== ENEMY DISPLAY =====
    enemyNameTxt: document.getElementById('enemyNameTxt'),
    enemyHealthTxt: document.getElementById('enemyHealthTxt'),

    // ===== PLAYER DISPLAY =====
    playerHealthTxt: document.getElementById('playerHealthTxt'),
    playerManaTxt: document.getElementById('playerManaTxt'),
    playerStatusTxt: document.getElementById('playerStatusTxt'),

    // ===== LOG BOX =====
    logMain: document.getElementById('logMain'),
    logEnemy: document.getElementById('logEnemy'),
    logMisc: document.getElementById('logMisc'),

};


/* ===== ENEMY DEFINITIONS ===== */
const enemies = {
    gremlin: {
        name: "Gremlin",
        health: 2000,
        maxHealth: 2000,
        minDmg: 5,
        maxDmg: 8,
        friendliness: 3,
        aggression: 1,
        loyalty: 0
    }
};


/* ===== CURRENT ENEMY ===== */
let currentEnemy = enemies.gremlin;

/* ===== PLAYER VARIABLES ===== */
let playerHealth = 500;
let playerMana = 0;
let manaGainAmount = 1;
let noMana = "You didn't have enough mana."


/* ===== PLAYER OBJECT ===== */
const player = {
	attack(damage) {
        let critChance = getRandom(1, 20);
        if(critChance === 20) {
            currentEnemy.health -= damage * 5;
            ui.logMain.textContent = `You landed a CRITICAL HIT and did ${damage * 5} DAMAGE!!!`;
            heavyShake();
        } else {
		    currentEnemy.health -= damage;
            ui.logMain.textContent = `You did ${damage} damage!`;
            shake();
        }
        updateDisplays();
        enemyTurn();
	},
    
    spell(damage, spell) {
        let critChance = getRandom(1, 10);
        if(critChance === 10) {
            currentEnemy.health -= damage * 5;
            ui.logMain.textContent = `Your ${spell} landed a CRITICAL HIT and did ${damage * 5} DAMAGE!!!`;
            heavyShake();
        } else {
            currentEnemy.health -= damage;
            ui.logMain.textContent = `Your ${spell} did ${damage} damage!`;
            shake();
        }
        updateDisplays();
        enemyTurn();
    },

    mana(amount) {
        playerMana += amount;
        updateDisplays();
    }
};




/* ========================== */
/* V ===== GAME LOGIC =====  V*/
/* ========================== */




/* ===== BUTTON MENU SWITCHING ===== */
ui.fightBtn.addEventListener("click", function () {
    switchManager();
    ui.fightMenu.style.display = "flex";
});

ui.magicBtn.addEventListener("click", function(){
    switchManager();
    ui.magicMenu.style.display = "flex";
});

ui.itemBtn.addEventListener("click", function(){
    switchManager();
    ui.itemMenu.style.display = "flex";
});

ui.summonBtn.addEventListener("click", function(){
    switchManager();
    ui.summonMenu.style.display = "flex";
});

ui.actBtn.addEventListener("click", function(){
    switchManager();
    ui.actMenu.style.display = "flex";
});



/* V ===== ATTACK LOGIC ===== V */

/* ===== BASIC ATTACK LOGIC ===== */
ui.basicAtkBtn.addEventListener("click", function(){
    let playerDamage = getRandom(8, 12);
    player.attack(playerDamage);
    cooldown(400, ui.basicAtkBtn);
    BGFlash("red");
    updateDisplays();
});

/* ===== POWERED ATTACK LOGIC ===== */
ui.poweredAtkBtn.addEventListener("click", function(){
    if(playerMana >= 20) {
        let playerDamage = getRandom(30, 35);
        player.attack(playerDamage);
        playerMana -= 20;
        cooldown(4000, ui.poweredAtkBtn);
        shake();
        BGFlash("red");
        updateDisplays();
    } else {
        ui.logMisc.textContent = noMana;
    }
});

/* ===== SUPER POWERED ATTACK LOGIC ===== */
ui.superPoweredAtkBtn.addEventListener("click", function(){
    if(playerMana >= 40) {
        let playerDamage = getRandom(50, 62);
        player.attack(playerDamage);
        playerMana -= 40;
        cooldown(8000, ui.superPoweredAtkBtn);
        shake();
        BGFlash("red");
        updateDisplays();
    } else {
        ui.logMisc.textContent = noMana;
    }
});



/* V ===== MAGIC LOGIC ===== V */

/* ===== FIREBALL LOGIC ===== */
ui.fireballBtn.addEventListener("click", function(){
    if(playerMana >= 15) {
        let chances = getRandom(1, 2)
        if(chances === 1) {
            let playerDamage = getRandom(10, 14);
            player.spell(playerDamage, "Fireball");
            playerMana -= 15;
            cooldown(6000, ui.fireballBtn);
            BGFlash("red");
            updateDisplays();
        }
    } else {
        ui.logMisc.textContent = noMana;
    }
});



/* ===== ENEMY TURN LOGIC ===== */
function enemyTurn() {
    let damage = getRandom(currentEnemy.minDmg, currentEnemy.maxDmg);
    playerHealth -= damage;
    ui.logEnemy.textContent = `The ${currentEnemy.name} dealt ${damage} damage!`;
    ui.logMisc.textContent = "Your breath is heavy. You are determined to win."
    updateDisplays();
    if (playerHealth <= 0) {
        document.body.style.display = "none";
        ui.title.style.display = "block";
        ui.title.textContent = "YOU DIED. You fought well... Now rest, or try again, it's your choice."
    }
}




/* ================================= */
/* V ===== UTILITY FUNCTIONS =====  V*/
/* ================================= */




/* ===== RANDOM NUMBER ===== */
function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};


/* ===== SUBMENU SWITCHER ===== */
function switchManager() {
    ui.fightMenu.style.display = "none";
    ui.magicMenu.style.display = "none";
    ui.itemMenu.style.display = "none";
    ui.summonMenu.style.display = "none";
    ui.actMenu.style.display = "none";
};


/* ===== SCREEN SHAKE ===== */
function shake() {
    const e = document.documentElement;
    e.classList.remove("shake");
    void e.offsetWidth;
    e.classList.add("shake");
    setTimeout(() => e.classList.remove("shake"), 500);
};

/* ===== HEAVY SCREEN SHAKE ===== */
function heavyShake() {
    const e = document.documentElement;
    e.classList.remove("heavy-shake");
    void e.offsetWidth;
    e.classList.add("heavy-shake");
    setTimeout(() => e.classList.remove("heavy-shake"), 600);
}


/* ===== FLASH EFFECTS ===== */
function BGFlash(color) {
    document.body.classList.remove(
        'bg-flash-red',
        'bg-flash-blue',
        'bg-flash-yellow'
    );
    void document.body.offsetWidth;
    document.body.classList.add(`bg-flash-${color}`);
};


/* ===== COOLDOWN FUNCTION ===== */
function cooldown(time, element) {
    element.style.backgroundColor = "gray";
    element.disabled = true;
    element.style.cursor = "not-allowed";

    setTimeout(function(){
        element.style.backgroundColor = "";
        element.disabled = false;
        element.style.cursor = "pointer";
    }, time)
};


/* ===== UI DISPLAY UPDATER ===== */
function updateDisplays() {
    ui.enemyHealthTxt.textContent = `Health: ${currentEnemy.health} / ${currentEnemy.maxHealth}`;
    ui.playerHealthTxt.textContent = `Health: ${playerHealth} / 500`
    ui.playerManaTxt.textContent = `Mana: ${playerMana}`
};


/* ===== MANA LOGIC ===== */
function gainMana() {
    player.mana(true, manaGainAmount)
}

/* ===== NO CLUE ===== */
function smurfShuffle() {
    let smurf = "IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIM GOING TO DIE";
    console.log("help help help help help help help help help help help help help help help help help help help help help help help help help help " + smurf + smurf + smurf + " i was bored");
};


updateDisplays();
setInterval(gainMana, 1000);

// todo:
// make it so act uses the friendliness whatever stats to see if the thingy does a cool thing and helps u or sum idk
// there should be like 8 enemies
// ooh a crit system would be nice
// im so bored and proud of my code at the same time imma show this to my friends
// also make it so that calculateMana(); is a function and it does stuff based on upgrades ig
// AHHHHH im so bored and tired

// when you say you're fine but you're not really fine
// also for devs reading my horrible code, just remember you probably used to code like this too at one point
// ok u can leave now
// really
// ...
// whatever i'll just make this be the last comment >:3
// also-
// wait i broke my promise
// AAAAAAAAAAAAAAAAA
// for those of u saying this code is ai, i put semicolons after my function curly brackets
// HUH?!??! not so ai generated now
// okay maybe i google SOME syntax but it's not ai generated
// how do i center a div
// chatgpt is my bestie/twin/bro tho
// ok fr now this is the end
// why did past-me do this
// im scared
// please send help
// GODDAMMIT I BROKE MY PROMISE AGAIN-
