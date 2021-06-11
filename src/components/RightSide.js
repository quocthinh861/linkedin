import React from 'react'
import styled from 'styled-components'
function RightSide() {
    return (
        <Container>
            <FollowCard>
                <Title>
                    <h2>Add to feed</h2>
                    <img src="/images/feed-icon.svg" alt="" />
                </Title>
                <FeedList>
                    <li>
                        <a>
                            <Avatar />
                        </a>
                        <div>
                            <span>#Linkedin</span>
                            <button>Follow</button>
                        </div>
                    </li>
                    <li>
                        <a>
                            <Avatar />
                        </a>
                        <div>
                            <span>#Video</span>
                            <button>Follow</button>
                        </div>
                    </li>
                </FeedList>
                <Recommendation>
                    View all recommendations
                    <img src="/images/right-icon.svg" alt="" />
                </Recommendation>
            </FollowCard>
            <BannerCard>
                    <img
                        src="https://static-exp1.licdn.com/scds/common/u/images/promo/ads/li_evergreen_jobs_ad_300x250_v1.jpg"
                        alt=""
                    />
            </BannerCard>
        </Container>
    )
}

export default RightSide

const Container = styled.div`

` ;

const FollowCard = styled.div`
    text-align: center;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
    padding: 12px;
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    width: 100%;
    color: rgb(0, 0, 0, 0.6);

    img {
        transform: scale(1.5);
    }
`;

const FeedList = styled.ul`
    margin-top: 16px;

    li {
        display: flex;
        align-items: center;
        margin: 12px 0;
        position: relative;
        font-size: 14px;

        & > div {
            display: flex;
            flex-direction: column;
        }

        button {
            background: transparent;
            color: rgba(0, 0, 0, 0.6);
            box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
            border-radius: 15px;
            padding: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            max-height: 32px;
            max-width: 480px;
        }
    }
`;

const Avatar = styled.div`
    background-image: url("https://static-exp1.licdn.com/sc/h/1b4vl1r54ijmrmcyxzoidwmxs");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    margin-right: 8px;
    width: 48px;
    height: 48px;
`;

const Recommendation = styled.a`
    color: #0a66c2;
    display: flex;
    align-items: center;
    font-size: 14px;

    & > img {
        margin-left: 5px;
    }
`;

const BannerCard = styled(FollowCard)`

    position: sticky;
    top: 50px;
    img {
        width: 100%;
        height: 100%;
    }

    @media (max-width: 768px) {
        img {
            width: 50%;
            height: 50%;
        }
    }
`;