import { createContext, useContext, useState } from 'react';

const UserContext = createContext<any>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {

    const [email, setEmail] = useState('');
    const [sortType, setSortType] = useState("TaskID");

    function updateEmail(newEmail: string) {
        setEmail(newEmail);

    };

    function updateSortType(newSortType: string) {
        setSortType(newSortType);
    }

    return (
        <UserContext.Provider value={{ email, updateEmail, sortType, updateSortType}}>
            {children}
        </UserContext.Provider>
    );


};

export function useUserContext() {
    return useContext(UserContext);

}


