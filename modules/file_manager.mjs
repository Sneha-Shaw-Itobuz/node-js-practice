import fs from "fs";
import readline from "readline";
import process from "process";
import path from "path";

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function menu() {
  console.log("Enter The Process You Want to Continue:");
  console.log("1. Create a Folder");
  console.log("2. Create a File");
  console.log("3. Delete a Folder");
  console.log("4. Delete a File");
  console.log("5. Re-Name a Folder/File");
  console.log("6. Write in File");
  console.log("7. Exit");
  readlineInterface.question("Enter your choice\n", function (choice) {
    ops(choice);
  });
}

(() => {
  menu();
})();

function ops(choice) {
  choice = parseInt(choice);

  switch (choice) {
    case 1:
      readlineInterface.question(
        "Enter Path Where You want to create a Folder:\n",
        (inputPath) => {
          readlineInterface.question(
            "Now Enter folder Name:\n",
            (folderName) => {
              if (!fs.existsSync(folderName)) {
                fs.mkdirSync(path.join(inputPath, folderName));
                console.log(`${folderName} file Created`);
                menu();
              }
            }
          );
        }
      );

      break;
    case 2:
      readlineInterface.question(
        "Enter Path Where You want to create a File:\n",
        (inputPath) => {
          readlineInterface.question(" Now Enter file Name:\n", (fileName) => {
            if (!fs.existsSync(fileName)) {
              fs.writeFileSync(path.join(inputPath, fileName), "");
              console.log(`${fileName} file Created`);
              menu();
            }
          });
        }
      );

      break;

    case 3:
      readlineInterface.question(
        "Enter Path of the Folder to Delete:\n",
        (inputPath) => {
          readlineInterface.question(
            " Now Enter folder Name to Delete:\n",
            (directory) => {
              fs.rm(path.join(inputPath, directory), {
                recursive: true,
                force: true,
              });
              menu();
            }
          );
        }
      );

      break;

    case 4:
      readlineInterface.question(
        "Enter Path of file to Delete:\n",
        (inputPath) => {
          readlineInterface.question(
            "Enter the FileName With Extention To delete\n",
            (fileName) => {
              console.log(fileName);
              if (fs.existsSync(path.join(inputPath, fileName))) {
                fs.unlinkSync(path.join(inputPath, fileName));
                console.log("File Deleted");
                menu();
              } else {
                console.log("File Does not exist");
                menu();
              }
            }
          );
        }
      );

      break;

    case 5:
      readlineInterface.question(
        "Enter Path of folder/file to Rename (Note: for file add extension too):\n",
        (inputPath) => {
          readlineInterface.question(
            "Enter folder/file Name to Rename (Note: for file add extension too): \n",
            (oldName) => {
              let oldPath = path.join(inputPath, oldName);
              readlineInterface.question(
                "Enter New Folder Name\n",
                (newName) => {
                  let newPath = path.join(inputPath, newName);
                  try {
                    fs.renameSync(oldPath, newPath);
                    console.log("Folder Name Changed");
                    menu();
                  } catch (err) {
                    console.error(err);
                  }
                }
              );
            }
          );
        }
      );

      break;
    case 6:
      readlineInterface.question(
        "Enter path of file you want to Write:\n",
        (inputPath) => {
          readlineInterface.question(
            " Now Enter Name of the file :\n",
            (fileName) => {
              readlineInterface.question("Enter The Content:\n", (content) => {
                console.log(content);
                try {
                  let writeFilePath = path.join(inputPath, fileName);
                  console.log(writeFilePath);
                  fs.appendFileSync(
                    writeFilePath,
                    content,
                    { flag: "a+" },
                    (err) => {
                      console.error(err);
                    }
                  );
                } catch (err) {
                  console.error(err);
                }
                menu();
              });
            }
          );
        }
      );

      break;
    case 7:
      process.exit();
      break;
    default:
      console.log("Wrong Input");
      menu();
      break;
  }
}
