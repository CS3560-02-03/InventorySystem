import styled from 'styled-components';

const Overlay = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    background-color: #00000006c;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    position: fixed;
    top: 0;
    left: 0;
`
interface Props {
    children: React.ReactNode;
}
// export const Spinner: React.FC<Props> = ({children}) => 
//     <Overlay><p style={{"fontSize": "22px"}}>
//     Loading</p>{children}</Overlay>
export const Spinner: React.FC<Props> = ({children}) => 
<div style={{"display": "flex"}}>
<Overlay>{children}</Overlay>
</div>