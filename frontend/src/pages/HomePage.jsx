import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import RateLimitedUI from "../components/RateLimitedUI.jsx";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard.jsx";
import api from "../lib/axiosInstance.js";
import NotesNotFound from "../components/NotesNotFound.jsx";
const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/notes');
                setNotes(res.data.notes);
                
                setIsRateLimited(false);
            } catch (err) {
                console.log(err);
                if (err.response.status == 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Failed to load notes");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        <div className='min-h-screen '>
            <Navbar />
            {isRateLimited && <RateLimitedUI />}
            {loading && (
                
                <div className='text-center text-primary py-10'>
                    
                    Loading Notes...
                </div>
            )}
            {notes.length==0 && !isRateLimited && <NotesNotFound/>}
            {notes.length > 0 && !isRateLimited && (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                   
                    {notes.map((note, idx) => (
                        <NoteCard key={idx} note={note} setNotes={ setNotes} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;
