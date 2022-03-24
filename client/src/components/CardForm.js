import { useState, useRef, useEffect } from 'react'
import { Input, Row, Col, Divider, Select, Space, DatePicker, Button } from 'antd'

const CardForm = () => {
    const [flip, setFlip] = useState(false),
        [number, setNumber] = useState(null),
        [expires, setExpires] = useState(null),
        numberRef = useRef(),
        expiresRef = useRef()

    const numberDefault = '#### #### #### ####'

    useEffect(() => {
        numberRef.current.innerHTML = number || numberDefault
        expiresRef.current.innerHTML = expires || 'MM/YYYY'
    }, [number, expires])

    const handleDigits = (target) => {
        if(/\D/.test(target.value)){
            target.value = target.value.substring(0, target.value.length - 1)
         }
    }

    const handleNumber = async ({ target }) => {

       handleDigits(target)
 
        if (target.value > 0) {
            // console.log(numberDefault.substring(target.value.length))
            setNumber(target.value.split(/d{4}/).join(' '))
            // if(target.value.length % 4 == 0) {
               
            //     // setNumber( target.value.concat( numberDefault.substring(target.value.length), " "))
            // } else {
            //     setNumber( target.value.concat( numberDefault.substring(target.value.length)))
            // }    
        }
        console.log(number)
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
                        <div ref={expiresRef} className="card__expires-data"></div>
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
                            maxLength={19} 
                            onInput={handleNumber}
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Divider orientation="left">Expires</Divider>
                        <Select
                            name='mm'
                            placeholder={'MM'}
                            style={{ width: 50, marginRight: 10 }}
                            showArrow={false}
                            onChange={(e) => { console.log(e) }}
                        >
                            <Select.Option value="01">01</Select.Option>
                            <Select.Option value="02">02</Select.Option>
                            <Select.Option value="03">03</Select.Option>
                            <Select.Option value="04">04</Select.Option>
                            <Select.Option value="05">05</Select.Option>
                            <Select.Option value="06">06</Select.Option>
                            <Select.Option value="07">07</Select.Option>
                            <Select.Option value="08">08</Select.Option>
                            <Select.Option value="09">09</Select.Option>
                            <Select.Option value="10">10</Select.Option>
                            <Select.Option value="11">11</Select.Option>
                            <Select.Option value="12">12</Select.Option>
                        </Select>

                        <DatePicker
                            style={{ width: 100 }}
                            picker='year'
                            placeholder={'YYYY'}
                            suffixIcon={false}
                            name={'year'}
                        />
                    </Col>

                    <Col span={6} offset={5}>
                        <Divider orientation="left">CVV</Divider>
                        <Input
                            name='cvv'
                            style={{ width: 100 }}
                            maxLength={3}
                            onFocus={() => { setFlip(true) }}
                            onBlur={() => { setFlip(false) }}
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Divider orientation="left">Amount</Divider>
                        <Input name='amount' />
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