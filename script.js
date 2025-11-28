/* ===== UI REFERENCES ===== */
const ui = {
    // ===== MAIN UI =====
    title: document.getElementById('title'),
    content: document.getElementById('content'),

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
    thunderclapBtn: document.getElementById('thunderclapBtn'),
    shadowVortexBtn: document.getElementById('shadowVortexBtn'),
    iceRainBtn: document.getElementById('iceRainBtn'),
    waterBombBtn: document.getElementById('waterBombBtn'),
    thousandKnivesBtn: document.getElementById('thousandKnivesBtn'),

    // ===== ITEM BUTTONS =====
    healPotionBtn: document.getElementById('healPotionBtn'),
    strengthElixBtn: document.getElementById('strengthElixBtn'),

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

/* ===== ENEMIES OBJECT ===== */
const enemies = {
    gremlin: {
        name: "Gremlin",
        health: 2000,
        maxHealth: 2000,
        minDmg: 5,
        maxDmg: 8,
        likesDance: false,
        likesJump: true,
        likesCry: true,
        likesCharge: true
    }
};

/* ===== CURRENT ENEMY ===== */
let currentEnemy = enemies.gremlin;

/* ===== PLAYER OBJECT ===== */
const player = {
    /* ===== PLAYER VARIABLES ===== */
    health: 500,
    maxHealth: 500,
    mana: 0,
    manaGainAmount: 1,
    noMana: "You didn't have enough mana.",
    healPotions: 5,
    strElixs: 4,
    strong: false,

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

    addMana(amount) {
        this.mana += amount;
        updateDisplays();
    }
};

/* ===== PET OBJECT ===== */
const pets = {
    princeCobra: {
        active: false,
        turnsRemaining: 0
    }
};

/* ========================== 
 V ===== GAME LOGIC =====  V
 ========================== */

/* ===== BUTTON MENU SWITCHING ===== */
ui.fightBtn.addEventListener("click", function () {
    switchManager();
    ui.fightMenu.style.display = "flex";
});

ui.magicBtn.addEventListener("click", function () {
    switchManager();
    ui.magicMenu.style.display = "flex";
});

ui.itemBtn.addEventListener("click", function () {
    switchManager();
    ui.itemMenu.style.display = "flex";
});

ui.summonBtn.addEventListener("click", function () {
    switchManager();
    ui.summonMenu.style.display = "flex";
});

ui.actBtn.addEventListener("click", function () {
    switchManager();
    ui.actMenu.style.display = "flex";
});


/* V ===== ATTACK LOGIC ===== V */

/* ===== BASIC ATTACK LOGIC ===== */
ui.basicAtkBtn.addEventListener("click", function () {
    if(player.strong) {
        let playerDamage = getRandom(25, 30);
        player.attack(playerDamage);
    } else {
        let playerDamage = getRandom(8, 12);
        player.attack(playerDamage);
    }
    cooldown(800, ui.basicAtkBtn);
    BGFlash("red");
    player.strong = false;
});

/* ===== POWERED ATTACK LOGIC ===== */
ui.poweredAtkBtn.addEventListener("click", function () {
    if(checkMana(20)) {
        player.mana -= 20;
        updateDisplays();
        if(player.strong) {
            let playerDamage = getRandom(56, 62);
            player.attack(playerDamage);
        } else {
            let playerDamage = getRandom(35, 40);
            player.attack(playerDamage);
        }
        cooldown(4000, ui.poweredAtkBtn);
        BGFlash("red");
    } else {
        ui.logMisc.textContent = player.noMana;
    }
    player.strong = false;
});

/* ===== SUPER POWERED ATTACK LOGIC ===== */
ui.superPoweredAtkBtn.addEventListener("click", function () {
    if(checkMana(40)) {
        player.mana -= 40;
        updateDisplays();
        if(player.strong) {
            let playerDamage = getRandom(75, 89);
            player.attack(playerDamage);
        } else {
            let playerDamage = getRandom(50, 62);
            player.attack(playerDamage);
        }
        cooldown(8000, ui.superPoweredAtkBtn);
        BGFlash("red");
    } else {
        ui.logMisc.textContent = player.noMana;
    }
    player.strong = false;
});

/* V ===== MAGIC LOGIC ===== V */

/* ===== FIREBALL SPELL LOGIC ===== */
ui.fireballBtn.addEventListener("click", function () {
    if(checkMana(15)) {
        player.mana -= 15;
        updateDisplays();
        let chances = getRandom(1, 2);
        if(chances === 1) {
            let playerDamage = getRandom(20, 24);
            player.spell(playerDamage, "Fireball");
            BGFlash("red");
        } else {
            ui.logMain.textContent = "Your Fireball missed!";
        }
        cooldown(6000, ui.fireballBtn);
    } else {
        ui.logMisc.textContent = player.noMana;
    }
});

/* ===== THUNDERCLAP SPELL LOGIC ===== */
ui.thunderclapBtn.addEventListener("click", function () {
    if(checkMana(20)) {
        player.mana -= 20;
        updateDisplays();
        let chances = getRandom(1, 3);
        if(chances > 1) {
            let playerDamage = getRandom(36, 37);
            player.spell(playerDamage, "Thunderclap");
            BGFlash("yellow");
        } else {
            ui.logMain.textContent = "Your Thunderclap missed!";
        }
        cooldown(6000, ui.thunderclapBtn);
    } else {
        ui.logMisc.textContent = player.noMana;
    }
});

/* ===== SHADOW VORTEX SPELL LOGIC ===== */
ui.shadowVortexBtn.addEventListener("click", function () {
    if(checkMana(50)) {
        player.mana -= 50;
        updateDisplays();
        let chances = getRandom(1, 5);
        if(chances === 5) {
            let playerDamage = getRandom(60, 67);
            let playerHeal = getRandom(21, 25);
            player.spell(playerDamage, "Shadow Vortex");
            player.health += playerHeal;
            ui.logMain.textContent = `You healed ${playerHeal} Health and did ${playerDamage} damage!`;
            BGFlash("purple");
        } else {
            ui.logMain.textContent = "Your Shadow Vortex missed!";
        }
        cooldown(6000, ui.shadowVortexBtn);
    } else {
        ui.logMisc.textContent = player.noMana;
    }
});

/* ===== ICE RAIN SPELL LOGIC ===== */
ui.iceRainBtn.addEventListener("click", function () {
    if(checkMana(10)) {
        player.mana -= 10;
        updateDisplays();
        let chances = getRandom(1, 4);
        if(chances > 1) {
            let playerDamage = getRandom(10, 25);
            player.spell(playerDamage, "Ice Rain");
            ui.logMain.textContent = `You did ${playerDamage} damage!`;
            BGFlash("blue");
        } else {
            ui.logMain.textContent = "Your Ice Rain missed!";
        }
        cooldown(6000, ui.iceRainBtn);
    } else {
        ui.logMisc.textContent = player.noMana;
    }
});

/* ===== WATER BOMB SPELL LOGIC ===== */
ui.waterBombBtn.addEventListener("click", function () {
    if(checkMana(5)) {
        player.mana -= 5;
        updateDisplays();
        let chances = getRandom(1, 5);
        if(chances > 1) {
            let playerDamage = getRandom(10, 17);
            player.spell(playerDamage, "Water Bomb");
            ui.logMain.textContent = `You did ${playerDamage} damage!`;
            BGFlash("blue");
        } else {
            ui.logMain.textContent = "Your Water Bomb missed!";
        }
        cooldown(6000, ui.waterBombBtn);
    } else {
        ui.logMisc.textContent = player.noMana;
    }
});

/* ===== PIERCING OF A THOUSAND KNIVES SPELL LOGIC ===== */
ui.thousandKnivesBtn.addEventListener("click", function () {
    if(checkMana(60)) {
        player.mana -= 60;
        let playerDamage = getRandom(0, 1000);
        currentEnemy.health -= playerDamage;
        if(playerDamage === 0) {
            ui.logMain.textContent = "All 1000 of your knives missed, which is a 1 in 1000 chance. You are incredibly unlucky."
        } else {
            ui.logMain.textContent = `You did ${playerDamage} damage!`;
            BGFlash("red");
            if(playerDamage >= 500) {
                heavyShake();
            } else {
                shake();
            }
        }
        cooldown(6000, ui.thousandKnivesBtn);
        enemyTurn();
    } else {
        ui.logMisc.textContent = player.noMana;
    }
    updateDisplays();
});


/* V ===== ITEM LOGIC ===== V */

/* ===== HEALING POTION ===== */
ui.healPotionBtn.addEventListener("click", function() {
    if(player.healPotions > 0) {
        let healAmount = 200;
        let actualHealed;
        if(player.health >= player.maxHealth) {
            ui.logMain.textContent = "Your health is maxed out!";
            return;
        }
        if(player.health + healAmount > player.maxHealth) {
            actualHealed = player.maxHealth - player.health;
            player.health = player.maxHealth;
            /* dang i actually have to add comments otherwise this is just a pile of math lol
            so basically this is for if the heal potion doesnt fully heal 200 hp and it heals
            less than 200 since your hp is too high to be healed with 200 */
        } else {
            actualHealed = healAmount;
            player.health += healAmount;
            // this is for if the healing potion heals 200 hp cuz ur hp is low enough
        }
        player.healPotions--;
        ui.logMain.textContent = `You drank a Healing Potion and healed ${actualHealed} HP!`;
        BGFlash("purple");
        updateDisplays();
    } else {
        ui.logMain.textContent = "You're out of healing potions! (You're done for)";
    }
});

/* ===== STRENGTH ELIXIR ===== */
ui.strengthElixBtn.addEventListener("click", function(){
    if(player.strElixs > 0) {
        player.strong = true;
        player.strElixs--;
        ui.logMain.textContent = "You drank a strength elixir! Your next attack will be stronger!"
        BGFlash("orange");
    } else {
        ui.logMain.textContent = "You're out of strength elixirs!";
    }
    updateDisplays();
});


/* ===== ENEMY TURN LOGIC ===== */
function enemyTurn() {
    if(currentEnemy.health <= 0) {
        ui.logEnemy.textContent = `The ${currentEnemy.name} is defeated!`;
        return;
    }

    let damage = getRandom(currentEnemy.minDmg, currentEnemy.maxDmg);
    player.health -= damage;
    ui.logEnemy.textContent = `The ${currentEnemy.name} dealt ${damage} damage!`;
    updateDisplays();

    if(player.health <= 0) {
        ui.content.style.display = "none";
        ui.title.innerHTML = `YOU DIED. You fought well...<br><br>Now rest, or try again, it's your choice.<br><br><br><br>(Click F5 or refresh to restart)`;
    }
};



/* ================================= 
 V ===== UTILITY FUNCTIONS =====  V
 ================================= */



/* ===== RANDOM NUMBER ===== */
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    // bigger number before smaller makes it so that its <=/>= instead of </> (hey thats the html logo :)
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
};

