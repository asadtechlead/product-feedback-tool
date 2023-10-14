import React, { useEffect, useState, useContext } from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import CommentList from "./Comment/CommentList";
import {getSingleFeedback, addFeedbackVote, deleteFeedback} from "../../services/ApiService";
import {AuthContext} from "../../contexts/AuthContext";
import CommentForm from "./Comment/CommentForm";

const SingleFeedback = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [feedback, setFeedback] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchFeedback = async () => {
        try {
            const response = await getSingleFeedback(id);
            if(!response.feedback)
            {
                setError("No Existing Feedback Found");
                setLoading(false);
                return;
            }
            setFeedback(response.feedback);
            setComments(response.feedback.comments);  // Assuming comments are included in the feedback data
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError(error.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchFeedback();
    }, [id]);

    const addListComment = (comment) => {
        try {
            setComments([...comments, comment]);
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };

    const addVote = async () => {
        try {
            const response = await addFeedbackVote(  id  );
            if(response.votes)
            {
                feedback.votes = response.votes
                setFeedback({...feedback})
            }
            else
            {
                setError(response.message);
            }
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }
    const handleDeleteFeedback = async (id) => {
        try {
            const response = await deleteFeedback(  id  );
            if(response.success)
            {
                setError("Feedback Deleted Successfully");
                setTimeout(() => {
                    navigate("/");
                }, 500)
            }
            else
            {
                setError(response.message);
            }
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    return (
        <div className="container mx-auto p-4">
            {loading ? (
                <p className="text-red-500">Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <>
                    <Link to="/" className="inline-block mb-4 text-blue-500 hover:underline">Go Back</Link>
                    <h2 className="text-2xl font-bold mb-4"> {feedback.title.toUpperCase()} <span className="text-xl mb-4">({feedback.category})</span></h2>

                    <p className="mb-4">Submitted by {feedback.user.name} on {feedback.created_at}</p>
                    <h3 className="text-xl font-bold mb-2">Description</h3>
                    <div className="border-t border-b pt-4 pb-4">
                        <div dangerouslySetInnerHTML={{ __html: feedback.description }} />
                    </div>
                    <button onClick={addVote}  className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 mt-4">Votes ({feedback.votes})</button>
                    {user && user.is_admin ? (
                        <div className="mt-4">
                            <button onClick={() => handleDeleteFeedback(feedback.id)} className="text-red-500 hover:underline">
                                Delete
                            </button>
                        </div>
                    ): null}
                    <div className="pt-4">
                        <CommentForm addListComment={addListComment} id={feedback.id} />
                        <CommentList comments={comments}></CommentList>
                    </div>
                </>
            )}
        </div>
    );
};

export default SingleFeedback;
