import styled from "styled-components";

export const ProfileViewer=styled.div`
    display: flex;
   
    align-items: center;
    padding:0 20px 0 0;
`
export const ProfileImage=styled.img`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    border: solid 1px black;
    margin: 15px 15px 15px 0;
`

export const ProfileText=styled.h1`
    font-size: 1rem;
    font-weight: 400;
    font-family: 'Lato', sans-serif;
`
export const AddTask=styled.button`
    border-radius: 7px;
    border: none;
    width: 350px;
    cursor: pointer;
    height: 50px;
    font-weight: 400;
    font-size: 1.1rem;
    font-family: 'Lato', sans-serif;
    background-color: #000;
    color: #fff;
`