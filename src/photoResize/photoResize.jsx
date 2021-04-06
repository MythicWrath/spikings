import { useEffect, useState } from "react";
import "./photoResize.css";

const ORIGINAL_PHOTO_WIDTH = 916;
const ORIGINAL_PHOTO_HEIGHT = 1116;

const PhotoResize = ({image}) => {
    const [originalImage, setOriginalImage] = useState("")
    const [resizedImg, setResizedImg] = useState("");

    const [time, setTime] = useState(0);

    useEffect(()=>{
        setResizedImg(convertInCanvas(image, true));
        setOriginalImage(convertInCanvas(image));
    }, [image])

    const convertInCanvas = (inputImage, resize = false) => {
        const canvas = document.createElement("canvas");

        const img = new Image();
        img.onload = () => {
            const startTime = Date.now();
            if (resize) {
                canvas.width = ORIGINAL_PHOTO_WIDTH / 4;
                canvas.height = ORIGINAL_PHOTO_HEIGHT / 4;
            } else {
                canvas.width = img.width;
                canvas.height = img.height;
            }

            const ctx = canvas.getContext("2d");

            if (resize){
                ctx.drawImage(img, 0, 0, ORIGINAL_PHOTO_WIDTH / 4, ORIGINAL_PHOTO_HEIGHT / 4);
                setResizedImg(canvas.toDataURL());
            } else {
                ctx.drawImage(img, 0, 0);
                setOriginalImage(canvas.toDataURL());
            }

            setTime((Date.now() - startTime) / 1000)
        }
        
        img.src = inputImage;
    }

    return (
        <div>
            <div className="container">
                <div className="photoBox">
                    <img src={originalImage} alt="Original" id="test" width={ORIGINAL_PHOTO_WIDTH / 4} height={ORIGINAL_PHOTO_HEIGHT / 4}/>
                    {originalImage && `Estimated original file size: ${originalImage.split(',')[1].length * 3 /4} bytes`}
                </div>
                <div className="photoBox">
                    <img src={resizedImg} alt="Resized"/>
                    {resizedImg && `Estimated original file size: ${resizedImg.split(',')[1].length * 3 /4} bytes`}
                </div>
            </div>

            <div>
                Estimate time taken to resize: {time} seconds
            </div>
        </div>
    )
}

export default PhotoResize;