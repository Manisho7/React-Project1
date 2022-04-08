import React, { useState, Fragment, useRef } from "react"; //By using Fragment we can get rid of using a div to cover a component.
//it can also be used directly from React.Fragment
import Card from "./UI/Card";
import styles from "./AddUser.module.css";
import Button from "./UI/Button";
import ErrorModal from "./UI/ErrorModal";

const AddUser = (props) => {
  //we are not using state anymore, just to  read the input value refs are good.
  //Because state will render the component on every change unlike refs which only send the value after submitted.
  // const [usernameEntered, setUsernameEntered] = useState("");
  // const [ageEntered, setAgeEntered] = useState("");
  const [error, setError] = useState("");

  const InputUsernameRef = useRef();
  const InputUserAgeRef = useRef();

  const addUserHandler = (event) => {
    event.preventDefault();
    const usernameEntered = InputUsernameRef.current.value;
    const ageEntered = InputUserAgeRef.current.value;
    if (usernameEntered.trim().length === 0 || ageEntered.trim().length === 0) {
      setError({
        title: "Invalid Username or Age",
        message: "Please enter a valid Username or Age!",
      });
      return;
    }
    //+ sign will convert the string in ageEntered to number
    if (+ageEntered < 1) {
      setError({
        title: "Invalid Age",
        message: "Please enter a valid Age(>1)!",
      });
      return;
    }
    // console.log(usernameEntered, ageEntered);

    const usersList = {
      key: Math.random(),
      name: usernameEntered,
      age: ageEntered,
    };
    props.onSaveUsers(usersList);
    //to reset the  values after submitting the form
    InputUsernameRef.current.value = '';
    InputUserAgeRef.current.value = '';
    // setUsernameEntered("");
    // setAgeEntered("");
  };

  // const usernameChangeHandler = (event) => {
  //   setUsernameEntered(event.target.value);
  // };

  // const ageChangeHandler = (event) => {
  //   setAgeEntered(event.target.value);
  // };

  const errorHandler = () => {
    setError("");
  };

  return (
    <Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            className="username"
            type="text"
            //value={usernameEntered}
            //onChange={usernameChangeHandler}
            ref={InputUsernameRef}
          ></input>
          <label htmlFor="age">Age (Years)</label>
          <input
            className="age"
            type="number"
            //value={ageEntered}
            //step='1'
            //onChange={ageChangeHandler}
            ref={InputUserAgeRef}
          ></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Fragment>
  );
};

export default AddUser;
