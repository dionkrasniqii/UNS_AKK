import { useEffect, useId, useState } from "react";
import { useTranslation } from "react-i18next";

export default function CustomFileInput({
  onChangeFunction,
  isMultiple,
  acceptType,
}) {
  const { t } = useTranslation();
  const [fileList, setFileList] = useState([]);
  const id = useId();
  const handleFileChange = (e) => {
    const files = e.target.files || [];
    setFileList(Array.from(files));
    onChangeFunction(files);
  };
  return (
    <>
      <input
        type='file'
        style={{ display: "none" }}
        multiple={isMultiple ? "multiple" : ""}
        accept={acceptType}
        onChange={handleFileChange}
        id={id}
      />

      <div className='main-div-upload'>
        <div className='upload-card'>
          <div
            className='main-box'
            onClick={(e) => {
              var el = document.getElementById(id);
              el.click();
            }}
          >
            <div className='box-content'>
              <div className='svg'>
                <svg
                  width='66'
                  height='57'
                  viewBox='0 0 66 57'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M2.70977 0H19.4194C20.2733 0 21.0742 0.402215 21.5857 1.08315L25.3821 6.14266C25.8937 6.82361 26.6946 7.22581 27.5484 7.22581H62.3226C63.8185 7.22581 65.0323 8.43956 65.0323 9.93548V53.2903C65.0323 54.7862 63.8185 56 62.3226 56H2.70968C1.21376 56 0 54.7862 0 53.2903V2.70968C0 1.21375 1.21385 0 2.70977 0Z'
                    transform='translate(0.0177612 0.740387)'
                    fill='#4F8AFE'
                  />
                </svg>
              </div>
              <div className='text-upload'>
                <p className='title'>{t("UploadDocuments")} </p>
                {/* <span>Modified: Today</span> */}
              </div>
              <div className='dots'>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
          <div className={fileList.length > 0 ? "upload-div-root " : ""}>
            {fileList.map((obj, index) => {
              return (
                <div className='w-100' key={index}>
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

                    {obj.name}

                    <svg
                      type='button'
                      onClick={(e) => {
                        const newArr = fileList.filter(
                          (item) => item.name !== obj.name
                        );
                        onChangeFunction(newArr);
                        setFileList(newArr);
                      }}
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
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div
          href='https://dribbble.com/YancyMin'
          className='dr-url'
          target='_blank'
        ></div>
      </div>
    </>
  );
}
