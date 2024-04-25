import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner, Spinner } from "nanospinner";
import chalkAnimation from "chalk-animation";
import fs from "fs";
import path from "path";
import { studentCRUD, courseCRUD } from "./crud";
const authDataFile = path.join(__dirname, "../../data/auth.json");
const { width } = require("console");

const log = console.log;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function centerText(text: string | any[]) {
  const padding = Math.floor((width - text.length) / 2);
  return " ".repeat(padding) + text + " ".repeat(padding);
}

const login = async (): Promise<void> => {
  const username = await inquirer.prompt({
    type: "input",
    name: "username",
    message: centerText("Enter your username"),
    validate: (value: string) => {
      if (value.length) {
        return true;
      } else {
        return "Please enter a valid username";
      }
    },
  });
  const password = await inquirer.prompt({
    type: "password",
    name: "password",
    message: centerText("Enter your password:"),
    validate: (value: string) => {
      if (value.length) {
        return true;
      } else {
        return "Please enter a valid password";
      }
    },
    mask: "*", // Mask the password input
  });

  const authData = fs.readFileSync(authDataFile, "utf8");
  const users = JSON.parse(authData);
  const user = users.find(
    (u: { username: any; password: any }) =>
      u.username === username.username && u.password === password.password
  );
  if (user) {
    let spinner = createSpinner(centerText("Logging in..."));
    spinner.start();
    await sleep(2000); // Wait for 5 seconds
    spinner.clear(); // Clear the spinner from the console
    log("\n");
    spinner.success({
      text: centerText(`${chalk.green("Login successful!")}`),
    });
    spinner.clear(); // Clear the spinner from the console
    log("\n");
    if (user.role === "admin") {
      const createUserOption = await inquirer.prompt({
        type: "confirm",
        name: "createUser",
        message: centerText("Do you want to create a new user?"),
      });

      if (createUserOption.createUser) {
        log("\n");
        spinner = createSpinner(
          centerText("Prepraing for creating a new user...")
        );
        spinner.start();
        await sleep(2000); // Wait for 5 seconds
        spinner.success({
          text: centerText(`${chalk.green("Ready to create a new user...")}`),
        });
        spinner.clear(); // Clear the spinner from the console

        const newUser = await inquirer.prompt([
          {
            type: "input",
            name: "username",
            message: centerText("Enter new username"),
          },
          {
            type: "password",
            name: "password",
            message: centerText("Enter new password:"),
          },
          {
            type: "list",
            name: "role",
            message: centerText("Select new user role"),
            choices: ["admin", "user"],
          },
        ]);

        users.push(newUser);
        fs.writeFileSync(authDataFile, JSON.stringify(users, null, 2));
        spinner = createSpinner(centerText("Creating new user..."));
        spinner.start();
        await sleep(2000); // Wait for 5 seconds
        spinner.success({
          text: centerText(`${chalk.green("New user created successfully!")}`),
        });
        spinner.clear(); // Clear the spinner from the console
        log(`\n`);
      }
    }
    spinner = createSpinner(centerText("Let's Proceed With The Menu..."));
    spinner.start();
    await sleep(2000); // Wait for 5 seconds
    spinner.clear(); // Clear the spinner from the console
    log(`\n`);
    spinner.success({ text: centerText(`${chalk.green("Menu is here!")}`) });
    spinner.clear(); // Clear the spinner from the console
    log(`\n`);
    const rainbowTitle = chalkAnimation.rainbow(
      centerText("Welcome to the main menu!")
    );
    await sleep(2000);
    rainbowTitle.stop(); // Stop the animation
    log(`\n`);
    await studentCRUD(); // Call student CRUD
    await courseCRUD(); // Call course CRUD
    // Proceed to main menu
    // ...
  } else {
    const spinner: Spinner = createSpinner(centerText("Logging in..."));
    spinner.start();
    await sleep(2000); // Wait for 5 seconds
    spinner.clear();
    log("\n");
    spinner.error({
      text: centerText(
        `${chalk.red("Invalid username or password. Please try again.")}`
      ),
    });
    log("\n");
    spinner.clear();
    // Restart the login process
    await login(); // Recursive call
  }
};

// Initialize auth.json file if it doesn't exist
if (!fs.existsSync(authDataFile)) {
  fs.writeFileSync(
    authDataFile,
    JSON.stringify(
      [{ username: "admin", password: "pwd", role: "admin" }],
      null,
      2
    )
  );
}

export default login;
