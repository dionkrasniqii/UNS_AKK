import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CrudProvider from "../../provider/CrudProvider";
import jwtDecode from "jwt-decode";
import { useTranslation } from "react-i18next";

export default function MultiRoles(props) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (props.model.SelectedRole !== 0) {
      setLoad(true);
      CrudProvider.createItem(
        "AccountController/login-with-role",
        props.model
      ).then((res) => {
        if (res) {
          localStorage.setItem("akktoken", res.token);
          const decodedToken = jwtDecode(res.token);
          if (decodedToken.role.includes("Institution")) {
            navigate("/students");
          } else if (decodedToken.role.includes("Admin")) {
            navigate("/");
          } else {
            navigate("/applications");
          }
          props.setAuthState(true);
          setLoad(false);
        }
        setLoad(false);
      });
    }
  }, [props.model.SelectedRole]);
  return (
    <div
      className='modal fade show my-5 px-5'
      id='scrollable-modal'
      tabIndex={-1}
      aria-labelledby='scrollableModalTitle'
      style={{ display: "block" }}
      aria-modal='true'
      role='dialog'
    >
      <div className='modal-dialog modal-dialog-scrollable' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='scrollableModalTitle'>
              {t("ChooseRoleToLogin")}
            </h5>
          </div>
          <div className='modal-body'>
            {!load ? (
              <div className='mt-3'>
                {props.roles.map((role, index) => {
                  return (
                    <div className='form-check' key={index}>
                      <input
                        type='checkbox'
                        className='form-check-input'
                        id={role}
                        onChange={(e) =>
                          props.setModel({
                            ...props.model,
                            SelectedRole: role,
                          })
                        }
                      />
                      <label className='form-check-label' htmlFor={role}>
                        {role}
                      </label>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className='col-xxl-12 col-lg-12 col-sm-12 text-center'>
                <div
                  className='spinner-border text-primary m-2 text-center'
                  role='status'
                />
              </div>
            )}
          </div>
        </div>
        {/* /.modal-content */}
      </div>
      {/* /.modal-dialog */}
    </div>
  );
}
