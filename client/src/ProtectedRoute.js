import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import Context from "./context";

//入ってきたcomponentと残りのプロパティはrest
const ProtectedRoute = ({ component: Component, ...rest }) => {
	const { state } = useContext(Context);
	return (
		<Route
			render={props =>
				!state.isAuth ? <Redirect to="/login" /> : <Component {...props} />
			}
			{...rest}
		/>
		// <Route render={props => <Component {...props} />} {...rest} />
	);
};

export default ProtectedRoute;
