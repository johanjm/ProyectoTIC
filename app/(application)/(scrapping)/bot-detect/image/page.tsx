'use client'


import { useImages } from '@/hooks/useImages'
import React from 'react'
import ImageCard from '../../_components/cards/image-card'
import Message from '../../_components/message'

type Props = {}

export default function ImagePage({ }: Props) {
  const { getSrcs } = useImages()
  const { images: { botDetect } } = getSrcs()

  if (!botDetect) {
    return <Message msg='No se ha encontrado la imagen almacenada ' />
  } else {
    return (
      <ImageCard src={botDetect} alt='bot-detect' />
    )

  }

}