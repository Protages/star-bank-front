import React, { useEffect, useState } from "react";
import CardDesignService from '../API/CardDesignService'
import { useFetch } from "../hooks/useFetch";
import CardDesignItem from './CardDesignItem'
import Loader from "./UI/Loader/Loader"
import Modal from "./UI/Modal";
import MyInput from "./UI/MyInput";
import MyButton from "./UI/MyButton";
import RenderErrors from "./RenderErrors";


const ChangeCardDesign = ({card, setCard, isModalVisible, setIsModalVisible}) => {
    const [cardDesignID, setCardDesignID] = useState('')
    const [currentCardDesign, setCurrentCardDesign] = useState(card.design)
    const [cardDesigns, setCardDesigns] = useState([])

    const [fetchCardDesigns, isCardDesignsLoading, cardDesignsErrors] = useFetch(async () => { 
        const response = await CardDesignService.getAllCardDesigns()

        setCurrentCardDesign(response.data.filter(
            (value) => {return value.id === currentCardDesign.id})[0]
        )
        setCardDesigns(response.data)
    })

    const [fetchUpdateDesign, isUpdateDesignLoading, updateDesignErrors] = useFetch(async () => { 
        const response = await CardDesignService.putChangeCardDesign(card.id, cardDesignID)

        setCard(response.data)
        setIsModalVisible(false)
    })

    useEffect(() => {
        fetchCardDesigns()
    }, [])

    const changeCardDesign = (e) => { 
        e.preventDefault()
        fetchUpdateDesign()
    }

    const filterCardDesigns = (value) => {
        return value.id !== currentCardDesign.id
    }

    return (
        <>
        <Modal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            title='Сменить дизайн карты'
        >
            {isUpdateDesignLoading
                ? <Loader />
                : <>
                    {updateDesignErrors &&
                        <div className='errors'>
                        <RenderErrors errors={updateDesignErrors}/>
                        </div>
                    } 
                    <form >
                        <MyInput
                            value={cardDesignID}
                            onChange={e => setCardDesignID(e.target.value)}
                            placeholder='Введите ID дизайна...'
                        />
                        <MyButton onClick={changeCardDesign}>Подтвердить</MyButton>
                    </form>
                </>
            }

            <div className="modal_sub_list">

                <h3 className='modal_sub_title'>Текущий дизайн карты</h3>
                {isCardDesignsLoading
                    ? <Loader />
                    : <><CardDesignItem cardDesign={currentCardDesign}/></>
                }

                <h3 className='modal_sub_title'>Другие дизайны карт</h3>
                {isCardDesignsLoading
                    ? <Loader />
                    : <>{cardDesigns.filter(filterCardDesigns).map(design => 
                        <CardDesignItem cardDesign={design} key={design.id}/>
                    )}</>
                }
            </div>
            
        </Modal>
        </>
    )
}


export default ChangeCardDesign