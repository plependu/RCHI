import React from "react";

class errorPage extends React.Component {
  render() {
    return (
      <div>
        <h3 style={{ textAlign: "center" }}>404 - Route Not found</h3>
        <p style={{ textAlign: "center" }}>
          You have entered an invalid Route. Please use our navigation bar for
          this site.
        </p>
      </div>
    );
  }
}

export default errorPage;
