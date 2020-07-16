import React, { useState } from 'react';
import Header from './components/Header';
import Content from './components/Content';
import { BrowserRouter as Router } from 'react-router-dom';

const UserContext = React.createContext(null)

function App() {
  const [user, setUser] = useState(null);

  const UserContextState = {
    user,
    login: (user) => setUser(user),
    logout: () => setUser(null),
    loggedIn: () => !!user
  }

  return (
    <UserContext.Provider value={UserContextState}>
      <Router>
        <Header/>
        <Content />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
export {UserContext}
