import fs from "fs";
import process from "process";
import path from "path";

let args = process.argv;
let choice = args[2];

function menu() {
  console.log("Menu");
  console.log("1. Create folder (Enter folder name)");
  console.log("2. Create file (Enter path and then file name)");
  console.log("3. Delete folder (write folder name which needs to be deleted)");
  console.log("4. Delete file (Enter path and then file name)");
  console.log(
    "5. Rename File or folder (Enter path and then file's old name then a new name)"
  );
  console.log("6. Edit file");
  console.log("Enter your choice\n");
}

function checkOptions() {
  if (choice == "list") {
    menu();
  } else if (choice == 1) {
    try {
      let foldername = args[3];
      if (!fs.existsSync(foldername)) {
        fs.mkdirSync(foldername);
        menu();
      }
    } catch (err) {
      console.log(err);
    }
  } else if (choice == 2) {
    try {
      let pathname = args[3];

      let filename = args[4];

      if (!fs.existsSync(filename)) {
        fs.writeFileSync(path.join(pathname, filename), "");
        menu();
      }
    } catch (err) {
      console.log(err);
    }
  } else if (choice == 3) {
    try {
      let foldername = args[3];
      if (fs.existsSync(foldername)) {
        fs.rm(
          foldername,
          {
            recursive: true,
          },
          () => {
            console.log("Folder Deleted!");
          }
        );
      }
      menu();
    } catch (err) {
      console.log(err);
    }
  } else if (choice == 4) {
    try {
      let pathname = args[3];
      let filename = args[4];
      if (fs.existsSync(path.join(pathname, filename))) {
        fs.unlinkSync(path.join(pathname, filename));
      } else {
        console.log("File Does not exist");
      }
      menu();
    } catch (err) {
      console.log(err);
    }
  } else if (choice == 5) {
    try {
      let pathname = args[3];
      let oldname = args[4];
      let newname = args[5];

      fs.renameSync(path.join(pathname, oldname), path.join(pathname, newname));
      menu();
    } catch (err) {
      console.log(err);
    }
  } else if (choice == 6) {
    try {
      let pathname = args[3];
      let filename = args[4];
      let content = args[5];
      let pathcontent = path.join(pathname, filename);

      fs.appendFileSync(pathcontent, content, () => {
        console.log("Appended");
      });
      menu();
    } catch (err) {
      console.log(err);
    }
  }
}

checkOptions();
