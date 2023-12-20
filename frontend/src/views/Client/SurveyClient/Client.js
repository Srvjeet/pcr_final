import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import * as Commons from '../../../common/common';

const Client = () => {
  const [surveys, setSurveys] = useState([]);
  const [form, setForm] = useState([]);
  const [usersRes, setUserRes] = useState([]);
  const [checkBoxArr, setCheckBoxArr] = useState([]);
  const [checkString, setCheckString] = useState('');
  const [checkBoxIndex, setCheckBoxIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  useEffect(()=>{
    const getForms=async()=>{
      const surveyList = await axios.get(`${Commons.baseURL}/surveys`);
      setSurveys(surveyList.data[0]);
    }
    getForms();
  },[])

  useEffect(()=>{
    if(checkString.length===0){
      console.log('not checked boxes')
    }else{
      const index = form.findIndex(b=>b.type==='checkbox');
      setCheckBoxIndex(checkBoxArr+index);
      let arr = [...usersRes];
      arr[index-1]={
        [`reply-${index}`]: checkString
      };
      setUserRes(arr);
    }
  },[checkString])

  useEffect(()=>{
    console.log(usersRes);
    const sendData = async ()=>{
      const response = await axios.post(`${Commons.baseURL}/Query`,{Query:   `INSERT INTO ${form.find(b=>(b.type='formname')).name} (${form.map((b,i)=>('q'+(i))).join(',')}) VALUES (null,${usersRes.map(res=>(res===null?`null`:`'${JSON.stringify(res)}'`)).join(',')});`})
      response.data==='' ? setSubmitted(true) : alert('Submission Failed');
    }
    if (checkBoxArr.length!==0){
      sendData();
    }
  },[checkBoxIndex])

  const renderForm=async (surveyName)=>{
    const forms = await axios.get(`${Commons.baseURL}/Query/${surveyName}`);
    const array = Object.values(forms.data[0][0]);
    setForm(array.splice(1));
  }

  const handleSubmit =async  ()=>{
    if(checkBoxArr.length===0){
        const response = await axios.post(`${Commons.baseURL}/Query`,{Query:   `INSERT INTO ${form.find(b=>(b.type='formname')).name} (${form.map((b,i)=>('q'+(i))).join(',')}) VALUES (null,${usersRes.map(res=>(res===null?`null`:`'${JSON.stringify(res)}'`)).join(',')});`})
      /*.then(res=>console.log(res)).catch(err=>console.log(err));*/
      response.data==='' ? setSubmitted(true) : alert('Submission Failed');
    }else{
      let string = '';
      for(let i=0;i<checkBoxArr.length;i++){
        string=string+(checkBoxArr[i]?(form.find(f=>f.type==='checkbox')).buttonNames[i]+'-':'');
      }
      setCheckString(string);
    }
  }

  const handleChange = (val, index)=>{
    if(usersRes.length===0){
      let arr = new Array(form.length-1).fill(null)
      arr[index-1]={
        [`reply-${index}`]: val
      };
      setUserRes(arr);
    }else{
      let arr = [...usersRes];
      arr[index-1]={
        [`reply-${index}`]: val
      };
      setUserRes(arr);
    }
  }

  const handleCheck = (len, index)=>{
    if (checkBoxArr.length === 0){
      let arr = new Array(len).fill(false);
      arr[index]=(arr[index]?false:true);
      setCheckBoxArr(arr);
    }else{
      let arr = [...checkBoxArr];
      arr[index]=(arr[index]?false:true);
      setCheckBoxArr(arr);
    }
  }

  return (
    <div>
      {/*/////////////////////////// Header for Client side starts ////////////////////////////////////*/}
      <div className="header">
        <div className="logo">
          <img src="/logo.png" alt="Logo" className="logo-img" />
        </div>
        <div className="our-survey-btn">
          <a href="/login" className="login-button">
            EXIT
          </a>
        </div>
      </div>
      <style>
        {`
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            background-color: white;
          }

          .logo-img {
            max-height: 60px;
          }

          .our-survey-btn {
            margin-right: 20px;
          }

          .login-button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #1890ff; 
            color: white;
            text-decoration: none;
            border-radius: 4px;
            transition: background-color 0.3s ease-in-out;
          }
  
          .login-button:hover {
            background-color: #096dd9; 
          }
        `}
      </style>

      {/* /////////////////////////////// Header for Client side starts ends /////////////////////// */}

      <style>
        {`
 /* Your CSS goes here */
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  max-width: 300px;
  width: 50%;
  margin-top: 300px; 
  align-items: center;
  justify-content: center;
}

h2 {
  text-align: center;
  color: #333;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
}

input,
select,
textarea {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #f9f9f9;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
}

th, td {
  padding: 12px;
  text-align: center;
}

table input[type="radio"] {
  border: none;
}

button {
  background-color: rgb(31, 6, 168);
  color: #fff;
  padding: 14px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #1e2df6;
}

@media only screen and (max-width: 600px) {
  form {
    width: 90%;
  }
}


a {
  text-decoration: none; 
}

a button {
  background-color: #28a745; 
  color: #fff;
  padding: 14px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  display: inline-block; 
}

a button:hover {
  background-color: #218838; 
}


.draggable-block {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
  }
  .block-card {
    border: 2px dashed #ddd;
    padding: 20px;
    margin: 20px auto; /* Set margin to 'auto' for horizontal centering */
    width: 600px;

  }
  
  
  .formname-block {
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
  
  .formname-label {
    font-weight: bold;
    color: rgb(61, 177, 249);
    font-size:30px;
  }
  
  .button-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  
  .button-wrapper button {
    margin: 0;
  }

  .option-row {
    display: flex;
    gap: 10px;
  }
  
  .option-item {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
  
  .checkbox-row .option-item {
    margin-right: 20px; 
  }
 
/* To Make Responsive  */
@media only screen and (max-width: 1200px) {
  .block-card {
    width: 100%;
    max-width: 95%; 
    overflow-x: hidden;
  }
}

@media only screen and (max-width: 992px) {
  .block-card {
    width: 100%;
    max-width: 95%;
    overflow-x: hidden;
  }
}



@media only screen and (max-width: 768px) {
  .block-card {
    width: 100%;
    max-width: 95%;
    overflow-x: hidden;
  }
}



@media only screen and (max-width: 600px) {
  .block-card {
    width: 100%;
    max-width: 95%;
    overflow-x: hidden;
  }
}



@media only screen and (max-width: 490px) {
  .block-card {
    width: 100%;
    max-width: 95%;
    overflow-x: hidden;
  }
}



@media only screen and (max-width: 375px) {
  .block-card {
    width: 100%;
    max-width: 95%;
    overflow-x: hidden;
  }
}


/* Additional styles for mobile view SS-768 TO 375 */
@media only screen and (max-width: 768px) {
  .checkbox-row .option-item,
  .radio-row .option-item {
    margin-right: 10px;
    flex-basis: calc(33.33% - 10px); 
  }
}

@media only screen and (max-width: 600px) {
  .checkbox-row .option-item,
  .radio-row .option-item {
    margin-right: 10px;
    flex-basis: calc(50% - 10px); 
  }
}


@media only screen and (max-width: 375px) {
  .checkbox-row .option-item,
  .radio-row .option-item {
    margin-right: 10px;
    flex-basis: calc(100% - 10px);
  }
}


        `}
      </style>
      {surveys.length===1 ? surveys.map(s=>{s!=undefined && renderForm(s.SURVEY_NAME)}) : <select onChange={(e)=>renderForm(e.target.value)}>
        {surveys.map((s)=>(
          <option key={s.SURVEY_NAME}>{s.SURVEY_NAME}</option>
        ))}
      </select>}
      <h1 style={{ color: 'black', fontSize: '3em', textAlign: 'center' }}>Please select a form 形状 を 選び なさい</h1>
          <div className="block-card">
            {form && form.map((block, index) => (
              <div
                key={index}
                className={`draggable-block ${block.type === 'button' ? 'button-block' : ''
                  } ${block.type === 'formname' ? 'formname-block' : ''} ${block.type === 'checkbox' ? 'checkbox-block' : ''
                  } ${block.type === 'radio' ? 'radio-block' : ''} ${block.type === 'dropdown' ? 'dropdown-block' : ''
                  }`}
                style={{ border: block.type === 'button' || block.type === 'formname' ? 'none' : '' }}
              >
                {block.type === 'formname' ? (
                  <label className={`formname-label ${block.isRequired ? 'required-field' : ''}`}>{block.name}</label>
                ) : block.type === 'button' ? (
                  <div className="button-wrapper">
                    <button>{block.name}</button>
                  </div>
                ) : (
                  <>
                    <p>
                      {block.name}
                      {block.isRequired && <span className="required-star">*</span>}
                    </p>
                    {block.type === 'checkbox' || block.type === 'radio' ? (
                      <div className={`option-row ${block.type === 'checkbox' ? 'checkbox-row' : 'radio-row'}`}>
                        {block.buttonNames.map((buttonName, buttonIndex) => (
                          <div key={buttonIndex} className="option-item">
                            <input
                              type={block.type === 'checkbox' ? 'checkbox' : 'radio'}
                              onChange={block.type === 'radio' ? (e)=>handleChange(buttonName,index) : (e)=>handleCheck(block.buttonNames.length, buttonIndex)/*console.log(block.buttonNames.length)*/}
                              id={`button_${index}_${buttonIndex}`}
                              name={`button_${index}`}
                            />
                            <label htmlFor={`button_${index}_${buttonIndex}`}>{buttonName}</label>
                          </div>
                        ))}
                      </div>
                    ) : block.type === 'dropdown' ? (
                      <div>
                        <select onChange={(e)=>handleChange(e.target.value, index)}>
                          {block.options && block.options.map((option, optionIndex) => (
                            <option key={optionIndex}>{option}</option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <input onChange={(e)=>handleChange(e.target.value, index)} type={block.type} placeholder={`Enter ${block.type} here`} required={block.isRequired} />
                    )}
                  </>
                )}
              </div>
            ))}
            {form.length!==0 ? <button disabled = {submitted} onClick={handleSubmit}>SUBMIT</button>: null}
          </div>
    </div>
  );
};

export default Client;
