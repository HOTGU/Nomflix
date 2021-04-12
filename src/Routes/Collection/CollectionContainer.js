import { moviesApi } from "api";
import React from "react";
import CollectionPresenter from "./CollectionPresenter";

export default class extends React.Component {
  state = {
    result: null,
    loading: true,
    error: null,
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    try {
      ({ data: result } = await moviesApi.collection(parsedId));
      console.log(result);
    } catch (error) {
      this.setState({
        error: "콜렉션 못찾음",
      });
    } finally {
      this.setState({
        loading: false,
        result,
      });
    }
  }

  render() {
    const { result, loading, error } = this.state;
    console.log(result);
    return (
      <CollectionPresenter result={result} loading={loading} error={error} />
    );
  }
}
