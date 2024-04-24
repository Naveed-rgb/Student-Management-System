// login.ts
import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner } from "nanospinner";
import chalkAnimation from "chalk-animation";
const log = console.log;

const login = async (): Promise<void> => {
  // const spinner = createSpinner(
  //   "Plaese be ready for Login into the system"
  // ).start();
  // setTimeout(() => {
  //   spinner.success().stop();
  // }, 1000);
  // log(chalk.blue("Hello") + " World" + chalk.red("!"));
  // let msg = chalk.blue("Enter") + " your username" + chalk.red(":");
  // let msg = "Enter your username";
  const username = await inquirer.prompt({
    type: "input",
    name: "username",
    message: "Enter your username",
    // message: `${chalkAnimation.karaoke(msg).start()}`,
  });

  const password = await inquirer.prompt({
    type: "password",
    name: "password",
    message: "Enter your password:",
  });

  // Validate user input (e.g., check if username and password are correct)
  if (username && password) {
    // Login successful, proceed to main menu
    let u_name = "admin";
    let pwd = "pwd";
    if (username == username && password == password) {
      console.log(chalk.green("Login successful!"));
    }
    // ...
  } else {
    // Login failed, display error message
    console.log(chalk.red("Invalid username or password. Please try again."));
  }
};

export default login;
