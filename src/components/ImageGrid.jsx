import React, { useEffect, useState, useRef, useCallback } from 'react'
import { fetchImages } from '../api/graphql'
import ImageCard from './ImageCard'

const ImageGrid = ({ searchTerm }) => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [endCursor, setEndCursor] = useState(null)

  const observer = useRef()

  const loadImages = async (reset = false) => {
    setLoading(true)
    const data = await fetchImages(10, reset ? null : endCursor, searchTerm)

    const newImages = data.edges.map(edge => edge.node)
    setImages(prevImages => reset ? newImages : [...prevImages, ...newImages])
    setEndCursor(data.pageInfo.endCursor)
    setHasMore(data.pageInfo.hasNextPage)
    setLoading(false)
  }

  useEffect(() => {
    loadImages(true)
  }, [searchTerm])

  const lastImageRef = useCallback((node) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadImages()
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  return (
    <div className="image-grid">
      {images.map((img, index) => (
        index === images.length - 1 ? (
          <div ref={lastImageRef} key={img.id}>
            <ImageCard image={img} />
          </div>
        ) : (
          <ImageCard key={img.id} image={img} />
        )
      ))}
      {loading && <p>Loading images...</p>}
    </div>
  )
}

export default ImageGrid
