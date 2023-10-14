import { useState } from 'react';
import { submitFeedback } from '../../services/ApiService';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
function FeedbackForm({addNewFeedback}) {
    const initial = { title: '', description: '', category: 'Bug Report' };
    const [feedback, setFeedback] = useState({ ...initial });
    const [error, setError] = useState(null)
    function handleChange(event) {
        console.log(event.target.name)
        const { name, value } = event.target;
        setFeedback(prevData => ({ ...prevData, [name]: value }));
    }
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            setError(null);
            const result = await submitFeedback(feedback);
            if(result.feedback)
            {
                addNewFeedback(result.feedback);
                setFeedback({ ...initial });
            }
            else
            {
                setError(result.message);
            }
            console.log('Feedback submitted:', result);
        } catch (error) {
            setError(error.message);
            console.error('Submit Feedback error:', error.message);
        }
    }
    return (
        <div className="w-full max-w-lg mx-auto mt-4">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input name='title' value={feedback.title} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Title" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <ReactQuill name='description' theme="snow" value={feedback.description} onChange={(value ) => feedback.description = value } />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                        Category
                    </label>
                    <select name='category' value={feedback.category} onChange={handleChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="category">
                        <option>Bug Report</option>
                        <option>Feature Request</option>
                        <option>Improvement</option>
                    </select>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FeedbackForm;
