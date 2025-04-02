type ImageComponentProps = {
    sourceWebp: string | undefined,
    sourcePng: string,
    className: string,
    description: string,
}

const ImageComponent = ({sourceWebp, sourcePng, className, description}: ImageComponentProps) => {
    return (
        <picture>
            {sourceWebp ? <source type="image/webp" srcSet={sourceWebp} />  : null}
            <img className={className} src={sourcePng} alt={description} />
        </picture>
    )
}

export default ImageComponent