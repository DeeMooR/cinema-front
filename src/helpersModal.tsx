import ModalSuccess from "./components/ModalSuccess";

export const modalShowMessege = (
    setModal: (v: JSX.Element) => void,
    isSuccess: boolean
) => {
    if (isSuccess) setModal(<ModalSuccess isSuccess />);
    else setModal(<ModalSuccess isSuccess={false} />);
    setTimeout(() => {
        setModal(<div />);
    }, 3400);
};