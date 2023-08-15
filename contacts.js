const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  // Повертає масив контактів.
  const data = await fs.readFile(contactsPath, "utf-8");
  const parsedData = JSON.parse(data);

  return parsedData;
}

async function getContactById(contactId) {
  // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();

  const findContact = contacts.find((contact) => contact.id === contactId);

  return findContact ? findContact : null;
}

async function removeContact(contactId) {
  // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const removedContact = contacts.splice(index, 1);

  fs.writeFile(contactsPath, JSON.stringify(contacts));

  return removedContact;
}

async function addContact(name, email, phone) {
  // Повертає об'єкт доданого контакту.
  if (!name) {
    return "\x1B[31m Name is required";
  }

  if (!email) {
    return "\x1B[31m Email is required";
  }

  if (!phone) {
    return "\x1B[31m Phone is required";
  }

  const contacts = await listContacts();

  const verifyContact = contacts.some((contact) => {
    return (
      contact.name === name &&
      contact.email === email &&
      contact.phone === phone
    );
  });

  if (verifyContact) {
    return "\x1B[31m The contact already exists";
  } else {
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return newContact;
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
