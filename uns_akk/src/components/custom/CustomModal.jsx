import React, { useId, useState } from "react";
import CustomFileInput from "./CustomFileInput";
import { Modal } from "antd";
import CrudProvider from "../../provider/CrudProvider";
import { type } from "@testing-library/user-event/dist/type";

export default function CustomModal({
  docs,
  onChangeFunction,
  typeToFilter,
  removeDoc,
  placeHolder,
  showUpload,
}) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='col-xxl-6 col-lg-8 col-sm-12 mt-2 divForUpload'>
      <button
        className=' fs-6  btn2 btn-modal btn-raporti'
        onClick={() => setIsOpen(id)}
      >
        {placeHolder}
      </button>
      {docs
        .filter((document) => document.type === typeToFilter)
        .map((obj, index) => {
          return (
            <div className='w-100' key={index} id={obj.applicationDocsId}>
              <span className='upload-filename'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-link-45deg svg-link'
                  viewBox='0 0 16 16'
                >
                  <path d='M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z' />
                  <path d='M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z' />
                </svg>

                {obj.docPath.split("$$")[1]}

                {showUpload && (
                  <svg
                    type='button'
                    onClick={() => removeDoc(obj.applicationDocsId)}
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='bi bi-x-circle icon-close'
                    viewBox='0 0 16 16'
                  >
                    <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                    <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
                  </svg>
                )}
              </span>
            </div>
          );
        })}
      {showUpload && (
        <div className='col-xxl-12 col-lg-12 col-sm-12 mt-2'>
          <div className='col-xxl-8 col-lg-10 col-sm-12'>
            <CustomFileInput
              onChangeFunction={onChangeFunction}
              acceptType={".pdf"}
              isMultiple={true}
            />
          </div>
        </div>
      )}
      <Modal
        title={placeHolder}
        centered
        className='responsive-modal'
        open={isOpen}
        okButtonProps={{ style: { display: "none" } }}
        onCancel={() => setIsOpen("")}
      >
        {docs.map((document) => {
          if (document.type === typeToFilter) {
            return CrudProvider.checkIsPDf(document.docPath) == true ? (
              <iframe
                key={document.applicationDocsId}
                id={document.applicationDocsId}
                src={CrudProvider.documentPath(document.docPath)}
                loading='lazy'
              />
            ) : (
              <img
                key={document.applicationDocsId}
                src={CrudProvider.documentPath(document.docPath)}
                loading='lazy'
              />
            );
          }
        })}
      </Modal>
    </div>
  );
}
