const fs = require("fs/promises");
const path = require("path");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);
  return parsedContacts;
}

function getContactById(contactId) {}

function removeContact(contactId) {}

function addContact(name, email, phone) {}

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      // ... id
      break;

    case "add":
      // ... name email phone
      break;

    case "remove":
      // ... id
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
