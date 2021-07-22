import styled from 'styled-components';

export const Greeter=styled.div`
  line-height: 0.9;
  padding: 15px 0 0 10px;
`
export const BoldText=styled.h3`
  font-size: 25px;
  font-weight: 900;
  font-family: 'Mulish', sans-serif;
`

export const LighterText=styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: grey;
`

export const SearchTask=styled.input`
    border-radius: 7px;
    border: 1.5px solid #000000;
    width:98%;
    height: 45px;
    background-color:rgb(189, 189, 189);
`
export const SearchTaskContainer=styled.div`
    padding:15px 0 0 10px;
`
export const TaskTabs=styled.div`
    display: flex;
   
`

export const Tabs=styled.p`
     padding: 10px 20px 10px 20px;
     margin: 0;
    font-weight: 700;
    font-size: 13px;
    color:${props=> props.active?"darkblue":"rgb(97, 97, 97)"};
  cursor: pointer;
`



