// @ts-nocheck
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {HiChevronRight, HiChevronLeft} from "react-icons/hi";

const apiKey = process.env.REACT_APP_NASA_KEY;

export default function NasaPhoto() {
    const [photoData, setPhotoData] = useState(null);
    const getTodayDateString = () => {
        const today = new Date();
        return today.toISOString().slice(0, 10);
    };

    const today=getTodayDateString();
    
    const [date, setDate] = useState(localStorage.getItem("selectedDate") || today);

    const setPreviousDate = () => {
        const currentDate = new Date(date);
        currentDate.setDate(currentDate.getDate() - 1);
        const previousDate = currentDate.toISOString().slice(0, 10);
        setDate(previousDate);
    };
    
    const setNextDate = () => {
        const currentDate = new Date(date);
        currentDate.setDate(currentDate.getDate() + 1);
        const todayDate = new Date(today);
        if (currentDate > todayDate) {
            return;
        }
        const nextDate = currentDate.toISOString().slice(0, 10);
        setDate(nextDate);
    };

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

    useEffect(() => {
        localStorage.setItem("selectedDate", date);
    }, [date]);

    if (!photoData) return <div/>;
    return (
        <>
            <Navbar/>
            <div className="content">
                <div className="content-info">
                    <h1 className="content-title">{photoData.title}</h1>
                    <div className="content-date">
                        <div className="content-change-date">
                            <p className="content-change" onClick={setPreviousDate}><HiChevronLeft size={22}/></p>
                            <p className="content-day">{photoData.date}</p>
                            <p className="content-change" onClick={setNextDate}><HiChevronRight size={22}/></p>
                        </div>
                        <div className="content-input-date">
                            <p className="content-text">Choose a date</p>
                            <input className="content-input" type="date" value={date} onChange={changeDate} max={today}></input>
                        </div>
                    </div>
                    <p className="content-explanation">{photoData.explanation}</p>
                </div>
                <a href={photoData.hdurl}>
                    {photoData.media_type === "image" ? (
                        <img
                            className="content-photo"
                            src={photoData.hdurl}
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
                </a>
            </div>
        </>
    );
}
