import React from "react";

function CommentList({ comments }) {
    if(!comments || comments.length === 0) {
        return <p className='grid place-items-center mt-20'>No comments found.</p>;
    }
    return (
        <div className="mt-4 space-y-4">
            <h3 className="text-xl font-bold mb-4">Comments</h3>
            {comments.map(comment => (
                <div key={comment.id} className="border-b p-4 mb-4 rounded shadow">
                    <div dangerouslySetInnerHTML={{ __html: comment.content }} />
                    <p className="mt-2">By <strong>{comment.user.name}</strong> at {comment.created_at}</p>
                </div>
            ))}
        </div>
    );
}
export default CommentList;
