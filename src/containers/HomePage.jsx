import React, { useEffect, useState } from 'react';
import axios from 'axios';
import db from '../db/db';

const HomePage = () => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [age, setAge] = useState();
  const [ageError, setAgeError] = useState('');
  const [gender, setGender] = useState('Male');
  const [genderError, setGenderError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [primaryDb, setPrimaryDb] = useState('indexedDb');

  //Fetch Stored Data from DB in case we want to show on UI
  useEffect(() => {
    const fetchRecords = async () => {
      if (primaryDb === 'indexedDb') {
        let res = await db.form.toArray();
      } else {
        let { data } = await axios.get(`/RubicoRegistration/listRecords.php`);
      }
    };
    fetchRecords();
  }, [primaryDb]);

  //Post the data to server
  const submitDetails = async (event) => {
    let requestObj = {
      name,
      age,
      gender,
      email,
    };

    if (isValidate()) {
      if (primaryDb === 'indexedDb') {
        db.form
          .put(requestObj)
          .then((id) => {
            return db.form.get(id);
          })
          .then((item) => {
            alert('Registration successfully completed in Indexed DB');
          })
          .catch((err) => {
            alert('Error: ' + (err.stack || err));
          });
      } else {
        let { data } = await axios.post(
          `/RubicoRegistration/addRecord.php`,
          requestObj
        );
        alert('Registration successfully completed in MySql');
      }
    } else {
      event.preventDefault();
    }
  };

  //Basic Vaidations
  const isValidate = () => {
    let validateFlag = true;
    if (!name) {
      validateFlag = false;
      setNameError("Name can't be empty");
    } else setNameError('');
    if (!age) {
      validateFlag = false;
      setAgeError("Age can't be empty");
    } else setAgeError('');
    if (!email) {
      validateFlag = false;
      setEmailError("Email can't be empty");
    } else setEmailError('');

    return validateFlag;
  };

  return (
    <>
      <div className="dbSelect">
        <button onClick={() => setPrimaryDb('indexedDb')}>Indexed DB</button>
        <button onClick={() => setPrimaryDb('Mysql')}>MySql</button>
      </div>
      <form onSubmit={submitDetails}>
        <input
          type="text"
          id="name"
          value={name}
          placeholder="Name"
          onChange={(event) => setName(event.target.value)}
        />
        <label htmlFor="name">{nameError}</label>
        <br></br>

        <input
          type="number"
          id="age"
          placeholder="Age"
          value={age}
          onChange={(event) => setAge(parseInt(event.target.value))}
        />
        <label htmlFor="age">{ageError}</label>
        <br></br>

        <select
          id="gender"
          placeholder="Gender"
          value={gender}
          onChange={(event) => setGender(event.target.value)}
        >
          <option>Male</option>
          <option>Female</option>
        </select>
        <label htmlFor="age">{genderError}</label>
        <br></br>

        <input
          type="email"
          id="email"
          placeholder="Email"
          autoComplete="off"
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="email">{emailError}</label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default HomePage;
