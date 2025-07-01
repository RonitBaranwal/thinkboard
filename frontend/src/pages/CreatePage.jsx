import React, { useState } from "react";
import { Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import api from "../lib/axiosInstance";
const CreatePage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const post =await api.post("/notes", {
        title,content
      });
      console.log(post);
      setLoading(false);
      setTitle('');
      setContent('');
    } catch (error) {
      console.log(error);
    }
    };
    return (
        <div className='min-h-screen bg-base-200 '>
            <div className='flex items-center justify-center min-h-screen bg-base-200'>
                <div className='w-full max-w-2xl'>
                    <Link to={"/"} className='btn btn-ghost mb-6'>
                        <ArrowLeftIcon className='size-5' />
                        Back to notes
                    </Link>
                    <div className='card bg-base-100'>
                        <div className='card-body'>
                            <h2 className='card-title text-2xl mb-4'>
                                Create New Note
                            </h2>
                <form onSubmit={(e) => {
                  handleSubmit(e)
                }
                }>
                                <div className='form-control mb-4'>
                                    <label className='label'>
                                        <span className='label-text'>
                                            Title
                                        </span>
                                    </label>
                                    <input
                                        type='text'
                                        className='input input-bordered'
                                        value={title}
                                        placeholder='Note Title'
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                </div>
                                <div className='form-control mb-4'>
                                    <label className='label-text'>
                                        <span className='tabel-text'>
                                            Content
                                        </span>
                                    </label>
                                    <textarea
                                        className='textarea textarea-bordered h-32'
                                        value={content}
                                        placeholder='write your note here'
                                        onChange={(e) =>
                                            setContent(e.target.value)
                                        }
                                    ></textarea>
                                </div>
                  <div className='card-actions justify-end'>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading?"creating...":"create note"}
                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;
