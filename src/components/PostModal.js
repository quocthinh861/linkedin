import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import db, { storage } from '../firebase';
import firebase from 'firebase';


function PostModal({handleClick}) {

    const user = useSelector(state => state.user.user);
    const [editorText, setEditorText] = useState('');
    const [shareImage, setShareImage] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [assetArea, setAssetArea] = useState('image');

    const switchAssetArea = area => {
        setShareImage('');
        setVideoLink('');
        setAssetArea(area);
    }

    const handleChange = e => {
        const img = e.target.files[0];
        if(img === '' || img === undefined){
            alert(`not an image, the file is a ${typeof img}`);
            return;
        }
        
        setShareImage(img);
    }

    const postArticle = e => {
        e.preventDefault();

        if(e.target !== e.currentTarget) {
            return;
        }

        if(shareImage != '') {
            const upload = storage.ref(`images/${shareImage.name}`)
                                  .put(shareImage);

            upload.on('state_changed', 
                (snapshot) => {
                    const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                    console.log(`Progress: ${progress}%`)
                }, 
                (error) => {
                    alert(error.code);
                }, 
                async () => {
                    const downloadURL = await upload.snapshot.ref.getDownloadURL();
                    db.collection('articles').add({
                        actor: {
                            description: user.email,
                            title: user.displayName, 
                            image: user.photoURL,
                            timestamp: firebase.firestore.Timestamp.now()
                        },
                        video: videoLink,
                        shareImage: downloadURL,
                        comments: 0,
                        description: editorText
                    })
                }
            )
        } else if(videoLink) {
            db.collection('articles').add({
                actor: {
                    description: user.email,
                    title: user.displayName, 
                    image: user.photoURL,
                    timestamp: firebase.firestore.Timestamp.now()
                },
                video: videoLink,
                shareImage: "",
                comments: 0,
                description: editorText
            })   
        }

        exist(e);
    }

    const exist = e => {
        e.preventDefault();
        setEditorText('');
        setShareImage('');
        setVideoLink('');
        setAssetArea('image');
        handleClick(e);
    }

    return (
        <Container>
            <Content>
                <Header>
                    <h2>Create a post</h2>
                    <button onClick={exist}>
                        <img src='/images/close-icon.svg' />
                    </button>
                </Header>
                <SharedContent>
                    <UserInfo>
                        <img src={user && user.photoURL} />
                        <div>
                            <span>{user && user.displayName}</span>
                            <button>
                                <img src='/images/globe-icon.svg' />
                                <span>Anyone</span>
                                <img src='/images/down-icon.svg' />
                            </button>
                        </div>
                    </UserInfo>
                </SharedContent>
                <Editor>
                    <textarea placeholder='What do you want to talk about?' autoFocus={true}
                        value={editorText} onChange={e => setEditorText(e.target.value)}></textarea>
                    <UploadImage>
                        {assetArea === 'image' ? <>
                                <input type='file' accept='image/gif, image/jpeg, image/png' id='file' style={{display: 'none'}}
                                    onChange={handleChange} />
                                {shareImage && <img src={URL.createObjectURL(shareImage)}/>}
                            </> :
                            <>
                                {videoLink && <ReactPlayer width='100%' height='50%' url={videoLink}/>}
                                <input type='text' placeholder='Please input a video link' value={videoLink} 
                                    onChange={e => setVideoLink(e.target.value)} />
                            </>
                        }
                    </UploadImage>
                </Editor>
                <ShareCreation>
                    <AttachAssets>
                        <AssetButton onClick={() => switchAssetArea('image')}>
                            <label for='file'>
                                <img src='/images/share-img.svg' />
                            </label>
                        </AssetButton>
                        <AssetButton onClick={() => switchAssetArea('video')}>
                            <img src='/images/movie-icon.svg' />
                        </AssetButton>
                        <AssetButton>
                            <img src='/images/document-icon.svg' />
                        </AssetButton>
                        <AssetButton>
                            <img src='/images/hiring-icon.svg' />
                        </AssetButton>
                        <AssetButton>
                            <img src='/images/occasion-icon.svg' />
                        </AssetButton>
                        <AssetButton>
                            <img src='/images/polling-icon.svg' />
                        </AssetButton>
                        <AssetButton>
                            <img src='/images/more-icon.svg' />
                        </AssetButton>
                    </AttachAssets>
                    <PostSetting>
                        <PostState>
                                <img src='/images/message-icon.svg' />
                                <span>Anyone</span>
                        </PostState>
                        <Post disabled={!editorText ? true : false} onClick={postArticle}>
                            Post
                        </Post>
                    </PostSetting>

                </ShareCreation>
            </Content>
        </Container>
    )
}

export default PostModal

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.5);
    animation: fadeIn 0.3s;
`;

const Content = styled.div`

    width: 100%;
    max-width: 552px;
    background-color: white;
    max-height: 90%;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    top: 32px;
    margin: auto;    
    
`;

const Header = styled.div`
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    color: rgba(0, 0, 0, 0.7);
    font-weight: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    
    button {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        cursor: pointer;

        &:hover {
            background-color: rgba(0, 0, 0, 0.08);
        }
    }
`;

const SharedContent = styled.div`
    
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 24px;

    img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
    }



    & > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 10px;


        & > span {
           font-weight: 500;
        }

        & > button {
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            font-weight: 600;
            text-align: center;
            border-radius: 16px;
            border: 1px solid rgba(0, 0, 0, 0.5);
            color: rgba(0, 0, 0, 0.5);
            padding: 5px 5px;



            span {
                margin: 0 5px;
            }
            
            img {
                width: 16px;
                height: 16px;
                filter: invert(0.5);
            }

        }
    }
   
`;

const ShareCreation = styled.div`
    padding: 8px 12px;
    display: flex;
`;

const AssetButton = styled.button`
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;

    &:hover {
        background-color: rgba(0, 0, 0, 0.08);
    }
`;

const AttachAssets = styled.div`
    display: flex;
    align-items: center;
    padding-right: 10px;
    border-right: 1px solid rgba(0, 0, 0, 0.15);

    img {
        filter: invert(0.5);
    }
`;

const PostState = styled.div`
    padding: 8px 12px;
    border-radius: 15px;
    font-size: 14px;
    flex: 1;    
    display: flex;
    cursor: pointer;
    align-items: center;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.5);
    span {
        margin-left: 5px;
    }

    &:hover {
        background-color: rgba(0, 0, 0, 0.08);
    }

    img {
        filter: invert(0.5);
    }
`;

const PostSetting = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    padding: 8px;
    justify-content: space-between;

    @media (max-width: 568px) {
        ${PostState} {
            
            display: none;
        }

        justify-content: flex-end;
    }
`;

const Editor = styled.div`
    padding: 12px 24px;
    textarea {
        width: 100%;
        min-height: 100px;
        font-weight: 400;
        font-size: 17px;
    }
`;

const Post = styled.button`
    background-color: ${props => props.disabled ? 'rgba(0, 0, 0, 0.08)' : '#0a66c2'};
    padding: 10px 15px;
    border-radius: 24px;
    font-weight: 600;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    font-size: 14px;
    color: ${props => props.disabled ? 'rgba(0, 0, 0, 0.3)' : 'white'};

    &:hover {
        background-color: ${props => props.disabled ? 'rgba(0, 0, 0, 0.08)' : '#0a4988'};

    }
`;

const UploadImage = styled.div`
    text-align: left;

    img {
        width: 100%;
        height: 150px;
        object-fit: contain;
    }


    & > input[type='text']{
        border: 1px solid black;
        width:70%;
        padding: 8px 10px;
    } 
`;