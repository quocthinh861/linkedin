import React from 'react'
import styled from 'styled-components'
import { auth, provider } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/user/userSlice'
import { Redirect } from 'react-router'

function Login() {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user.user);

    const logIn = () => {
        auth.signInWithPopup(provider).then(result => {
            dispatch(login(result.user))
        }).catch(error => alert(error));
    }

    return (
        <Container>
            {
                user && <Redirect to='/home' />
            }
            <Nav>
                <a href='/'>
                    <img src='/images/login-logo.svg' />
                </a>
                <div>
                    <Join>Join now</Join>
                    <SignIn onClick={logIn}>Sign In</SignIn>
                </div>
            </Nav>
            <Section>
                <Hero>
                    <h1>Welcome to your professional community</h1>
                    <img src='/images/login-hero.svg'/>
                </Hero>
                <Form>
                    <Google onClick={logIn}>
                        <img src='/images/google.svg'/>
                        Sign in with Google
                    </Google>
                </Form>
            </Section>
        </Container>
    )
}
 
export default Login

const Container = styled.div`

`;
 
const Nav = styled.nav`
    max-width: 1128px;
  
    padding: 12px 0;
    display: flex;
    margin: auto;
    align-items: center;
    position: relative;
    justify-content: space-between;
    

    & > a {
      
        width: 135px;
        height: 34px;

        @media (max-width: 760px) {
            padding: 0 5px;
        }
    }
`;

const Join = styled.a`
    
    font-size: 16px;
    padding: 10px 12px;
    color: rgba(0, 0, 0, 0.6);
    margin-right: 12px;
    border-radius: 4px;
    font-weight: 600;
    transition-duration: 200ms;
    line-height: 40px;

    &:hover {
        background-color: rgba(0, 0, 0, 0.08);
        color: rgba(0, 0, 0, 0.9);
        

    }

`;

const SignIn = styled(Join)`
    box-shadow: inset 0  0 0 1px #0a66c2;
    border-radius: 24px;
    color: #0a66c2;
    cursor: pointer;
    padding: 10px 24px;
    background-color: rgba(0, 0, 0, 0);

    &:hover {
        background-color: rgba(112, 181, 249, 0.15);
    }
`;

const Section = styled.section`
    
    margin: auto;

    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;

    min-height: 700px;
    
    padding: 60px 0;

    position: relative;

    width: 100%;
    max-width: 1128px;


    @media (max-width: 768px) {
        min-height: 0px;
    }

`;

const Hero = styled.div`
  
    width: 100%;
    
    h1 {
        
        color: #2977c9; 
        width: 55%;
        font-size: 56px;
        font-weight: 200;
        line-height: 70px;

        @media (max-width: 768px) {
            text-align: center;
            font-size: 28px;
            width: 100%;
            line-height: 1.2;
        }
    }

    img {
      
        
        width: 700px;
        height: 670px;

        position: absolute;
        bottom: -2px;
        right: -130px;

        @media (max-width: 768px) {
            top: 230px;
            position: initial;
            height: initial;
            width: initial;
        }
    }
`;

const Google = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    height: 56px;
    width: 100%;
    border-radius: 28px;
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%),
        inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0);
   

    transition-duration: 167ms;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.6);

    &:hover {
        background-color: rgba(207, 207, 207, 0.25);
        color: rgba(0, 0, 0, 0.75)
    }

    
`;

const Form = styled.div`
 
    margin-top: 100px;
    width: 400px;

    @media (max-width: 768px) {
        margin: 0 auto;
        margin-top: 20px;
    }
`;

