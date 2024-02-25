import SearchBar from "../components/Search"
import Button from "../components/Button"
import File from "../components/File"
import { getAuth } from "firebase/auth"
import { useState } from "react";
import UploadFileModal from "../components/UploadFileModal";
import { getPPTByUserId } from "../service/document";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
    const [uploadFileModal, setUploadFileModal] = useState(false);
    const auth = getAuth();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["user-ppts"],
        queryFn: () => getPPTByUserId("files", auth.currentUser?.uid as string)
    });

    return (
        <div className="pt-3 relative">
            {
                uploadFileModal && <UploadFileModal setUploadFileModal={setUploadFileModal} />
            }
            <SearchBar />
            <div className="py-1 text-center font-medium">
                {
                    auth.currentUser
                        ? <h1>Welcome {auth.currentUser.displayName}!</h1>
                        : <h1>Welcome to the dashboard</h1>
                }</div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-y-5 gap-10 mt-6 mb-5">
                <Button style="secondary" disabled={false} onClick={() => setUploadFileModal(true)}>
                    Upload PPT
                </Button>

                <Button style="primary" disabled={false} onClick={() => { }}>
                    Scan QR to download PPT
                </Button>
            </div>

            <section className="px-10 mt-5">
                <h1 className="text-2xl font-bold">
                    My Files
                </h1>

                <div>

                    {
                        isLoading ? <div className="text-center text-gray-500 font-medium mt-5">Loading...</div> :
                            isError ? <div className="text-center text-rose-500 font-medium mt-5">{error.message}</div> :
                                data && (
                                    data.length === 0 ? (
                                        <div className="text-center text-gray-500 font-medium mt-5">No files found</div>
                                    ) : (
                                        <div className="flex flex-col w-full">
                                            {data.map((file: any) => (
                                                <File
                                                    key={file.id}
                                                    id={file.id}
                                                    title={file.title}
                                                    description={file.description}
                                                    fileUrl={file.fileUrl}
                                                    fileSize={file.fileSize}
                                                    createdAt={file.createdAt}
                                                    fileId={file.fileId}
                                                />
                                            ))}
                                        </div>
                                    ))
                    }
                </div>
            </section>
        </div>
    )
}

export default Dashboard