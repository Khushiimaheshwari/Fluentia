import { useQuery } from '@tanstack/react-query';
import React from 'react';

const TestQuery = () => {
    console.log("TestQuery component is rendering...");

    const { data, isLoading, error } = useQuery({
        queryKey: ["test-todos"],
        queryFn: async () => {
            console.log("Fetching test todos...");
            const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            console.log("Test todos fetched successfully:", data);
            return data;
        },
    });

    console.log("TestQuery component rendered with query state:", { data, isLoading, error });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h2>Test Query Results</h2>
            {data && (
                <ul>
                    {data.map(todo => (
                        <li key={todo.id}>{todo.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TestQuery;



