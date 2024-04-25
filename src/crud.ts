// crud.ts
import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner } from "nanospinner";
import { readFileSync, writeFileSync } from "fs";

// const studentsFile = "students.json";
const studentsFile = "./data/students.json"; // adjust the path as needed
const coursesFile = "./data/courses.json";

const loadStudents = () => {
  try {
    return JSON.parse(readFileSync(studentsFile, "utf8"));
  } catch (error) {
    return [];
  }
};

const loadCourses = () => {
  try {
    return JSON.parse(readFileSync(coursesFile, "utf8"));
  } catch (error) {
    return [];
  }
};

const saveStudents = (students: any) => {
  writeFileSync(studentsFile, JSON.stringify(students, null, 2));
};

const saveCourses = (courses: any) => {
  writeFileSync(coursesFile, JSON.stringify(courses, null, 2));
};

const studentCRUD = async () => {
  const students = loadStudents();
  //const spinner = createSpinner("Loading students...");

  while (true) {
    //spinner.start();
    const { action } = await inquirer.prompt({
      type: "list",
      name: "action",
      message: "Choose an action:",
      choices: [
        "View Students",
        "Add Student",
        "Update Student",
        "Delete Student",
        "Search Students",
        "Sort Students",
        "Back",
      ],
    });
    //spinner.stop();

    switch (action) {
      // NEW CODE STARTS HERE
      case "View Students":
        console.log(chalk.bold("Students:"));
        console.log(
          students
            .map(
              (student: { firstName: any; lastName: any }, index: number) =>
                `${index + 1}. ${student.firstName} ${student.lastName}`
            )
            .join("\n")
        );
        break;

      case "Add Student":
        const { firstName, lastName, age, sex, address } =
          await inquirer.prompt([
            {
              type: "input",
              name: "firstName",
              message: "Enter first name:",
            },
            {
              type: "input",
              name: "lastName",
              message: "Enter last name:",
            },
            {
              type: "input",
              name: "age",
              message: "Enter age:",
            },
            {
              type: "input",
              name: "sex",
              message: "Enter sex:",
            },
            {
              type: "input",
              name: "address",
              message: "Enter address:",
            },
          ]);
        students.push({ firstName, lastName, age, sex, address });
        saveStudents(students);
        break;

      case "Update Student":
        const { index } = await inquirer.prompt({
          type: "input",
          name: "index",
          message: "Enter the index of the student to update:",
        });
        const student = students[index - 1];
        if (student) {
          const { firstName, lastName, age, sex, address } =
            await inquirer.prompt([
              {
                type: "input",
                name: "firstName",
                message: "Enter new first name:",
                default: student.firstName,
              },
              {
                type: "input",
                name: "lastName",
                message: "Enter new last name:",
                default: student.lastName,
              },
              {
                type: "input",
                name: "age",
                message: "Enter new age:",
                default: student.age,
              },
              {
                type: "input",
                name: "sex",
                message: "Enter new sex:",
                default: student.sex,
              },
              {
                type: "input",
                name: "address",
                message: "Enter new address:",
                default: student.address,
              },
            ]);
          students[index - 1] = { firstName, lastName, age, sex, address };
          saveStudents(students);
        } else {
          console.log(chalk.red("Student not found."));
        }
        break;

      case "Delete Student":
        const { index: deleteIndex } = await inquirer.prompt({
          type: "input",
          name: "index",
          message: "Enter the index of the student to delete:",
        });
        if (students[deleteIndex - 1]) {
          students.splice(deleteIndex - 1, 1);
          saveStudents(students);
        } else {
          console.log(chalk.red("Student not found."));
        }
        break;

      case "Search Students":
        const { searchTerm } = await inquirer.prompt({
          type: "input",
          name: "searchTerm",
          message: "Enter search term:",
        });
        const searchResults = students.filter(
          (student: {
            firstName: string | any[];
            lastName: string | any[];
            address: string | any[];
          }) => {
            return (
              student.firstName.includes(searchTerm) ||
              student.lastName.includes(searchTerm) ||
              student.address.includes(searchTerm)
            );
          }
        );
        console.log(chalk.bold("Search Results:"));
        console.log(
          searchResults
            .map(
              (student: { firstName: any; lastName: any }, index: number) =>
                `${index + 1}. ${student.firstName} ${student.lastName}`
            )
            .join("\n")
        );
        break;

      case "Sort Students":
        const { sortOption } = await inquirer.prompt({
          type: "list",
          name: "sortOption",
          message: "Choose a sorting option:",
          choices: [
            "Name (A-Z)",
            "Name (Z-A)",
            "Age (Ascending)",
            "Age (Descending)",
          ],
        });
        switch (sortOption) {
          case "Name (A-Z)":
            students.sort((a: { firstName: string }, b: { firstName: any }) =>
              a.firstName.localeCompare(b.firstName)
            );
            break;
          case "Name (Z-A)":
            students.sort((a: { firstName: any }, b: { firstName: string }) =>
              b.firstName.localeCompare(a.firstName)
            );
            break;
          case "Age (Ascending)":
            students.sort(
              (a: { age: number }, b: { age: number }) => a.age - b.age
            );
            break;
          case "Age (Descending)":
            students.sort(
              (a: { age: number }, b: { age: number }) => b.age - a.age
            );
            break;
        }
        saveStudents(students);
        break;

      case "Back":
        return;
    }
  }
};

const courseCRUD = async () => {
  const courses = loadCourses();
  // const spinner = createSpinner("Loading courses...");

  while (true) {
    //spinner.start();
    const { action } = await inquirer.prompt({
      type: "list",
      name: "action",
      message: "Choose an action:",
      choices: [
        "View Courses",
        "Add Course",
        "Update Course",
        "Delete Course",
        "Back",
      ],
    });
    // spinner.stop();

    switch (action) {
      case "View Courses":
        console.log(chalk.bold("Courses:"));
        console.log(
          courses
            .map(
              (course: { name: any }, index: number) =>
                `${index + 1}. ${course.name}`
            )
            .join("\n")
        );
        break;
      case "Add Course":
        const { name, description, fee } = await inquirer.prompt([
          {
            type: "input",
            name: "name",
            message: "Enter course name:",
          },
          {
            type: "input",
            name: "description",
            message: "Enter course description:",
          },
          {
            type: "input",
            name: "fee",
            message: "Enter course fee:",
          },
        ]);
        courses.push({ name, description, fee });
        saveCourses(courses);
        break;
      case "Update Course":
        const { index } = await inquirer.prompt({
          type: "input",
          name: "index",
          message: "Enter the index of the course to update:",
        });
        const course = courses[index - 1];
        if (course) {
          const { name, description, fee } = await inquirer.prompt([
            {
              type: "input",
              name: "name",
              message: "Enter new course name:",
              default: course.name,
            },
            {
              type: "input",
              name: "description",
              message: "Enter new course description:",
              default: course.description,
            },
            {
              type: "input",
              name: "fee",
              message: "Enter new course fee:",
              default: course.fee,
            },
          ]);
          courses[index - 1] = { name, description, fee };
          saveCourses(courses);
        } else {
          console.log(chalk.red("Course not found."));
        }
        break;
      case "Delete Course":
        const { index: deleteIndex } = await inquirer.prompt({
          type: "input",
          name: "index",
          message: "Enter the index of the course to delete:",
        });
        courses.splice(deleteIndex - 1, 1);
        saveCourses(courses);
        break;
      case "Back":
        return;
    }
  }
};

export { studentCRUD, courseCRUD };
