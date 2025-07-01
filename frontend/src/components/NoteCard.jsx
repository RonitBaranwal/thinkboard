import { PenSquareIcon,Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import {formatDate} from '../lib/utils'
import api from '../lib/axiosInstance'
import toast from 'react-hot-toast'

const NoteCard = ({ note ,setNotes}) => {
    const handleDelete = async (e, id) => {
        e.preventDefault();
        console.log(id);
        if (!window.confirm("Are you sure you want to delete note?")) return;
        try {
            
            api.delete(`/notes/${id}`).then(() => {
                
                toast.success("Note deleted successfully", { duration: 1000 });
                
            });
            setNotes((prev) => prev.filter((note) => note._id != id));
        } catch (error) {
            toast.error("Error!! try again!");
            console.log(error);
        }
    }
  return (
      <Link to={`/note/${note._id}`} className='card bg-base-100 hover:shadow-lg transition=all duration-200 border-t-4 border-solid border-[#00FF9D] m-10'>
          
          <div className="card-body">
              <h3 className='card-title text-base-content'>{note.title}</h3>
              <p className="text-base-content/70 line-clamp-3">{note.content}</p>
              <div className="card-actions justify-between items-center mt-4">
                  <span className='text-sm text-base-content/60'>
                  {formatDate(note.createdAt)}
                  </span>
                  <div className="flex items-center gap-1">
                      
                      <PenSquareIcon className='size-4' />
                      <button className='btn btn-ghost btn-xs text-error' onClick={(e)=>handleDelete(e,note._id)}>
                          <Trash2Icon className="size-4"/>
                      </button>
                  </div>
              </div>
          </div>
          
    </Link>
  )
}

export default NoteCard