import React from "react";
import styled from "styled-components";
import SidebarManager from "../organisms/common/SidebarManager";

type Props = {
    data: {
        label: string
        dest: string
    }[][] | null
}

export default function (props: Props) {
    return props.data ?
    (
        <Styled>
            {props.data.map(links => {
                return (
                    <SidebarContent>
                        <SidebarManager
                            links={links}
                        />
                    </SidebarContent>
                )
            })}        </Styled>
    ) : 
     null
}

const Styled = styled.div({
    backgroundColor: "#8080804d",
    minHeight: "100%",
    padding: "20px 10px",
    paddingBottom: "30px",
})

const SidebarContent = styled.div({
    paddingBottom: "30px",
})