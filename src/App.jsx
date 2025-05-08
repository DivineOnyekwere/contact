import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'


function App() {
  //app varables 
  const [contacts, setContacts] = useState([])
  const [detail, setDetail] = useState([])
  const [showDetail, setShowDetail] = useState(false)
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  //API url
  const baseUrl = 'http://localhost:3000/api/contacts'

  //useEffect to connect to server
  useEffect(()=>{
    axios.get(baseUrl)
    .then(response =>{
      console.log('API server access successfully')
      setContacts(contacts.concat(response.data))
    })
    .catch(error =>{
      console.log('API server access unsuccessfully', error)
    })
  }, [])


//function to add new contact
const addContact = (e) =>{
    e.preventDefault()
    

    //create new contactObject
    const contactObj = {
      name,
      number,
      id: JSON.stringify(Math.floor(Math.random() * 1000)),
      actions: 'Detele'
    }

    if(contactObj.name === '' || contactObj.number === ''){
       //alert user name or number can not be empty
       alert(`Name and Number can't be empty`)
    }else{
      axios.post(baseUrl, contactObj)
      .then(response =>{
        //push new contact object to contacts
       setContacts(contacts.concat(response.data))
       setMessage(`${contactObj.name} has been added`)
       console.log(response.data)
      })
       
    }

    
    //reset name and number input
    setName('');
    setNumber('');
  }

//function to edit contact
const deleteContact = (contact) =>{
  axios.delete(`http://localhost:3000/api/contacts/${contact.id}`)
  .then(response =>{
    setContacts(response.data)
    console.log(`${contact.name} deleted`)
  })
  .catch(error =>[
    console.log(`${contact.name} not deleted`)
  ])
}


//funtion to handle contact details
  const contactDetail = (contact) =>{
    setDetail(contact)
    setShowDetail(true)
  }

  //function to handle name input changes
const handleNameChanges  = (e) =>{
    e.preventDefault()
    setName(e.target.value)
}


  //function to handle name input changes
const handleNumberChanges  = (e) =>{
    e.preventDefault()
    setNumber(e.target.value)
}

  // renders HTML content
 return(
          <>
          {/* display message */}
          {message}
          {/* contact header */}
          <div className='contact-header'>
            <h1>PhoneBook</h1>
            <form action="#" className='contact-form' onSubmit={addContact}>
                <input placeholder='Name' value={name}  type="text" onChange={handleNameChanges} />
                <input placeholder='Number' value={number} type="tel" onChange={handleNumberChanges} />
                <button type='submit'>Add Contact</button>
            </form>
          </div>
          <hr />
          

          {/* contact body */}
          <div className='contact-body'>
              <h2>Contact List</h2>
              {/* Dynamically display contact list */}
              {
                contacts.length === 0 ? <p>No Contact Available</p>: contacts.map(contact => {
                return  <div className='contact-list' key={contact.id}>
                          <h2 onClick={()=>{contactDetail(contact)}}>{contact.name}</h2>
                          {contact.name === detail.name ?
                          <div className='contact-list-info'>
                            <p>{detail.name}</p>
                            <p>{detail.number}</p>
                            <div className='contact-action' key={contact.id}>
                              <button onClick={()=>{deleteContact(contact)}}>{detail.actions}</button>
                            </div>
                           
                              </div>
                              
                            : null}
                        </div>
                })
               }

          </div>
          
          </>
 )
}

export default App
