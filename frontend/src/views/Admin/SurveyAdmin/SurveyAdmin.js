import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import * as Commons from '../../../common/common'

const FeedbackContainer = styled.div`
  max-width: 1000px;
  margin: auto 30px;

  .h-title {
    width: 1250px;
    border-bottom-style: solid;
    border-color: #D3D3D3;
    border-width: 0px 0px 3px 0px;
  }
  h1 {
    text-align: left;
    font-size: 24px;
    color: #000;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  table {
    width: 125%;
    border-collapse: collapse;
    margin-bottom: 20px;
    margin-top: 15px;
    border-left: 1px solid #ddd;
  }
  tr th {
    padding: 12px;
    text-align: center;
    background-color: #21ACD7;
    color: white;
  }
  
  
  th, td {
    padding: 12px;
    text-align: center;
    color: #000;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
  }
`;


function SurveyAdmin() {
  const [surveys, setSurveys] = useState([]);
  const [surveyName, setSurveyName] = useState('');
  const [render, setRender] = useState(0);
  const [selectedSurvey, setSelectedSurvey] = useState([]);

  useEffect(()=>{
    const getForms=async()=>{
      const surveyList = await axios.get(`${Commons.baseURL}/surveys`);
      setSurveys(surveyList.data[0]);
    }
    getForms();
  },[])

  useEffect(()=>{
    if(surveys.length===1){
      const renderForm=async ()=>{
        const forms = await axios.get(`${Commons.baseURL}/Query/${Object.values(surveys[0])[0]}`);
        console.log(forms.data[0]);
        setSelectedSurvey(forms.data[0]);
      }
      renderForm();
    }else if(surveyName !== ''){
      const renderForm=async ()=>{
        const forms = await axios.get(`${Commons.baseURL}/Query/${surveyName}`);
        console.log(forms.data[0]);
        setSelectedSurvey(forms.data[0]);
      }
      renderForm();
    }
  },[render,surveyName])

  const handleDelete = ()=>{
    axios.delete(`${Commons.baseURL}/DeleteSurveys/${Object.values(selectedSurvey[0]).slice(1).find(b=>(b.type==='formname')).name}`).then(data=>alert('Survey Deleted SuccessFully!')).catch(err=>alert('Delete Failed!'));
    axios.delete(`${Commons.baseURL}/RemoveMapping/${Object.values(selectedSurvey[0]).slice(1).find(b=>(b.type==='formname')).name}`).then(data=>alert('Survey Deleted SuccessFully!')).catch(err=>alert('Delete Failed!'));
    setSelectedSurvey([]);
  }

  return (
    <div>
      {surveys.length===1 ? (render===0 && setRender(1)) : <select onChange={(e)=>setSurveyName(e.target.value)}>
        {surveys.map((s)=>(
          <option key={s.SURVEY_NAME}>{s.SURVEY_NAME}</option>
        ))}
      </select>}
    <FeedbackContainer>
      <div className='h-title'>
        <h1>Feedback Data</h1>
      </div>
      {selectedSurvey && selectedSurvey.length!==0 && 
      <table>
        <thead>
          <tr>
            {Object.values(selectedSurvey[0]).slice(2).map((survey,index)=>(
              <td key={index}>{survey.name}</td>
            ))}
          </tr>
        </thead>
        {selectedSurvey.length > 1 && <tbody>
    {selectedSurvey.slice(1).map((survey, index) => (
      <tr key={index}>
        {Object.values(survey).slice(2).map((data, i) => (
          <td key={i}>
            {data && Object.values(data)[0] !== null
              ? Object.values(data)[0]
              : "N/A" /* Replace with your preferred placeholder */}
          </td>
        ))}
      </tr>
    ))}
  </tbody>}
      </table>}
    </FeedbackContainer>
    {selectedSurvey && <button onClick={handleDelete}>DELETE</button>}
    </div>
  );
}

export default withRouter(SurveyAdmin)

