import {gql} from "apollo-boost";

export const insertToDo = gql`
    mutation insert_todo_kmudrevskiy($created_at: timestamp!, $description: String!, $name: String!, $notify_at: timestamp!, $toggle_map_points: Boolean!, $latitude: float8, $longitude: float8) {
      insert_todo_kmudrevskiy(objects: {created_at: $created_at, description: $description, name: $name, notify_at: $notify_at, toggle_map_points: $toggle_map_points, latitude: $latitude, longitude: $longitude}) {
        returning {
          id
        }
      }
    }
`;

export const fetchToDos = gql`
    {
      todo_kmudrevskiy {
        id
        latitude
        longitude
        name
        notify_at
        toggle_map_points
        description
      }
    }
`;

export const removeToDo =  gql`
        mutation delete_todo_kmudrevskiy($id: Int) {
      delete_todo_kmudrevskiy(where: {id: {_eq: $id}}) {
        affected_rows
      }
    }
`;