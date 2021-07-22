import styled from 'styled-components';

export const Navheading = styled.div`
    border-radius: 0px 15px 15px 0px;
    padding: 8px 30px 8px 60px;
    font-size: 0.77rem;
    font-family: 'Lato', sans-serif;
    display: flex;
    background:${props=> props.active?"black":""};
    color:${props=> props.active?"white":""};
    align-items: center;
    cursor: pointer;
`;

export const NavheadingContainer=styled.div`
    width: 24%;
    min-width: 250px;
    padding: 140px 20px 20px 0;
`

export const AddTask=styled.button`
    border-radius: 5px;
    border: none;
    min-width: 180px;
    cursor: pointer;
    height: 40px;
    font-weight: 400;
    font-size: 1rem;
    font-family: 'Lato', sans-serif;
    background-color: #000;
    color: #fff;
`