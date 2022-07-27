import { useState } from "react";
function Welcome() {
  const [state,setState] = useState({
    kycAddress : "",
    tokenSaleAddress : null,
    userToken : "",
    loaded : false
  })
  const handleChange = () => {};

  const clickWhiteListing = () => {};
  return (
    <>
      <div className="col-xs-10">
        <div className="col-xs-12">
          <div >
            <div>
              <h1>Buy Token </h1>
            </div>
          </div>
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Amount Coin"
              value={state.kycAddress}
            />
          </div>
          <div className="d-flex justify-content-center max-width-5">
            <button
              className="btn btn-primary mt-4"
              type="button"
              onClick={clickWhiteListing}
            >
              {" "}
              Add to whiteList
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
