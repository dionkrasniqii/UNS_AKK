import React, { useEffect } from "react";
import CrudProvider from "../../provider/CrudProvider";
import { useNavigate } from "react-router";

export default function MultiRoles(props) {
  const navigate = useNavigate();
  useEffect(() => {
    if (props.model.SelectedRole !== 0) {
      CrudProvider.createItem(
        "AccountController/login-with-role",
        props.model
      ).then((res) => {
        if (res) {
          localStorage.setItem("akktoken", res.token);
          navigate("/");
          props.setAuthState(true);
        }
      });
    }
  }, [props.model.SelectedRole]);
  return (
    <div
      className='modal fade show'
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
              Zgjedhni rolin per qasje
            </h5>
          </div>
          <div className='modal-body'>
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
          </div>
        </div>
        {/* /.modal-content */}
      </div>
      {/* /.modal-dialog */}
    </div>
  );
}
