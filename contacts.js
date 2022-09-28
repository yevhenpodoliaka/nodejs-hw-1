const { v4 } = require("uuid");

const fs = require("fs").promises;

const contactsPath = require("./contactsPath");

const updateContacts = require("./updateContacts");

async function listContacts() {
  const data = await fs.readFile(contactsPath);

  const contacts = JSON.parse(data);

  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  const contact = contacts.find((item) => item.id === contactId.toString());

  if (!contact) {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex(
    (contact) => contact.id === contactId.toString()
  );
  if (idx === -1) {
    return null;
  }

  const newContacts = contacts.filter((_, index) => index !== idx);
  await updateContacts(newContacts);
  return contacts[idx];
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await updateContacts(contacts);

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
