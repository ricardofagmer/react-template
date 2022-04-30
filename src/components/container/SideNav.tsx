import React from 'react'
import { NavLink } from 'react-router-dom'
import { SideBarData } from './SideBarData'

const SideNav = () => {
  const user = 'IS_MASTER';

  return (
    <div>
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <div className="text-center mt-4">
          <img
            src="/dist/img/logo.png"
            alt="project 3S"
            className="brand-image"
            width={100}
          />
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel pb-3 mb-3 d-flex"></div>

          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="/dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <span className="d-block text-light">Alexander Pierce</span>
            </div>
          </div>

          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="true"
            >
              {SideBarData.map((item, index) => {
                return (
                  
                  item.permissao.filter(el => el === user).length > 0 &&
                  
                  <li key={index} className="nav-item">
                    <span className="nav-link">
                      <i className={item.icon} />
                      <p>
                        <NavLink to={item.path}>{item.title}</NavLink>
                        {item.submenu.length > 0 &&
                          <i className="fas fa-angle-left right" />                      
                        }
                      </p>
                    </span>
                    {item.submenu.length > 0 &&
                      item.submenu.map((el, i) => (
                        <ul className="nav nav-treeview">
                          <li className="nav-item">
                            <span className="nav-link">
                              <i className="far fa-circle nav-icon" />
                              <p>
                                <NavLink to={el.path}>{el.title}</NavLink>
                              </p>
                            </span>
                          </li>                        
                        </ul>
                      ))}
                  </li>
              
                )
              })}
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  )
}

export default SideNav
