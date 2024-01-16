import React from 'react'
import './CardLoader.css'

export const CategoryLoader = () => {
    return(
        <div className="loader-container">
            <div className="card-category">
                <div className="card__image"></div>
            </div>
            <div className="card-category">
                <div className="card__image"></div>
            </div>
            <div className="card-category">
                <div className="card__image"></div>
            </div>
            <div className="card-category">
                <div className="card__image"></div>
            </div>
        </div>
    )
}


export const ThumbnailLoader = () => {
    return (
        <div className="thumbnail-container">
            <div className="card">
                 <div className="card-category">
                    <div className="card__image"></div>
                </div>
            </div>
            <div className="card">
                 <div className="card-category">
                    <div className="card__image"></div>
                </div>
            </div>
            <div className="card">
                 <div className="card-category">
                    <div className="card__image"></div>
                </div>
            </div>
            <div className="card">
                 <div className="card-category">
                    <div className="card__image"></div>
                </div>
            </div>
        </div>
    )
}


export default function CardLoader() {
  return (
    <div className="loader-container">
        <div className="card">
            <div className="card__image"></div>
            <div className="card__content">
            <h2> </h2>
            <p> </p>
            </div>
        </div>

        <div className="card">
            <div className="card__image"></div>
            <div className="card__content">
            <h2> </h2>
            <p> </p>
            </div>
        </div>

        <div className="card">
            <div className="card__image"></div>
            <div className="card__content">
            <h2></h2>
            <p></p>
            </div>
        </div>

        <div className="card">
            <div className="card__image"></div>
            <div className="card__content">
            <h2></h2>
            <p></p>
            </div>
        </div>
    </div>
  )
}
