import React from "react";
import { Link } from "react-router-dom";

export default function Level() {





  
  return (
    <div className="col-12">
      <div className="text-end mb-3">
        <Link className="btn btn-success waves-effect waves-light" to="/createlevel">
          <span className="btn-label">
            <i className="mdi mdi-check-all"></i>
          </span>
          Regjistro
        </Link>
      </div>

      <div className="card">
        <div className="card-body">
          <div id="datatable_wrapper" className="dataTables_wrapper dt-bootstrap5">
            <div className="row">
              <div className="col-md-6">
                <div className="dataTables_length" id="datatable_length">
                  <label className="form-label">
                    Show entries
                    <select name="datatable_length" aria-controls="datatable" className="form-select form-select-sm">
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div id="datatable_filter" className="dataTables_filter">
                  <label>
                    Search:
                    <input type="search" className="form-control form-control-sm" placeholder="" aria-controls="datatable" />
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 mt-5">
                <table id="datatable" className="table table-bordered dt-responsive table-responsive-md nowrap">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>LevelReferenceKEK</th>
                      <th>DetailedDescription</th>
                      <th>TheDescriptor</th>
                      <th>Knowledge</th>
                      <th>Skills</th>
                      <th>Competencies</th>
                      <th>LevelIndicators</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="odd">
                      <td className="sorting_1">Test</td>
                      <td>Test</td>
                      <td>Test</td>
                      <td>Test</td>
                      <td>Test</td>
                      <td>Test</td>
                      <td>Test</td>
                      <td>Test</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-7 mt-1">
                <div className="dataTables_paginate paging_simple_numbers" id="datatable_paginate">
                  <ul className="pagination">
                    <li className="page-item previous disabled" id="datatable_previous">
                      <a href="#" aria-controls="datatable" data-dt-idx="0" tabIndex="0" className="page-link">
                        Previous
                      </a>
                    </li>
                    <li className="page-item active">
                      <a href="#" aria-controls="datatable" data-dt-idx="1" tabIndex="0" className="page-link">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" aria-controls="datatable" data-dt-idx="2" tabIndex="0" className="page-link">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" aria-controls="datatable" data-dt-idx="3" tabIndex="0" className="page-link">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" aria-controls="datatable" data-dt-idx="4" tabIndex="0" className="page-link">
                        4
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" aria-controls="datatable" data-dt-idx="5" tabIndex="0" className="page-link">
                        5
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" aria-controls="datatable" data-dt-idx="6" tabIndex="0" className="page-link">
                        6
                      </a>
                    </li>
                    <li className="page-item next" id="datatable_next">
                      <a href="#" aria-controls="datatable" data-dt-idx="7" tabIndex="0" className="page-link">
                        Next
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-5 mt-3">
                <div className="dataTables_info" id="datatable_info" role="status" aria-live="polite">
                  Showing 1 to 10 of 57 entries
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
