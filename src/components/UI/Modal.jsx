import React, { useState } from "react";


const Modal = ({children, isModalVisible, setIsModalVisible, title}) => {
    let modalClasses = ['modal']

    if (isModalVisible) {
        modalClasses.push('visible_modal')
    }

    return (
        <div className={modalClasses.join(' ')} onClick={() => setIsModalVisible(false)}>
            <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal_title">{title}</h3>
                {children}
            </div>
        </div>
    )
}


export default Modal