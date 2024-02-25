import { Trash2 } from "lucide-react";
import { deleteFile } from "../service/file";
import { deleteDocument } from "../service/document";
import { useQueryClient } from "@tanstack/react-query";
import { formatDateTime } from "../utils";
import { Download } from "lucide-react";

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
    <div className="py-4 border-b hover:bg-gray-100 transition cursor-pointer border-b-gray-300 flex justify-between pr-2">
      <div className="flex">
        <img className="md:h-14 h-12" src="file-icon.svg" alt="file-icon" />
        <div>
          <h4 className="font-bold md:text-lg text-base">
            {title}
          </h4>
          <p className="text-gray-500 md:text-sm text-xs font-medium">
            {description}
          </p>
          <div className="font-medium md:text-sm text-xs text-gray-400 flex items-center md:gap-6 gap-3">
            <p>12 Pages</p>
            <p>{fileSize}</p>
            <p>{formatDateTime(createdAt)}</p>
            <a href={fileUrl} download>
              <Download size={18} className="text-gray-400 hover:text-gray-700" />
            </a>
          </div>
        </div>
      </div>

        <button className="self-start" onClick={handleDelete}>
          <Trash2 size={20} className="text-rose-500 hover:text-rose-700" />
        </button>     
    </div>
  )
}

export default File