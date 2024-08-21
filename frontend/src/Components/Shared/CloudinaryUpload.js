import {openUploadWidget} from "../../utils/CloudinaryService";
import {cloudinary_upload_present} from '../../config';
const CloudinaryUpload = ({setUrl, setName}) => {
    const uploadImageWidget = () => {
        let myUploadWidget = openUploadWidget(
            {
                cloudName: "dvpxcevhp",
                uploadPreset: cloudinary_upload_present,
                sources: ["local"],
            },
            function (error, result) {
                if (!error && result.event === "success") {
                    setUrl(result.info.secure_url);
                    setName(result.info.original_filename);
                } else {
                    if (error) {
                        console.log(error);
                    }
                }
            }
        );
        myUploadWidget.open();
    };

    return (
        <button
            className="bg-white text-black rounded-full p-4 font-semibold"
            onClick={uploadImageWidget}>
            Upload Songs
        </button>
    );
};

export default CloudinaryUpload;