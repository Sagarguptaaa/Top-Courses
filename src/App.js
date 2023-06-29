import NavBar from "./Components/NavBar";
import Filter from "./Components/Filter";
import Cards from "./Components/Cards";
import Spinner from "./Components/Spinner";
import { filterData, apiUrl } from "./data";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function App() {
  const [loading, setloading] = useState(null);
  const [courses, setcourses] = useState(true);
  const [category, setCategory] = useState(filterData[0].title);

  async function fetchData() {
    setloading(true);
    try {
      let response = await fetch(apiUrl);
      let output = await response.json();

      setcourses(output.data);
    } catch (error) {
      toast.error("Error Occurred in API Fetch");
    }

    setloading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">
      <div>
        <NavBar></NavBar>
      </div>

      <div>
        <div>
          <Filter
            filterdata={filterData}
            category={category}
            setCategory={setCategory}
          ></Filter>
        </div>

        <div
          className="w-11/12 max-w-[1200px] 
        mx-auto flex flex-wrap justify-center items-center min-h-[50vh]"
        >
          {loading ? (
            <Spinner />
          ) : (
            <Cards courses={courses} category={category} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
