#!/usr/bin/env node

const program = require("commander");
const inquirer = require("inquirer");
const csv = require("csv");
const fs = require("fs");
const async = require("async");
const chalk = require("chalk");
const __sendEmail = require("./sendMail");

program
  .version("0.0.1")
  .option("-l, --list [list]", "List of customers in CSV")
  .parse(process.argv || "recipients.csv");
let parse = csv.parse;
let stream = fs.createReadStream(program.list).pipe(parse({ delimiter: "," }));
stream.on("data", function(data) {
  let firstname = data[0];
  let lastname = data[1];
  let email = data[2];
  console.log("Recipients", firstname, lastname, email);

  let questions = [
    {
      type: "input",
      name: "subject",
      message: "Subject - ",
      default: "Test Newsletter"
    },
    {
      type: "input",
      name: "text",
      message: "Text content - ",
      default: "This is a newsletter."
    },
    {
      type: "input",
      name: "attachments",
      message: "Attachments - ",
      default: JSON.stringify([
        // String attachment
        {
          filename: "notes.txt",
          content: "Some notes about this e-mail",
          contentType: "text/plain" // optional, would be detected from the filename
        }
      ])
    }
  ];
  let contactList = [];
  let parse = csv.parse;
  let stream = fs
    .createReadStream(program.list)
    .pipe(parse({ delimiter: "," }));
  stream
    .on("error", function(err) {
      return console.error(err.message);
    })
    .on("data", function(data) {
      let name = data[0] + " " + data[1];
      let mail = data[2];
      contactList.push({ name: name, mail: mail });
    })
    .on("end", function() {
      inquirer.prompt(questions).then(function(ans) {
        async.each(
          contactList,
          function(recipient, fn) {
            __sendEmail(recipient, ans.subject, ans.text, JSON.parse(ans.attachments), fn);
          },
          function(err) {
            if (err) {
              return console.error(chalk.red(err.message));
            }
            console.log(chalk.green("Success"));
          }
        );
      });
    });
});
