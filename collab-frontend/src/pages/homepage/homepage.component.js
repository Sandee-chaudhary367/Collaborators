import React ,{useState}from 'react';
import {HomePageContainer,Heading} from './homepage.styles.jsx'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const HomePage=()=>{
    const [value, onChange] = useState(new Date());

     const showImage=(value,e)=>{
        const date= `${value.getFullYear()}-${ String(value.getMonth()+1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
     }
    return (
   
    <Calendar 
    onClickDay={showImage}
    onChange={onChange}
    value={value}
  />
 
)}
export default HomePage;