import React from "react";

const EditableRow = ({editStudentData, handleEditStudent }) => {
    return (
        <tr>
            <td></td>
            <td></td>
            <td><input type="text" required="required" name="fullname"
                defaultValue={editStudentData.fullname} onChange={handleEditStudent} /></td>
            <td><input type="text" required="required" name="birth"
                defaultValue={editStudentData.birth} onChange={handleEditStudent} /></td>
            <td><input type="text" required="required" name="address"
                defaultValue={editStudentData.address} onChange={handleEditStudent} /></td>
            <td>
                <button type="submit">Lưu</button>
            </td>
        </tr>
    )
}

export default EditableRow