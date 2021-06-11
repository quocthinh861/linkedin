import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import PostModal from './PostModal';
import db, { storage } from '../firebase';
import ReactPlayer from 'react-player';


function Main() {

    const user = useSelector(state => state.user.user);
    const [showModal, setShowModal] = useState(false);
    const [articles, setArticles] = useState([]);

    const handleClick = (e) => {
        e.preventDefault();
        setShowModal(showModal => !showModal);

        if(showModal){
            document.body.style.overflow = 'initial';    
        } else {
            document.body.style.overflow = 'hidden';
        }
    }

    

    useEffect(() => {
        db.collection('articles').orderBy('actor.timestamp', 'desc')
                                 .onSnapshot(snapshot => {
                                    setArticles(snapshot.docs.map(doc => ({id: doc.id,...doc.data()})));
                                 })
    }, [])

    return (
        <Container>
            <ShareBox>
                <div>
                    <img src={user && user.photoURL} />
                    <button onClick={handleClick}>Start a post</button>
                </div>
                <div>
                    <button>
                        <img src='/images/photo-icon.svg'/>
                        <span>Photo</span>
                    </button>
                    <button>
                        <img src='/images/video-icon.svg'/>
                        <span>Video</span>
                    </button>
                    <button>
                        <img src='/images/event-icon.svg'/>
                        <span>Event</span>
                    </button>
                    <button>
                        <img src='/images/article-icon.svg'/>
                        <span>Write article</span>
                    </button>
                </div>
            </ShareBox>
            {
                articles.map((article, key) => (
                    <Article key={key}>
                        <ShareActor>
                            <a>
                                <img src={article.actor.image}/>
                                <div>
                                    <span>{article.actor.title}</span>
                                    <span>{article.actor.description}</span>
                                    <span>{article.actor.timestamp.toDate().toLocaleDateString()}</span>
                                </div>
                            </a>
                            <button>
                                <img src='/images/more-icon.svg'/>
                            </button>
                        </ShareActor>
                        <Description>{article.description}</Description>
                        <SharedImg>
                            <a>
                                {
                                     article.video ?
                                        <ReactPlayer width='100%' url={article.video}/> :
                                    (
                                        article.shareImage && <img src={article.shareImage} />
                                    )
                                }
                            </a>
                        </SharedImg>
                        <SocialCounts>
                            <li>
                                <button>
                                    <img src='https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb'/>
                                    <img src='https://static-exp1.licdn.com/sc/h/54ivsuv8nxk12frsw45evxn3r'/>
                                    <span>75</span>
                                </button>
                            </li>
                            <li>
                                <a>2 commments</a>
                            </li>
                        </SocialCounts>
                        <SocialActions>
                            <button>
                                <img src='/images/like-icon.svg' />
                                <span>Like</span>
                            </button>
                            <button>
                                <img src='/images/comment-icon.svg' />
                                <span>Comment</span>
                            </button>
                            <button>
                                <img src='/images/share-icon.svg' />
                                <span>Share</span>
                            </button>
                            <button>
                                <img src='/images/send-icon.svg' />
                                <span>Send</span>
                            </button>
                        </SocialActions>
                    </Article>
                ))
            }

           
            {showModal && <PostModal handleClick={handleClick} /> }
        </Container>
    )
}

export default Main

const CommonCard = styled.div`
    text-align: center;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const Container = styled.div`

`;

const ShareBox = styled(CommonCard)`
    display: flex;
    flex-direction: column;
    color: #958b7b;
    margin: 0 0 8px;
    background: white;

    div {
        button {
            color: rgba(0, 0, 0, 0.6);
            font-size: 14px;
            line-height: 1.5;
            min-height: 48px;
            display: flex;
            align-items: center;
            font-weight: 600;
        }

        &:first-child {
            display: flex;
            align-items: center;
            padding: 8px 16px;

            img {
                width: 48px;
                border-radius: 50%;
                margin-right: 8px;
            }

            button {
                margin: 4px 0;
                flex: 1;
                border: 1px solid rgba(0, 0, 0, 0.15);
                border-radius: 35px;
                padding-left: 16px;
            }
        }

        &:nth-child(2) {
            display: flex;
            justify-content: space-around;
            padding-bottom: 4px;
    
            button {
                padding: 0 10px;
                span {
                    color: #70b5f9;
                    margin-left: 5px;
                }

                &:hover {
                    background-color: rgba(0, 0, 0, 0.08);
                }
            }
        }
    }
`;

const Article = styled(CommonCard)`
    margin: 0 0 8px;
    overflow: visible;
`;

const ShareActor = styled.div`
    padding: 12px 16px;
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    a {
        margin-right: 12px;
        flex: 1;
        display: flex;
        align-items: center;

        img {
            width: 48px;
            height: 48px;
        }

        & > div {
            display: flex;
            flex: 1;
            flex-direction: column;
            margin-left: 8px;

            span {
                text-align: left;
                font-size: 12px;
                color: rgba(0, 0, 0, 0.6);
                

                &:first-child {
                    font-size: 14px;
                    font-weight: 700;
                    color: rgba(0, 0, 0, 1);
                }
            }
        }
    }

    button {
        position: absolute;
        top: 0;
        right: 12px;
    }
`;

const Description = styled.div`
    padding: 0 16px;
    color: rgba(0, 0, 0, 0.9);
    font-size: 14px;
    text-align: left;   
`;

const SharedImg = styled.div`
    margin-top: 8px;

    width: 100%;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

const SocialCounts = styled.ul`
    display: flex;
    align-items: center;
    margin: 0 12px;
    padding: 8px 0;
    border-bottom: 1px solid #e9e5df;

    li {
        margin-right: 7px;
        font-size: 12px;
        button {
            display: flex;
            align-items: center;
        }
    }
`;

const SocialActions = styled.div`
    padding: 5px 12px;  
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-height: 40px;

    button {
        display: flex;
        align-items: center;
        padding: 8px 12px;
        color: #0a66c2;
        border-radius: 15px;

        @media (min-width: 768px) {
            span {
                margin-left: 4px;
            }
        }

        &:hover {
            background-color: rgba(0, 0, 0, 0.08);
        }
    }
`;