/* ===== FLASH EFFECTS ===== */
function BGFlash(color) {
    document.body.classList.remove(
        'bg-flash-red',
        'bg-flash-blue',
        'bg-flash-yellow',
        'bg-flash-purple',
        'bg-flash-orange'
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
    ui.enemyHealthTxt.textContent = `Enemy Health: ${currentEnemy.health} / ${currentEnemy.maxHealth}`;
    ui.playerHealthTxt.textContent = `Your Health: ${player.health} / ${player.maxHealth}`;
    ui.playerManaTxt.textContent = `Mana: ${player.mana}`;

    ui.healPotionBtn.textContent = `Healing Potion (${player.healPotions} Obtained)`;

    if(player.strong) {
        ui.fightBtn.style.boxShadow = "0 0 24px rgb(255, 140, 0)";
        ui.basicAtkBtn.style.boxShadow = "0 0 24px rgb(255, 140, 0)";
        ui.poweredAtkBtn.style.boxShadow = "0 0 24px rgb(255, 140, 0)";
        ui.superPoweredAtkBtn.style.boxShadow = "0 0 24px rgb(255, 140, 0)";
    } else {
        ui.fightBtn.style.boxShadow = "";
        ui.basicAtkBtn.style.boxShadow = "";
        ui.poweredAtkBtn.style.boxShadow = "";
        ui.superPoweredAtkBtn.style.boxShadow = "";
    }
};

/* ===== MANA LOGIC ===== */
function gainMana() {
    player.addMana(player.manaGainAmount);
};

/* ===== MANA CHECK ===== */
function checkMana(amount) {
    return player.mana >= amount;
};

/* ===== NO CLUE ===== */
function smurfShuffle() {
    let smurf = "IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIM GOING TO DIE";
    console.log("help help help help help help help help help help help help help help help help help help help help help help help help help help " + smurf + smurf + smurf + " i was bored");
};

updateDisplays();
setInterval(gainMana, 1000);




/* todo:
make it so if the enemy likes ur action, they give u a buff and if they dont, they just attack
also the pets should be in logmisc
there should be like 8 enemies
im so bored and proud of my code at the same time imma show this to my friends
AHHHHH im so bored and tired
featherdown wings should remove all cooldowns for like 8 seconds and make the player feel overpowered and then they realize that they wasted it
now im just adding comments to make it look like i did something productive
make it so that rain dance heals you a bit
also the jump should increase the rate that you gain mana for like 10 seconds
battle cry basically makes the enemy's turn not do anything for 15 seconds- wait no 12 seconds
mana charge should give you a chunk of mana instantly (maybe 20)
i should probably stop procrastinating and do my homework
but this is way more fun
wait if the enemy doesnt like your action, they should do a stronger attack YES THIS IS A PERFECT IDEA >:3
also figure out how to add sound effects
imagine adding music
that would be cool
ok sound effects would be a little too much
but music would be chill
also maybe add a crit chance to spells too
wait i already did that
ok now im just rambling
this is what people feel like 
when
they
umm
uhh
idk
...
bro i said "..." like 5 times now
im just really bored
also this is what people feel like
when
they
IM NOT GOING THERE AGAIN NO- NOPE. NO NO, NOPE
i feel like these comments are making the file be double the size it really needs to be
but oh well

when you say you're fine but you're not really fine
also for devs reading my horrible code, just remember you probably used to code like this too at one point
ok u can leave now
really
...
whatever i'll just make this be the last comment
also-
wait i broke my promise
AAAAAAAAAAAAAAAAA
for those of u saying this code is ai, i put semicolons after my function curly brackets
HUH?!??! not so ai generated now
okay maybe i google SOME syntax but it's not ai generated
how do i center a div
ok fr now this is the end
why did past-me do this
im scared
please send help
GOD I BROKE MY PROMISE AGAIN- */
