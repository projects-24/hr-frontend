import React from 'react'
import Nav from '../../components/Nav'

export default function Annual() {
  return (
    <div>
        <Nav />
        <div className="content">
            <div className="h1">Annual Leave</div>
            <div className="section text-bold">Make sure to enter all details correctly</div>
            <div className="m-section">
           <form>
           <div className="row">
                    <div className="col sm-12 md-6 lg-6 padding">
                        <input type="text" name='days' className="input" placeholder='Number Of Days' />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <input type="text" name='days' className="input" placeholder='Leave Address' />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <input type="text" name='days' className="input" placeholder='Home Address' />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <input type="text" name='days' className="input" placeholder='Date Of Leave' />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <input type="text" name='days' className="input" placeholder='Days Reffered On Last Year' />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <input type="text" name='days' className="input" placeholder='Number Of days On Leave' />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <input type="text" name='days' className="input" placeholder='Number Of days Requested' />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                    <input type="text" name='days' className="input" placeholder='Officer Taking Over' />
                    </div>
                    <div className="col sm-12 md-12 lg-12 padding">
                        <div className="text-bold">Resumption date</div>
                        <input type="date" name='days' className="input" />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <button className='primaryBtn btn full-width'> Submit Request <i className="icon-paper-plane"></i></button>
                    </div>
                </div>
           </form>
            </div>
        </div>
    </div>
  )
}
