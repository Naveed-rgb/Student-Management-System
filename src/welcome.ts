import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";
import login from "./login";
import { createSpinner, Spinner } from "nanospinner";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function welcomeScreen() {
  const welcomeToMsg = figlet.textSync(`               Welcome  to The  `, {
    font: "Small",
    /* Replace "Small" with one of the following valid font names:
    "Standard"
    "Script"
    "Slant"
    "Bubble"
    "Digital"
    "Block"
    "Banner"
    "Random" */
    /* horizontalLayout:
    "default" (left-aligned)
    "center" (center-aligned)
    "full" (full-width, no truncation)
    "fitted" (full-width, with truncation)
    verticalLayout:
    "default" (top-aligned)
    "center" (middle-aligned)
    "full" (full-height, no truncation)
    "fitted" (full-height, with truncation)
    width:any positive integer (sets the maximum width in characters)
    whitespaceBreak:true (breaks lines at whitespace characters) false (breaks lines at any character)
*/
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 200,
    whitespaceBreak: true,
  });

  console.log(
    chalk.redBright(
      chalk.bold(welcomeToMsg) // Use chalk.bold to make the text bold
    )
  );

  const systemString = " Student   Management   System";
  figlet(
    systemString,
    {
      font: "Small", // Use a smaller font size
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 150,
      whitespaceBreak: true,
    },
    async (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const systemAnimation = chalkAnimation.rainbow(
        `${gradient.fruit.multiline(data)}\r\n`
      );

      setTimeout(async () => {
        systemAnimation.stop(); // Animation stops after 5 seconds

        let spinner = createSpinner("Setting up the system...");
        spinner.start();
        await sleep(2000); // Wait for 5 seconds
        spinner.clear(); // Clear the spinner from the console
        spinner.success({
          text: `${chalk.green("Now it is ready to login!")}`,
        });
        console.log("\n");
        login();
      }, 3000); // Increased the timeout to 3 seconds
    }
  );
}
console.clear();
welcomeScreen();
