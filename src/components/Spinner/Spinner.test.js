import renderer from "react-test-renderer";
import Spinner from "./Spinner";

test("matches snapshot", () => {
    const tree = renderer.create(<Spinner />).toJSON();
    expect(tree).toMatchSnapshot();
});
