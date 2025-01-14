import React, { useState } from 'react'
import '../css/ImageCard.css'

const ImageCard = ({ image }) => {
  const [likes, setLikes] = useState(image.likes || 0)
  const [liked, setLiked] = useState(false)
  const [showActions, setShowActions] = useState(false)

  const handleLike = () => {
    setLikes(liked ? likes - 1 : likes + 1)
    setLiked(!liked)
  }

  return (
    <div 
      className="image-card"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <img
        src={image.picture}
        alt={image.title}
        className="image-card__image"
      />

      {showActions && (
        <div className="image-card__price-tag">
          <span>{image.price} €</span>
        </div>
      )}

      {showActions && (
        <div className="image-card__actions">
          <div className="action-item">
          <button
            onClick={handleLike}
            aria-label="like Button"
            className={`icon-button like-button ${liked ? 'liked' : ''}`}
          >
            ♡
          </button>
            <span className="icon-count">{likes}</span>
          </div>

          <div className="action-item">
            <button className="icon-button view-button">▶</button>
            <span className="icon-count">0</span>
          </div>
        </div>
      )}

      <div className="image-card__info">
        <h3 className="image-card__title">{image.title}</h3>
        <p className="image-card__author">by <span>{image.author}</span></p>
      </div>
    </div>
  )
}

export default ImageCard
