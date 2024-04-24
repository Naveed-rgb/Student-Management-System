// login.ts
import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner } from "nanospinner";
import chalkAnimation from "chalk-animation";
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

  // Validate user input (e.g., check if username and password are correct)
  if (username && password) {
    const u_name = "admin";
    const pwd = "pwd";
    if (username.username === u_name && password.password === pwd) {
      spinner.start();
      await sleep(2000); // Wait for 5 seconds
      spinner.clear(); // Clear the spinner from the console
      log(`\n`);
      spinner.success({ text: `${chalk.green("Login successful!")}` });
      spinner.clear(); // Clear the spinner from the console
      log(`\n`);
      const rainbowTitle = chalkAnimation.rainbow("Welcome to the main menu!");
      await sleep(2000);
      rainbowTitle.stop(); // Stop the animation
      log(`\n`);
      // Proceed to main menu
      // ...
    } else {
      spinner.start();
      await sleep(2000); // Wait for 5 seconds
      spinner.clear();
      log(`\n`);
      spinner.error({
        text: `${chalk.red("Invalid username or password. Please try again.")}`,
      });
      log(`\n`);
      spinner.clear(); // Clear the spinner from the console
      // Restart the login process
      await login(); // Recursive call
    }
  }
};

export default login;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
