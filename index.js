const operation = require("./contacts");
// console.log(process.argv);

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await operation.listContacts();
      console.log(contacts);
      break;

    case "get":
      const contact = await operation.getContactById(id);
      if (!contact) {
        throw new Error(`contact with id=${id} not found`);
      }
      console.log(contact);
      break;

    case "add":
      const newContact = await operation.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await operation.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const arr = hideBin(process.argv);

const { argv } = yargs(arr);

invokeAction(argv);
