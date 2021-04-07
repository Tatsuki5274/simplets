import React from "react";
import { Link } from "react-router-dom";
import CommandButton from "views/components/molecules/CommandButton";

export default function(){
    // TODO リンクの実装
    return (
        <Link to="/empty"><CommandButton>部署登録</CommandButton></Link>
    )
}