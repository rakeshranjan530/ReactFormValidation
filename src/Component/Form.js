import React,{useState} from "react";
import { Button } from "react-bootstrap";
import validate from '../common';


const Form = ({history}) => {
    const [resultValue, setResultValue] = useState([]);
    const intialValue = { name: "", email: "", password: "", confirmPassword: "", mobile: "" };
    const [formValues, setFormValues] = useState([intialValue]);
    const [formErrors, setFormErrors] = useState([]);

    const handleAdd = (i) => {
        let tempFormValues = [...formValues];
        tempFormValues.push({ name: "", email: "", password: "", confirmPassword: "", mobile: "" })
        setFormValues(tempFormValues)

    }
    const handleDelete = (i) => {
        let tempArr = [...formValues];
        tempArr.splice(i, 1)
        setFormValues(tempArr)
    }
    const handleChange = (e, i) => {
        const { name, value } = e.target;
        let tempFormError = [...formErrors]
        tempFormError?.map((f, k) => {
            if (k === i && value) return f[name] = null;
            return { ...f }
        })
        setFormErrors(tempFormError)
        let tempValueArr = [...formValues]

        tempValueArr.map((o, j) => {
            if (j === i) return o[name] = value; //o{}
        })
        setFormValues(tempValueArr)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let arr = [];
        formValues.forEach((v, j) => {
            let errorObj = validate(v);
            arr.push(errorObj)
        })
        setFormErrors(arr);
        let tempFormValues = JSON.parse(JSON.stringify(formValues))
        tempFormValues.map(value=> value['isUpdateBtn'] = false)

        setResultValue(tempFormValues);
        let arrData = arr.every((value) => Object.values(value).length > 0);
        let tempValue = [];
        if (!arrData) {
            formValues.forEach(r => {
                r['name'] = ''
                r['email'] = ''
                r['password'] = ''
                r['confirmPassword'] = ''
                r['mobile'] = ''
                tempValue.push(r);
            })

            setFormValues(tempValue)
            history.push({pathname:"/table",params:{resultValue:tempFormValues}})
        }
    }
    return (
        <>
            <div className='container main bg-white'>
                <div>
                    <h2 style={{ textAlign: 'center' }}>Welcome To Task</h2>
                </div>
                <div className="row lablename">
                    <div className="col-2">
                        <label>Username</label>
                    </div>
                    <div className="col-2">
                        <label>Email</label>
                    </div>
                    <div className="col-2">
                        <label>Password</label>
                    </div>
                    <div className="col-2">
                        <label>Confirm password</label>
                    </div>
                    <div className="col-2">
                        <label>Mobile no.</label>
                    </div>
                </div>
                {formValues.map((a, i) => (
                    <div className="row wrapper form-section" key={i}>
                        <div className="col-2">
                            <input className='form-control' onChange={(e)=>handleChange(e,i)} type='text' placeholder='Username' name='name' value={formValues[i]?.name} />
                            <p>{formErrors[i]?.name}</p>
                        </div>
                        <div className="col-2">
                            <input className='form-control' onChange={(e)=>handleChange(e,i)} type='email' placeholder='Email' name='email' value={formValues[i]?.email} />
                            <p>{formErrors[i]?.email}</p>
                        </div>
                        <div className="col-2">
                            <input className='form-control' onChange={(e)=>handleChange(e,i)} type='password' placeholder='Password' name='password' value={formValues[i]?.password} />
                            <p>{formErrors[i]?.password}</p>
                        </div>
                        <div className="col-2">
                            <input className='form-control' onChange={(e)=>handleChange(e,i)} type='password' placeholder='Confirm-password' name='confirmPassword' value={formValues[i]?.confirmPassword} />
                            <p>{formErrors[i]?.confirmPassword}</p>
                        </div>
                        <div className="col-2">
                            <input className='form-control' onChange={(e)=>handleChange(e,i)} type='number' placeholder='Mobile no.' name='mobile' value={formValues[i]?.mobile} />
                            <p>{formErrors[i]?.mobile}</p>
                        </div>
                        <div className="col-2 d-flex justify-content-around ">
                            <Button className='btn btn-primary' onClick={() => handleAdd(i)}>Add</Button>
                            {
                                formValues.length !== 1 && (
                                    <Button className='btn btn-danger' onClick={() => handleDelete(i)}>Delete</Button>
                                )
                            }
                        </div>
                    </div>
                ))
                }
                <div className="submit d-flex justify-content-center">
                    <Button className='btn btn-success' onClick={handleSubmit}>Submit</Button>
                </div>
            </div>
        </>
    )
}
export default Form;