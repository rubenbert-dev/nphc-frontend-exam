import useSWR from "swr";

export const fetcher = (...args) => {
    return fetch(...args).then(async (res) => {
        let payload;
        try {
            if (res.status === 204) return null;
            payload = await res.json();
        } catch (e) {
        }
        if (res.ok) {
            return payload;
        } else {
            const error = new Error('An error occurred while fetching the data.')
            error.info = payload;
            error.status = res.status;
            throw error;
        }
    });
};

// Employee hooks
export function useEmployees() {
    const { data, error, mutate } = useSWR('/api/employees', fetcher);

    return {
        data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    }
}
