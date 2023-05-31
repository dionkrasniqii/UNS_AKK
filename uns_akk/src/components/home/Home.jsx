import React from "react";

export default function Home() {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-4'>
          <a
            href='#'
            className='btn btn-purple rounded-pill w-md waves-effect waves-light mb-3'
          >
            <i className='mdi mdi-plus' /> Create Project
          </a>
        </div>
        <div className='col-sm-8'>
          <div className='float-end'>
            <form className='row g-2 align-items-center mb-2 mb-sm-0'>
              <div className='col-auto'>
                <div className='d-flex'>
                  <label className='d-flex align-items-center'>
                    Phase
                    <select className='form-select form-select-sm d-inline-block ms-2'>
                      <option>All Projects(6)</option>
                      <option>Complated</option>
                      <option>Progress</option>
                    </select>
                  </label>
                </div>
              </div>
              <div className='col-auto'>
                <div className='d-flex'>
                  <label className='d-flex align-items-center'>
                    Sort
                    <select className='form-select form-select-sm d-inline-block ms-2'>
                      <option>Date</option>
                      <option>Name</option>
                      <option>End date</option>
                      <option>Start Date</option>
                    </select>
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* end col*/}
      </div>

      <div className='row'>
        <div className='col-xl-4'>
          <div className='card'>
            <div className='card-body project-box'>
              <div className='badge bg-success float-end'>Completed</div>
              <h4 className='mt-0'>
                <a href='' className='text-dark'>
                  New Admin Design
                </a>
              </h4>
              <p className='text-success text-uppercase font-13'>Web Design</p>
              <p className='text-muted font-13'>
                If several languages coalesce the grammar is more simple and
                regular than that of the individual languages...
                <a href='#' className='text-primary'>
                  View more
                </a>
              </p>
              <ul className='list-inline'>
                <li className='list-inline-item me-4'>
                  <h4 className='mb-0'>56</h4>
                  <p className='text-muted'>Questions</p>
                </li>
                <li className='list-inline-item'>
                  <h4 className='mb-0'>452</h4>
                  <p className='text-muted'>Comments</p>
                </li>
              </ul>
              <div className='project-members mb-2'>
                <h5 className='float-start me-3'>Team :</h5>
                <div className='avatar-group'>
                  <a
                    href='#'
                    className='avatar-group-item'
                    data-bs-toggle='tooltip'
                    data-bs-placement='top'
                    title=''
                    data-bs-original-title='Mat Helme'
                  >
                    <img
                      src='assets/images/users/user-1.jpg'
                      className='rounded-circle avatar-sm'
                      alt='friend'
                    />
                  </a>
                  <a
                    href='#'
                    className='avatar-group-item'
                    data-bs-toggle='tooltip'
                    data-bs-placement='top'
                    title=''
                    data-bs-original-title='Michael Zenaty'
                  >
                    <img
                      src='assets/images/users/user-2.jpg'
                      className='rounded-circle avatar-sm'
                      alt='friend'
                    />
                  </a>
                  <a
                    href='#'
                    className='avatar-group-item'
                    data-bs-toggle='tooltip'
                    data-bs-placement='top'
                    title=''
                    data-bs-original-title='James Anderson'
                  >
                    <img
                      src='assets/images/users/user-3.jpg'
                      className='rounded-circle avatar-sm'
                      alt='friend'
                    />
                  </a>
                  <a
                    href='#'
                    className='avatar-group-item'
                    data-bs-toggle='tooltip'
                    data-bs-placement='top'
                    title=''
                    data-bs-original-title='Mat Helme'
                  >
                    <img
                      src='assets/images/users/user-4.jpg'
                      className='rounded-circle avatar-sm'
                      alt='friend'
                    />
                  </a>
                </div>
              </div>
              <h5>
                Progress <span className='text-success float-end'>80%</span>
              </h5>
              <div className='progress progress-bar-alt-success progress-sm'>
                <div
                  className='progress-bar bg-success progress-animated wow animated animated'
                  role='progressbar'
                  aria-valuenow={80}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  style={{
                    width: "80%",
                    visibility: "visible",
                    animationName: "animationProgress",
                  }}
                ></div>
                {/* /.progress-bar .progress-bar-danger */}
              </div>
              {/* /.progress .no-rounded */}
            </div>
          </div>
        </div>
        {/* end col*/}
        <div className='col-xl-4'>
          <div className='card'>
            <div className='card-body project-box'>
              <div className='badge bg-primary float-end'>Completed</div>
              <h4 className='mt-0'>
                <a href='' className='text-dark'>
                  App Design and Develop
                </a>
              </h4>
              <p className='text-primary text-uppercase font-13'>Android</p>
              <p className='text-muted font-13'>
                New common language will be more simple and regular than the
                existing European languages...
                <a href='#' className='text-primary'>
                  View more
                </a>
              </p>
              <ul className='list-inline'>
                <li className='list-inline-item me-4'>
                  <h4 className='mb-0'>77</h4>
                  <p className='text-muted'>Questions</p>
                </li>
                <li className='list-inline-item'>
                  <h4 className='mb-0'>875</h4>
                  <p className='text-muted'>Comments</p>
                </li>
              </ul>
              <div className='project-members mb-2'>
                <h5 className='float-start me-3'>Team :</h5>
                <div className='avatar-group'>
                  <a
                    href='#'
                    className='avatar-group-item'
                    data-bs-toggle='tooltip'
                    data-bs-placement='top'
                    title=''
                    data-bs-original-title='Mat Helme'
                  >
                    <img
                      src='assets/images/users/user-5.jpg'
                      className='rounded-circle avatar-sm'
                      alt='friend'
                    />
                  </a>
                  <a
                    href='#'
                    className='avatar-group-item'
                    data-bs-toggle='tooltip'
                    data-bs-placement='top'
                    title=''
                    data-bs-original-title='Michael Zenaty'
                  >
                    <img
                      src='assets/images/users/user-6.jpg'
                      className='rounded-circle avatar-sm'
                      alt='friend'
                    />
                  </a>
                  <a
                    href='#'
                    className='avatar-group-item'
                    data-bs-toggle='tooltip'
                    data-bs-placement='top'
                    title=''
                    data-bs-original-title='James Anderson'
                  >
                    <img
                      src='assets/images/users/user-7.jpg'
                      className='rounded-circle avatar-sm'
                      alt='friend'
                    />
                  </a>
                </div>
              </div>
              <h5>
                Progress <span className='text-primary float-end'>45%</span>
              </h5>
              <div className='progress progress-bar-alt-primary progress-sm'>
                <div
                  className='progress-bar bg-primary progress-animated wow animated animated'
                  role='progressbar'
                  aria-valuenow={45}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  style={{ width: "45%" }}
                ></div>
                {/* /.progress-bar .progress-bar-danger */}
              </div>
              {/* /.progress .no-rounded */}
            </div>
          </div>
        </div>
        {/* end col*/}
        <div className='col-xl-4'>
          <div className='card'>
            <div className='card-body project-box'>
              <div className='badge bg-pink float-end'>Completed</div>
              <h4 className='mt-0'>
                <a href='' className='text-dark'>
                  Landing page Design
                </a>
              </h4>
              <p className='text-pink text-uppercase font-13'>Web Design</p>
              <p className='text-muted font-13'>
                It will be as simple as occidental in fact it will be to an
                english person it will seem like simplified English...
                <a href='#' className='text-primary'>
                  view more
                </a>
              </p>
              <ul className='list-inline'>
                <li className='list-inline-item me-4'>
                  <h4 className='mb-0'>87</h4>
                  <p className='text-muted'>Questions</p>
                </li>
                <li className='list-inline-item'>
                  <h4 className='mb-0'>125</h4>
                  <p className='text-muted'>Comments</p>
                </li>
              </ul>
              <div className='project-members mb-2'>
                <h5 className='float-start me-3'>Team :</h5>
                <div className='avatar-group'>
                  <a
                    href='#'
                    className='avatar-group-item'
                    data-bs-toggle='tooltip'
                    data-bs-placement='top'
                    title=''
                    data-bs-original-title='Mat Helme'
                  >
                    <img
                      src='assets/images/users/user-8.jpg'
                      className='rounded-circle avatar-sm'
                      alt='friend'
                    />
                  </a>
                  <a
                    href='#'
                    className='avatar-group-item'
                    data-bs-toggle='tooltip'
                    data-bs-placement='top'
                    title=''
                    data-bs-original-title='Michael Zenaty'
                  >
                    <img
                      src='assets/images/users/user-9.jpg'
                      className='rounded-circle avatar-sm'
                      alt='friend'
                    />
                  </a>
                  <a
                    href='#'
                    className='avatar-group-item'
                    data-bs-toggle='tooltip'
                    data-bs-placement='top'
                    title=''
                    data-bs-original-title='James Anderson'
                  >
                    <img
                      src='assets/images/users/user-10.jpg'
                      className='rounded-circle avatar-sm'
                      alt='friend'
                    />
                  </a>
                  <a
                    href='#'
                    className='avatar-group-item'
                    data-bs-toggle='tooltip'
                    data-bs-placement='top'
                    title=''
                    data-bs-original-title='Mat Helme'
                  >
                    <img
                      src='assets/images/users/user-1.jpg'
                      className='rounded-circle avatar-sm'
                      alt='friend'
                    />
                  </a>
                  <a
                    href='#'
                    className='avatar-group-item'
                    data-bs-toggle='tooltip'
                    data-bs-placement='top'
                    title=''
                    data-bs-original-title='Joel Heffner'
                  >
                    <img
                      src='assets/images/users/user-2.jpg'
                      className='rounded-circle avatar-sm'
                      alt='friend'
                    />
                  </a>
                </div>
              </div>
              <h5>
                Progress <span className='text-pink float-end'>68%</span>
              </h5>
              <div className='progress progress-bar-alt-pink progress-sm'>
                <div
                  className='progress-bar bg-pink progress-animated wow animated animated'
                  role='progressbar'
                  aria-valuenow={68}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  style={{ width: "68%" }}
                ></div>
                {/* /.progress-bar .progress-bar-danger */}
              </div>
              {/* /.progress .no-rounded */}
            </div>
          </div>
        </div>
        {/* end col*/}
      </div>

      <div className='row'>
        <div className='col-xl-3 col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <div className='dropdown float-end'>
                <a
                  href='#'
                  className='dropdown-toggle arrow-none card-drop'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  <i className='mdi mdi-dots-vertical' />
                </a>
                <div className='dropdown-menu dropdown-menu-end'>
                  {/* item*/}
                  <a className='dropdown-item'>Action</a>
                  {/* item*/}
                  <a className='dropdown-item'>Another action</a>
                  {/* item*/}
                  <a className='dropdown-item'>Something else</a>
                  {/* item*/}
                  <a className='dropdown-item'>Separated link</a>
                </div>
              </div>
              <h4 className='header-title mt-0 mb-4'>Total Revenue</h4>
              <div className='widget-chart-1'>
                <div className='widget-chart-box-1 float-start' dir='ltr'>
                  <div style={{ display: "inline", width: 70, height: 70 }}>
                    <canvas width={70} height={70} />
                    <input
                      data-plugin='knob'
                      data-width={70}
                      data-height={70}
                      data-fgcolor='#f05050 '
                      data-bgcolor='#F9B9B9'
                      defaultValue={58}
                      data-skin='tron'
                      data-angleoffset={180}
                      data-readonly='true'
                      data-thickness='.15'
                      readOnly='readonly'
                      style={{
                        width: 39,
                        height: 23,
                        position: "absolute",
                        verticalAlign: "middle",
                        marginTop: 23,
                        marginLeft: "-54px",
                        border: 0,
                        background: "none",
                        font: "bold 14px Arial",
                        textAlign: "center",
                        color: "rgb(240, 80, 80)",
                        padding: 0,
                        appearance: "none",
                      }}
                    />
                  </div>
                </div>
                <div className='widget-detail-1 text-end'>
                  <h2 className='fw-normal pt-2 mb-1'> 256 </h2>
                  <p className='text-muted mb-1'>Revenue today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end col */}
        <div className='col-xl-3 col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <div className='dropdown float-end'>
                <a
                  href='#'
                  className='dropdown-toggle arrow-none card-drop'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  <i className='mdi mdi-dots-vertical' />
                </a>
                <div className='dropdown-menu dropdown-menu-end'>
                  {/* item*/}
                  <a className='dropdown-item'>Action</a>
                  {/* item*/}
                  <a className='dropdown-item'>Another action</a>
                  {/* item*/}
                  <a className='dropdown-item'>Something else</a>
                  {/* item*/}
                  <a className='dropdown-item'>Separated link</a>
                </div>
              </div>
              <h4 className='header-title mt-0 mb-3'>Sales Analytics</h4>
              <div className='widget-box-2'>
                <div className='widget-detail-2 text-end'>
                  <span className='badge bg-success rounded-pill float-start mt-3'>
                    32% <i className='mdi mdi-trending-up' />{" "}
                  </span>
                  <h2 className='fw-normal mb-1'> 8451 </h2>
                  <p className='text-muted mb-3'>Revenue today</p>
                </div>
                <div className='progress progress-bar-alt-success progress-sm'>
                  <div
                    className='progress-bar bg-success'
                    role='progressbar'
                    aria-valuenow={77}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{ width: "77%" }}
                  >
                    <span className='visually-hidden'>77% Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end col */}
        <div className='col-xl-3 col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <div className='dropdown float-end'>
                <a
                  href='#'
                  className='dropdown-toggle arrow-none card-drop'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  <i className='mdi mdi-dots-vertical' />
                </a>
                <div className='dropdown-menu dropdown-menu-end'>
                  {/* item*/}
                  <a className='dropdown-item'>Action</a>
                  {/* item*/}
                  <a className='dropdown-item'>Another action</a>
                  {/* item*/}
                  <a className='dropdown-item'>Something else</a>
                  {/* item*/}
                  <a className='dropdown-item'>Separated link</a>
                </div>
              </div>
              <h4 className='header-title mt-0 mb-4'>Statistics</h4>
              <div className='widget-chart-1'>
                <div className='widget-chart-box-1 float-start' dir='ltr'>
                  <div style={{ display: "inline", width: 70, height: 70 }}>
                    <canvas width={70} height={70} />
                    <input
                      data-plugin='knob'
                      data-width={70}
                      data-height={70}
                      data-fgcolor='#ffbd4a'
                      data-bgcolor='#FFE6BA'
                      defaultValue={80}
                      data-skin='tron'
                      data-angleoffset={180}
                      data-readonly='true'
                      data-thickness='.15'
                      readOnly='readonly'
                      style={{
                        width: 39,
                        height: 23,
                        position: "absolute",
                        verticalAlign: "middle",
                        marginTop: 23,
                        marginLeft: "-54px",
                        border: 0,
                        background: "none",
                        font: "bold 14px Arial",
                        textAlign: "center",
                        color: "rgb(255, 189, 74)",
                        padding: 0,
                        appearance: "none",
                      }}
                    />
                  </div>
                </div>
                <div className='widget-detail-1 text-end'>
                  <h2 className='fw-normal pt-2 mb-1'> 4569 </h2>
                  <p className='text-muted mb-1'>Revenue today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end col */}
        <div className='col-xl-3 col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <div className='dropdown float-end'>
                <a
                  href='#'
                  className='dropdown-toggle arrow-none card-drop'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  <i className='mdi mdi-dots-vertical' />
                </a>
                <div className='dropdown-menu dropdown-menu-end'>
                  {/* item*/}
                  <a className='dropdown-item'>Action</a>
                  {/* item*/}
                  <a className='dropdown-item'>Another action</a>
                  {/* item*/}
                  <a className='dropdown-item'>Something else</a>
                  {/* item*/}
                  <a className='dropdown-item'>Separated link</a>
                </div>
              </div>
              <h4 className='header-title mt-0 mb-3'>Daily Sales</h4>
              <div className='widget-box-2'>
                <div className='widget-detail-2 text-end'>
                  <span className='badge bg-pink rounded-pill float-start mt-3'>
                    32% <i className='mdi mdi-trending-up' />{" "}
                  </span>
                  <h2 className='fw-normal mb-1'> 158 </h2>
                  <p className='text-muted mb-3'>Revenue today</p>
                </div>
                <div className='progress progress-bar-alt-pink progress-sm'>
                  <div
                    className='progress-bar bg-pink'
                    role='progressbar'
                    aria-valuenow={77}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{ width: "77%" }}
                  >
                    <span className='visually-hidden'>77% Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end col */}
      </div>
      {/* end row */}
      <div className='row'>
        <div className='col-xl-4'>
          <div className='card'>
            <div className='card-body'>
              <div className='dropdown float-end'>
                <a
                  href='#'
                  className='dropdown-toggle arrow-none card-drop'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  <i className='mdi mdi-dots-vertical' />
                </a>
                <div className='dropdown-menu dropdown-menu-end'>
                  {/* item*/}
                  <a className='dropdown-item'>Action</a>
                  {/* item*/}
                  <a className='dropdown-item'>Another action</a>
                  {/* item*/}
                  <a className='dropdown-item'>Something else</a>
                  {/* item*/}
                  <a className='dropdown-item'>Separated link</a>
                </div>
              </div>
              <h4 className='header-title mt-0'>Daily Sales</h4>
              <div className='widget-chart text-center'>
                <div
                  id='morris-donut-example'
                  dir='ltr'
                  style={{ height: 245 }}
                  className='morris-chart'
                >
                  <svg
                    height={245}
                    version='1.1'
                    width={285}
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    style={{
                      overflow: "hidden",
                      position: "relative",
                      left: "-0.15625px",
                      top: "-0.796875px",
                    }}
                  >
                    <desc
                      style={{
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      }}
                    >
                      Created with Raphaël 2.3.0
                    </desc>
                    <defs
                      style={{
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      }}
                    />
                    <path
                      fill='none'
                      stroke='#ff8acc'
                      d='M142.5,197.5A75,75,0,0,0,213.53058844420985,146.57603591269296'
                      strokeWidth={2}
                      opacity={0}
                      style={{
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                        opacity: 0,
                      }}
                    />
                    <path
                      fill='#ff8acc'
                      stroke='#000000'
                      d='M142.5,200.5A78,78,0,0,0,216.37181198197825,147.53907734920068L244.31051010336745,157.00898480819325A107.5,107.5,0,0,1,142.5,230Z'
                      strokeOpacity={0}
                      strokeWidth={3}
                      style={{
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      }}
                    />
                    <path
                      fill='none'
                      stroke='#5b69bc'
                      d='M213.53058844420985,146.57603591269296A75,75,0,0,0,75.2429080941063,89.31139369659871'
                      strokeWidth={2}
                      opacity={0}
                      style={{
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                        opacity: 0,
                      }}
                    />
                    <path
                      fill='#5b69bc'
                      stroke='#000000'
                      d='M216.37181198197825,147.53907734920068A78,78,0,0,0,72.55262441787056,87.98384944446265L46.09816826821904,74.92966429845814A107.5,107.5,0,0,1,244.31051010336745,157.00898480819325Z'
                      strokeOpacity={0}
                      strokeWidth={3}
                      style={{
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      }}
                    />
                    <path
                      fill='none'
                      stroke='#35b8e0'
                      d='M75.2429080941063,89.31139369659871A75,75,0,0,0,142.4764380554856,197.4999962988984'
                      strokeWidth={2}
                      opacity={1}
                      style={{
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                        opacity: 1,
                      }}
                    />
                    <path
                      fill='#35b8e0'
                      stroke='#000000'
                      d='M72.55262441787056,87.98384944446265A78,78,0,0,0,142.47549557770503,200.49999615085432L142.4646570832284,234.9999944483476A112.5,112.5,0,0,1,41.61436214115946,72.71709054489806Z'
                      strokeOpacity={0}
                      strokeWidth={3}
                      style={{
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      }}
                    />
                    <text
                      x='142.5'
                      y='112.5'
                      textAnchor='middle'
                      fontFamily='"Arial"'
                      fontSize='15px'
                      stroke='none'
                      fill='#000000'
                      style={{
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                        textAnchor: "middle",
                        fontFamily: "Arial",
                        fontSize: 15,
                        fontWeight: 800,
                      }}
                      fontWeight={800}
                      transform='matrix(1.1363,0,0,1.1363,-19.431,-16.5625)'
                      strokeWidth='0.8800364176432293'
                    >
                      <tspan
                        dy={5}
                        style={{
                          WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                        }}
                      >
                        Mail-Order Sales
                      </tspan>
                    </text>
                    <text
                      x='142.5'
                      y='132.5'
                      textAnchor='middle'
                      fontFamily='"Arial"'
                      fontSize='14px'
                      stroke='none'
                      fill='#000000'
                      style={{
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                        textAnchor: "middle",
                        fontFamily: "Arial",
                        fontSize: 14,
                      }}
                      transform='matrix(1.4706,0,0,1.4706,-67.0588,-58.3529)'
                      strokeWidth='0.6799999999999999'
                    >
                      <tspan
                        dy='4.5'
                        style={{
                          WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                        }}
                      >
                        20
                      </tspan>
                    </text>
                  </svg>
                </div>
                <ul className='list-inline chart-detail-list mb-0'>
                  <li className='list-inline-item'>
                    <h5 style={{ color: "#ff8acc" }}>
                      <i className='fa fa-circle me-1' />
                      Series A
                    </h5>
                  </li>
                  <li className='list-inline-item'>
                    <h5 style={{ color: "#5b69bc" }}>
                      <i className='fa fa-circle me-1' />
                      Series B
                    </h5>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* end col */}
        <div className='col-xl-4'>
          <div className='card'>
            <div className='card-body'>
              <div className='dropdown float-end'>
                <a
                  href='#'
                  className='dropdown-toggle arrow-none card-drop'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  <i className='mdi mdi-dots-vertical' />
                </a>
                <div className='dropdown-menu dropdown-menu-end'>
                  {/* item*/}
                  <a className='dropdown-item'>Action</a>
                  {/* item*/}
                  <a className='dropdown-item'>Another action</a>
                  {/* item*/}
                  <a className='dropdown-item'>Something else</a>
                  {/* item*/}
                  <a className='dropdown-item'>Separated link</a>
                </div>
              </div>
              <h4 className='header-title mt-0'>Statistics</h4>
              <div
                id='morris-bar-example'
                dir='ltr'
                style={{
                  height: 280,
                  position: "relative",
                  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                }}
                className='morris-chart'
              >
                <svg
                  height={280}
                  version='1.1'
                  width={285}
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  style={{
                    overflow: "hidden",
                    position: "relative",
                    left: "-0.328125px",
                    top: "-0.796875px",
                  }}
                >
                  <desc style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}>
                    Created with Raphaël 2.3.0
                  </desc>
                  <defs
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                  <text
                    x='30.71875'
                    y={241}
                    textAnchor='end'
                    fontFamily='sans-serif'
                    fontSize='12px'
                    stroke='none'
                    fill='#888888'
                    style={{
                      WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      textAnchor: "end",
                      fontFamily: "sans-serif",
                      fontSize: 12,
                      fontWeight: "normal",
                    }}
                    fontWeight='normal'
                  >
                    <tspan
                      dy={4}
                      style={{
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      }}
                    >
                      0
                    </tspan>
                  </text>
                  <path
                    fill='none'
                    stroke='#adb5bd'
                    d='M43.21875,241.5H260'
                    strokeOpacity='0.1'
                    strokeWidth='0.5'
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                  <text
                    x='30.71875'
                    y={187}
                    textAnchor='end'
                    fontFamily='sans-serif'
                    fontSize='12px'
                    stroke='none'
                    fill='#888888'
                    style={{
                      WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      textAnchor: "end",
                      fontFamily: "sans-serif",
                      fontSize: 12,
                      fontWeight: "normal",
                    }}
                    fontWeight='normal'
                  >
                    <tspan
                      dy={4}
                      style={{
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      }}
                    >
                      25
                    </tspan>
                  </text>
                  <path
                    fill='none'
                    stroke='#adb5bd'
                    d='M43.21875,187.5H260'
                    strokeOpacity='0.1'
                    strokeWidth='0.5'
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                  <text
                    x='30.71875'
                    y={133}
                    textAnchor='end'
                    fontFamily='sans-serif'
                    fontSize='12px'
                    stroke='none'
                    fill='#888888'
                    style={{
                      WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      textAnchor: "end",
                      fontFamily: "sans-serif",
                      fontSize: 12,
                      fontWeight: "normal",
                    }}
                    fontWeight='normal'
                  >
                    <tspan
                      dy={4}
                      style={{
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      }}
                    >
                      50
                    </tspan>
                  </text>
                  <path
                    fill='none'
                    stroke='#adb5bd'
                    d='M43.21875,133.5H260'
                    strokeOpacity='0.1'
                    strokeWidth='0.5'
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                  <text
                    x='30.71875'
                    y={79}
                    textAnchor='end'
                    fontFamily='sans-serif'
                    fontSize='12px'
                    stroke='none'
                    fill='#888888'
                    style={{
                      WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      textAnchor: "end",
                      fontFamily: "sans-serif",
                      fontSize: 12,
                      fontWeight: "normal",
                    }}
                    fontWeight='normal'
                  >
                    <tspan
                      dy={4}
                      style={{
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      }}
                    >
                      75
                    </tspan>
                  </text>
                  <path
                    fill='none'
                    stroke='#adb5bd'
                    d='M43.21875,79.5H260'
                    strokeOpacity='0.1'
                    strokeWidth='0.5'
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                  <text
                    x='30.71875'
                    y={25}
                    textAnchor='end'
                    fontFamily='sans-serif'
                    fontSize='12px'
                    stroke='none'
                    fill='#888888'
                    style={{
                      WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      textAnchor: "end",
                      fontFamily: "sans-serif",
                      fontSize: 12,
                      fontWeight: "normal",
                    }}
                    fontWeight='normal'
                  >
                    <tspan
                      dy={4}
                      style={{
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      }}
                    >
                      100
                    </tspan>
                  </text>
                  <path
                    fill='none'
                    stroke='#adb5bd'
                    d='M43.21875,25.5H260'
                    strokeOpacity='0.1'
                    strokeWidth='0.5'
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                  <text
                    x='241.93489583333334'
                    y='253.5'
                    textAnchor='middle'
                    fontFamily='sans-serif'
                    fontSize='12px'
                    stroke='none'
                    fill='#888888'
                    style={{
                      WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      textAnchor: "middle",
                      fontFamily: "sans-serif",
                      fontSize: 12,
                      fontWeight: "normal",
                    }}
                    fontWeight='normal'
                    transform='matrix(1,0,0,1,0,7)'
                  >
                    <tspan
                      dy={4}
                      style={{
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      }}
                    >
                      2015
                    </tspan>
                  </text>
                  <text
                    x='205.8046875'
                    y='253.5'
                    textAnchor='middle'
                    fontFamily='sans-serif'
                    fontSize='12px'
                    stroke='none'
                    fill='#888888'
                    style={{
                      WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      textAnchor: "middle",
                      fontFamily: "sans-serif",
                      fontSize: 12,
                      fontWeight: "normal",
                    }}
                    fontWeight='normal'
                    transform='matrix(1,0,0,1,0,7)'
                  >
                    <tspan
                      dy={4}
                      style={{
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      }}
                    >
                      2014
                    </tspan>
                  </text>
                  <text
                    x='169.67447916666669'
                    y='253.5'
                    textAnchor='middle'
                    fontFamily='sans-serif'
                    fontSize='12px'
                    stroke='none'
                    fill='#888888'
                    style={{
                      WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      textAnchor: "middle",
                      fontFamily: "sans-serif",
                      fontSize: 12,
                      fontWeight: "normal",
                    }}
                    fontWeight='normal'
                    transform='matrix(1,0,0,1,0,7)'
                  >
                    <tspan
                      dy={4}
                      style={{
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      }}
                    >
                      2013
                    </tspan>
                  </text>
                  <text
                    x='133.54427083333331'
                    y='253.5'
                    textAnchor='middle'
                    fontFamily='sans-serif'
                    fontSize='12px'
                    stroke='none'
                    fill='#888888'
                    style={{
                      WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      textAnchor: "middle",
                      fontFamily: "sans-serif",
                      fontSize: 12,
                      fontWeight: "normal",
                    }}
                    fontWeight='normal'
                    transform='matrix(1,0,0,1,0,7)'
                  >
                    <tspan
                      dy={4}
                      style={{
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      }}
                    >
                      2012
                    </tspan>
                  </text>
                  <text
                    x='97.4140625'
                    y='253.5'
                    textAnchor='middle'
                    fontFamily='sans-serif'
                    fontSize='12px'
                    stroke='none'
                    fill='#888888'
                    style={{
                      WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      textAnchor: "middle",
                      fontFamily: "sans-serif",
                      fontSize: 12,
                      fontWeight: "normal",
                    }}
                    fontWeight='normal'
                    transform='matrix(1,0,0,1,0,7)'
                  >
                    <tspan
                      dy={4}
                      style={{
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      }}
                    >
                      2011
                    </tspan>
                  </text>
                  <text
                    x='61.28385416666667'
                    y='253.5'
                    textAnchor='middle'
                    fontFamily='sans-serif'
                    fontSize='12px'
                    stroke='none'
                    fill='#888888'
                    style={{
                      WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      textAnchor: "middle",
                      fontFamily: "sans-serif",
                      fontSize: 12,
                      fontWeight: "normal",
                    }}
                    fontWeight='normal'
                    transform='matrix(1,0,0,1,0,7)'
                  >
                    <tspan
                      dy={4}
                      style={{
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      }}
                    >
                      2010
                    </tspan>
                  </text>
                  <rect
                    x='57.670833333333334'
                    y={79}
                    width='7.226041666666667'
                    height={162}
                    rx={0}
                    ry={0}
                    fill='#188ae2'
                    stroke='none'
                    fillOpacity={1}
                    style={{
                      WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      fillOpacity: 1,
                    }}
                  />
                  <rect
                    x='93.80104166666668'
                    y='150.28'
                    width='7.226041666666667'
                    height='90.72'
                    rx={0}
                    ry={0}
                    fill='#188ae2'
                    stroke='none'
                    fillOpacity={1}
                    style={{
                      WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      fillOpacity: 1,
                    }}
                  />
                  <rect
                    x='129.93125'
                    y={79}
                    width='7.226041666666667'
                    height={162}
                    rx={0}
                    ry={0}
                    fill='#188ae2'
                    stroke='none'
                    fillOpacity={1}
                    style={{
                      WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      fillOpacity: 1,
                    }}
                  />
                  <rect
                    x='166.06145833333335'
                    y='158.92'
                    width='7.226041666666667'
                    height='82.08000000000001'
                    rx={0}
                    ry={0}
                    fill='#188ae2'
                    stroke='none'
                    fillOpacity={1}
                    style={{
                      WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      fillOpacity: 1,
                    }}
                  />
                  <rect
                    x='202.19166666666666'
                    y='199.95999999999998'
                    width='7.226041666666667'
                    height='41.04000000000002'
                    rx={0}
                    ry={0}
                    fill='#188ae2'
                    stroke='none'
                    fillOpacity={1}
                    style={{
                      WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      fillOpacity: 1,
                    }}
                  />
                  <rect
                    x='238.32187500000003'
                    y='40.119999999999976'
                    width='7.226041666666667'
                    height='200.88000000000002'
                    rx={0}
                    ry={0}
                    fill='#188ae2'
                    stroke='none'
                    fillOpacity={1}
                    style={{
                      WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      fillOpacity: 1,
                    }}
                  />
                </svg>
                <div
                  className='morris-hover morris-default-style'
                  style={{ left: 14, top: 108, display: "none" }}
                >
                  <div className='morris-hover-row-label'>2010</div>
                  <div
                    className='morris-hover-point'
                    style={{ color: "#188ae2" }}
                  >
                    Statistics: 75
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end col */}
        <div className='col-xl-4'>
          <div className='card'>
            <div className='card-body'>
              <div className='dropdown float-end'>
                <a
                  href='#'
                  className='dropdown-toggle arrow-none card-drop'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  <i className='mdi mdi-dots-vertical' />
                </a>
                <div className='dropdown-menu dropdown-menu-end'>
                  {/* item*/}
                  <a className='dropdown-item'>Action</a>
                  {/* item*/}
                  <a className='dropdown-item'>Another action</a>
                  {/* item*/}
                  <a className='dropdown-item'>Something else</a>
                  {/* item*/}
                  <a className='dropdown-item'>Separated link</a>
                </div>
              </div>
              <h4 className='header-title mt-0'>Total Revenue</h4>
              <div
                id='morris-line-example'
                dir='ltr'
                style={{
                  height: 280,
                  position: "relative",
                  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                }}
                className='morris-chart'
              >
                <svg
                  height={280}
                  version='1.1'
                  width={285}
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  style={{
                    overflow: "hidden",
                    position: "relative",
                    left: "-0.65625px",
                    top: "-0.796875px",
                  }}
                >
                  <desc style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}>
                    Created with Raphaël 2.3.0
                  </desc>
                  <defs
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                  <text
                    x='30.71875'
                    y={241}
                    textAnchor='end'
                    fontFamily='sans-serif'
                    fontSize='12px'
                    stroke='none'
                    fill='#888888'
                    style={{
                      WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      textAnchor: "end",
                      fontFamily: "sans-serif",
                      fontSize: 12,
                      fontWeight: "normal",
                    }}
                    fontWeight='normal'
                  >
                    <tspan
                      dy={4}
                      style={{
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      }}
                    >
                      0
                    </tspan>
                  </text>
                  <path
                    fill='none'
                    stroke='#adb5bd'
                    d='M43.21875,241.5H260'
                    strokeOpacity='0.1'
                    strokeWidth='0.5'
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                  <text
                    x='30.71875'
                    y={187}
                    textAnchor='end'
                    fontFamily='sans-serif'
                    fontSize='12px'
                    stroke='none'
                    fill='#888888'
                    style={{
                      WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      textAnchor: "end",
                      fontFamily: "sans-serif",
                      fontSize: 12,
                      fontWeight: "normal",
                    }}
                    fontWeight='normal'
                  >
                    <tspan
                      dy={4}
                      style={{
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      }}
                    >
                      25
                    </tspan>
                  </text>
                  <path
                    fill='none'
                    stroke='#adb5bd'
                    d='M43.21875,187.5H260'
                    strokeOpacity='0.1'
                    strokeWidth='0.5'
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                  <text
                    x='30.71875'
                    y={133}
                    textAnchor='end'
                    fontFamily='sans-serif'
                    fontSize='12px'
                    stroke='none'
                    fill='#888888'
                    style={{
                      WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      textAnchor: "end",
                      fontFamily: "sans-serif",
                      fontSize: 12,
                      fontWeight: "normal",
                    }}
                    fontWeight='normal'
                  >
                    <tspan
                      dy={4}
                      style={{
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      }}
                    >
                      50
                    </tspan>
                  </text>
                  <path
                    fill='none'
                    stroke='#adb5bd'
                    d='M43.21875,133.5H260'
                    strokeOpacity='0.1'
                    strokeWidth='0.5'
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                  <text
                    x='30.71875'
                    y={79}
                    textAnchor='end'
                    fontFamily='sans-serif'
                    fontSize='12px'
                    stroke='none'
                    fill='#888888'
                    style={{
                      WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      textAnchor: "end",
                      fontFamily: "sans-serif",
                      fontSize: 12,
                      fontWeight: "normal",
                    }}
                    fontWeight='normal'
                  >
                    <tspan
                      dy={4}
                      style={{
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      }}
                    >
                      75
                    </tspan>
                  </text>
                  <path
                    fill='none'
                    stroke='#adb5bd'
                    d='M43.21875,79.5H260'
                    strokeOpacity='0.1'
                    strokeWidth='0.5'
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                  <text
                    x='30.71875'
                    y={25}
                    textAnchor='end'
                    fontFamily='sans-serif'
                    fontSize='12px'
                    stroke='none'
                    fill='#888888'
                    style={{
                      WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      textAnchor: "end",
                      fontFamily: "sans-serif",
                      fontSize: 12,
                      fontWeight: "normal",
                    }}
                    fontWeight='normal'
                  >
                    <tspan
                      dy={4}
                      style={{
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      }}
                    >
                      100
                    </tspan>
                  </text>
                  <path
                    fill='none'
                    stroke='#adb5bd'
                    d='M43.21875,25.5H260'
                    strokeOpacity='0.1'
                    strokeWidth='0.5'
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                  <text
                    x='105.19258408290966'
                    y='253.5'
                    textAnchor='middle'
                    fontFamily='sans-serif'
                    fontSize='12px'
                    stroke='none'
                    fill='#888888'
                    style={{
                      WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      textAnchor: "middle",
                      fontFamily: "sans-serif",
                      fontSize: 12,
                      fontWeight: "normal",
                    }}
                    fontWeight='normal'
                    transform='matrix(1,0,0,1,0,7)'
                  >
                    <tspan
                      dy={4}
                      style={{
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                      }}
                    >
                      2010
                    </tspan>
                  </text>
                  <path
                    fill='none'
                    stroke='#188ae2'
                    d='M43.21875,241C50.97607670121236,214,66.49073010363708,154.62954856361148,74.24805680484943,133C81.98418862436449,111.42954856361149,97.4564522633946,68.19999999999999,105.19258408290966,68.19999999999999C112.92871590242471,68.19999999999999,128.40097954145483,114.10000000000001,136.13711136096987,133C143.87324318048493,151.9,159.34550681951504,216.70369357045143,167.0816386390301,219.4C174.83896534024245,222.10369357045144,190.35361874266718,165.41477428180573,198.11094544387953,154.6C205.8470772633946,143.81477428180574,221.3193409024247,141.1,229.05547272193976,133C236.79160454145483,124.9,252.26386818048493,100.6,260,89.79999999999998'
                    strokeWidth={3}
                    className='line_1'
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                  <path
                    fill='none'
                    stroke='#10c469'
                    d='M43.21875,133C50.97607670121236,119.5,66.49073010363708,73.59261285909713,74.24805680484943,79C81.98418862436449,84.39261285909713,97.4564522633946,169.45,105.19258408290966,176.2C112.92871590242471,182.95,128.40097954145483,145.14999999999998,136.13711136096987,133C143.87324318048493,120.85,159.34550681951504,79,167.0816386390301,79C174.83896534024245,79,190.35361874266718,133,198.11094544387953,133C205.8470772633946,133,221.3193409024247,92.5,229.05547272193976,79C236.79160454145483,65.5,252.26386818048493,38.5,260,25'
                    strokeWidth={3}
                    className='line_0'
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                  <circle
                    cx='43.21875'
                    cy={241}
                    r={0}
                    fill='#ffffff'
                    stroke='#999999'
                    strokeWidth={1}
                    className='circle_line_1'
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                  <circle
                    cx='74.24805680484943'
                    cy={133}
                    r={0}
                    fill='#ffffff'
                    stroke='#999999'
                    strokeWidth={1}
                    className='circle_line_1'
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                  <circle
                    cx='105.19258408290966'
                    cy='68.19999999999999'
                    r={0}
                    fill='#ffffff'
                    stroke='#999999'
                    strokeWidth={1}
                    className='circle_line_1'
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                  <circle
                    cx='136.13711136096987'
                    cy={133}
                    r={0}
                    fill='#ffffff'
                    stroke='#999999'
                    strokeWidth={1}
                    className='circle_line_1'
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                  <circle
                    cx='167.0816386390301'
                    cy='219.4'
                    r={0}
                    fill='#ffffff'
                    stroke='#999999'
                    strokeWidth={1}
                    className='circle_line_1'
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                  <circle
                    cx='198.11094544387953'
                    cy='154.6'
                    r={0}
                    fill='#ffffff'
                    stroke='#999999'
                    strokeWidth={1}
                    className='circle_line_1'
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                  <circle
                    cx='229.05547272193976'
                    cy={133}
                    r={0}
                    fill='#ffffff'
                    stroke='#999999'
                    strokeWidth={1}
                    className='circle_line_1'
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                  <circle
                    cx={260}
                    cy='89.79999999999998'
                    r={0}
                    fill='#ffffff'
                    stroke='#999999'
                    strokeWidth={1}
                    className='circle_line_1'
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                  <circle
                    cx='43.21875'
                    cy={133}
                    r={0}
                    fill='#ffffff'
                    stroke='#999999'
                    strokeWidth={1}
                    className='circle_line_0'
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                  <circle
                    cx='74.24805680484943'
                    cy={79}
                    r={0}
                    fill='#ffffff'
                    stroke='#999999'
                    strokeWidth={1}
                    className='circle_line_0'
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                  <circle
                    cx='105.19258408290966'
                    cy='176.2'
                    r={0}
                    fill='#ffffff'
                    stroke='#999999'
                    strokeWidth={1}
                    className='circle_line_0'
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                  <circle
                    cx='136.13711136096987'
                    cy={133}
                    r={0}
                    fill='#ffffff'
                    stroke='#999999'
                    strokeWidth={1}
                    className='circle_line_0'
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                  <circle
                    cx='167.0816386390301'
                    cy={79}
                    r={0}
                    fill='#ffffff'
                    stroke='#999999'
                    strokeWidth={1}
                    className='circle_line_0'
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                  <circle
                    cx='198.11094544387953'
                    cy={133}
                    r={0}
                    fill='#ffffff'
                    stroke='#999999'
                    strokeWidth={1}
                    className='circle_line_0'
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                  <circle
                    cx='229.05547272193976'
                    cy={79}
                    r={0}
                    fill='#ffffff'
                    stroke='#999999'
                    strokeWidth={1}
                    className='circle_line_0'
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                  <circle
                    cx={260}
                    cy={25}
                    r={0}
                    fill='#ffffff'
                    stroke='#999999'
                    strokeWidth={1}
                    className='circle_line_0'
                    style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                  />
                </svg>
                <div
                  className='morris-hover morris-default-style'
                  style={{ left: 0, top: 41, display: "none" }}
                >
                  <div className='morris-hover-row-label'>2008</div>
                  <div
                    className='morris-hover-point'
                    style={{ color: "#188ae2" }}
                  >
                    Series B: 0
                  </div>
                  <div
                    className='morris-hover-point'
                    style={{ color: "#10c469" }}
                  >
                    Series A: 50
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end col */}
      </div>
      {/* end row */}
      <div className='row'>
        <div className='col-xl-3 col-md-6'>
          <div className='card'>
            <div className='card-body widget-user'>
              <div className='d-flex align-items-center'>
                <div className='flex-shrink-0 avatar-lg me-3'>
                  <img
                    src='assets/images/users/user-3.jpg'
                    className='img-fluid rounded-circle'
                    alt='user'
                  />
                </div>
                <div className='flex-grow-1 overflow-hidden'>
                  <h5 className='mt-0 mb-1'>Chadengle</h5>
                  <p className='text-muted mb-2 font-13 text-truncate'>
                    coderthemes@gmail.com
                  </p>
                  <small className='text-warning'>
                    <b>Admin</b>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end col */}
        <div className='col-xl-3 col-md-6'>
          <div className='card'>
            <div className='card-body widget-user'>
              <div className='d-flex align-items-center'>
                <div className='flex-shrink-0 avatar-lg me-3'>
                  <img
                    src='assets/images/users/user-2.jpg'
                    className='img-fluid rounded-circle'
                    alt='user'
                  />
                </div>
                <div className='flex-grow-1 overflow-hidden'>
                  <h5 className='mt-0 mb-1'> Michael Zenaty</h5>
                  <p className='text-muted mb-2 font-13 text-truncate'>
                    coderthemes@gmail.com
                  </p>
                  <small className='text-pink'>
                    <b>Support Lead</b>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end col */}
        <div className='col-xl-3 col-md-6'>
          <div className='card'>
            <div className='card-body widget-user'>
              <div className='d-flex align-items-center'>
                <div className='flex-shrink-0 avatar-lg me-3'>
                  <img
                    src='assets/images/users/user-1.jpg'
                    className='img-fluid rounded-circle'
                    alt='user'
                  />
                </div>
                <div className='flex-grow-1 overflow-hidden'>
                  <h5 className='mt-0 mb-1'>Stillnotdavid</h5>
                  <p className='text-muted mb-2 font-13 text-truncate'>
                    coderthemes@gmail.com
                  </p>
                  <small className='text-success'>
                    <b>Designer</b>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end col */}
        <div className='col-xl-3 col-md-6'>
          <div className='card'>
            <div className='card-body widget-user'>
              <div className='d-flex align-items-center'>
                <div className='flex-shrink-0 avatar-lg me-3'>
                  <img
                    src='assets/images/users/user-10.jpg'
                    className='img-fluid rounded-circle'
                    alt='user'
                  />
                </div>
                <div className='flex-grow-1 overflow-hidden'>
                  <h5 className='mt-0 mb-1'>Tomaslau</h5>
                  <p className='text-muted mb-2 font-13 text-truncate'>
                    coderthemes@gmail.com
                  </p>
                  <small className='text-info'>
                    <b>Developer</b>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end col */}
      </div>
      {/* end row */}
      <div className='row'>
        <div className='col-xl-4'>
          <div className='card'>
            <div className='card-body'>
              <div className='dropdown float-end'>
                <a
                  href='#'
                  className='dropdown-toggle arrow-none card-drop'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  <i className='mdi mdi-dots-vertical' />
                </a>
                <div className='dropdown-menu dropdown-menu-end'>
                  {/* item*/}
                  <a className='dropdown-item'>Action</a>
                  {/* item*/}
                  <a className='dropdown-item'>Another action</a>
                  {/* item*/}
                  <a className='dropdown-item'>Something else</a>
                  {/* item*/}
                  <a className='dropdown-item'>Separated link</a>
                </div>
              </div>
              <h4 className='header-title mb-3'>Inbox</h4>
              <div className='inbox-widget'>
                <div className='inbox-item'>
                  <a href='#'>
                    <div className='inbox-item-img'>
                      <img
                        src='assets/images/users/user-1.jpg'
                        className='rounded-circle'
                        alt=''
                      />
                    </div>
                    <h5 className='inbox-item-author mt-0 mb-1'>Chadengle</h5>
                    <p className='inbox-item-text'>
                      Hey! there I'm available...
                    </p>
                    <p className='inbox-item-date'>13:40 PM</p>
                  </a>
                </div>
                <div className='inbox-item'>
                  <a href='#'>
                    <div className='inbox-item-img'>
                      <img
                        src='assets/images/users/user-2.jpg'
                        className='rounded-circle'
                        alt=''
                      />
                    </div>
                    <h5 className='inbox-item-author mt-0 mb-1'>Tomaslau</h5>
                    <p className='inbox-item-text'>
                      I've finished it! See you so...
                    </p>
                    <p className='inbox-item-date'>13:34 PM</p>
                  </a>
                </div>
                <div className='inbox-item'>
                  <a href='#'>
                    <div className='inbox-item-img'>
                      <img
                        src='assets/images/users/user-3.jpg'
                        className='rounded-circle'
                        alt=''
                      />
                    </div>
                    <h5 className='inbox-item-author mt-0 mb-1'>
                      Stillnotdavid
                    </h5>
                    <p className='inbox-item-text'>This theme is awesome!</p>
                    <p className='inbox-item-date'>13:17 PM</p>
                  </a>
                </div>
                <div className='inbox-item'>
                  <a href='#'>
                    <div className='inbox-item-img'>
                      <img
                        src='assets/images/users/user-4.jpg'
                        className='rounded-circle'
                        alt=''
                      />
                    </div>
                    <h5 className='inbox-item-author mt-0 mb-1'>Kurafire</h5>
                    <p className='inbox-item-text'>Nice to meet you</p>
                    <p className='inbox-item-date'>12:20 PM</p>
                  </a>
                </div>
                <div className='inbox-item'>
                  <a href='#'>
                    <div className='inbox-item-img'>
                      <img
                        src='assets/images/users/user-5.jpg'
                        className='rounded-circle'
                        alt=''
                      />
                    </div>
                    <h5 className='inbox-item-author mt-0 mb-1'>Shahedk</h5>
                    <p className='inbox-item-text'>
                      Hey! there I'm available...
                    </p>
                    <p className='inbox-item-date'>10:15 AM</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end col */}
        <div className='col-xl-8'>
          <div className='card'>
            <div className='card-body'>
              <div className='dropdown float-end'>
                <a
                  href='#'
                  className='dropdown-toggle arrow-none card-drop'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  <i className='mdi mdi-dots-vertical' />
                </a>
                <div className='dropdown-menu dropdown-menu-end'>
                  {/* item*/}
                  <a className='dropdown-item'>Action</a>
                  {/* item*/}
                  <a className='dropdown-item'>Another action</a>
                  {/* item*/}
                  <a className='dropdown-item'>Something else</a>
                  {/* item*/}
                  <a className='dropdown-item'>Separated link</a>
                </div>
              </div>
              <h4 className='header-title mt-0 mb-3'>Latest Projects</h4>
              <div className='table-responsive'>
                <table className='table table-hover mb-0'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Project Name</th>
                      <th>Start Date</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Assign</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Adminto Admin v1</td>
                      <td>01/01/2017</td>
                      <td>26/04/2017</td>
                      <td>
                        <span className='badge bg-danger'>Released</span>
                      </td>
                      <td>Coderthemes</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Adminto Frontend v1</td>
                      <td>01/01/2017</td>
                      <td>26/04/2017</td>
                      <td>
                        <span className='badge bg-success'>Released</span>
                      </td>
                      <td>Adminto admin</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Adminto Admin v1.1</td>
                      <td>01/05/2017</td>
                      <td>10/05/2017</td>
                      <td>
                        <span className='badge bg-pink'>Pending</span>
                      </td>
                      <td>Coderthemes</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Adminto Frontend v1.1</td>
                      <td>01/01/2017</td>
                      <td>31/05/2017</td>
                      <td>
                        <span className='badge bg-purple'>
                          Work in Progress
                        </span>
                      </td>
                      <td>Adminto admin</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Adminto Admin v1.3</td>
                      <td>01/01/2017</td>
                      <td>31/05/2017</td>
                      <td>
                        <span className='badge bg-warning'>Coming soon</span>
                      </td>
                      <td>Coderthemes</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Adminto Admin v1.3</td>
                      <td>01/01/2017</td>
                      <td>31/05/2017</td>
                      <td>
                        <span className='badge bg-primary'>Coming soon</span>
                      </td>
                      <td>Adminto admin</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* end col */}
      </div>
      {/* end row */}
    </div>
  );
}
