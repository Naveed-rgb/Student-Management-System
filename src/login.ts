import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner, Spinner } from "nanospinner";
import chalkAnimation from "chalk-animation";
import fs from "fs";
import path from "path";
const authDataFile = path.join(__dirname, "../../data/auth.json");

const log = console.log;
const login = async (): Promise<void> => {
const username = await inquirer.prompt({
type: "input",
name: "username",
message: "Enter your username",
});
const password = await inquirer.prompt({
type: "password",
name: "password",
message: "Enter your password:",
});
const spinner = createSpinner("Logging in...");
const authData = fs.readFileSync(authDataFile, "utf8");
const users = JSON.parse(authData);
const user = users.find((u: { username: any; password: any; }) => u.username === username.username && u.password === password.password);
if (user) {
spinner.start();
await sleep(2000); // Wait for 5 seconds
spinner.clear(); // Clear the spinner from the console
log('\n');
spinner.success({ text: `${chalk.green("Login successful!")}` });
spinner.clear(); // Clear the spinner from the console
log('\n');
if (user.role === "admin") {
  const createUserOption = await inquirer.prompt({
    type: "confirm",
    name: "createUser",
    message: "Do you want to create a new user?",
  });

  if (createUserOption.createUser) {
    const newUser = await inquirer.prompt([
      {
        type: "input",
        name: "username",
        message: "Enter new username",
      },
      {
        type: "password",
        name: "password",
        message: "Enter new password:",
      },
      {
        type: "list",
        name: "role",
        message: "Select new user role",
        choices: ["admin", "user"],
      },
    ]);

    users.push(newUser);
    fs.writeFileSync(authDataFile, JSON.stringify(users, null, 2));
    log(`\n`);
    log(`${chalk.green("New user created successfully!")}`);
  }
}

// Proceed to main menu
// ...
} else {
  const spinner: Spinner = createSpinner("Logging in...");
  spinner.start();
  await sleep(2000); // Wait for 5 seconds
  spinner.clear();
  log('\n');
  spinner.error({
  text: `${chalk.red("Invalid username or password. Please try again.")}`,
  });
  log('\n');
  spinner.clear(); // Clear the spinner from the console
  // Restart the login process
  await login(); // Recursive call
  }
  };
  function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
  }
  export default login;
  // Initialize auth.json file if it doesn't exist
  if (!fs.existsSync(authDataFile)) {
  fs.writeFileSync(authDataFile, JSON.stringify([{ username: "admin", password: "pwd", role: "admin" }], null, 2));
  }