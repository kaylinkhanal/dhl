import {BiError} from 'react-icons/bi'
const ErrorPage = () =>{

    return(
        <div className='error-page'>
            <div className="error-texts">
                <h1>404</h1>
                <h2>Oops! This is not the page you are looking for.</h2>
            </div>
            <div className='error-icon'>
                <BiError/>
            </div>
        </div>
        
    )
}

export default ErrorPage