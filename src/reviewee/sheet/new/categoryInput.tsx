import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';


type Props = {
    sectionId: string,
    categoryName: string,
    handleChange: any
}
function CategoryInput(props: Props){
    return (
        <Form.Check
            inline
            name="section"
            type="radio"
            label={props.categoryName}
            value={props.sectionId}
            onChange={props.handleChange}
        />
    )
}

export default CategoryInput;