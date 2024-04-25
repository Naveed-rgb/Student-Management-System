import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";

import login from "./login";

function welcomeScreen() {
  const welcomeToMsg = figlet.textSync(`               Welcome  to The  `, {
    font: "Small",
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
  figlet(systemString, {
    font: "Small", // Use a smaller font size
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 150,
    whitespaceBreak: true,
  }, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const systemAnimation = chalkAnimation.rainbow(
      `${gradient.fruit.multiline(data)}\r\n`
    );

    setTimeout(() => {
      systemAnimation.stop(); // Animation stops after 5 seconds
      login();
    }, 5000); // Increased the timeout to 5 seconds
  });
}
console.clear();
welcomeScreen();