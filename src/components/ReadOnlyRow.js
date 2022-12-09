import React from "react";

const ReadOnlyRow = ({ student, i, handleEditClick, handleDeleteClick }) => {
    return (
        <tr>
            <td>{i}</td>
            <td>{student.msv}</td>
            <td>{student.fullname}</td>
            <td>{student.birth}</td>
            <td>{student.address}</td>
            <td><button type="button" onClick={(event) => handleEditClick(event, student)}>Sửa</button></td>
            <td><button type="button" onClick={() => handleDeleteClick(student.msv)}>Xóa</button></td>
        </tr>
    )
}

export default ReadOnlyRow