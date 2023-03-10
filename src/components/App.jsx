import React, { Component } from "react";
import { nanoid } from 'nanoid'
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";


export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: ''
  }


  handleSubmit = (value, { resetForm }) => {
    let newContact = value;

    const check = this.state.contacts.filter(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (check.length) {
      alert(`${newContact.name} is already in contacts`);
    } else {
      newContact.id = nanoid();
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }))
    }

    // setTimeout(() => {
    //   console.log(this.state.contacts);
    // }, 10);
    resetForm();
  };


  handleFilter = e => {
    this.setState({ filter: e.target.value });
  };


  handleDelete = ContactId => {
    this.setState({
      contacts: this.state.contacts.filter(({ id }) => id !== ContactId),
    });
  };

  
  getFilterName = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const contacts = this.getFilterName();
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onLeaveContact={this.handleSubmit} />
        <h2>Contacts</h2>
        <Filter onFilter={this.handleFilter} />
        <ContactList
          contacts={contacts}
          onDelete={this.handleDelete}
        />
      </div>
    )
  }
}


