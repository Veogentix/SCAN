import Page404 from "../Page404";
import Search from "../Search";
interface PrivateRouteProps {
    autorize: boolean,
    setJson: any
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ autorize, setJson }) => {

    //console.log(autorize, "search")
    if (autorize) {
        return (
            <Search setJson={setJson} />
        )
    }
    return (
        <Page404 />
    )
};

export default PrivateRoute;