import { decryptData } from "@/utils/crypto";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/storage";
import React, { createContext, useContext, useState, ReactNode } from "react";
export interface User {
  active: boolean;
  approved: boolean;
  avatar: string;
  created_at: string; // ISO 8601 date string, consider using `Date` if you'll parse this to a Date object
  email: string;
  id: string; // UUID format
  msg: string;
  name: string;
  passwd: string; // Typically, passwords should not be exposed in client-side interfaces
  status: boolean;
  token: string;
  username: string;
}

interface UserContextType {
  user: User | null;
  addUser: (user: User) => Promise<void>;
  getUser: () => Promise<User | null>;
  deleteUser: () => Promise<void>;
}
const UserContext = createContext<UserContextType | undefined>(undefined);
const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const addUser = async (user:User)=>{
        setUser(user);
        await saveToLocalStorage("user", JSON.stringify(user));
    }
    const getUser =async  ()=>{
        if (user){
            return user;
        }else{
            let userString=await getFromLocalStorage("user");
            let usr:User | null=userString && JSON.parse(userString);
            return usr;
        }
    }
    const deleteUser=async ()=>{
        setUser(null);
        localStorage.removeItem("user");
    }

    return (
        <UserContext.Provider
          value={{user, addUser, getUser, deleteUser}}
        >
          {children}
        </UserContext.Provider>
      );
}

const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
      throw new Error("useUser must be used within a UserProvider");
    }
    return context;
  };
  
  export { UserProvider, useUser };