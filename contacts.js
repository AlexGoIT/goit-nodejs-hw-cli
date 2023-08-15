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
  const data = await fs.readFile(contactsPath);

  const parsedData = JSON.parse(data);

  const findContact = parsedData.find((contact) => {
    return contact.id === contactId;
  });

  return findContact ? findContact : null;
}

async function removeContact(contactId) {
  // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const data = await fs.readFile(contactsPath);
  const parsedData = JSON.parse(data);

  const index = parsedData.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const removedContact = parsedData.splice(index, 1);

  fs.writeFile(contactsPath, JSON.stringify(parsedData));

  return removedContact;
}

async function addContact(name, email, phone) {
  // Повертає об'єкт доданого контакту.
  if (!name) {
    return "Name is required";
  }

  if (!email) {
    return "Email is required";
  }

  if (!phone) {
    return "Phone is required";
  }

  const data = await fs.readFile(contactsPath);
  const parsedData = JSON.parse(data);

  const verifyContact = parsedData.some((contact) => {
    return (
      contact.name === name &&
      contact.email === email &&
      contact.phone === phone
    );
  });

  if (verifyContact) {
    return "The contact already exists";
  } else {
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    parsedData.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(parsedData));
    return newContact;
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
