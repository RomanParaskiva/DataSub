import { useState, useRef, useEffect } from 'react'
import { Input, Row, Col, Divider, Space, Button, Form, notification } from 'antd'

import { sep, handleDigits } from '../utils/utils'

const CardForm = () => {
    const [flip, setFlip] = useState(false),
        [disabledBtn, setDisabledBtn] = useState(true),
        [cardData, setCardData] = useState({
            cardNumber: '',
            expiresMonth: '',
            expiresYear: '',
            cvv: '',
            amount: ''
        }),
        [form] = Form.useForm()
    const inputs = [...document.querySelectorAll('input')]


    useEffect(() => {
        form.getFieldInstance(['cardNumber']).focus()
    }, [form])

    const sendData = async () => {
        const res = await fetch('/api/form/send', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ ...cardData })
        })

        if (res.ok) {
            const json = await res.json()
            if (json?.requestId) {
                notification.open({
                    message: `RequestId : ${json.requestId}`,
                    description: `Amount : ${json.amount}`
                })
                form.resetFields()
            }
            if (json?.message) notification.open({
                message: json.message
            })
        } else {
            notification.open({
                message: 'Что то пощло не так :('
            })
        }

    }

   



    const handleInput = async ({ target }) => {
        if (target.value > 0) {
            if (target.name == 'amount') setDisabledBtn(false)
           
            setCardData({ ...cardData, [target.name]: target.value })
        } else {
            setCardData({ ...cardData, [target.value]: '' })
        }
        try {
            const values = await form.validateFields([target.name])
            if (values[target.name]) {
                inputs.forEach((input, i) => {
                    if (input.name == target.name) {
                        inputs[i + 1].focus()
                    }
                })
            }

        } catch (errorInfo) {

        }

    }




    return (
        <div className="form__wrapper">
            <div className={flip ? "card flip" : "card"}>
                <div className="card-item__side front">
                    <div className="card__logo">

                    </div>
                    <p className="card__number">{sep(cardData?.cardNumber) || '#### #### #### ####'}</p>
                    <div className="card__expires">
                        <span>Expires</span>
                        <div className="card__expires-data">{cardData.expiresMonth || 'MM'}/{cardData.expiresYear || 'YYYY'}</div>
                    </div>
                </div>
                <div className="card-item__side back">
                    <div className="black-line"></div>
                    <div className="card-cvv__wrapper">
                        <span>CVV</span>
                        <div className="card-cvv">{cardData.cvv}</div>
                    </div>
                </div>
            </div>

            <Space direction="vertical" className='form'>
                <Form form={form}>
                    <Divider orientation="left">Card Number</Divider>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name={'cardNumber'}
                                rules={[
                                    {
                                        len: 16
                                    }
                                ]}
                            >
                                <Input
                                    name='cardNumber'
                                    maxLength={16}
                                    onInput={handleDigits}
                                    onChange={handleInput}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider orientation="left">Expires</Divider>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item
                                name={'expiresMonth'}
                                rules={[{ len: 2 }]}
                            >
                                <Input
                                    name='expiresMonth'
                                    maxLength={2}
                                    placeholder="MM"
                                    onInput={handleDigits}
                                    onChange={handleInput}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name={'expiresYear'}
                                rules={[{ len: 4 }]}
                            >
                                <Input
                                    name='expiresYear'
                                    maxLength={4}
                                    placeholder="YYYY"
                                    onInput={handleDigits}
                                    onChange={handleInput}
                                />
                            </Form.Item>
                        </Col>
                        <Divider orientation="left">CVV</Divider>
                        <Row gutter={16}>
                            <Col>
                                <Form.Item
                                    name={'cvv'}
                                    rules={[{ len: 3 }]}
                                >
                                    <Input
                                        name='cvv'
                                        style={{ width: 100 }}
                                        maxLength={3}
                                        onFocus={() => { setFlip(true) }}
                                        onBlur={() => { setFlip(false) }}
                                        onInput={handleDigits}
                                        onChange={handleInput}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Row>
                    <Divider orientation="left">Amount</Divider>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name={'amount'}
                                rules={[{ min: 1 }]}
                            >
                                <Input
                                    name='amount'
                                    maxLength={10}
                                    onInput={handleDigits}
                                    onChange={handleInput}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Button id="submit" disabled={disabledBtn} type="primary" onClick={sendData}>Send</Button>
                    </Row>
                </Form>
            </Space>
        </div>
    )
}

export default CardForm