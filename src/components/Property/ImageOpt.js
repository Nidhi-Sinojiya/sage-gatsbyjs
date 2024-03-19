import React, { useEffect, useState } from "react"

const ImageOpt = ({ imgData, imgAlt, imgLoad, imgClass, width, height }) => {
  useEffect(() => {
    imgCdn()
  }, [])

  const imgCdn = (imgData, width, height) => {
    const img = `https://wsrv.nl/?url=${imgData}&w=${width}&h=${height}&output=webp`
    return img
  }

  const [heights, setHeights] = useState([])
  const [widths, setWidths] = useState([])
  const getData = e => {
    const newHeight = e.target.height
    setHeights(prevHeights => [...prevHeights, newHeight])

    const newWidth = e.target.width
    setWidths(prevWidths => [...prevWidths, newWidth])
  }

  return (
    <>
      <img
        onLoad={getData}
        src={imgCdn(imgData, width, height)}
        className={imgClass}
        width={!width.length ? widths : width}
        height={!height.length ? heights : height}
        alt={imgAlt}
        loading={imgLoad || "lazy"}
      />
    </>
  )
}

export default ImageOpt
