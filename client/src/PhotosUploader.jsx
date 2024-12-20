import { useState } from "react";
import axios from "axios";

export default function PhotosUploader({addedPhotos,onChange}) {
    const [photoLink,setPhotoLink] = useState('');
    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const { data: fileName } = await axios.post('/upload-by-link', { link: photoLink })
        console.log({ data: fileName });

        onChange(prev => {
            return [...prev, fileName];
        });
        setPhotoLink('');
    }
    function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        axios.post('/upload', data, {
            headers: { 'Content-type': 'multipart/form-data' }
        }).then(response => {
            const { data: filenames } = response;
            onChange(prev => {
                return [...prev, filenames]
            })
        })
    }
    return (
        <>
            <div className=" flex gap-2">
                <input value={photoLink}
                    onChange={ev => setPhotoLink(ev.target.value)}
                    type="text" placeholder={'Add using a link....'} />
                <button onClick={addPhotoByLink} className=" bg-gray-200 px-4 rounded-2xl">Add photo</button>
            </div>
            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4">
                {addedPhotos.length > 0 && addedPhotos.map((link, index) => (
                    <div className="h-32 flex" key={index}>
                        <img
                            className="w-full h-auto rounded-lg object-cover"
                            src={`http://localhost:4000/uploads/${link}`}
                            alt={`Uploaded photo ${index + 1}`}
                        />
                    </div>
                ))}


                <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl text-2xl text-gray-600 p-8">
                    <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                    </svg>

                    Upload
                </label>
            </div>
        </>
    );
}