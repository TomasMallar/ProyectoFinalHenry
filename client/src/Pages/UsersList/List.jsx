import s from './List.module.css'
import SideBar from '../../Components/SideBar/SideBar'
import DataTable from '../../Components/UsersDataTable/DataTable'
import { useState } from 'react';
import ModalMailing from '../../Components/ModalMailing/ModalMailing';

export default function Users(){
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };
    return (
        <div className={s.list}>
            <SideBar/>
            <div className={s.listContainer}>
            <p className={s.top}>USUARIOS</p>
            <div>
                <br />
                            <button className="p-1 ml-10 font-serif font-bold rounded-lg shadow-sm bg-chocolate-oscuro text-chocolate-blanco shadow-chocolate-claro hover:bg-chocolate-mantecol hover:text-chocolate-oscuro" onClick={handleOpenModal}>
                                MAILING
                            </button>
                        {modalOpen && <ModalMailing onClose={handleCloseModal} />}

                        </div>

            <DataTable/>
            </div>
        </div>
    )
}