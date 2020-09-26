import React from 'react';
import "./test.scss";

const Test = () => (
    <div className="Content">
        <header className="Header">Header</header>
        <div className="Body">
            <div className="RegisterBody">
                <div className="Logo">Q</div>
                <p className="RegisterQuocca">QUOCCA</p>
                <p className="RegisterInfo">Create account</p>
                <form className="RegisterForm">
                    <input type="text" id="email" placeholder="E-mail" />
                    <input type="text" id="password" placeholder="Password" />
                    <input type="text" id="repeatPassword" placeholder="Repeat password" />
                    <button>REGISTER</button>
                </form>
                <p>Already have an account? Log in!</p>
            </div>
        </div>
        <footer className="Footer">Footer</footer>
    </div>
);

export default Test;