import { useState } from "react";
import Logout from "./Modal/logout";

function Title() {
    const [showModal, setShowModal] = useState(false);

    function openModal() {
        setShowModal(true);
    }

    const close = () => {

        setShowModal(false);
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '30px' }}>
            <h1 style={{ color: 'white', fontWeight: 'bold', fontSize: '1.7em', paddingLeft: '25px' }}> <strong>Files Library</strong></h1>

            <iconify-icon style={{ color: 'white', fontSize: "30px", cursor: 'pointer' }} onClick={openModal} icon="duo-icons:user" ></iconify-icon>

            {
                showModal && (
                    <Logout closeModal={close} />
                )
            }
        </div>

    )
}

export default Title;