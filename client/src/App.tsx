import { gql, useQuery } from "@apollo/client";

const query = gql`
  query GetUsers {
    getAllUsers {
      id
      name
      email
      userName
    }
  }
`;

export default function App() {
  const { data, loading } = useQuery(query);

  return (
    <div>
      {loading ? <p>Loading...</p> : <p>{JSON.stringify(data.getAllUsers)}</p>}
    </div>
  );
}
