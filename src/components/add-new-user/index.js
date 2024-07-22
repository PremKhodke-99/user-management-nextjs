'use client'

import React, { useContext } from 'react'
import { Button } from '../ui/button'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addNewUserFormControls, addNewUserFormInitialState } from '@/utils'
import { addNewUserAction, editUserAction } from '@/actions'
import { UserContext } from '@/context'



const AddNewUser = () => {

    const {
        openPopUp,
        setOpenPopUp,
        addNewUserFormData,
        setAddNewUserFormData,
        currentEditedId,
        setCurrentEditedId
    } = useContext(UserContext);
    // console.log(addNewUserFormData);

    function handleSaveButtonValid() {
        return Object.keys(addNewUserFormData).every((key) => addNewUserFormData[key].trim() !== '')
    }

    async function handleAddNewUserAction() {
        const result = currentEditedId !== null ? 
        await editUserAction(currentEditedId, addNewUserFormData, '/user-management') : 
        await addNewUserAction(addNewUserFormData, "/user-management");
        console.log(result);
        
        setOpenPopUp(false)
        setAddNewUserFormData(addNewUserFormInitialState);
        setCurrentEditedId(null);
    }

    return (
        <div>
            <Button onClick={() => setOpenPopUp(true)}>Add New User</Button>
            <Dialog open={openPopUp} onOpenChange={() => {
                setOpenPopUp(false);
                setAddNewUserFormData(addNewUserFormInitialState);
                setCurrentEditedId(null);
            }}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{currentEditedId !== null ? 'Edit User' : 'Add New User'}</DialogTitle>
                    </DialogHeader>
                    <form action={handleAddNewUserAction} className="grid gap-4 py-4">
                        {
                            addNewUserFormControls.map((controlItem) => <div className='mb-2' key={controlItem.name}>
                                <Label htmlFor={controlItem.name} className="text-right">
                                    {controlItem.label}
                                </Label>
                                <Input
                                    id={controlItem.name}
                                    name={controlItem.name}
                                    placeholder={controlItem.placeholder}
                                    className="col-span-3"
                                    type={controlItem.type}
                                    value={addNewUserFormControls[controlItem.name]}
                                    onChange={(e) => setAddNewUserFormData({
                                        ...addNewUserFormData,
                                        [controlItem.name]: e.target.value
                                    })}
                                />
                            </div>)
                        }
                        <DialogFooter>
                            <Button
                                className="disabled:opacity-55"
                                disabled={!handleSaveButtonValid()}
                                type="submit"
                            >
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewUser