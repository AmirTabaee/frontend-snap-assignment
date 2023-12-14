import renderer from "react-test-renderer";
import ViewContact from "./ViewContact";

test("matches snapshot", () => {
    const tree = renderer.create(<ViewContact />).toJSON();
    expect(tree).toMatchSnapshot();
});
