import { Switch, Route } from "react-router-dom";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Students from "./components/Students";
import Teacher from "./components/Teacher";
import Courses from "./components/courses";
import Groups from "./components/groups";
import allStudents from "./components/allStudents";

const App = () => {
  return(<>
      <Switch>
        <Route path={"/"} exact component={Login} />
        <Route path={"/teacher"} exact component={Teacher} />
        <Route path={"/student"} exact component={Students} />
        <Route path={"/admin"} exact component={Admin} />
        <Route path={"/allStudents"} exact component={allStudents} />
        <Route path={"/courses"} exact component={Courses} />
        <Route path={"/groups"} exact component={Groups} />
      </Switch>
  </>)
}

export default App;