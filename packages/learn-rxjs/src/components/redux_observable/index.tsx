import { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

function App(props: any) {
  useEffect(() => {
    console.log(props);
  }, []);
  const { state, ping, pong } = props;
  return (
    <div>
      <h2>Learn - RxJS</h2>
      <p>Now State: {state.ping.nowStateText}</p>
      <button onClick={state.ping.isPinging ? pong : ping}>
        {state.ping.buttonText}
      </button>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  state: state,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  ping() {
    dispatch({ type: "PING", payload: {} });
  },
  pong() {
    dispatch({ type: "PONG", payload: {} });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
