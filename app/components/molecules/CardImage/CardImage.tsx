import React from 'react';
import { Image } from '@/app/components';

export interface CardImageProps {
  src: string;
  alt: string;
  imageClassName?: string;
  containerClassName?: string;
  dataTestId?: string
}

export const CardImage: React.FC<CardImageProps> = ({ src, alt, imageClassName = "", containerClassName = "", dataTestId }) => {
  return (
    <div className={`relative h-56 m-2.5 overflow-hidden text-white rounded-md ${containerClassName}`} data-testid={dataTestId}>
      <Image src={src} alt={alt} className={imageClassName} data-testid={`${dataTestId}-img`}/>
    </div>
  );
};