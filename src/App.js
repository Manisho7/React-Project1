import React,{useState} from 'react';
import AddUser from './Components/Users/AddUser';
import UsersList from './Components/Users/UsersList';


function App() {
  const [usersList,setUsersList] = useState([]);

  const SaveUserHandler = (users) =>{
    setUsersList((prevUsers)=>{
      return[...prevUsers,{key:users.key ,name:users.name, age:users.age}]
    });
  }

  return (
    <div>
      <AddUser onSaveUsers={SaveUserHandler}/>
      <UsersList users={usersList}/>
    </div>
  );
}

export default App;
