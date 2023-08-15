const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

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

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        const contacts = await listContacts();
        console.table(contacts);
      } catch (err) {
        console.error(err.message);
      }
      break;

    case "get":
      // ... id
      try {
        const contact = await getContactById(id);
        console.table(contact);
      } catch (err) {
        console.log(err.message);
      }
      break;

    case "add":
      // ... name email phone
      const newContact = await addContact(name, email, phone);
      console.table(newContact);
      break;

    case "remove":
      // ... id
      const removedContact = await removeContact(id);
      console.table(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
