import { TempFileModel } from "../app/module/Experience/Experience.model"
import deleteOldFile from "../utilities/deleteFile";


export const deleteDisappearedFile = async (
  tempFileId: string | unknown,
  viewTimer: number // in seconds
) => {

//   const time = viewTimer + 10;

  setTimeout(async () => {
    try {
      // delete file from collection
      const deletedFile = await TempFileModel.findByIdAndDelete(tempFileId);

      // delete file from local storage
      if (deletedFile?.file) {
        deleteOldFile(deletedFile.file);
      }

    } catch (error) {
      console.error("Error deleting disappeared file:", error);
    }
  }, viewTimer * 1000); // convert seconds → milliseconds

};