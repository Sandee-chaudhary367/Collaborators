import styled from 'styled-components';

export const TaskContainer2=styled.div`
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
  background: darkblue;
  border-radius: 10px;
}

max-height: 125px;
display: flex;
flex-direction: column;
font-weight: 560;
font-size: 1.5rem;
font-family: 'Lato', sans-serif;
`

export const TaskContainer=styled.div`

overflow-y:scroll;
::-webkit-scrollbar {
  width: 7px;
}
::-webkit-scrollbar-track {
  background: #f2f2f2;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: darkblue;
  border-radius: 10px;
}


max-height: 350px;
min-width:450px ;
display: flex;
flex-direction: column;
font-weight: 560;
font-size: 1.5rem;
font-family: 'Lato', sans-serif;
`