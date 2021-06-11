import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux';

function LeftSide() {

    const user = useSelector(state => state.user.user);

    return (
        <Container>
            <ArtCard>
                <UserInfo>
                    <CardBackground />
                    <a>
                        <Photo />
                        <Link>Welcome, {user && user.displayName    }!</Link>
                    </a>
                    <a>
                        <AddPhotoText>Add a photo</AddPhotoText>
                    </a>
                </UserInfo>
                <Widget>
                    <a>
                        <div>
                            <span>Connections</span>
                            <span>Grow your network</span>
                        </div>
                        <img src="/images/widget-icon.svg" alt="" />
                    </a>
                </Widget>
                <Item>
                    <span>
                        <img src="/images/item-icon.svg" alt="" />
                        My Item
                    </span>
                </Item>
            </ArtCard>
            <CommunityCard>
                <a>
                    <span>Groups</span>
                </a>
                <a>
                    <span>
                        Events <img src="/images/plus-icon.svg" alt="" />
                    </span>
                </a>
                <a>
                    <span>Follow Hashtags</span>
                </a>
                <Discover>
                    <span>Discover more</span>
                </Discover>
            </CommunityCard>
        </Container>
    )
}

export default LeftSide


const Container = styled.div`
    
`;

const ArtCard = styled.div`
    text-align: center;
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 8px;
    transition: box-shadow 83ms;
    position: relative;
    border: none;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const UserInfo  = styled.div`
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    padding: 12px;
`;

const Photo = styled.img`
    width: 72px;
    height: 72px;
    background-image: url('/images/photo.svg');
    background-position: center;
    background-size: cover;
    border: 2px solid white;
    margin: -38px auto 12px;
    border-radius: 50%;
`;

const CardBackground = styled.div`
    background: url("/images/card-bg.svg");
    background-size: cover;
    margin: -12px -12px 0;
    height: 54px;
`;

const AddPhotoText = styled.p`
    font-size: 12px;
    color: #0a66c2;
    margin-top: 4px;
    line-height: 1.33;
    font-weight: 400;
    cursor: pointer;
`;

const Link = styled.div`
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.9);
    font-weight: 600;
`;

const Widget = styled.div`
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    padding: 12px 0;
    cursor: pointer;

    & > a {
        justify-content: space-between;
        display: flex;
        align-items: center;
        padding: 4px 12px;


        div {
            display: flex;
            flex-direction: column;
            text-align: left;

            span {
                font-size: 12px;
                line-height: 1.333;
                &:first-child {
                    color: rgba(0, 0, 0, 0.6);
                }
                &:nth-child(2) {
                    color: rgba(0, 0, 0, 1);
                }
            }
        }
    }

    img {
        transform: scale(1.5);
    }

    &:hover {
            background-color: rgba(0, 0, 0, 0.08);
    }
`;

const Item = styled.a`
    border-color: rgba(0, 0, 0, 0.8);
    padding: 12px;
    display: block;
    text-align: left;
    cursor: pointer;

    span {
        display: flex;
        align-items: center;

        img {
            transform: scale(1.2);
        }
    }

    &:hover {
        background-color: rgba(0, 0, 0, 0.08);
    }
`;

const CommunityCard = styled(ArtCard)`
    padding: 8px 0 0;
    text-align: left;
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 50px;

    a {
        color: black;
        padding: 4px 12px;
        font-size: 12px;
        cursor: pointer;


        span {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &:hover {
            color: #0a66c2;
        }

        &:last-child {
            color: rgba(0, 0, 0, 0.6);
            border-top: 1px solid #d6cec2;
            padding: 12px;
        }
    }
`;

const Discover = styled(Item)`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    span {
        font-size: 14px;
    }
`;