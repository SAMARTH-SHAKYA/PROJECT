import { Link, useParams } from "react-router-dom";

export default function PlacesPage() {
    const { action } = useParams();

    return (

        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                        Add New Place
                    </Link>
                </div>
            )};
            {action === 'new' && (
                <div>
                    <form>
                        <h2 className=" text-2xl mt-4 ">Title</h2>
                        <p className=" text-gray-500 text-sm ">Title for your place, should be short and catchy as in advertisement</p>
                        <input type="text" placeholder="title, for exapmle: My lovely apartment" />
                        <h2 className=" test-2xl mt-4 ">Address</h2>
                        <p className=" text-gray-500 text-sm" >Address to this place</p>
                        <input type="text" placeholder="address" />
                        <h2 className=" test-2xl mt-4 ">Photos</h2>
                        <p className=" text-gray-500 text-sm" >More =  better</p>
                        <div className=" flex gap-2">
                            <input type="text" placeholder={'Add using a link....'} />
                            <button className=" bg-gray-200 px-4 rounded-2xl">Add photo</button>
                        </div>
                        <div className=" mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            <button className=" flex gap-1 justify-center border bg-transparent rounded-2xl text-2xl text-gray-600 p-8">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                </svg>

                                Upload
                            </button>
                        </div>
                        <h2 className=" test-2xl mt-4 ">Description</h2>
                        <p className=" text-gray-500 text-sm"> description of the place</p>
                        <textarea />
                        <h2 className=" test-2xl mt-4 ">Perks</h2>
                        <p className=" text-gray-500 text-sm">Select all the perks of your place</p>
                        <div className=" grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-2 ">
                            <label className=" border p-4 flex rounded-2xl gap-2 items-center cursor-pointer ">
                                <input type="checkbox" />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                                </svg>

                                <span>Wifi</span>
                            </label>
                            <label className=" border p-4 flex rounded-2xl gap-2 items-center cursor-pointer ">
                                <input type="checkbox" />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                </svg>

                                <span>Free parking</span>
                            </label>
                            <label className=" border p-4 flex rounded-2xl gap-2 items-center cursor-pointer ">
                                <input type="checkbox" />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
                                </svg>

                                <span>TV</span>
                            </label>
                            <label className=" border p-4 flex rounded-2xl gap-2 items-center cursor-pointer ">
                                <input type="checkbox" />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                                </svg>

                                <span>Dining</span>
                            </label>
                            <label className=" border p-4 flex rounded-2xl gap-2 items-center cursor-pointer ">
                                <input type="checkbox" />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                                </svg>

                                <span>24-hours electricity</span>
                            </label>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}