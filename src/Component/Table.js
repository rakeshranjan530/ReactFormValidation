import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import validate from "../common";

const TableComponent = ({ history }) => {
    const { location } = history || {};
    const { params } = location || {};
    const { resultValue } = params || {};
    const [formErrors, setFormErrors] = useState([]);

    const [volatile, setVolatile] = useState(resultValue)
    useEffect(() => {
        if (!resultValue) {
            history.push('/')
        }
    }, [resultValue])

    const handleUpdate = (i) => {
        let tempVolatile = [...volatile];
        let arr = [];
        tempVolatile.forEach((v, j) => {
            let errorObj = validate(v);
            arr.push(errorObj)
        })
        setFormErrors(arr);
        let arrData = arr.every((e) => Object.values(e).length > 0);
        if (!arrData) {
            tempVolatile.map((d, j) => {
                if (j === i) return d['isUpdateBtn'] = false;
                return { ...d };
            })
            setVolatile(tempVolatile)
        }

    }
    const handleEdit = (i) => {
        let tempVolatile = [...volatile];

        tempVolatile.map((d, j) => {
            if (j === i) return d['isUpdateBtn'] = true;
            return { ...d };
        })

        setVolatile(tempVolatile)
    }
    const handleChange =(e, i) => {
        const {name, value} = e.target;

        let tempVolatile = [...volatile];

        tempVolatile.map((d, j) => {
            if (j === i) return d[name] = value;
            return { ...d };
        })
        setVolatile(tempVolatile)
    }
    const renderInput = (value,i,name,type,error) =>{
        return(
            <>
            <input className='form-control' onChange={(e)=>handleChange(e,i)} type={type} placeholder={name} name={name} value={value} />
             <p>{error}</p>
            </>
        )
    }
    return (
        <div className="container mt-40">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Passsword</th>
                        <th>Confirm Password</th>
                        <th>Mobile no.</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        volatile?.map((v, i) => {
                            return (
                                <>
                                    <tr className="table-data" key={i}>
                                        <td>{
                                            v?.isUpdateBtn ? renderInput(v?.name,i,'name','text',formErrors[i]?.name) :
                                                v?.name
                                        }</td>
                                        <td>{
                                            v?.isUpdateBtn ? renderInput(v?.email,i,'email','email',formErrors[i]?.email) :
                                                v?.email}</td>
                                        <td>{
                                            v?.isUpdateBtn ? renderInput(v?.password,i,'password','password',formErrors[i]?.password) :
                                                v?.password}</td>
                                        <td>{
                                            v?.isUpdateBtn ? renderInput(v?.confirmPassword,i,'confirmPassword','password',formErrors[i]?.confirmPassword) :
                                                v?.confirmPassword}</td>
                                        <td>{
                                            v?.isUpdateBtn ? renderInput(v?.mobile,i,'mobile','number',formErrors[i]?.mobile) :
                                                v?.mobile}</td>
                                        <td >
                                            {
                                                v?.isUpdateBtn
                                                    ? <Button className='btn btn-success' onClick={() => handleUpdate(i)}> Update</Button>
                                                    : <Button className='btn btn-primary' onClick={() => handleEdit(i)}> Edit</Button>
                                            }
                                        </td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
export default TableComponent;