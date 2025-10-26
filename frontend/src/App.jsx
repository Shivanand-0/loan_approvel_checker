import { useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [formData,setFormData]=useState({
      'Credit_History':null,
      'Property_Area':null,
      'Married':null,
      'Education':null,
      'Dependents':null,
      'Self_Employed':null,
      'ApplicantIncome':null
    });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responce,setResponce]=useState(null);
  const setData=(data)=>{
    setFormData({
      'Credit_History':data.Credit_History.value,
      'Property_Area':data.Property_Area.value,
      'Married':data.Married.value,
      'Education':data.Education.value,
      'Dependents':data.Dependents.value,
      'Self_Employed':data.Self_Employed.value,
      'ApplicantIncome':data.ApplicantIncome.value
    });
  }
  const handleSubmit=(event)=>{
    event.preventDefault();
    setIsLoading(true);
    setData(event.target);
    try{
      axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response=>{
        setResponce(response.data.prediction[0]);
        console.log(response.data.prediction[0])
      })
      .catch(err=>{
        setError("Failed to fetch data from server.");
        console.log(err)});
    } catch (error) {
      setError("An error occurred while fetching data.");
    console.error("Error:", error);

    } finally {
      setIsLoading(false);
    }

  }

  return (
    <>
    <h1 className='text-2xl font-bold mb-4  mt-4 underline ms-10'>
      Check Loan Approvel
    </h1>
    <form onSubmit={handleSubmit}>
       <table className="table table-zebra w-full mb-4 ms-10">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody className='text-lg font-semibold '>
          <tr>
            
            <td><label htmlFor='Credit_History' className='mr-18'>Credit History: </label></td>
            <td>0: <input type="radio" name="Credit_History" value='0' className="radio mr-4" id='Credit_History' defaultChecked />
            1: <input type="radio" name="Credit_History" value='1' className="radio" id='Credit_History'/></td>
          </tr>
          <tr>
            <td><label htmlFor='Property_Area' className='mr-18'>Property Area: </label></td>
            <td>Rural: <input type="radio" name="Property_Area" value='1' className="radio mr-4" id='Property_Area' defaultChecked />
                Semiurban: <input type="radio" name="Property_Area" value='2' className="radio mr-4" id='Property_Area'/>
                Urban: <input type="radio" name="Property_Area" value='0' className="radio" id='Property_Area'/></td>
          </tr>
          <tr>
            <td><label htmlFor='Married' className='mr-18'>Married: </label></td>
            <td>No: <input type="radio" name="Married" value='0' className="radio mr-4" id='Married' defaultChecked />
                Yes: <input type="radio" name="Married" value='1' className="radio" id='Married'/></td>
          </tr>
          <tr>
            <td><label htmlFor='Education' className='mr-18'>Education: </label></td>
            <td>Not Graduate: <input type="radio" name="Education" value='0' className="radio mr-4" id='Education' defaultChecked />
                Graduate: <input type="radio" name="Education" value='1' className="radio" id='Education'/></td>
          </tr>
          <tr>
            <td><label htmlFor='Dependents' className='mr-18'>Dependents: </label></td>
            <td>
              0: <input type="radio" name="Dependents" value='0' className="radio mr-4" id='Dependents' defaultChecked />
              1: <input type="radio" name="Dependents" value='1' className="radio mr-4" id='Dependents'/>
              2: <input type="radio" name="Dependents" value='2' className="radio mr-4" id='Dependents'/>
              2+: <input type="radio" name="Dependents" value='3' className="radio" id='Dependents'/>
            </td>
          </tr>
          <tr>
            <td><label htmlFor='Self_Employed' className='mr-18'>Self Employed: </label></td>
            <td>No: <input type="radio" name="Self_Employed" value='0' className="radio mr-4" id='Self_Employed' defaultChecked />
                Yes: <input type="radio" name="Self_Employed" value='1' className="radio" id='Self_Employed'/>1</td>
          </tr>
          <tr>
            <td><label htmlFor='ApplicantIncome' className='mr-18'>ApplicantI ncome: </label></td>
            <td><input type="number" name="ApplicantIncome" className="input input-bordered w-full max-w-xs" id='ApplicantIncome' placeholder='Enter Applicant Income' /></td>
          </tr>
        </tbody>
       </table>
      <button className="btn btn-primary border-2 ms-20 w-2xl bg-amber-300">Send</button>
    </form>
    {isLoading && <p>Loading...</p>}
    {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    {(responce===0||responce===1) && <div className='mt-4 ms-10 p-4 border-2 border-black rounded-lg w-200'>
      <h2 className='text-2xl font-bold mb-2'>Responce:</h2>
      <p className='text-lg font >-semibold'>Loan Providing Status: {responce===1?"Approve":"Denied"}</p>
      <p className='text-lg font >-semibold'>Loan Paying Ability: {responce===1?"Good":"Bad"}</p>
    </div>}
    </>
  )
}

export default App
