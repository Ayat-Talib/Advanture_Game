#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from 'chalk';


// Function to display the welcome message
async function displayWelcomeMessage() {
    console.log(chalk.bold.italic.hex('#4A991D')("\n___ Welcome to the 'Lost in Jungle, Adventure Game!' ___\n"));
}

// Function to start the game
async function startGame(): Promise<void> {
    console.log(chalk.hex('#205004')("Your plane has crashed in a dense, uncharted jungle."));
    console.log(chalk.hex('#205004')("Your goal is to find a way out while surviving the perils of the wild.\n "));
}

// Function to play the game
async function playGame(): Promise<void> {
    await startGame();

    while (true) {
        const action = await inquirer.prompt({
            name: "action",
            type: "list",
            message: chalk.hex('#3B8411')("What action do you want to perform?"),
            choices: [
                chalk.hex('#C0C0C0')("Collect Resources"),
                chalk.hex('#C0C0C0')("Explore the Jungle"),
                chalk.hex('#C0C0C0')("Check Inventory"),
                chalk.hex('#C0C0C0')("Craft Tools"),
                chalk.hex('#C0C0C0')("Solve Puzzle"),
                chalk.hex('#C0C0C0')("Exit")
            ]
        });

        switch (action.action) {
            case chalk.hex('#C0C0C0')("Collect Resources"):
                collectResources();
                break;
            case chalk.hex('#C0C0C0')("Explore the Jungle"):
                exploreJungle();
                break;
            case chalk.hex('#C0C0C0')("Check Inventory"):
                checkInventory();
                break;
            case chalk.hex('#C0C0C0')("Craft Tools"):
                craftTools();
                break;
            case chalk.hex('#C0C0C0')("Solve Puzzle"):
                await solvePuzzle();
                break;
            case chalk.hex('#C0C0C0')("Exit"):
                console.log(chalk.hex('#90DF62')("\n Thank you for playing Lost in Jungle Adventure Game!"));
                return;
        }
    }
}

// Define the inventory interface
interface Inventory {
    wood: number;
    stone: number;
    food: number;
    water: number;
    tools: number;
}

// Initialize the inventory object
let inventory: Inventory = {
    wood: 0,
    stone: 0,
    food: 0,
    water: 0,
    tools: 0,
};

// Function to collect resources
function collectResources(): void {
    const resources: (keyof Inventory)[] = ["wood", "stone", "food", "water"];
    const foundResource = resources[Math.floor(Math.random() * resources.length)];
    console.log(chalk.hex('#72CB3D')(`\nYou search the jungle and find ${foundResource}\n `));
    inventory[foundResource]++;
}

// Function to explore the jungle
function exploreJungle(): void {
    const encounters = ["nothing", "animal", "tribe", "puzzle"];
    const encounter = encounters[Math.floor(Math.random() * encounters.length)];

    switch (encounter) {
        case "nothing":
            console.log(chalk.hex('#95A5A6')("\nYou explore deeper into the jungle but find nothing of interest.\n "));
            break;
        case "animal":
            encounterAnimal();
            break;
        case "tribe":
            encounterTribe();
            break;
        case "puzzle":
            console.log(chalk.hex('#74CD41')("\nYou come across an ancient temple with a mysterious puzzle. Solve it to reveal hidden treasures!\n "));
            break;
    }
}

// Function to check inventory
function checkInventory(): void {
    console.log("\nYour Inventory:");
    for (const item in inventory) {
        if (Object.prototype.hasOwnProperty.call(inventory, item)) {
            console.log(chalk.hex('#00BFFF')(`${item}: ${inventory[item as keyof Inventory]}`));
        }
    }
}

// Function to craft tools
function craftTools(): void {
    if (inventory.wood >= 2 && inventory.stone >= 1) {
        inventory.wood -= 2;
        inventory.stone -= 1;
        inventory.tools += 1;
        console.log(chalk.hex('#974CD41')("\nYou have crafted a sturdy machete. It will help you navigate the jungle more safely!\n "));
    } else {
        console.log(chalk.hex('#FF4500')("\nYou don't have enough resources to craft a tool.\n "));
    }
}

