import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userID, setUserID] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserFromStorage = async () => {
      try {
        const storedUserID = await AsyncStorage.getItem("userID");
        const storedUserToken = await AsyncStorage.getItem("userToken");

        if (storedUserID && storedUserToken) {
          setUserID(storedUserID);
          setUserToken(storedUserToken);
        }
        console.log("LOGIN CONTEXT", id, token);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getUserFromStorage();
  }, []);

  const login = async (id, token) => {
    // console.log("CONTEXT LOGIN:", id, token);
    try {
      setUserID(id);

      setUserToken(token);

      await AsyncStorage.setItem("userID", String(id));
      await AsyncStorage.setItem("userToken", token);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      setUserID(null);
      setUserToken(null);

      await AsyncStorage.removeItem("userID");
      await AsyncStorage.removeItem("userToken");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userID,
        userToken,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
