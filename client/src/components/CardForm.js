import { useState, useEffect, useRef } from 'react'
import { Input, Row, Col, Divider, Space, Button, Form, notification } from 'antd'

import { sep, handleDigits, validateYear, validateForm } from '../utils/utils'

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
        [form] = Form.useForm(),
        yearInputRef = useRef(null)
    const inputs = [...document.querySelectorAll('input')]


    useEffect(() => {
        form.getFieldInstance(['cardNumber']).focus()
    }, [form])

    useEffect(() => {
        console.log(validateForm(cardData))
        if(validateForm(cardData)) {
            setDisabledBtn(false)
        }
    }, [cardData])

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
                setDisabledBtn(true)
            }
            if (json?.message) notification.open({
                message: json.message
            })
        } else {
            notification.open({
                message: 'Что то пошло не так :('
            })
        }

    }

    const handleInput = async ({ target }) => {
        if (target.value > 0) {
            setCardData({ ...cardData, [target.name]: target.value })
        } else {
            setCardData({ ...cardData, [target.value]: '' })
        }
        try {
            const values = await form.validateFields([target.name])
            if (values[target.name]) {
                inputs.forEach((input, i) => {
                    if (input.name == target.name && i < inputs.length - 1) {
                        inputs[i + 1].focus()
                    }
                })
            }
        } catch (errorInfo) { console.log(errorInfo) }
    }

    const handleYearInput = ({ target }) => {
        
        if(target.value.length == 4){
            
            if(!validateYear(target.value)){
                target.classList.add('ant-input-status-error')
                yearInputRef.current.focus()
            } else {
                target.classList.remove('ant-input-status-error')
                handleInput({ target })
            }
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
                                // name={'expiresYear'}
                                rules={[{ len: 4 }]}
                            >
                                <Input
                                    ref={yearInputRef}
                                    name='expiresYear'
                                    maxLength={4}
                                    placeholder="YYYY"
                                    onInput={handleDigits}
                                    onChange={handleYearInput}
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