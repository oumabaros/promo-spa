import React, { Component } from 'react';
import SideBarExpanded from '../assets/SidebarExpanded.svg';

//sidebar component for sidebar region of main page
export class SideBar extends Component {
  render() {
    return (
      <React.Fragment>
        <div id="SideBarMenuCollapsed">
          <img src={SideBarExpanded} alt="Side Bar" />
        </div>
      </React.Fragment>
    );
  }
}
