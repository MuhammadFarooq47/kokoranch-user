export default function FAQS() {
  return (
    <>
      <div className="container mt-5">
        <div className="row dark-card px-5 mt-5" style={{ textAlign: "left" }}>
          <div className="col-lg-12 col-md-12 col-sm-12 mt-md-4 about-panel">
            <div className="about-text p-5">
              <h2 className="fs-2">
                FA<span className="border-title">QS</span>
              </h2>

              <h2
                className="title-color mt-5"
                style={{ borderBottom: "1px solid grey", paddingBottom: 7,  fontWeight: "400" }}
              >
                Can I trade as a guest?
              </h2>
              <h4
                className="mt-2"
                style={{
                  borderLeft: ".5rem solid #14a384",
                  paddingBottom: "1rem",
                  paddingLeft: "1rem",
                  lineHeight: 1,
                 }}
              >
                Yes. You may trade as a guest for 30 days from sign up. After 30
                days a subscription ($5.00) is required.
              </h4>
<div style={{  borderBottom: "1px solid grey", marginTop: 20}}></div>
              <h2
                className="title-color mt-5"
                style={{ borderBottom: "1px solid grey", paddingBottom: 7, fontWeight: "400"}}
              >
                What happens if the person I trade with doesn’t send the plant??
              </h2>
              <h4
                className="mt-2"
                style={{
                  borderLeft: ".5rem solid #14a384",
                  paddingBottom: "1rem",
                  paddingLeft: "1rem",
                  fontWeight: "10rem",
                  lineHeight: 1.3,
                }}
              >
                You contact us. We question the trader and determine why the
                trade did not happen. If the reasons are not valid we ban them
                from the system. No response is a reason for ban from the
                system. The trades have the monetary value you assigned. The
                person who failed to trade will have the value deducted from
                their account. The assigned plant value will be returned to you.
                Shipping is not a return cost.
              </h4>
              <div style={{  borderBottom: "1px solid grey", marginTop: 20}}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
