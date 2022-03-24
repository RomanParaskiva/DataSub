import { useState, useRef, useEffect } from 'react'
import { Input, Row, Col, Divider, Select, Space, DatePicker, Button } from 'antd'

const CardForm = () => {
    const [flip, setFlip] = useState(false),
        [cardData, setCardData] = useState({
            cardNumber: '',
            expiresMonth: '',
            expiresYear: '',
            cvv: '',
            amount: ''
        }),
        numberRef = useRef(),
        expiresRef = useRef()

    const numberDefault = '#### #### #### ####'
    console.log(cardData)
    const sep = (str) => {
        var arr = []

        for (var i = 0; i < str.length; i += 4) {
            arr.push(str.slice(i, i + 4));
        }
        return arr.join(' ')
    }
    useEffect(() => {
        numberRef.current.innerHTML = numberDefault

    }, [])

    const handleDigits = (target) => {
        if (/\D/.test(target.value)) {
            target.value = target.value.substring(0, target.value.length - 1)
        }
    }

    const handleNumber = async ({ target }) => {

        handleDigits(target)
        if (target.value > 0) {
            setCardData({...cardData, [target.name]: target.value })
            numberRef.current.innerHTML = sep(cardData?.cardNumber) 
        } else {
            setCardData({...cardData, [target.value]: '' })
        }
    }




    return (
        <div className="form__wrapper">
            <div className={flip ? "card flip" : "card"}>
                <div className="card-item__side front">
                    <div className="card__logo">

                    </div>
                    <p ref={numberRef} className="card__number"></p>
                    <div className="card__expires">
                        <span>Expires</span>
                        <div className="card__expires-data">{cardData.expiresMonth || 'MM'}/{cardData.expiresYear || 'YYYY'}</div>
                    </div>
                </div>
                <div className="card-item__side back">
                    <div className="black-line"></div>
                    <div className="card-cvv__wrapper">
                        <span>CVV</span>
                        <div className="card-cvv"></div>
                    </div>
                </div>
            </div>

            <Space direction="vertical" className='form'>
                <Divider orientation="left">Card Number</Divider>
                <Row gutter={16}>
                    <Col span={24}>
                        <Input
                            name='cardNumber'
                            maxLength={16}
                            onInput={handleNumber}
                        />
                    </Col>
                </Row>
                <Divider orientation="left">Expires</Divider>
                <Row gutter={16}>
                    <Col span={6}>
                        <Input
                            name='expiresMonth'
                            maxLength={2}
                            placeholder="MM"
                            onInput={handleNumber}
                        />
                    </Col>
                    <Col span={6}>
                        <Input
                            name='expiresYear'
                            maxLength={4}
                            placeholder="YYYY"
                            onInput={handleNumber}
                        />
                    </Col>
                    <Divider orientation="left">CVV</Divider>
                    <Row gutter={16}>
                        <Col>
                            <Input
                                name='cvv'
                                style={{ width: 100 }}
                                maxLength={3}
                                onFocus={() => { setFlip(true) }}
                                onBlur={() => { setFlip(false) }}
                            />
                        </Col>
                    </Row>
                </Row>
                <Divider orientation="left">Amount</Divider>
                <Row gutter={16}>
                    <Col span={24}>
                        <Input disabled name='amount' />
                    </Col>
                </Row>
                <Row>
                    <Button disabled={true} type="primary">Send</Button>
                </Row>
            </Space>
        </div>
    )
}

export default CardForm