import React from "react"
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap"


/**
 * 
 * @param isShow     モーダルウィンドウを開くかどうかを指定する
 * @param handleClose    モーダルウィンドウを閉じるための関数を指定する
 * @returns   void
 */
type Props = {
    isShow: boolean,
    handleClose: () => void
}

export const RemandModal = (props: Props)=>{

    const handleRemand = ()=>{
        console.log("差し戻しの処理が未実装です")
    }

    return <div>
        <Modal show={props.isShow} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>目標差し戻し</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>理由</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl as="textarea" />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                {/* <Button variant="primary" onClick={handleClose}> */}
                <Button variant="primary" onClick={handleRemand}>
                    差し戻し
                </Button>
                <Button variant="secondary" onClick={props.handleClose}>
                    キャンセル
                </Button>

            </Modal.Footer>
        </Modal>
    </div>
}