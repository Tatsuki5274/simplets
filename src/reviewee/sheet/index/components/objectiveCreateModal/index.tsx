import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ObjectiveCreateModalContent } from "./content";

type Props = {
    sheetId: string
}

export function ObjectiveCreateModal(props: Props){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <span>
            <Button variant="primary" onClick={handleShow}>
                目標追加
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
            >
                <Modal.Header closeButton>
                <Modal.Title>業績目標設定</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ObjectiveCreateModalContent/>
                </Modal.Body>
                <Modal.Footer>

                {/* <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    閉じる
                </Button> */}
                </Modal.Footer>
            </Modal>
        </span>
    )
}