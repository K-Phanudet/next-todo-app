import React, { ImgHTMLAttributes } from 'react';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

export const Image: React.FC<ImageProps> = ({ ...rest }) => {
  return <img {...rest} />;
};