'use server';

import connectToDB from "@/database";
import User from "@/models/user";
import { revalidatePath } from "next/cache";

export async function addNewUserAction(formData, pathToRevalidate) {
    await connectToDB();

    try {
        const newlyCreatedUser = await User.create(formData);
        if (newlyCreatedUser) {
            revalidatePath(pathToRevalidate)
            return {
                success: true,
                message: "User added successfully"
            }
        } else {
            return {
                success: false,
                message: 'Some error occured! please try again'
            }
        }

    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Some error occured! please try again'
        }
    }
}

export async function fetchUserAction() {
    await connectToDB();

    try {
        const listOfUsers = await User.find({});

        if (listOfUsers) {
            return {
                success: true,
                data: JSON.parse(JSON.stringify(listOfUsers))
            }
        } else {
            return {
                success: false,
                message: 'Some error occured! please try again'
            }
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Some error occured! please try again'
        }
    }
}

export async function editUserAction(currentUserId, formData, pathToRevalidate) {
    await connectToDB();

    try {
        const { firstName, lastName, email, address } = formData;

        const updatedUser = await User.findByIdAndUpdate({ _id: currentUserId }, { firstName, lastName, email, address }, { new: true });

        if (updatedUser) {
            revalidatePath(pathToRevalidate);
            return {
                success: true,
                message: 'User updated successfully'
            }
        } else {
            return {
                success: false,
                message: 'Not able to update user! please try again'
            }
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Some error occured! please try again'
        }
    }
}

export async function deleteUserAction(currentUserId, pathToRevalidate) {
    await connectToDB();
    try {
        const deletedUser = await User.findByIdAndDelete(currentUserId);

        if (deletedUser) {
            revalidatePath(pathToRevalidate)
            return {
                success: true,
                message: 'User deleted successfully'
            }
        } else {
            return {
                success: false,
                message: 'No able to perform operation! please try again'
            }
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Some error occured! please try again'
        }
    }
}

export async function fetchListOfProducts() {
    try {
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();

        return data?.products;
    } catch (error) {
        console.log(error);
    }
}
