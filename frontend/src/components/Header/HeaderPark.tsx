import React from 'react'
import './HeaderPark.css'
import { FaChevronLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

interface HeaderParkProps {
    title: string
    hasArrowBack?: boolean
    onClickBack?: () => void
}

export default function HeaderPark(props: HeaderParkProps) {
  const navigate = useNavigate();
  return (
    <div className='header-park-background'>
        <div className='header-park-container'>
            { props.hasArrowBack && 
                <FaChevronLeft 
                    className='header-park-arrow-back'
                    onClick={() => {
                      props.onClickBack ? props.onClickBack() : navigate(-1)
                    }} /> 
            }
            <label className='title1Bold header-park-title'>{props.title}</label>
        </div>
    </div>
  )
}
