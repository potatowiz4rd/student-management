import logo from './logo.svg';
import { nanoid } from 'nanoid';
import './App.css';
import React, { useState, Fragment } from 'react';
import data from "./data.json";
import ReadOnlyRow from './components/ReadOnlyRow';
import EditableRow from './components/EditableRow';

const App = () => {

  var i = 1;

  const [students, setStudents] = useState(data);
  const [addStudentData, setStudentData] = useState({
    msv: '', fullname: '', birth: '', address: ''
  });

  const [editStudentData, setEditStudentData] = useState({
    msv: '', fullname: '', birth: '', address: ''
  })
  const [editStudentId, setEditStudentId] = useState(null);

  const handleAddStudent = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newStudentData = { ...addStudentData };
    newStudentData[fieldName] = fieldValue;

    setStudentData(newStudentData);

  }

  const handleEditStudent = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newStudentData = { ...editStudentData };
    newStudentData[fieldName] = fieldValue;

    setStudentData(newStudentData);

  }

  const handleStudentSubmit = (event) => {
    event.preventDefault();

    const newStudent = {
      //id: nanoid(),
      msv: addStudentData.msv,
      fullname: addStudentData.fullname,
      birth: addStudentData.birth,
      address: addStudentData.address
    };

    const newStudents = [...students, newStudent];
    setStudents(newStudents);
  }

  const handleEditSubmit = (event) => {
    event.preventDefault();

    const editedStudent = {
      msv: editStudentData.msv,
      fullname: editStudentData.fullname,
      birth: editStudentData.birth,
      address: editStudentData.address,
    }

    const newStudents = [...students];

    const index = students.findIndex((student)=>student.msv === editStudentId)

    newStudents[index] = editedStudent;

    setStudents(newStudents);
    setEditStudentId(null);
  }


  const handleEditClick = (event, student) => {
    event.preventDefault();

    setEditStudentId(student.msv)

    const formValues = {
      msv: student.msv,
      fullname: student.fullname,
      birth: student.birth,
      address: student.address,
    }

    setEditStudentData(formValues);
  }

  
  return (
    <div className="app-container">
      <form onSubmit={handleEditSubmit}>
        <table>
          <thead>
            <tr>
              <th>TT</th>
              <th>Mã SV</th>
              <th>Họ và tên</th>
              <th>Ngày sinh</th>
              <th>Quê quán</th>
              <th>Sửa/Xóa</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <Fragment>
                {editStudentId === student.msv ? (<EditableRow editStudentData={editStudentData} handleEditStudent={handleEditStudent} />
                ) : (
                  <ReadOnlyRow student={student} i={i++} handleEditClick={handleEditClick} />)}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Thêm mới</h2>
      <form onSubmit={handleStudentSubmit}>
        <div>
          <input type="text" name='msv' required="required" placeholder="Điền MSV" onChange={handleAddStudent} />
          <input type="text" name='fullname' required="required" placeholder="Điền tên" onChange={handleAddStudent} />
          <input type="text" name='birth' required="required" placeholder="Điền ngày sinh" onChange={handleAddStudent} />
          <input type="text" name='address' required="required" placeholder="Quê quán" onChange={handleAddStudent} />
        </div>
        <div>
          <button type="submit">Thêm</button>
        </div>
      </form>
    </div>
  );
}

export default App;
