import {addComment} from "../../../services/ApiService";
import {useContext, useState} from 'react';
import ReactQuill from "react-quill";
import {AuthContext} from "../../../contexts/AuthContext";
function CommentForm({id, addListComment}) {
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState(null);
    const { commentState } = useContext(AuthContext)
    const handleCommentSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await addComment( { content: newComment, feedback_id: id } );
            if(response.comment)
            {
                addListComment(response.comment);
                setNewComment('');
            }
            else
            {
                setError(response.message);
            }
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };
    if(commentState !== 'Enabled')
    {
        return;
    }
    return (
        <div className="w-full max-w-lg mx-auto mt-4">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleCommentSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        New Comment
                    </label>
                    <ReactQuill placeholder="Type your Comment..." name='comment' theme="snow" value={newComment} onChange={(value ) => setNewComment(value) } />
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

export default CommentForm;
