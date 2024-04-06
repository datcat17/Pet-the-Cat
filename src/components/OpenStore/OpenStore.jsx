import "./OpenStore.css";

const openStore = () => {
    document.getElementById("MenuBar").classList.remove('close-store');
    document.getElementById("MenuBar").classList.add('open-store');
}

const OpenStore = ({ id }) => {
    return <div id={id} onClick={ openStore }></div>;
}

export default OpenStore;