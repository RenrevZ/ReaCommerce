import './Thumbnail.css'

interface imagesType{
    images: Array<string>;
    changeHeaderPhoto : (index : number) => void;
    selectedIndex:number
}
export default function Thumbnail({ images = [] , changeHeaderPhoto , selectedIndex = 0} : imagesType) {

  return (
    <div className="image-thumbnail">
        {
            images.map((image : string,index : number) => (
                <div className= { `thumbnail ${index === selectedIndex && 'current'}`} key={index}>
                    <span className="overlay"></span>
                    <img src= { image }  
                        alt=""
                        id="thumbnail-image"
                        onClick= { () => changeHeaderPhoto(index) }
                        draggable="false"
                        />
                </div>
            ))
        }
    </div>
  )
}
