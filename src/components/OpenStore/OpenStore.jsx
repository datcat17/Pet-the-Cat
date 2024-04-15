import "./OpenStore.css";

const openStore = () => {
    // Should be using Refs, but I don't really care'
    const menuBar = document.getElementById("MenuBar")
    // menuBar.classList.remove('close-store');
    menuBar.classList.add('open-store');

//     menuBar.offsetHeight;
}

const OpenStore = ({ id }) => {
    return <div id={id} onClick={ openStore }></div>;
}

export default OpenStore;
