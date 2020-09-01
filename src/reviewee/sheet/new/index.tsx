import React, { useState } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function RevieweeSheetNew(){
    return (
        <div>
            <Container>
                <Form>
                    <div>
                        <Form.Check
                            inline
                            name="type"
                            type="radio"
                            label={`ビジネス成長目標`}
                        />
                        <Form.Check
                            inline
                            name="type"
                            type="radio"
                            label={`ビジネス姿勢目標`}
                        />
                        <Form.Check
                            inline
                            name="type"
                            type="radio"
                            label={`成長目標`}
                            
                        />
                    </div>
                    <Form.Label>目標内容</Form.Label>
                    <Form.Control placeholder="目標内容を入力" />

                    <Form.Label>優先順位</Form.Label>
                    <Form.Control as="select">
                        <option>未選択</option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                    </Form.Control>
                    <Button variant="success">目標登録</Button>{' '}
                </Form>


            </Container>
        </div>
    )
}

export default RevieweeSheetNew;