import React from "react";
import Clock from "react-digital-clock";
import "./Widget.css";

export default function Widget() {
    return (
        <div className="cards-list">
            <div className="card">
                <div className="card_image">
                    <img src="https://i.redd.it/b3esnz5ra34y.jpg" alt="widget"/>
                </div>
                <div className="card_title title-white">
                    <span className="date">Viernes 1 mayo</span>
                    <span className="clock">
                        <Clock format= {'hh-mm'} />
                    </span>

                    <p>¿Que planeas hacer el dia de hoy?</p>
                </div>
            </div>
        </div>
    );
}