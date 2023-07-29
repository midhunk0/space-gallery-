// @ts-nocheck
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const apiKey = process.env.REACT_APP_NASA_KEY;

export default function NasaPhoto() {
    const [photoData, setPhotoData] = useState(null);
    const getTodayDateString = () => {
        const today = new Date();
        return today.toISOString().slice(0, 10);
    };

    const today=getTodayDateString();
    
    const [date, setDate] = useState(today);

    const changeDate = (e) => {
        setDate(e.target.value);
    };

    useEffect(() => {
        fetchPhoto();
        async function fetchPhoto() {
            const res = await fetch(
                `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`
            );
            const data = await res.json();
            setPhotoData(data);
            console.log(data);
        }
    }, [date]);

    if (!photoData) return <div/>;
    return (
        <>
            <Navbar />
            <div className="content">
                <div className="content-info">
                    <h1 className="content-title">{photoData.title}</h1>
                    <div className="content-date">
                        <p className="content-day">{photoData.date}</p>
                        <div className="content-input-date">
                            <p className="content-text">Choose a date</p>
                            <input className="content-input" type="date" value={date} onChange={changeDate} max={today}></input>
                        </div>
                    </div>
                    <p className="content-explanation">{photoData.explanation}</p>
                </div>
                {photoData.media_type === "image" ? (
                    <img
                        className="content-photo"
                        src={photoData.url}
                        alt={photoData.title}
                    />
                    ) : (
                    <iframe
                        className="content-video"
                        title="space-video"
                        src={photoData.url}
                        frameBorder="0"
                    />
                )}
            </div>
        </>
    );
}
