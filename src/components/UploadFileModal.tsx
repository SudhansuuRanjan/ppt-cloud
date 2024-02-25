import { X } from "lucide-react"
import { useState } from "react";
import { addDocument } from "../service/document";
import { uploadFile, downloadFile } from "../service/file";
import { useAuth } from "../context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

const UploadFileModal = ({ setUploadFileModal }: { setUploadFileModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { currentUser } = useAuth();
    const [file, setFile] = useState<any>(null);
    let user = currentUser as any;
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        fileUrl: "",
        fileId: "",
        uid: user.uid,
        createdAt: "",
        owner: user.displayName,
        ownerEmail: user.email,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const queryClient = useQueryClient();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.title.trim() === "") {
            setError("Title is required.");
            return;
        }

        if (formData.description.trim() === "") {
            setError("Description is required.");
            return;
        }

        if (!file) {
            setError("File is required.");
            return;
        }


        if (file) {
            setLoading(true);
            try {
                let fileRef = Date.now() + "-" + file.name;
                await uploadFile(file, fileRef, "ppts/");
                const fileUrl = await downloadFile("ppts/" + fileRef);
                const data = {
                    title: formData.title,
                    description: formData.description,
                    fileUrl: fileUrl,
                    fileId: fileRef,
                    fileSize: (file.size / (1024 * 1024)).toFixed(1) + " MB",
                    uid: formData.uid,
                    createdAt: new Date().toISOString(),
                    owner: formData.owner,
                    ownerEmail: formData.ownerEmail,
                }
                await addDocument("files", data);
                queryClient.invalidateQueries({ queryKey: ["user-ppts"] });
                setUploadFileModal(false);
            } catch (error: any) {
                setError(error.message);
                console.log(error.message);
            } finally {
                setLoading(false);
                resetForm();
            }
        }
    }

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            fileUrl: "",
            fileId: "",
            uid: "",
            createdAt: "",
            owner: "",
            ownerEmail: "",
        });
        setFile(null);
    }

    return (
        <div className="bg-black bg-opacity-50 backdrop-blur fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white md:w-[32rem] w-[95%] h-fit p-8 rounded-2xl flex flex-col">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">Upload PPT</h1>
                    <button disabled={loading} onClick={() => setUploadFileModal(false)}>
                        <X />
                    </button>
                </div>

                {
                    error && <div className="text-rose-500 text-center text-sm font-medium pt-2">{error}</div>
                }

                <form onSubmit={handleSubmit} className="font-medium flex flex-col w-full gap-4 pt-1">
                    <div className="flex flex-col w-full gap-1.5">
                        <label htmlFor="title" className="block text-sm font-semibold text-[#1b1b1b]">Title</label>
                        <input onChange={(e) => {
                            setFormData({
                                ...formData,
                                title: e.target.value
                            })
                        }} value={formData.title} placeholder="File name with extention" type="text" id="title" name="title" className="border-2 outline-none w-full sm:text-sm border-gray-700 bg-white py-1.5 px-2 rounded-md" />
                    </div>
                    <div className="flex flex-col w-full gap-1.5">
                        <label htmlFor="description" className="block text-sm font-semibold text-[#1b1b1b]">File Description</label>
                        <textarea onChange={(e) => {
                            setFormData({
                                ...formData,
                                description: e.target.value
                            })
                        }} value={formData.description} placeholder="Short file description..." rows={4} id="description" name="description" className="border-2 outline-none w-full sm:text-sm border-gray-700 bg-white py-1.5 px-2 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="file" className="block rounded-lg text-sm font-medium p-2 border-2 border-dashed border-gray-500 text-gray-700">
                            <div className="p-2 text-center text-gray-500">
                                {
                                    file ? file.name : "No File Selected."
                                }
                            </div>
                            <div className="flex items-center justify-center gap-2 p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Select PPT File</span>
                            </div>
                        </label>
                        <input accept=".pptx,.ppt" onChange={handleFileChange} type="file" id="file" name="file" className="focus:ring-indigo-500 focus:border-indigo-500  w-full sm:text-sm border-gray-500 hidden" />
                    </div>

                    <div className="flex w-full gap-2">
                        <button disabled={loading} onClick={(e) => {
                            e.preventDefault();
                            setUploadFileModal(false);
                        }} type="submit" className="border border-[#1b1b1b] text-[#1b1b1b] font-medium rounded-lg py-2 w-full">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="bg-[#1b1b1b] text-white font-medium rounded-lg py-2 w-full">
                            {
                                loading ? "Uploading..." : "Upload"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UploadFileModal