'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import { deleteUserAction } from "@/actions"
import { useContext } from "react"
import { UserContext } from "@/context"

export default function SingleUserCard({ user }) {

    const { setOpenPopUp, setAddNewUserFormData, setCurrentEditedId } = useContext(UserContext);

    async function handleDelete(getCurrentUserId) {
        const result = await deleteUserAction(getCurrentUserId, '/user-management');
        console.log(result);
    }

    function handleEdit(user) {
        setOpenPopUp(true);
        setAddNewUserFormData({
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            address: user?.address
        });
        setCurrentEditedId(user?._id);
    }

    return <Card>
        <CardHeader>
            <CardTitle>{user?.firstName} {user?.lastName}</CardTitle>
            <CardDescription>{user?.email}</CardDescription>
        </CardHeader>
        <CardContent>
            <p>{user?.address}</p>
        </CardContent>
        <CardFooter className="flex justify-end gap-5">
            <Button onClick={() => handleEdit(user)}>Edit</Button>
            <Button onClick={() => handleDelete(user?._id)}>Delete</Button>
        </CardFooter>
    </Card>
}