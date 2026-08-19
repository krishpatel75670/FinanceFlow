import { Link } from "react-router-dom";




function Home() {
    return (
        <div className="">
            <h1>Home</h1>

            <Link to="/login">Login</Link>
            <br />
            <Link to="/register">Register</Link>
        </div>


    );
}

export default Home;