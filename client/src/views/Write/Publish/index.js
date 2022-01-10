import React from "react";
import { Modal } from "@material-ui/core";
import PropTypes from "prop-types";

export default function Publish(props) {
  const { open, data } = props;
  return (
    <div>
      <Modal open={open}>
        <div>
          {" "}
          <div dangerouslySetInnerHTML={{ __html: data }}></div>
        </div>
      </Modal>
    </div>
  );
}

Publish.propTypes = {
  open: PropTypes.bool,

  data: PropTypes.string,
};
