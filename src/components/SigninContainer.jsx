import { connect } from "react-redux";

import actionCreators from "../actionCreators";
import type { unwrapSignin } from "../reducers/signin";

import Signin from "./Signin";

const SigninContainer = connect(unwrapSignin, actionCreators)(Signin);

export default SigninContainer;
