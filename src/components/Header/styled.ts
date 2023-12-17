import styled from 'styled-components';

export const StyledLogoBig = styled.div<{ logo: string, logo_pink: string}>`
    width: 160px;
    height: 90px;
    background: url(${props => props.logo}) center center / 100% 100% no-repeat;
    cursor: pointer;
    transition: all 0.2s ease 0s;

    &:hover {
        background: url(${props => props.logo_pink}) center center / 100% 100% no-repeat;
        transition: all 0.3s ease 0s;
    }

    @media (max-width: 1023.98px) {
        width: 142px; 
        height: 80px;
    }

    @media (max-width: 767.98px) {
        width: 142px; 
        height: 80px;
        margin: 0 auto;
    }
`;

export const StyledLogoSmall = styled.div<{ logo: string, logo_pink: string}>`
    width: calc(45px * 4.16);
    height: 45px;
    background: url(${props => props.logo}) center center / cover no-repeat;
    cursor: pointer;
    transition: all 0.2s ease 0s;

    &:hover {
        background: url(${props => props.logo_pink}) center center / 100% 100% no-repeat;
        transition: all 0.3s ease 0s;
    }
`;

export const BackgroundSlideBar = styled.div<{ image: string }>`
    background: url(${props => props.image}) left bottom / 120% no-repeat, linear-gradient(15deg, rgb(81, 16, 43), rgb(0, 0, 0) 66%, rgb(0, 0, 0)) rgb(39, 39, 42);
`;