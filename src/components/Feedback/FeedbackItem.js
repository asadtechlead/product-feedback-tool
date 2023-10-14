import {Link} from "react-router-dom";
import {deleteFeedback} from "../../services/ApiService";
import {useState} from "react";

function FeedbackItem({feedback, user, deleteFeedbackList}) {
    const [error, setError] = useState(null);
    const handleDeleteFeedback = async (id) => {
        try {
            const response = await deleteFeedback(id);
            if (response.success) {
                setError("Feedback Deleted Successfully");
                setTimeout(() => {
                    deleteFeedbackList(id)
                }, 500)
            } else {
                setError(response.message);
            }
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }
    return (

        <div data-id={feedback.id} key={"feedback"+feedback.id} className={`bg-white p-4  mb-4 border rounded-lg shadow ${feedback.shouldBlink ?? feedback.shouldBlink }`}>
            {error ? <p className="text-red-500">{error}</p> : (
                <>
                    <Link to={`/feedback/${feedback.id}`} className="text-blue-500 hover:underline">
                        <h3 className="text-xl font-bold">{feedback.title}</h3>
                    </Link>
                    <p className="text-gray-600">Category: {feedback.category}</p>
                    <p className="text-gray-600">Votes: {feedback.votes}</p>
                    <p className="text-gray-600">Submitted by {feedback.user.name} on {feedback.created_at}.</p>
                    {user && user.is_admin ? (
                        <button onClick={() => handleDeleteFeedback(feedback.id)} className="text-red-600">Delete</button>
                    ): null}
                </>
            )}
        </div>
    );
}

export default FeedbackItem;