// Function to solve a puzzle
async function solvePuzzle(): Promise<void> {
    console.log(chalk.hex('#74CD41')("\nYou come across an ancient temple with a mysterious puzzle.\n"));

    const answer = await inquirer.prompt({
        name: "riddle",
        type: "input",
        message: "Decipher the puzzle: I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?"
    });

    if (answer.riddle.toLowerCase() === "echo") {
        console.log(chalk.hex('#FF1493')("\nCongratulations! You have solved the puzzle and unlocked a hidden chamber filled with treasures!\n "));
        inventory.tools += 2; // Reward for solving the puzzle
    } else {
        console.log(chalk.hex('#FF4500')("\nThe puzzle remains unsolved. Keep exploring!\n"));
    }
}

// Function to handle encountering an animal
function encounterAnimal(): void {
    console.log(chalk.hex('#FF4500')("\nSuddenly, you hear a rustle in the bushes. A ferocious tiger emerges from the jungle!"));
    console.log(chalk.hex('#FF4500')("You must act quickly to defend yourself.\n"));

    let response = inquirer.prompt({
        name: "action",
        type: "list",
        message: "What do you do?",
        choices: ["Fight with your bare hands", "Use your machete to fight", "Run for your life"]
    });

    response.then((answer) => {
        switch (answer.action) {
            case "Fight with your bare hands":
                console.log(chalk.hex('#FF4500')("\nYou attempt to fight the tiger with your bare hands. Unfortunately, the tiger overpowers you."));
                console.log(chalk.hex('#FF4500')("You sustain severe injuries. Game over!\n"));
                break;
            case "Use your machete to fight":
                console.log(chalk.hex('#72CB3D')("\nYou brandish your machete and engage in a fierce battle with the tiger."));
                console.log(chalk.hex('#72CB3D')("With quick reflexes and the sharp edge of your machete, you manage to defeat the tiger."));
                console.log(chalk.hex('#72CB3D')("Though injured, you emerge victorious!\n"));
                break;
            case "Run for your life":
                console.log(chalk.hex('#FF4500')("\nYou decide to flee from the tiger and run as fast as you can."));
                console.log(chalk.hex('#FF4500')("Fortunately, you manage to escape and find safety in a nearby cave.\n"));
                break;
        }
    });
}

// Function to handle encountering a tribe
function encounterTribe(): void {
    console.log(chalk.hex('#00BFFF')("\nAs you venture deeper into the jungle, you stumble upon an ancient indigenous tribe."));
    console.log(chalk.hex('#00BFFF')("They seem curious about your presence and invite you to their village.\n "));

    const response = inquirer.prompt({
        name: "action",
        type: "list",
        message: "How do you respond?",
        choices: ["Accept their invitation", "Decline and leave the area"]
    });

    response.then((answer) => {
        switch (answer.action) {
            case "Accept their invitation":
                console.log(chalk.hex('#00BFFF')("\nYou accept the tribe's invitation and enter their village."));
                console.log(chalk.hex('#00BFFF')("The tribe welcomes you with open arms and shares their food and resources with you."));
                console.log(chalk.hex('#00BFFF')("In return, you offer them some of your own supplies."));
                console.log(chalk.hex('#00BFFF')("After spending some time with the tribe, you bid them farewell and continue your journey.\n"));
                break;
            case "Decline and leave the area":
                console.log(chalk.hex('#00BFFF')("\nYou politely decline the tribe's invitation and thank them for their hospitality."));
                console.log(chalk.hex('#00BFFF')("You decide to leave the area and continue your exploration of the jungle.\n"));
                break;
        }
    });
}

// Function to initiate the game
async function main(): Promise<void> {
    displayWelcomeMessage();
    await playGame();
}

// Start the game
main();
