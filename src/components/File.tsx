import { Trash2 } from "lucide-react";
import { deleteFile } from "../service/file";
import { deleteDocument } from "../service/document";
import { useQueryClient } from "@tanstack/react-query";

type FileType = {
  title: string,
  description: string,
  fileUrl: string,
  fileSize: string,
  createdAt: string,
  fileId: string,
  id: string
}

const File = ({
  title,
  description,
  fileUrl,
  fileSize,
  createdAt,
  fileId,
  id
}: FileType) => {
  const queryClient = useQueryClient();

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;
    try {
      Promise.all([deleteFile(fileId), deleteDocument("files", id)]);
      queryClient.invalidateQueries({
        queryKey: ["user-ppts"]
      });
      alert("File deleted successfully");
    } catch (error: any) {
      alert(error.message);
    }
  }


  return (
    <div className="py-4 border-b border-b-gray-300 flex items-center justify-between">
      <div className="flex">
        <img className="h-14" src="file-icon.svg" alt="file-icon" />
        <div>
          <h4 className="font-bold text-lg">
            {title}
          </h4>
          <p className="text-gray-500 text-sm font-medium">
            {description}
          </p>
          <div className="font-medium text-sm text-gray-400 flex items-center gap-6">
            <p>12 Pages</p>
            <p>{fileSize}</p>
            <p>{createdAt}</p>
            <a href={fileUrl} download>
              Download
            </a>
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <button onClick={handleDelete}>
          <Trash2 size={20} className="text-rose-500 hover:text-rose-700" />
        </button>
      </div>
    </div>
  )
}

export default File