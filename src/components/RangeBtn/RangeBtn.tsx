import './RangeBtn.css'
import MinusIcon from '../../assets/icon-minus.svg'
import PlusIcon from '../../assets/icon-plus.svg'

interface RangeBtnType{
    itemValue: number;
    decrementValue : () => void
    incrementValue :  () => void
}
export default function RangeBtn({itemValue = 1,decrementValue,incrementValue} : RangeBtnType)  {
  return (
    <div className="range-btn">

        <div className="minus-btn" onClick={ decrementValue }>
            <img src={ MinusIcon } 
                alt="" />
        </div>

        <div className="item-value">
            { itemValue }
        </div>

        <div className="plus-btn" 
            onClick={ incrementValue }>
            <img src={PlusIcon}
                alt=""/>
        </div>

    </div>
  )
}
