import React, { Component } from "react";
import { graphql } from "react-apollo";
import {
	getAuthorsQuery,
	addBookMutation,
	getBooksQuery,
} from "../queries/queries";
import { flowRight as compose } from "lodash";

class AddBook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			genre: "",
			authorId: "",
		};
	}

	SubmitForm(e) {
		e.preventDefault();
		this.props.addBookMutation({
			variables: {
				name: this.state.name,
				genre: this.state.genre,
				authorId: this.state.authorId,
			},
			refetchQueries: [{ query: getBooksQuery }],
		});
	}

	render() {
		var select = document.getElementById("authorList");
		if (select) {
			if (select.length === 1) {
				var data = this.props.getAuthorsQuery;
				if (!data.loading) {
					data.authors.map((author) => {
						var node = document.createElement("option");
						var textnode = document.createTextNode(`${author.name}`);
						node.appendChild(textnode);
						node.value = `${author.id}`;
						select.appendChild(node);
						return 0;
					});
				}
			}
		}
		return (
			<form id="add-book" onSubmit={this.SubmitForm.bind(this)}>
				<div className="field">
					<label>Book name:</label>
					<input
						type="text"
						onChange={(e) => {
							this.setState({ name: e.target.value });
						}}
					/>
				</div>
				<br></br>
				<div className="field">
					<label>Genre:</label>
					<input
						type="text"
						onChange={(e) => {
							this.setState({ genre: e.target.value });
						}}
					/>
				</div>
				<br></br>
				<div className="field">
					<label>Author:</label>
					<select
						id="authorList"
						onChange={(e) => {
							this.setState({ authorId: e.target.value });
						}}
					>
						<option>Select author</option>
					</select>
				</div>
				<br></br>
				<button>+</button>
			</form>
		);
	}
}

export default compose(
	graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
	graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
