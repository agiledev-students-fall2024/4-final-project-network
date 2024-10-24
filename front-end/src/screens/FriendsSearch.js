import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/FriendsSearch.css';
import userData from '../fillerData/users.json';

const FriendsSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFriends, setFilteredFriends] = useState([]);

    // FILTER AND SORT FRIENDS BASED ON USER INPUT
    useEffect(() => {
        const filtered = userData
            .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => a.name.localeCompare(b.name)); // SORT NAMES ALPHABETICALLY

        setFilteredFriends(filtered);
    }, [searchTerm]);

    return (
        <div>
            <header>
                <div className="header-content">
                    <Link to='/friendslist'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
                        </svg>
                    </Link>
                    <Link to="/friendssearch" className="custom-link">Search</Link>
                </div>
            </header>

            <div className='container-friends'>
                <div className="input-bar">
                    <input 
                        type="text" 
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter name"
                    />
                </div>

                <div className="search-results">
                    {filteredFriends.map(friend => (
                        <div key={friend.id} className="friend-search-item">
                            <div className="friend-search-info">
                                <span>
                                    {friend.name}
                                    <span style={{ color: 'grey', fontSize: 'smaller', fontStyle: 'italic' }}>
                                        &nbsp;({friend.username})
                                    </span>
                                </span>
                            </div>
                            <div className="friend-actions">
                                <button className='border border-black py-1 px-2 rounded text-sm hover:bg-black hover:text-white'>Block</button>
                                <button className='border border-black py-1 px-2 rounded text-sm hover:bg-black hover:text-white'>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FriendsSearch;
