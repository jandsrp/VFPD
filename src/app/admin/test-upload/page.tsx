"use client";

import { UploadButton } from "@/lib/uploadthing";
import { useState } from "react";

export default function TestUploadPage() {
    const [imageUrl, setImageUrl] = useState<string>("");

    return (
        <div className="p-10 flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl mb-8 font-bold">Test Upload Issue</h1>

            <div className="p-8 border rounded-xl bg-white shadow-lg">
                <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        console.log("Files: ", res);
                        if (res && res[0]) {
                            setImageUrl(res[0].url);
                            alert("Upload Completed Successfully!");
                        }
                    }}
                    onUploadError={(error: Error) => {
                        console.error("Upload Error:", error);
                        alert(`ERROR! ${error.message}`);
                    }}
                />
            </div>

            {imageUrl && (
                <div className="mt-8 p-4 border rounded bg-green-50">
                    <p className="mb-2 font-bold text-green-700">Uploaded Image:</p>
                    <img src={imageUrl} alt="Uploaded" className="max-w-xs rounded shadow" />
                    <p className="text-xs text-gray-500 mt-2">{imageUrl}</p>
                </div>
            )}
        </div>
    );
}
