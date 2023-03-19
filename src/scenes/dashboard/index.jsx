import { Box } from "@mui/system";
import { gql, useQuery } from "@apollo/client";
import Header from "../../components/Header";

const GET_REQUESTS = gql`
  query getUser($_id: ID!) {
    getUser(_id: $_id) {
      _id
      username
      confirmed
    }
  }
`;

const Dashboard = () => {
  const { data, loading, error } = useQuery(GET_REQUESTS, {
    variables: { _id: "6416b12214da10ed525d7f60" },
  });
  console.log(data);
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>
    </Box>
  );
};

export default Dashboard;
