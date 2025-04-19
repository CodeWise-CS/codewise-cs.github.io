import { useCache } from '../context/CacheContext';
import { fetchData } from '../firebase';

export function useFetchWithCache() {
    const { addToCache, getFromCache } = useCache();

    const fetchDataWithCache = async (collectionPath, ids = []) => {
        let data = getFromCache(collectionPath);
        if (data) {
            console.log('Data found in cache');
        } else {
            data = await fetchData(collectionPath);
            addToCache(collectionPath, data);
        }

        if (ids.length > 0) {
            const dataMap = new Map(data.map((doc) => [doc.id, doc]));
            data = ids
                .map((id) => dataMap.get(id))
                .filter((doc) => doc !== undefined);
            return ids.length === 1 ? data[0] : data;
        }
        return data;
    };

    return { fetchDataWithCache };
}
