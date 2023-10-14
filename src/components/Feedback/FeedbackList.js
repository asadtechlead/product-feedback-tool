import FeedbackItem from "./FeedbackItem";
import {useState, useEffect, useContext} from 'react';
import {getFeedbackList} from '../../services/ApiService';
import FeedbackForm from "./FeedbackForm";
import {AuthContext} from "../../contexts/AuthContext";

function FeedbackList() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [feedbacks, setFeedbacks] = useState([]);
    const [pagination, setPagination] = useState({});
    const { user } = useContext(AuthContext);
    async function fetchFeedbacks(page = 1) {
        setLoading(true)
        try {
            const response = await getFeedbackList(page);
            if (!response.feedbacks || response.feedbacks.data.length === 0) {
                setLoading(false)
                setError("No Existing Feedback Found")
                return;
            }
            setFeedbacks(response.feedbacks.data);
            setLoading(false);
            setPagination({
                currentPage: response.feedbacks.current_page,
                lastPage: response.feedbacks.last_page,
            });
        } catch (error) {
            setLoading(false)
            setError(error.message ? error.message : error)
            console.error('Fetch feedback error:', error.message);
        }
    }

    useEffect(() => {
        fetchFeedbacks();
    }, []);
    const addNewFeedback = (feedback) => {
        console.log(feedback)
        feedback.shouldBlink = 'blink';
        setFeedbacks([{...feedback}, ...feedbacks ])
        setError(null);
        setLoading(false)
    }
    const deleteFeedbackList = (id) => {
        setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
        setError(null)
        setLoading(false)
    }
    return (

        <div className="container mx-auto p-4">
            {!user.is_admin && (
                <>
                    <h2 className="text-2xl text-blue-500 font-bold mb-4 text-center">Create a Feedback</h2>
                    <div className="grid place-items-center">
                        <FeedbackForm addNewFeedback={addNewFeedback} />
                    </div>
                </>
            )}
            {error || loading ? (
                    <div className="grid place-items-center mt-20">
                        <p className="text-red-500 text-xl font-bold">{error || loading}</p>
                    </div>
                )
                : (
                    <>
                        <h2 className="text-2xl font-bold mb-4">User Feedbacks</h2>
                        {feedbacks.length ? (
                            <>
                                <div className="grid grid-cols-1 gap-4">
                                    {feedbacks.map(feedback => (
                                        <FeedbackItem key={feedback.id+"_item"} deleteFeedbackList={deleteFeedbackList} user={user} feedback={feedback}></FeedbackItem>
                                    ))}
                                </div>

                            <div className="flex justify-between mt-4">
                                <button
                                    disabled={pagination.currentPage <= 1}
                                    onClick={() => fetchFeedbacks(pagination.currentPage - 1)}
                                    className={`px-4 py-2 rounded-lg ${pagination.currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                                >
                                    Previous
                                </button>
                                <button
                                    disabled={pagination.currentPage === pagination.lastPage}
                                    onClick={() => fetchFeedbacks(pagination.currentPage + 1)}
                                    className={`px-4 py-2 rounded-lg ${pagination.currentPage === pagination.lastPage ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                                >
                                    Next
                                </button>
                            </div>
                            </>
                        ): (
                            <p className="text-red-500 text-xl font-bold">No Existing Feedback Found</p>
                        )}

                    </>
                )}
        </div>
    );
}

export default FeedbackList;
