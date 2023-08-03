import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CrudProvider from "../../../../provider/CrudProvider";

export default function QualificationStandartDetails() {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    CrudProvider.getItemByIdLang("QualificationStandartAPI/GetById", id).then(
      (res) => {
        if (res) {
          if (res.statusCode === 200) {
            setData(res.result);
          }
        }
      }
    );
  }, [id]);

  console.log(data);

  return (
    <div className='content-page-landing animation'>
      <div className='content'>
        <div className='container'>
          <div className='card'>
            <div className='card-body'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
