import React, { createContext, useContext, useState } from 'react';

const CacheContext = createContext();

export const CacheProvider = ({ children }) => {
    const [cache, setCache] = useState({});

    const addToCache = (collectionPath, data) => {
        setCache((prevCache) => ({
            ...prevCache,
            [collectionPath]: data,
        }));
    };

    const getFromCache = (collectionPath) => {
        return cache[collectionPath];
    };

    return (
        <CacheContext.Provider value={{ cache, addToCache, getFromCache }}>
            {children}
        </CacheContext.Provider>
    );
};

export const useCache = () => {
    return useContext(CacheContext);
};
