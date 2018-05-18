import React from 'react';
import classnames from 'classnames';

import {
  Row,
  Col,
  Container,
  Collapse,
  Label,
  Button,
  CustomInput,
  //Glyphicon,
  FormGroup,
  Nav,
  NavItem,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavLink,
  ButtonToolbar,
  //DropdownButton,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

//TODO glyph should be marked as required
let Glyphicon = props => {
  let glyphClass = classnames({
    fa: true,
    [`fa-${props.glyph}`]: true
  });

  return <span className={glyphClass} />;
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export {
  Row,
  Col,
  Container,
  Label,
  Collapse,
  Button,
  CustomInput,
  Glyphicon,
  FormGroup,
  Nav,
  NavItem,
  Navbar,
  NavLink,
  NavbarToggler,
  NavbarBrand,
  ButtonToolbar,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Modal
};
