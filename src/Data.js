import React from 'react'

class Data extends React.Component {
    constructor(props) {
        super(props) ;
        this.state = {
            bill_amount: '',
            customer_details : [] ,
            feedback: 0,
            name: '',
            total_tip: 0,
            total_cust: 0,
            disabled : false
        }
    }   

    calculateTip = () => {
        let {total_tip,customer_details} = this.state ;
        total_tip = customer_details.reduce((total,item) => total += item.tip ,0) ;
        total_tip !== 0 && this.setState({total_tip: total_tip, total_cust: customer_details.length })
        this.setState({disabled : false})
    }

    handleClick = () => {
        let {name,feedback,bill_amount,customer_details} = this.state ;
        let tip = bill_amount * feedback ;
        name !== "" && feedback !== 0 && bill_amount !== 0 && bill_amount !== '' && tip !== 0 && this.setState({name: '', feedback: 0, customer_details: [...customer_details,{cname: name,fb:feedback,tip: tip}]})
        tip !== 0 && this.setState({disabled : true})
    }

    handleReset = () => {
        this.setState({bill_amount: '',feedback: 0,total_tip: 0,total_cust: 0,name: '',customer_details: [],disabled: false})
    }

    render() {
        let {bill_amount,name,customer_details,feedback,total_tip,total_cust} = this.state ;

        return (
            <div className="data">
                <div>
                    <div>
                        <p>Enter your Bill Amount</p>
                        <input className="input bill" type="number" placeholder={0} value={bill_amount} disabled={this.state.disabled} onChange={(e) => this.setState({bill_amount: e.target.value})} onClick={() => this.setState({bill_amount: ''})}></input>
                    </div>
                    <hr></hr>
                    <div className="inputDiv">
                        <label>Service Feedback : </label>
                        <select className="input" value={feedback} onChange={(e) => this.setState({ feedback: e.target.value })}>
                            <option value={0}>Select..</option>
                            <option value={0.2}>Excellent</option>
                            <option value={0.1}>Average</option>
                            <option value={0.05}>Bad</option>
                        </select>
                        <input className="input" type="text" placeholder="Customer Name" value={name} onChange={(e) => this.setState({ name: e.target.value })}></input>
                        <input className="input button1" type="button" value="Add Customer" onClick={() => this.handleClick()}></input>
                    </div>
                    <hr></hr>
                </div>
                
                <div>
                    <div>
                        <div>Customer Tip Details :</div>
                        <hr></hr>
                        {bill_amount !== 0 &&
                            <ul >
                                {customer_details.map((item, ind) => {
                                    let name = item.cname; 
                                    return <li key={ind}>{name.slice(0,1).toUpperCase()+name.slice(1)} is offering a Tip of {item.tip}</li>
                                })}
                            </ul>}
                        <hr></hr>
                    </div>
                    <div>
                        <input className="input button2" type="button" value="Calculate total Tip" onClick={() => this.calculateTip()}></input>
                    </div>
                    {total_tip !== 0 &&
                        <table >
                            <thead>
                                <tr>
                                    <th>Total Customers</th>
                                    <th>Tip</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{total_cust}</td>
                                    <td>{total_tip}</td>
                                </tr>
                            </tbody>
                        </table>}
                        <hr></hr>
                </div>
                <div>
                    <div>
                        <button className="input" onClick={(e) => this.handleReset()}>Reset</button>
                    </div>
                </div>
            </div>
        )

    }
}

export default Data