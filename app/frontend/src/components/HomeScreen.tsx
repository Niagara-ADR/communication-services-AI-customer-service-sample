// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useEffect, useState } from 'react';
import Chat from './Chat';
import '../styles/HomePage.css';
import { ChatDetailsData, getChatDetails } from '../utils/ChatClientDetails';
import { clearCacheHistory } from '../utils/CacheHistoryDetails';

/**
 * HomeScreen has two states:
 * 1. Showing start chat button
 * 2. Showing spinner after clicking start chat
 *
 * @param props
 */
export default (): JSX.Element => {
  const [chatData, setChatData] = useState<ChatDetailsData>();
  useEffect(() => {
    getChatDetails()
      .then((apiData) => {
        setChatData(apiData);
        localStorage.setItem('chatThreadId', apiData.threadId);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  async function handleClearHistory() {
    const response = await clearCacheHistory();
    if (response) {
      alert('Cache history cleared.');
    } else {
      alert('failed.');
    }
  }

  const displayHomeScreen = (): JSX.Element => {
    return (
      <div className="home-container">
        <nav>
          <div className="logo">
            <b>Niagara</b> Bottling
          </div>
          <div className="menu-items">
            <a href="#" className="search">
              Search
            </a>
          </div>
          <div className="right-items">
            <a href="#" className="language">
              English
            </a>
            <a href="#" className="account">
              Account
            </a>
            <a className="clear-history-btn" onClick={handleClearHistory}>
              Clear History
            </a>
          </div>
        </nav>
        <div className="content">
          <p className="title">Looking for Support?</p>
          <hr />
          <p className="subtitle">...</p>
          {chatData && <Chat {...chatData} userId={chatData.identity} />}
          <p className="subtitle">Chat with customer support and connect/p>
        </div>
      </div>
    );
  };

  return displayHomeScreen();
};
