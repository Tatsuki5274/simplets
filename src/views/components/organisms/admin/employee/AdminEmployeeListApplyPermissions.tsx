import { updateOwnersMutation } from "lib/admin";
import React, { useState } from "react";
import CommandButton from "views/components/molecules/CommandButton";


export default function () {
    const [isLoading, setIsLoading] = useState(false);
    const onClick = async () => {
        setIsLoading(true);
        const result = await updateOwnersMutation();
        console.log("res", result)
        if(result.errors) {
            alert("更新に失敗しました");
            console.error(result.errors);
        } else {
            alert("更新が完了しました");
        }
        setIsLoading(false);
    };

    return (
        !isLoading ?
        <CommandButton
            onClick={onClick}
        >
            反映
        </CommandButton> :
        null
    )
}