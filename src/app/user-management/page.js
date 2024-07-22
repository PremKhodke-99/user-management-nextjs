import { fetchUserAction } from "@/actions";
import AddNewUser from "@/components/add-new-user";
import SingleUserCard from "@/components/single-user-card";
  
const UserManagement = async () => {

  const getListOfUsers = await fetchUserAction();
  // console.log(getListOfUsers);
  return (
    <div className="p-20 max-w-8xl">
        <div className="flex justify-between">
            <h1>User Management</h1>
            <AddNewUser />
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {
            getListOfUsers?.data?.length > 0 ? getListOfUsers.data.map(userItem => <SingleUserCard key={userItem._id} user={userItem} /> ) : <h3>No User availabe</h3>
          }
        </div>
    </div>
  );
}

export default UserManagement