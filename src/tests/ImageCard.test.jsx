import React from 'react'
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import ImageCard from '../components/ImageCard'

const mockImage = {
  picture: 'https://test.com/image.jpg',
  title: 'Beautiful Sunset',
  author: 'John Doe',
  price: 100,
  likes: 1
}

describe('ImageCard Component', () => {
  test('renders image, title, and author correctly', () => {
    render(<ImageCard image={mockImage} />)

    expect(screen.getByAltText('Beautiful Sunset')).toBeInTheDocument()
    expect(screen.getByText('Beautiful Sunset')).toBeInTheDocument()

    const authorElement = screen.getByText(/by/i)
    expect(within(authorElement).getByText('John Doe')).toBeInTheDocument()
  })

  test('shows actions on hover', async () => {
    render(<ImageCard image={mockImage} />)
    const card = screen.getByAltText('Beautiful Sunset').parentElement

    expect(screen.queryByText('100 €')).not.toBeInTheDocument()

    fireEvent.mouseEnter(card)
    await waitFor(() => {
      expect(screen.getByText('100 €')).toBeInTheDocument()
    })

    fireEvent.mouseLeave(card)
    await waitFor(() => {
      expect(screen.queryByText('100 €')).not.toBeInTheDocument()
    })
  })

  test('increments and decrements likes on button click', async () => {
    render(<ImageCard image={mockImage} />)
    const card = screen.getByAltText('Beautiful Sunset').parentElement
    fireEvent.mouseEnter(card)

    const likeButton = await screen.findByRole('button', { name: /like button/i })

    fireEvent.click(likeButton)
    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument()
    })

    fireEvent.click(likeButton)
    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument()
    })
  })

  test('adds liked class when liked', async () => {
    render(<ImageCard image={mockImage} />)
    const card = screen.getByAltText('Beautiful Sunset').parentElement
    fireEvent.mouseEnter(card)

    const likeButton = await screen.findByRole('button', { name: /like button/i })

    expect(likeButton).not.toHaveClass('liked')

    fireEvent.click(likeButton)
    await waitFor(() => {
      expect(likeButton).toHaveClass('liked')
    })

    fireEvent.click(likeButton)
    await waitFor(() => {
      expect(likeButton).not.toHaveClass('liked')
    })
  })
})
