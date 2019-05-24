import React, { useState, useContext } from "react";
import { withStyles } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import SendIcon from "@material-ui/icons/Send";
import Divider from "@material-ui/core/Divider";

import { CREATE_COMMENT_MUTATION } from "../../graphql/mutations";
import { useClient } from "../../client";
import Context from "../../context";

const CreateComment = ({ classes }) => {
	const client = useClient();
	const { state, dispatch } = useContext(Context);
	const { currentPin } = state;
	const [comment, setComment] = useState("");

	const handleComment = event => {
		setComment(event.target.value);
	};

	const handleSubmittComment = async () => {
		const variables = { pinId: currentPin._id, text: comment };
		await client.request(CREATE_COMMENT_MUTATION, variables);
		setComment("");
	};
	return (
		<React.Fragment>
			<form className={classes.form}>
				<IconButton
					onClick={() => setComment("")}
					disabled={!comment.trim()}
					className={classes.clearButton}>
					<ClearIcon />
				</IconButton>
				<InputBase
					className={classes.input}
					placeholder="add comment"
					multiline={true}
					value={comment}
					onChange={event => handleComment(event)}
				/>
				<IconButton
					onClick={handleSubmittComment}
					disabled={!comment.trim()}
					className={classes.sendButton}>
					<SendIcon />
				</IconButton>
			</form>
			<Divider />
		</React.Fragment>
	);
};

const styles = theme => ({
	form: {
		display: "flex",
		alignItems: "center"
	},
	input: {
		marginLeft: 8,
		flex: 1
	},
	clearButton: {
		padding: 0,
		color: "red"
	},
	sendButton: {
		padding: 0,
		color: theme.palette.secondary.dark
	}
});

export default withStyles(styles)(CreateComment);
