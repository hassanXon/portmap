import { connect } from 'react-redux';
import { fetchHarbors } from '../../store/portMap/actions';
import PortMap from './PortMap';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */


/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  fetchHarbors
};

const mapStateToProps = (state) => ({
  harbors: state.portMap.harbors
});


export default connect(mapStateToProps, mapDispatchToProps)(PortMap);
