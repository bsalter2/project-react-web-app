import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import welcomeGif from '../images/welcome.gif';

const HomePageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; 
    padding-top: 20px; 
    height: 100vh;
    background-color: #15202B;
    color: white;
`;

const Title = styled.h1`
    text-align: center;
    color: white;
    font-family: 'Roboto', sans-serif;
`;

const Subtitle = styled.h2`
    margin-bottom: 10px;
    text-align: center;
    color: white;
`;

const WelcomeImage = styled.img`
    width: 80%;
    max-width: 800px;
    height: 200px;
    border-radius: 15px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const Button = styled.button`
    padding: 10px 20px;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    background-color: #1DA1F2;
    color: white;
    margin-top: 20px;
    cursor: pointer;
    &:hover {
        background-color: #0c85d0;
    }
`;

function HomeScreen() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/search');
    }

    return (
        <HomePageContainer>
            <Title>Welcome to Our Recipe Website!</Title>
            <Subtitle>Discover the best recipes from around the world</Subtitle>
            <WelcomeImage src={welcomeGif} alt="Welcome" />
            <Button onClick={handleButtonClick}>Begin Search for Recipes</Button>
        </HomePageContainer>
    )
}

export default HomeScreen;


