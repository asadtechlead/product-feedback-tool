import React, {useContext, useEffect, useState} from 'react';
import {commentSetting} from "../../services/ApiService";
import {AuthContext} from "../../contexts/AuthContext";

function ToggleComments() {
    const [isCommentsEnabled, setIsCommentsEnabled] = useState('Disabled');
    const [error, setError] = useState(null);
    let {commentState, updateCommentState} = useContext(AuthContext);
    useEffect(()=>{
        setIsCommentsEnabled(commentState)
    }, [])
    const toggleComments = async (state) => {
        state = state === 'Enabled' ? 'Disabled' : 'Enabled';
        const response = await commentSetting(  state  );
        if(response.commentState)
        {
            setIsCommentsEnabled(response.commentState);
            updateCommentState(response.commentState);
            setError(`Comments ${response.commentState} Successfully`)
            setTimeout(() => {
                setError(null)
            }, 1500)
        }
        else
        {
            setError(response.message);
            setTimeout(() => {
                setError(null)
            }, 2500)
        }
    };
    return (
        <>
            <button
                className={`px-4 py-2 text-white bg-blue-500 text-white`}
                onClick={() => toggleComments(isCommentsEnabled)}
            >
                {isCommentsEnabled === "Enabled" ? 'Disable Comments' : 'Enable Comments'}
            </button>
            {error && <p className="text-red-500">{error}</p>}
        </>
    );
}

export default ToggleComments;
