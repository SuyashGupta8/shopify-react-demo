import React from 'react'

const Image = ({image, width, height}) => {
    return (
        <div>
          <img src={image} width={width} height={height} alt="Logo"/>
        </div>
    )
}

export default Image
