import React from 'react'


const CardDesignItem = ({cardDesign}) => {
    return (
        <div className='modal_sub_item'>
            <p>ID: {cardDesign.id}</p>
            <p>Название: {cardDesign.title}</p>
            <p>Автор: {cardDesign.author}</p>
            <p>Описание: {cardDesign.description}</p>
        </div>
    )
}


export default CardDesignItem