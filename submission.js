function createCharacter(charName, catName = null, initialSkills = [0, 0, 0]) {

    //skill increased by 1 if it is a number and is less than 10
    function levelUp(skill) {
        if (typeof this[skill] === "number" && this[skill] < 10) {
            this[skill]++;
        }
    }

    //all items added to inventory
    function grabItems(...items) {
        this.inventory.push(...items);
    }

    //removes the first matching item from the inventory
    function dropItem(item) {
        let itemIndex = this.inventory.indexOf(item);

        if (itemIndex !== -1) {
            this.inventory.splice(itemIndex, 1);
        }
    }

    //converts skill values to numbers and keeps it under 10
    let fishingSkill = Math.min(Number(initialSkills[0]), 10);
    let miningSkill = Math.min(Number(initialSkills[1]), 10);
    let farmingSkill = Math.min(Number(initialSkills[2]), 10);

    //creates character with its properties
    let character = {
        characterName: charName,
        fishingSkill,
        miningSkill,
        farmingSkill,
        inventory: [],
        levelUp,
        grabItems,
        dropItem
    };

    //catname property added only if its not null
    if (catName !== null) {
        character.catName = catName;
    }

    return character;
}

//creates a description for the character based on its skills
function describeCharacter(character) {

    //adds the skill levels
    let total = character.fishingSkill +
                character.miningSkill +
                character.farmingSkill;

    let description = character.characterName;

    //determines the right description based on skill level
    if (total < 10) {
        description += " is just starting out";
    } else {
        description += " is a skilled adventurer";
    }

    //includes the cat only if the character has the right property
    if (Object.hasOwn(character, "catName")) {
        description += ` and has a cat ${character.catName}`;
    }

    description += ".";

    console.log(description);

    //Leave this for the autograder!
    return description;
}

//testing charactr function
let player = createCharacter("New Player", null);

player.levelUp("farmingSkill");
console.log(player.farmingSkill);

player.grabItems("Apple", "Peach");
player.dropItem("Peach");
console.log(...player.inventory);

describeCharacter(player);