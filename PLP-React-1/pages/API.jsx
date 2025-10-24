import { useEffect, useState } from "react";
import Card from "../components/card.jsx";

const Api = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://jsonplaceholder.typicode.com/posts");
                if (!res.ok) throw new Error("Failed to fetch data");
                const json = await res.json();
                setData(json);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    const filtered = data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );
    const start = (page - 1) * itemsPerPage;
    const currentItems = filtered.slice(start, start + itemsPerPage);
    const totalPages = Math.ceil(filtered.length / itemsPerPage);


    if (loading) return <p className="text-center mt-10">Loading data...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50">
            <h1 className="text-2xl font-bold mb-4">Public API Data</h1>


            <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                }}
                className="border p-2 mb-6 w-full max-w-md rounded"
            />


            <div className=" flex flex-wrap flex-row">
                {currentItems.map((item) => (
                    <Card key={item.id} className="p-4 shadow hover:shadow-2xl transition">
                        <div>
                            <h2 className="font-semibold text-lg mb-2">{item.title}</h2>
                            <p className="text-sm text-gray-600">{item.body}</p>
                        </div>
                    </Card>
                ))}
            </div>


            <div className="flex items-center gap-4 mt-6">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-400"
                >
                    Prev
                </button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-400"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Api;
