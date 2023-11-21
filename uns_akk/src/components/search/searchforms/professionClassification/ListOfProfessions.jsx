import React, { useEffect, useState } from "react";
import kpk from "../../../../assets/docs/KPK.08.Final.pdf";
import CrudProvider from "../../../../provider/CrudProvider";
import Loading from "../../../loading/Loading";
export default function ListOfProfessions() {
  const [professions, setProfessions] = useState([]);
  const [isMainGroupOpen, setIsMainGroupOpen] = useState("");
  const [isProfessionGroupOpen, setIsProfessionGroupOpen] = useState("");
  const [isChildGroupOpen, setIsChildGroupOpen] = useState("");
  const [load, setLoad] = useState(true);
  useEffect(() => {
    CrudProvider.getAllWithLang(
      "ProfessionGroupAPI/GetAllMainProfessionsWithChils"
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setProfessions(res.result);
          setLoad(false);
        }
      }
    });
  }, []);
  const openPdfInNewTab = () => {
    window.open(kpk, "_blank");
  };
  return (
    <div className="content-page-landing animation">
      <div className="content">
        <div className="container bg-light-subtle ">
          <div className="card card-body">
            <div className="row">
              <div className="col-md-12 text-end">
                <button className="btn btn-danger" onClick={openPdfInNewTab}>
                  <span className="btn-label">
                    <i className="fe-printer"></i>
                  </span>
                  KPK
                </button>
              </div>
              {load ? (
                <Loading />
              ) : (
                <div className="col-md-12">
                  <div id="sidebar-menu">
                    <ul id="side-menu">
                      {professions &&
                        professions.length > 0 &&
                        professions.map((obj, mainIndex) => {
                          return (
                            <li key={`main_${mainIndex}`}>
                              <a
                                type="button"
                                data-bs-toggle="collapse"
                                className=""
                                aria-expanded={
                                  isMainGroupOpen == obj.name ? true : false
                                }
                                onClick={(e) => {
                                  if (isMainGroupOpen == obj.name) {
                                    setIsMainGroupOpen("");
                                    setIsProfessionGroupOpen("");
                                    setIsChildGroupOpen("");
                                  } else {
                                    setIsMainGroupOpen(obj.name);
                                  }
                                }}
                              >
                                <i className="mdi mdi-folder-outline me-1"></i>
                                <span className="text-uppercase fs-5">
                                  {mainIndex + 1} {obj.name}
                                </span>
                                <span className="menu-arrow"></span>
                              </a>

                              {obj.professions &&
                                obj.professions.length > 0 &&
                                obj.professions.map(
                                  (profession, professionIndex) => {
                                    return (
                                      <div
                                        className={
                                          obj.name == isMainGroupOpen
                                            ? "collapse show"
                                            : "collapse"
                                        }
                                        id={`group_${mainIndex}`}
                                        key={`profession_${professionIndex}`}
                                      >
                                        <ul className="nav-second-level">
                                          <li>
                                            <a
                                              type="button"
                                              data-bs-toggle="collapse"
                                              aria-expanded={
                                                isProfessionGroupOpen ==
                                                profession.name
                                                  ? true
                                                  : false
                                              }
                                              onClick={(e) => {
                                                if (
                                                  isProfessionGroupOpen ==
                                                  profession.name
                                                ) {
                                                  setIsProfessionGroupOpen("");
                                                  setIsChildGroupOpen("");
                                                } else {
                                                  setIsProfessionGroupOpen(
                                                    profession.name
                                                  );
                                                }
                                              }}
                                            >
                                              <i className="mdi mdi-folder-multiple-plus-outline me-1" />
                                              <span className="text-uppercase">
                                                {professionIndex + 1}{" "}
                                                {profession.name}
                                              </span>
                                              <span className="menu-arrow" />
                                            </a>
                                            <div
                                              className={`collapse ${
                                                profession.name ==
                                                isProfessionGroupOpen
                                                  ? "show"
                                                  : ""
                                              }`}
                                              id={`professions_${professionIndex}`}
                                            >
                                              <ul className="nav-second-level">
                                                {profession.childs &&
                                                  profession.childs.length >
                                                    0 &&
                                                  profession.childs.map(
                                                    (child, childIndex) => {
                                                      return (
                                                        <li
                                                          key={`child_${childIndex}`}
                                                        >
                                                          <a
                                                            type="button"
                                                            aria-expanded={
                                                              isChildGroupOpen ==
                                                              child.name
                                                                ? true
                                                                : false
                                                            }
                                                            onClick={() => {
                                                              isChildGroupOpen ==
                                                              child.name
                                                                ? setIsChildGroupOpen(
                                                                    ""
                                                                  )
                                                                : setIsChildGroupOpen(
                                                                    child.name
                                                                  );
                                                            }}
                                                            data-bs-toggle="collapse"
                                                          >
                                                            <i className="far fa-folder-open me-1" />
                                                            <span className="text-uppercase">
                                                              {childIndex + 1}{" "}
                                                              {child.name}
                                                            </span>
                                                            <span className="menu-arrow" />
                                                          </a>
                                                          <div
                                                            className={`collapse ${
                                                              child.name ==
                                                                isChildGroupOpen &&
                                                              "show"
                                                            }`}
                                                            id={`childs_${childIndex}`}
                                                          >
                                                            <ul className="nav-second-level">
                                                              {child.subChilds &&
                                                                child.subChilds
                                                                  .length > 0 &&
                                                                child.subChilds.map(
                                                                  (
                                                                    subChild,
                                                                    subChildIndex
                                                                  ) => {
                                                                    return (
                                                                      <li
                                                                        key={`subChild_${subChildIndex}`}
                                                                      >
                                                                        <a>
                                                                          <span className="text-uppercase">
                                                                            {subChildIndex +
                                                                              1}{" "}
                                                                            {
                                                                              subChild.name
                                                                            }
                                                                          </span>
                                                                        </a>
                                                                      </li>
                                                                    );
                                                                  }
                                                                )}
                                                            </ul>
                                                          </div>
                                                        </li>
                                                      );
                                                    }
                                                  )}
                                              </ul>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                    );
                                  }
                                )}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
