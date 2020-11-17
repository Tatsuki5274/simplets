import React from "react"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"

type Props = {
    sheetId: string
}

export const AddObjectiveButton = (props: Props)=>{
    return (
        <Link to={`/reviewee/objective/new/${props.sheetId}`}>
            <Button variant="info">
                目標追加
            </Button>
        </Link>
    )
}