import React from 'react'; 
import { FaStar} from "react-icons/fa"

function StarRate({score}){

    // const [rating, score]
    return(
        <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, index) => (<FaStar
                    key={index}
                    className="transition-all"
                    size={20}
                    color={index+1 <= score ? "#ffc107": "#e4e5e9"}
                     />)
            )}
        </div>
    )
}

export default StarRate;