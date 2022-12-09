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
    setEditStudentData(newStudentData);


  }

  const handleStudentSubmit = (event) => {
    event.preventDefault();
    if (AccessAdd() != "") {
      alert(AccessAdd());
    } else {

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
  }

  const handleEditSubmit = (event) => {

    event.preventDefault();
    if (AccessEdit() != "") {
      alert(AccessEdit());
    } else {

      const editedStudent = {
        msv: editStudentData.msv,
        fullname: editStudentData.fullname,
        birth: editStudentData.birth,
        address: editStudentData.address,
      }

      const newStudents = [...students];

      const index = students.findIndex((student) => student.msv === editStudentId)

      newStudents[index] = editedStudent;

      setStudents(newStudents);
      setEditStudentId(null);
    }
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

  const handleDeleteClick = (studentId) => {
    const newStudents = [...students];

    const index = students.findIndex((student) => student.msv === studentId);

    newStudents.splice(index, 1);

    setStudents(newStudents);
  }

  function AccessEdit() {

    var ok = true;
    var loi = "";

    if (editStudentData.msv.length != 8) {
      ok = false;
      loi += "Điền lại mã sinh viên(MSV phải có 8 chữ số)\n";
    }
    if (editStudentData.fullname.length > 100) {
      ok = false;
      loi += "Điền lại Họ và tên\n";
    }
    if (editStudentData.address.length > 100) {
      ok = false;
      loi += "Điền lại địa chỉ\n";
    }
    if (!laNgayThang(editStudentData.birth)) {
      ok = false;
      loi += "Điền lại ngày sinh(Theo định dạng: nn/tt/nnnn)";

    }
    return loi;



  }
  function AccessAdd() {

    var ok = true;
    var loi = "";

    if (addStudentData.msv.length != 8) {
      ok = false;
      loi += "Điền lại mã sinh viên(MSV phải có 8 chữ số)\n";
    }
    if (addStudentData.fullname.length > 100) {
      ok = false;
      loi += "Điền lại Họ và tên\n";
    }
    if (addStudentData.address.length > 100) {
      ok = false;
      loi += "Điền lại địa chỉ\n";
    }
    if (!laNgayThang(addStudentData.birth)) {
      ok = false;
      loi += "Điền lại ngày sinh(Theo định dạng: nn/tt/nnnn)";
    }
    return loi;
  }
  function laNgayThang(d) {
    var s = d.split("/");

    if (s.length != 3) return false;
    if (isNaN(s[0]) || isNaN(s[1]) || isNaN(s[2])) return false;

    var ngay = parseInt(s[0]);
    var thang = parseInt(s[1]);
    var nam = parseInt(s[2]);

    if (thang > 12 || thang < 1) return false;
    if (
      thang == 1 ||
      thang == 3 ||
      thang == 5 ||
      thang == 7 ||
      thang == 8 ||
      thang == 10 ||
      thang == 12
    ) {
      if (ngay > 31) return false;
    } else if (thang == 2) {
      if (nam % 4 == 0 && nam % 100 != 0) {
        if (ngay > 29) return false;
      } else if (ngay > 28) return false;
    } else if (ngay > 30) return false;

    if (ngay < 1) return false;

    var date = new Date();
    if (nam > date.getFullYear() || nam < 1950) return false;

    return true;
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
              <th>Sửa</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <Fragment>
                {editStudentId === student.msv ? (<EditableRow editStudentData={editStudentData} handleEditStudent={handleEditStudent} />
                ) : (
                  <ReadOnlyRow student={student} i={i++} handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick} />)}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Thêm mới sinh viên vào trường sau:</h2>
      <form  id="ok" onSubmit={handleStudentSubmit}>
        <div>
          <label>Mã số SV :</label><input type="text" name='msv' required="required" placeholder="Điền MSV" onChange={handleAddStudent} /> <br/>
          <label>Họ và tên :</label><input type="text" name='fullname' required="required" placeholder="Điền tên" onChange={handleAddStudent} /> <br/>
          <label>Ngày sinh:</label><input type="text" name='birth' required="required" placeholder="Điền ngày sinh" onChange={handleAddStudent} /> <br/>
          <label>Quê quán:</label><input type="text" name='address' required="required" placeholder="Quê quán" onChange={handleAddStudent} /> <br/>
        </div>
        <div>
          <button type="submit" >Thêm</button>
        </div>
      </form>
    </div>
  );
}

export default App;
