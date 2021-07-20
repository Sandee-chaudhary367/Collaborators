import styled from 'styled-components';

export const TaskContainer=styled.div`
overflow-y:auto;
::-webkit-scrollbar {
  width: 7px;
  
}
::-webkit-scrollbar-track {
  background: #f2f2f2;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: gold;
  border-radius: 10px;
}


max-height:${props=>props.ss==="TaskCard"?"330px":"130px"};
display: flex;
flex-direction: column;
font-weight: 560;
font-size: 1.5rem;
font-family: 'Lato', sans-serif;
`