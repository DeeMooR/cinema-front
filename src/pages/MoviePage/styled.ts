import styled from 'styled-components';

export const StyledTrailer = styled.div<{ video: string, play: string }>`
    position: relative;  
    width: 100%;
    height: 0px;
    padding-bottom: 56.25%;
    background: url(${props => props.video}) center center / cover no-repeat;
    filter: brightness(0.6);
    transition: all 0.2s ease 0s;
    cursor: pointer;
    &:hover {
        filter: brightness(1);
        transition: all 0.3s ease 0s;
    }
    &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        background: url(${props => props.play}) center center / cover no-repeat;
    }

    @media (max-width: 1023.98px) {
        max-width: 300px;
        padding-bottom: 168.75px;
    }
    @media (max-width: 767.98px) {
        min-width: calc(50% - 15px);
        max-width: calc(50% - 15px);
        padding-bottom: 27%;
    }
    @media (max-width: 599.98px) {
        min-width: 60%;
        padding-bottom: 33.75%;
    }
    @media (max-width: 479.98px) {
        max-width: 260px;
        padding-bottom: 146px;
    }
    @media (max-width: 319.98px) {
        width: 100%;
        padding-bottom: 56.25%;
    }
`;