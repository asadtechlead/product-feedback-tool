import {useState} from 'react';
import UserList from './UserList';
import FeedbackList from '../Feedback/FeedbackList';
import ToggleComments from "./ToggleComments";
function AdminPanel() {
    const [selectedOption, setSelectedOption] = useState('users');
    return (
        <div className="container mx-auto mt-4 p-7">
            <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

            <div className="mb-4">
                <button
                    className={`px-4 py-2 ${selectedOption === 'users' ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => setSelectedOption('users')}
                >
                    User List
                </button>
                <button
                    className={`px-4 py-2 ${selectedOption === 'feedback' ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => setSelectedOption('feedback')}
                >
                    Feedback List
                </button>
                <ToggleComments />
            </div>
            {selectedOption === 'users' ? <UserList /> : <FeedbackList />}

        </div>
    );
}

export default AdminPanel;
