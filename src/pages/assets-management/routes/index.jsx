// ** React Imports
import { useState, useEffect, useCallback } from "react";
// ** MUI Imports
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
// ** Store Imports
import { useDispatch } from "react-redux";
// ** Actions Imports
import { fetchData } from "src/store/apps/user";

// ** Third Party Components
import axios from "axios";

// ** Custom Table Components Imports
import TableHeader from "src/views/apps/user/list/TableHeader";
import AddUserDrawer from "src/views/apps/user/list/AddUserDrawer";

const Routes = () => {
  // ** State
  const [role, setRole] = useState("");
  const [plan, setPlan] = useState("");
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("");
  const [addUserOpen, setAddUserOpen] = useState(false);

  // ** Hooks
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchData({
        role,
        status,
        q: value,
        currentPlan: plan,
      })
    );
  }, [dispatch, plan, role, status, value]);

  const handleFilter = useCallback((val) => {
    setValue(val);
  }, []);

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card>
          <TableHeader
            value={value}
            handleFilter={handleFilter}
            toggle={toggleAddUserDrawer}
          />
           <Grid item lg={4} md={6} xs={12} >
          <Card
            sx={{
              height: {
                md: "calc(80vh - 4.0625rem)",
                xs: "calc(50vh - 4.0625rem)",
              },
            }}
            className="m-5"
          >
            <CardContent sx={{ margin: 0 }}>
              <Typography sx={{ fontSize: "16px" }}>{"Route"}</Typography>
             
            </CardContent>
          </Card>

           </Grid>
        </Card>
      </Grid>

      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Grid>
  );
};

export const getStaticProps = async () => {
  const res = await axios.get("/cards/statistics");
  const apiData = res.data;

  return {
    props: {
      apiData,
    },
  };
};

export default Routes;
