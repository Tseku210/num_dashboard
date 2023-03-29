import { Box } from "@mui/system";
import { gql, useQuery } from "@apollo/client";
import Header from "../../components/Header";

// const GET_REQUESTS = gql`
//   query getUser($_id: ID!) {
//     getUser(_id: $_id) {
//       _id
//       username
//       confirmed
//     }
//   }
// `;

const Dashboard = () => {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>
    </Box>
  );
};

export default Dashboard;
