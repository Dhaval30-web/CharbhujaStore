import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaCamera, FaSignOutAlt } from 'react-icons/fa';
import { MdEdit, MdSave, MdClose } from 'react-icons/md';
import './style.css';

const Profile = () => {

    const navigate = useNavigate();
    const fileRef = useRef();

    const savedUser = JSON.parse(localStorage.getItem('user')) || {};

    const [user, setUser] = useState(savedUser);
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState({ name: user.name || '' });
    const [profilePic, setProfilePic] = useState(user.profilePic || null);
    const [message, setMessage] = useState({ text: '', type: '' });

    const showMessage = (text, type) => {
        setMessage({ text, type });
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    };

    // Profile picture change
    const handlePicChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            return showMessage('Image size 2MB se kam honi chahiye!', 'error');
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result;
            setProfilePic(base64);
            const updatedUser = { ...user, profilePic: base64 };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            showMessage('Profile picture updated! ✅', 'success');
        };
        reader.readAsDataURL(file);
    };

    // Save name
    const handleSave = () => {
        if (!editData.name.trim()) {
            return showMessage('Name empty nahi ho sakta!', 'error');
        }
        const updatedUser = { ...user, name: editData.name };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setEditMode(false);
        showMessage('Profile updated! ✅', 'success');
    };

    // Logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
        window.location.reload();
    };

    if (!savedUser?.name) {
        navigate('/');
        return null;
    }

    return (
        <div className="profilePage">
            <div className="container">
                <div className="profileCard">

                    {/* MESSAGE */}
                    {message.text && (
                        <div className={`profileMessage ${message.type}`}>
                            {message.text}
                        </div>
                    )}

                    {/* PROFILE PIC */}
                    <div className="profilePicWrapper">
                        {profilePic ? (
                            <img src={profilePic} alt="Profile" className="profilePicImg" />
                        ) : (
                            <FaUserCircle className="profilePicIcon" />
                        )}
                        <button 
                            className="changePicBtn" 
                            onClick={() => fileRef.current.click()}
                            title="Change Photo">
                            <FaCamera />
                        </button>
                        <input 
                            type="file" 
                            ref={fileRef} 
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handlePicChange}
                        />
                    </div>

                    {/* NAME */}
                    <div className="profileName">
                        {editMode ? (
                            <div className="editNameWrapper">
                                <input
                                    type="text"
                                    value={editData.name}
                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                    className="editNameInput"
                                    autoFocus
                                />
                                <button className="saveBtn" onClick={handleSave}>
                                    <MdSave /> Save
                                </button>
                                <button className="cancelBtn" onClick={() => setEditMode(false)}>
                                    <MdClose />
                                </button>
                            </div>
                        ) : (
                            <div className="nameDisplay">
                                <h2>{user.name}</h2>
                                <button className="editBtn" onClick={() => setEditMode(true)}>
                                    <MdEdit /> Edit
                                </button>
                            </div>
                        )}
                    </div>

                    {/* DETAILS */}
                    <div className="profileDetails">
                        {user.email && (
                            <div className="profileDetailItem">
                                <span className="detailLabel">📧 Email</span>
                                <span className="detailValue">{user.email}</span>
                            </div>
                        )}
                        {user.phone && (
                            <div className="profileDetailItem">
                                <span className="detailLabel">📱 Phone</span>
                                <span className="detailValue">{user.phone}</span>
                            </div>
                        )}
                        <div className="profileDetailItem">
                            <span className="detailLabel">✅ Status</span>
                            <span className="detailValue verified">Verified Account</span>
                        </div>
                    </div>

                    {/* LOGOUT */}
                    <button className="logoutBtnProfile" onClick={handleLogout}>
                        <FaSignOutAlt className="mr-2" />
                        Logout
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Profile;