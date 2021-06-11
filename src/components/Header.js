import React from 'react'
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../firebase'
import { logout } from '../features/user/userSlice'
import { Redirect } from 'react-router';

function Header() {
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const logOut = () => {
        auth.signOut().then(() => {
            dispatch(logout());
        })        
    };

    return (
        <Container>
            {
                !user && <Redirect to='/'/>
            }
            <Content>
                <Logo>
                    <a>
                        <img src='/images/home-logo.svg'/>
                    </a>
                </Logo>
                <Search>
                    <div>
                        <input type='text' placeholder='Search' />
                    </div>
                    <SearchIcon>
                        <img src='/images/search-icon.svg' />
                    </SearchIcon>
                </Search>
                <Nav>
                    <NavListWrap>
                        <NavList className='active'>
                            <a>
                                <img src="/images/nav-home.svg" alt="" />
                                <span>Home</span>
                            </a>
                        </NavList>
                        <NavList>
                            <a>
                                <img src="/images/nav-network.svg" alt="" />
                                <span>My Network</span>
                            </a>
                        </NavList>
                        <NavList>
                            <a>
                                <img src="/images/nav-jobs.svg" alt="" />
                                <span>Jobs</span>
                            </a>
                        </NavList>
                        <NavList>
                            <a>
                                <img src="/images/nav-messaging.svg" alt="" />
                                <span>Messaging</span>
                            </a>
                        </NavList>
                        <NavList>
                            <a>
                                <img src="/images/nav-notifications.svg" alt="" />
                                <span>Notifications</span>
                            </a>
                        </NavList>
                        <User>
                            <a>
                                <img src={user && user.photoURL} alt="" />
                                <span>
                                    <span>{user && user.displayName}</span>
                                    <img src="/images/down-icon.svg" alt="" />                                
                                </span>
                            </a>
                            <SignOut onClick={logOut}>
                                <a>Sign Out</a>
                            </SignOut>
                        </User>
                        <Work>
                            <a>
                                <img src="/images/nav-work.svg" alt="" />
                                <span>
                                    Work
                                    <img src="/images/down-icon.svg" alt="" />
                                </span>
                            </a>
                        </Work>
                    </NavListWrap>
                </Nav>
            </Content>
        </Container>
    )
}

export default Header


const Container = styled.div`
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);



    background-color: white;

    position: fixed;
    top: 0;
    left: 0;

    padding: 0 24px;
    width: 100%;

    z-index: 999;   
`;

const Content = styled.div`
   

    max-width: 1128px;
    margin: 0 auto;
    
    display: flex;
    align-items: center;
`;

const Logo = styled.div`
    

    margin-right: 8px;
    line-height: 0;
`;

const Search = styled.div`


    opacity: 1;
    flex-grow: 1;
    position: relative;

    & > div {

        max-width: 280px;

        input {
            background-color: #eef3f8;
            border-radius: 2px;
            color: rgba(0, 0, 0, 0.9);
            width: 218px;
            padding: 0 8px 0 40px;
            line-height: 1.75;
            font-weight: 400;
            font-size: 14px;
            height: 34px;
            border-color: #dce6f1;
        }

    }

`;

const SearchIcon = styled.div`
    position: absolute;
    top: 10px;
    left: 2px;

    width: 40px;
    border-radius: 0 2px 2px 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;  

const Nav = styled.div`

    @media (max-width: 768px) {
        position: fixed;
        left:0;
        bottom:0;
        width: 100%;
        background-color: white;
    }
`;

const NavListWrap = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    .active {
        span:after {
            content: "";
            background-color: black;
            height: 2px;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
        }
    }

    @media (max-width: 768px) {
        position: fixed;
        left:0;
        bottom:0;
        width: 100%;
        background-color: white;
    }
`;

const NavList = styled.li`

   cursor: pointer;

   a {
       display: flex;
       flex-direction: column;
       align-items: center;
       justify-content: center ;
       font-size: 12px;
       font-weight: 400;
       line-height: 1.5;

       min-height: 42px;
       min-width: 80px;
       
       position: relative;

       span {
           color: rgba(0, 0, 0, 0.6);
       }

       @media (max-width: 768px) {
           min-width: 70px;
       }
   }

   &:hover, &:active {
       a {
           span {
               color: rgba(0, 0, 0, 0.9)
           }
       }
   }
`;

const SignOut = styled.div`
    position: absolute;
    top: 45px;
    background: lightgray;
    border-radius: 10px;
    width: 100px;
    height: 40px;
    transition-duration: 167ms;
    text-align: center;
    display: none;


    a {
        font-size: 16px;
        font-weight: 400;
    }

    @media (max-width: 768px) {
        top: -40px;
    }
`;

const User  = styled(NavList)`
    
    
    a > img {
        width: 24px;
        border-radius: 50%;
    }

    span {
        display: flex;
        align-items: center;
    }

    &:hover {
        ${SignOut} {
            align-items: center;
            display: flex;
            justify-content: center;
        }
    }
`;  


const Work = styled(User)`
     border-left: 1px solid rgba(0, 0, 0, 0.08);
`;
