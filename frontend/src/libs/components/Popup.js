import * as React from 'react';
import { useDispatch } from 'react-redux';
import { showPopup } from '../../states/actions';
import "./Popup.scss";

const Popup = (props) => {
    const { popupTitle } = props.popupContent;
    const dispatch = useDispatch();
    const closePopup = (event) => {
        event.preventDefault();
        dispatch(showPopup({
            showPopup: false
        }));
    }

    return (
        <div className="Popup">
            <div className="Box">
                <h2>{popupTitle}</h2>
                <a className="Close" href="#" onClick={closePopup}>&times;</a>
                {/* Change a to button */}
                <div className="Content">
                    <button onClick={console.log('elo')}>Register</button>
                    <button>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Popup;