import React from 'react';
// import { Icon, Box } from "@chakra-ui/core";
import { withTracker } from 'meteor/react-meteor-data';
import styled from '@emotion/styled'
import { PageHeader } from '/imports/ui/components'

import { CustomerStyle, CustomerName } from '/imports/ui/components'

//imports for API call
import { Meteor } from 'meteor/meteor'
import { Customers } from '/imports/api/collections'
import { ICustomer } from '/imports/api/schema';
import path from '/imports/ui/router';


const StyledCustomers = styled.main`
  display: flex;
  flex-direction: column;
`
interface CustomerProps {
  customers: ICustomer[]
}


 class Customer extends React.Component<CustomerProps> {
  
  render() {
    console.log(this.props)
    const { customers } = this.props
    return (

      <StyledCustomers>
        <PageHeader title="Your Customers" />
        {/* <div>{JSON.stringify(this.props.customers)}</div> */}

        <CustomerStyle>
          {customers.map((val, index) => {
            return (
          //     <div key={[val._id, index].join('-')}>
          // <p>{val.customerName}</p>
          // <p>{val._id}</p>
          // <p>{val.address}</p>
          // <p>{val.email}</p>
          //     </div>
              <CustomerName
                LinkCard={`${path.workspace.customer}/view/${val._id}`}
                customerName={val.customerName}
                iconName=""
                PhoneNumber={val.phonenumber}
              />

            )
          })
        }
        </CustomerStyle>

        
      </StyledCustomers>


    )
  }
}



export default withTracker(() => {
  Meteor.subscribe('customers')
  console.log(Customers.find().fetch())
  return {
    customers: Customers.find().fetch()
  };
})(Customer);