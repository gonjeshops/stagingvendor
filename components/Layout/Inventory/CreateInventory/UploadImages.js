import Image from "next/image";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { UploadSvg } from "../../../../assets";
import { addAttachmentList } from "../../../../redux/actions/inventory";

const dropzoneStyle = {
  width: "100%",
  height: "auto",
  borderWidth: 2,
  borderColor: "rgb(102, 102, 102)",
  borderStyle: "dashed",
  borderRadius: 5,
};

const UploadImages = ({
  title,
  multiple,
  subTitle,
  addAttachments,
  attachmentFiles,
  onChange,
  values,
}) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (values?.image) {
      setFiles([values.image]);
    }
    if (values?.gallery?.length > 0) {
      setFiles(values.gallery);
    }
  }, [values]);

  const handleFileDrop = (files) => {
    var formData = new FormData();
    files.map((i) => formData.append(`attachment[]`, i));
    addAttachments(formData).then((action) => {
      const filesData = action?.payload?.data?.data || [];

      if (filesData.length > 0) {
        const key = multiple ? "gallery" : "image";
        const data = multiple
          ? filesData.map((el) => {
              return {
                original: el.original,
                thumbnail: el.thumbnail,
                id: el.id,
              };
            })
          : {
              original: filesData[0].original,
              thumbnail: filesData[0].thumbnail,
              id: filesData[0].id,
            };
        onChange(key, data);
      }

      setFiles(filesData);
    });
  };

  return (
    <div className="col-lg-6 text-center">
      <div className={`feature-image ${multiple ? "gallry" : ""}`}>
        <h3>{title}</h3>
        <Dropzone
          accept="image/jpeg, image/png, image/jpg"
          style={dropzoneStyle}
          onDrop={handleFileDrop}
          multiple={multiple}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>{subTitle}</p>
                <div className="upload">
                  <Image src={UploadSvg} alt="" height={50} width={50} />
                  <p>
                    <span>Upload an image </span> Or Drag and drop
                    <br />
                    Png, Jpg
                  </p>
                </div>
              </div>
            </section>
          )}
        </Dropzone>
        <div className="d-flex">
          {(files || []).map((el) => {
            return (
              <div className="upload_img" key={`key_${el.id}`}>
                <Image
                  // style={{ height: 100, width: 100 }}
                  src={el.thumbnail}
                  alt=""
                  height={50}
                  width={50}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = function (state) {
  return {
    attachmentFiles: state.inventory.attachmentsList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addAttachments: (shop_id) => {
      return dispatch(addAttachmentList(shop_id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UploadImages);
